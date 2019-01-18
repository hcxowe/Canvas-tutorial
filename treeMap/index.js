$(function(){
    var treeObjs = {} // 保存创建的树对象 {id - treeObj}
    var activeNode = null // 当前选中的节点
    var $container = $('#container') // 整个图的容器 jquery 对象
    var treeData = null // 保存从获取的树数据
    var relations_old = null // 保存从后台获取的关系数据
    var relations = []  // 前端组装的关系数据
    var clickPos = null // 画布点击的鼠标位置
    var selRelElIndex = null // 选中的关系线在 relations 中的索引
    var $firstNode = null // 连线时, 点击的第一个圆点 jquery 对象
    var lineing = false // 是否正在连线状态
    var curColor = 'blue' // 当前选中的线条颜色
    var codeOpt = false // 是否手动触发节点的展开/收缩

    var setting = {
        view: {
            selectedMulti: true,
            nameIsHTML: true,
            addDiyDom: addDiyDom // 添加圆点
        },
        callback: {
            onClick: zTreeOnClick,
            beforeCollapse: zTreeOnCollapse,
            beforeExpand: zTreeOnExpand,
            onCollapse: onCollapse,
            onExpand: onExpand,
        }
    }

    var canvas = document.getElementById('canvas')
        context = canvas.getContext('2d')

    // 手动设置画布的高宽, 需要适应 $container
    var wrapHeight = $container.prop('scrollHeight')
    $('#canvas').attr('height', wrapHeight-5)
    var wrapWidth = $container.prop('scrollWidth')
    $('#canvas').attr('width', wrapWidth)

    // 线条颜色
    $('#colorBox').on('click', 'span', function(evt) {
        curColor = $(this).css('backgroundColor')

        $(this).addClass('color-active').siblings().removeClass('color-active')
    })

    // 为树节点前后添加绿色圆点用于连线
    function addDiyDom(treeId, treeNode) {
        var $li = $("#" + treeNode.tId)
        var $a = $("#" + treeNode.tId + "_a")
        $li.before('<span data-tid="' + treeNode.tId + '" class="dot-before"></span>')

        if (treeNode.isParent) {
            $a.after('<span data-tid="' + treeNode.tId + '" class="dot-after"></span>')
        }
        else {
            $a.after('<span data-tid="' + treeNode.tId + '" class="dot-after"></span>')
        }
    }

    // 选中节点
    function zTreeOnClick(event, treeId, treeNode) {
        // 清除所有树节点选中状态
        for(id in treeObjs) {
            if (treeObjs.hasOwnProperty(id)) {
                treeObjs[id].cancelSelectedNode()
            }
        }

        activeNode = treeNode

        updateHighLightByNode(treeNode)
        updateSelNode()
        updateCanvas()
    }

    function zTreeOnCollapse(treeId, treeNode) {
        if (codeOpt) {
            codeOpt = false
            return true
        }

        // 先更新树的选中状态, 在更新canvas. 树的选中会展开节点
        setTimeout(function() {
            var treeObj = $.fn.zTree.getZTreeObj(treeId)

            codeOpt = true
            treeObj.expandNode(treeNode, false, false, false, true)
        }, 1)

        updateSelNode()
        return false
    }

    function onCollapse() {
        updateCanvas()
    }

    function onExpand() {
        updateSelNode()
        updateCanvas()
    }

    function zTreeOnExpand(treeId, treeNode) {
    }

    function initTree() {
        getData() // 从后台获取数据

        treeData.forEach(function(item) {
            createTree(item)
        })

        // 在原有关系中加入 fromNode & toNode
        relations_old.forEach(function(item) {
            item.fromNode = treeObjs[item.from[0]].getNodeByParam('id', item.from[1])
            item.toNode = treeObjs[item.to[0]].getNodeByParam('id', item.to[1])
            relations.push(item)
        })

        updateCanvas()
    }

    // 创建树
    function createTree(opts) {
        var html = []
        html.push('<div class="tree-contaier">')
            html.push('<p class="tree-title">' + opts.title + '</p>')
            html.push('<div class="tree-wrap">')
                html.push('<ul id="tree_' + opts.id + '" class="ztree"></ul>')
            html.push('</div>')
        html.push('</div>')

        var $el = $(html.join(''))
        $container.append($el)

        $el.css('left', opts.x)
        $el.css('top', opts.y)

        treeObjs[opts.id] = $.fn.zTree.init($('#tree_' + opts.id), setting, opts.data)
    }

    function getData() {
        treeData = [
            {
                title: '智能文档编辑需求',
                x: 50,
                y: 100,
                id: 1,
                level: 1,
                data: [
                    {
                        name:"父节点1",
                        id: 1,
                        open:true,
                        children: [
                            {
                                name:"父节点11",
                                id: 11,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 111
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 112
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 113
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 114
                                    }
                                ]
                            },
                            {
                                name:"父节点12",
                                id: 12,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 121
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 122
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 123
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 124
                                    }
                                ]
                            },
                            {
                                name:"父节点13 - 没有子节点",
                                id: 13,
                                isParent:true
                            }
                        ]
                    },
                    {
                        name:"父节点2",
                        id: 2,
                        open: true,
                        children: [
                            {
                                name:"父节点21",
                                id: 21,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点211",
                                        id: 211
                                    },
                                    { 
                                        name:"叶子节点212",
                                        id: 212
        
                                    },
                                    { 
                                        name:"叶子节点213",
                                        id: 213
                                    },
                                    { 
                                        name:"叶子节点214",
                                        id: 214
                                    }
                                ]
                            },
                            {
                                name:"父节点22",
                                id: 22,
                                children: [
                                    { 
                                        name:"叶子节点221",
                                        id: 221
                                    },
                                    { 
                                        name:"叶子节点222",
                                        id: 222
        
                                    },
                                    { 
                                        name:"叶子节点223",
                                        id: 223
                                    },
                                    { 
                                        name:"叶子节点224",
                                        id: 224
                                    }
                                ]
                            },
                            {
                                name:"父节点23",
                                id: 23,
                                children: [
                                    { 
                                        name:"叶子节点231",
                                        id: 231
                                    },
                                    { 
                                        name:"叶子节点232",
                                        id: 232
        
                                    },
                                    { 
                                        name:"叶子节点233",
                                        id: 233
                                    },
                                    { 
                                        name:"叶子节点234",
                                        id: 234
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name:"父节点3",
                        id: 3,
                        isParent:true
                    }
                ]
            },
            {
                title: '智能文档编辑需求',
                x: 400,
                y: 100,
                id: 2,
                level: 2,
                data: [
                    {
                        name:"父节点1",
                        id: 1,
                        open:true,
                        children: [
                            {
                                name:"父节点11",
                                id: 11,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 111
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 112
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 113
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 114
                                    }
                                ]
                            },
                            {
                                name:"父节点12",
                                id: 12,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 121
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 122
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 123
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 124
                                    }
                                ]
                            },
                            {
                                name:"父节点13 - 没有子节点",
                                id: 13,
                                isParent:true
                            }
                        ]
                    },
                    {
                        name:"父节点2",
                        id: 2,
                        open: true,
                        children: [
                            {
                                name:"父节点21",
                                id: 21,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点211",
                                        id: 211
                                    },
                                    { 
                                        name:"叶子节点212",
                                        id: 212
        
                                    },
                                    { 
                                        name:"叶子节点213",
                                        id: 213
                                    },
                                    { 
                                        name:"叶子节点214",
                                        id: 214
                                    }
                                ]
                            },
                            {
                                name:"父节点22",
                                id: 22,
                                children: [
                                    { 
                                        name:"叶子节点221",
                                        id: 221
                                    },
                                    { 
                                        name:"叶子节点222",
                                        id: 222
        
                                    },
                                    { 
                                        name:"叶子节点223",
                                        id: 223
                                    },
                                    { 
                                        name:"叶子节点224",
                                        id: 224
                                    }
                                ]
                            },
                            {
                                name:"父节点23",
                                id: 23,
                                children: [
                                    { 
                                        name:"叶子节点231",
                                        id: 231
                                    },
                                    { 
                                        name:"叶子节点232",
                                        id: 232
        
                                    },
                                    { 
                                        name:"叶子节点233",
                                        id: 233
                                    },
                                    { 
                                        name:"叶子节点234",
                                        id: 234
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name:"父节点3",
                        id: 3,
                        isParent:true
                    }
                ]
            },
            {
                title: '智能文档编辑需求',
                x: 750,
                y: 100,
                id: 3,
                level: 3,
                data: [
                    {
                        name:"父节点1",
                        id: 1,
                        open:true,
                        children: [
                            {
                                name:"父节点11",
                                id: 11,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 111
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 112
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 113
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 114
                                    }
                                ]
                            },
                            {
                                name:"父节点12",
                                id: 12,
                                children: [
                                    { 
                                        name:"叶子节点111",
                                        id: 121
                                    },
                                    { 
                                        name:"叶子节点112",
                                        id: 122
        
                                    },
                                    { 
                                        name:"叶子节点113",
                                        id: 123
                                    },
                                    { 
                                        name:"叶子节点114",
                                        id: 124
                                    }
                                ]
                            },
                            {
                                name:"父节点13 - 没有子节点",
                                id: 13,
                                isParent:true
                            }
                        ]
                    },
                    {
                        name:"父节点2",
                        id: 2,
                        open: true,
                        children: [
                            {
                                name:"父节点21",
                                id: 21,
                                open:true,
                                children: [
                                    { 
                                        name:"叶子节点211",
                                        id: 211
                                    },
                                    { 
                                        name:"叶子节点212",
                                        id: 212
        
                                    },
                                    { 
                                        name:"叶子节点213",
                                        id: 213
                                    },
                                    { 
                                        name:"叶子节点214",
                                        id: 214
                                    }
                                ]
                            },
                            {
                                name:"父节点22",
                                id: 22,
                                children: [
                                    { 
                                        name:"叶子节点221",
                                        id: 221
                                    },
                                    { 
                                        name:"叶子节点222",
                                        id: 222
        
                                    },
                                    { 
                                        name:"叶子节点223",
                                        id: 223
                                    },
                                    { 
                                        name:"叶子节点224",
                                        id: 224
                                    }
                                ]
                            },
                            {
                                name:"父节点23",
                                id: 23,
                                children: [
                                    { 
                                        name:"叶子节点231",
                                        id: 231
                                    },
                                    { 
                                        name:"叶子节点232",
                                        id: 232
        
                                    },
                                    { 
                                        name:"叶子节点233",
                                        id: 233
                                    },
                                    { 
                                        name:"叶子节点234",
                                        id: 234
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name:"父节点3",
                        id: 3,
                        isParent:true
                    }
                ]
            }
        ]
        relations_old = [
            {
                from: [1, 111],
                to: [2, 111],
                color: 'blue'
            },
            {
                from: [2, 111],
                to: [3, 111],
                color: 'blue'
            }
        ]
    }

    initTree()

    // 代理所有圆点的点击事件
    $container.on('click', 'span[data-tid]', function(evt) {
        evt.stopPropagation()

        if (!$firstNode) {
            $firstNode = $(this)
            lineing = true
            return
        }

        var relation = {}

        relation.from = $firstNode.data('tid').split('_').slice(1)
        relation.to = $(this).data('tid').split('_').slice(1)

        // 不能从后面的树连到前面的树, 不能逆关系
        if (relation.from >= relation.to) {
            lineing = false
            $firstNode = null

            updateCanvas()
            return
        }

        relation.fromNode = treeObjs[relation.from[0]].getNodeByTId($firstNode.data('tid'))
        relation.toNode = treeObjs[relation.to[0]].getNodeByTId($(this).data('tid'))
        relation.color = curColor
        relations.push(relation)

        lineing = false
        $firstNode = null

        updateCanvas()
    })

    $(document).on('click', function() {
        if (!lineing) {
            return
        }

        lineing = false
        $firstNode = null

        updateCanvas()
    })

    $(canvas).on('click', function(evt) {
        evt.stopPropagation()

        clickPos = {
            x: evt.offsetX,
            y: evt.offsetY
        }

        selRelElIndex = -1

        updateCanvas()
    })

    $('#clearBtn').on('click', function() {
        if (selRelElIndex != -1) {
            relations.splice(selRelElIndex, 1)

            updateCanvas()
        }
    })

    $('#saveBtn').on('click', function() {
        // 获取树的位置
        var posObj = {}
        for(id in treeObjs) {
            if (treeObjs.hasOwnProperty(id)) {
                posObj[id] = {
                    x: parseInt($('#tree_' + id).parents('.tree-contaier').css('left')),
                    y: parseInt($('#tree_' + id).parents('.tree-contaier').css('top'))
                }
            }
        }

        console.log(posObj)

        // 获取关系数据
        var retRelations = relations.map(function(el) {
            return {
                from: el.from,
                to: el.to,
                color: el.color
            }
        })

        console.log(retRelations)
    })

    // 节点为创建或者隐藏,需要获取第一个可见的父节点
    function getFirstVisbleNode(node) {
        var tempNode = node
        var $el = $('#'+tempNode.tId)
        while($el == 0 || $el.is(':hidden')) {
            tempNode = tempNode.getParentNode()
            $el = $('#'+tempNode.tId)
        }

        return tempNode
    }

    // 根据树 id 获取树的级别
    function getLevelById(id) {
        var ret = treeData.filter(function(el) {
            return id == el.id
        })

        return ret[0].level
    }

    // 根据传入的节点, 给关系数据添加 highlig 状态
    function updateHighLightByNode(node) {
        var relObjs = {}

        // 获取树级别数组, 按升序排序
        var keys = treeData.map(function(el) {
            return el.level
        }).sort(function(a, b) { return a - b})

        // 关系数据按级别存储, 根据 fromNode 节点的树级别
        keys.forEach(function(item) {
            relObjs[item] = relations.filter(function(el) {
                var level = getLevelById(el.fromNode.tId.split('_')[1])
                return level == item
            })
        })

        // 当前节点所在树的级别与级别数组中的序号
        var selLevel = getLevelById(node.tId.split('_')[1])
        var selIndex = keys.indexOf(selLevel)

        // 往上找有关系的节点
        var findToNode = [node]
        for (var i=selIndex-1; i>=0; i--) {
            var temNodes = relObjs[keys[i]].filter(function(el) {
                for (var j=0; j<findToNode.length; j++) {
                    if (findToNode[j] == el.toNode) {
                        el.highlight = true
                        return true
                    }
                }

                el.highlight = false
                return false
            })

            // 可能会有多个节点连到当前节点
            findToNode = temNodes.map(function(el) {
                return el.fromNode
            })
        }

        // 往下找有关系的节点
        var findFromNode = [node]
        for (var i=selIndex; i<keys.length; i++) {
            var temNodes = relObjs[keys[i]].filter(function(el) {
                for (var j=0; j<findFromNode.length; j++) {
                    if (findFromNode[j] == el.fromNode) {
                        el.highlight = true
                        return true
                    }
                }

                el.highlight = false
                return false
            })

            findFromNode = temNodes.map(function(el) {
                return el.toNode
            })
        }
    }

    function updateSelNode() {
        for(id in treeObjs) {
            if (treeObjs.hasOwnProperty(id)) {
                treeObjs[id].cancelSelectedNode()
            }
        }

        relations.forEach(function(el) {
            if (el.highlight) {
                treeObjs[el.fromNode.tId.split('_')[1]].selectNode(el.fromNode, true, true)
                treeObjs[el.toNode.tId.split('_')[1]].selectNode(el.toNode, true, true)
            }

            activeNode && treeObjs[activeNode.tId.split('_')[1]].selectNode(activeNode, true, true)
        })
    }

    // 是否选中线, 扩大选中的范围, 否则很难选中
    function selLine(x, y) {
        for (var i=-1; i<2; i++) {
            for(var j=-1; j<2; j++) {
                if (context.isPointInStroke(x+i, y+j)) {
                    return true
                }
            }
        }

        return false
    }

    // 画箭头
    function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
        theta = typeof (theta) != 'undefined' ? theta : 30;
        headlen = typeof (theta) != 'undefined' ? headlen : 10;
        width = typeof (width) != 'undefined' ? width : 1;
        color = typeof (color) != 'color' ? color : '#000';

        var angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        ctx.lineJoin = 'miter'

        ctx.beginPath();
        var arrowX = 0,
            arrowY = 0;

        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);

        arrowX = toX - topX;
        arrowY = toY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);

        arrowX = toX - botX;
        arrowY = toY - botY;
        ctx.lineTo(arrowX, arrowY);

        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath()
    }

    function updateCanvas() {
        context.clearRect(0, 0, $('#canvas').attr('width'), $('#canvas').attr('height'))

        if (!relations.length) {
            return
        }

        var wrapOffset = $container.offset(),
            wrapscrollLeft = $container.scrollLeft(),
            wrapscrollTop = $container.scrollTop()

        relations.forEach(function(el, index) {
            var temp = []

            var fvFromNode = getFirstVisbleNode(el.fromNode)
            var fvToNode = getFirstVisbleNode(el.toNode)

            temp.push($('span[data-tid="' + fvFromNode.tId + '"]').filter('[class=dot-after]'))
            temp.push($('span[data-tid="' + fvToNode.tId + '"]').filter('[class=dot-before]'))

            var color = 'blue'
            if (el.highlight) {
                color = 'red'
            }else {
                color = el.color
            }

            var p1 = {
                x: temp[0].offset().left - wrapOffset.left + wrapscrollLeft + temp[0].width(),
                y: temp[0].offset().top - wrapOffset.top + wrapscrollTop + temp[0].height() / 2,
            }
            var p2 = {
                x: temp[1].offset().left - wrapOffset.left + wrapscrollLeft,
                y: temp[1].offset().top - wrapOffset.top + wrapscrollTop + temp[1].height() / 2,
            }

            drawArrow(context, p1.x, p1.y, p2.x, p2.y, 30, 10, 1, color)

            if (clickPos) {
                if (selLine(clickPos.x-wrapscrollLeft, clickPos.y-wrapscrollTop)) {
                    selRelElIndex = index
                    drawArrow(context, p1.x, p1.y, p2.x, p2.y, 30, 10, 2, 'green')
                    clickPos = null
                }
            }
        })
    }

    var $dragEl = null, //当前拖拽的树
        distanceX = 0, // 拖拽点相对树的偏移X
        distanceY = 0, // 拖拽点相对树的偏移Y
        isDrag = false // 是否正在拖拽

    $('#container .tree-title').on('mousedown', function(evt) {
        $dragEl = $(this).parent()
        var pOffset = $dragEl.offset()

        distanceX = evt.clientX - pOffset.left
        distanceY = evt.clientY - pOffset.top

        isDrag = true
    })

    $(document).on('mousemove', function(evt){
        if (lineing) {
            updateCanvas()

            var wrapOffset = $container.offset(),
                wrapscrollLeft = $container.scrollLeft(),
                wrapscrollTop = $container.scrollTop()

            var p1 = {
                x: $firstNode.offset().left - wrapOffset.left + wrapscrollLeft + $firstNode.width(),
                y: $firstNode.offset().top - wrapOffset.top + wrapscrollTop + $firstNode.height() / 2,
            }

            var p2 = {
                x: evt.clientX - wrapOffset.left + wrapscrollLeft,
                y: evt.clientY - wrapOffset.top + wrapscrollTop
            }

            drawArrow(context, p1.x, p1.y, p2.x, p2.y, 30, 10, 1, 'green')
            return
        }

        if (!isDrag) {
            return
        }

        if ($container[0].scrollHeight != wrapHeight) {
            $('#canvas').attr('height', $container[0].scrollHeight-5)
            wrapHeight = $container[0].scrollHeight
        }

        if ($container[0].scrollWidth != wrapWidth) {
            $('#canvas').attr('width', $container[0].scrollWidth)
            wrapWidth = $container[0].scrollWidth
        }

        var ax = evt.clientX - distanceX,
            ay = evt.clientY - distanceY

        $dragEl.offset({top: ay>=0 ? ay : 0, left: ax>=0 ? ax : 0})

        updateCanvas()
    })

    $(document).on('mouseup', function() {
        isDrag = false
    })
})
var ary1 = [{
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    },
    {
        name: '项目信息'
    }
]

var ary2 = [{
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    },
    {
        name: '词条信息'
    }
]

var padding = 20, // 矩形区域间隔
    yInterval = 10, // 项垂直间隔
    textWidth = 100, // 文本长度
    textHeight = 30 // 文本高度

var position1 = {
    x: 10,
    y: 200
}
var position2 = {
    x: 350,
    y: 200
}

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d')

    draw(context)

    var isDrag = false

    canvas.onmousedown = function(ev) {
        var evt = ev || event;

        var mouseX = evt.clientX - canvas.offsetLeft;
        var mouseY = evt.clientY - canvas.offsetTop;
        
        var distanceX = mouseX - position2.x
        var distanceY = mouseY - position2.y

        if (mouseX > position2.x && mouseX < position2.x+padding*2+textWidth) {
            if (mouseY > position2.y && mouseX < position2.y + ary2.length * (textHeight + yInterval) + padding * 2 - yInterval) {
                canvas.onmousemove = function(ev){
                    var e = ev || event;
                    var ax = e.clientX - canvas.offsetLeft;
                    var ay = e.clientY - canvas.offsetTop;

                    position2 = {
                        x: ax - distanceX,
                        y: ay - distanceY
                    }

                    draw(context)
                };

                //鼠标移开事件
                canvas.onmouseup = function(){
                    canvas.onmousemove = null;
                    canvas.onmouseup = null;
                }
            }
        }
    }
}

function draw(context) {
    context.clearRect(0, 0, 800, 800);

    drawBlock(context, ary1, position1.x, position1.y)
    drawBlock(context, ary2, position2.x, position2.y)

    drawRelation(context, ary1, ary2)
}

function drawRelation(context, datalist1, datalist2) {
    for(var i=0; i<datalist1.length; i++) {
        for(var j=0; j<datalist2.length; j++) {
            i % 2 && drawArrow(context, position1.x+padding+textWidth, position1.y+padding+textHeight/2+i*(textHeight+yInterval), position2.x+padding, position2.y+padding+textHeight/2+j*(textHeight+yInterval), 30, 10, 1, '#f36')
        }
    }
}

function drawBlock(context, dataList, x, y) {
    context.save()

    context.translate(x, y);
    context.strokeStyle = 'blue';

    for (var i = 0; i < dataList.length; i++) {
        context.strokeRect(padding, padding + i * (textHeight + yInterval), textWidth, textHeight);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = '16px sans-serif';
        context.fillText(dataList[i].name, padding + textWidth / 2, padding + i * (textHeight + yInterval) + textHeight / 2, textWidth);
    }

    context.strokeStyle = 'red';
    context.strokeRect(0, 0, textWidth + padding * 2, i * (textHeight + yInterval) + padding * 2 - yInterval);

    context.restore();
}

function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (theta) != 'undefined' ? headlen : 10;
    width = typeof (width) != 'undefined' ? width : 1;
    color = typeof (color) != 'color' ? color : '#000'; // 计算各角度和对应的P2,P3坐标 
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX = fromX - topX,
        arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}
const Router = require('koa-router')

const router = new Router()

var treeData = [
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
var relations = [
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

var xmlist = [1,2,3,4,5]
var stlist = ['关系快照1', '关系快照2', '关系快照3', '关系快照4']
var colorlist = [
                    {name: '关系', color: '#ff0000'},
                    {name: '关系', color: '#00ff00'},
                    {name: '关系', color: '#0000ff'},
                    {name: '关系', color: '#ff00ff'},
                ]

router.get('/getXMList', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = xmlist
})

router.get('/getSTList', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = stlist
})

router.get('/getColorList', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = colorlist
})

router.get('/getXMTree', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = treeData[0].data
})

router.get('/getTreeData', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = treeData
})

router.get('/getRelations', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = relations
})

router.post('/savePosition', async (ctx) => {
    var body = ctx.request.body

    treeData.forEach(el => {
        el.x = +body[el.id].x
        el.y = +body[el.id].y
    })

    ctx.type = 'json'
    ctx.body = { ret: 0, msg: 'success' }
})

router.post('/saveRelations', async (ctx) => {
    relations = ctx.request.body.data

    ctx.status = 200
    ctx.type = 'json'
    ctx.body = { ret: 0, msg: 'success' }
})

module.exports = router
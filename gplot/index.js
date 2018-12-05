window.onload = function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d')

    context.fillStyle = '#ccc'
    context.strokeStyle = 'red'
    context.strokeWidth = 1

    drawRect(context, 50, 50, 200, 200, '#eee', 'red', 5)

    // 线段绘制
    var points = [
        {x: 55,y: 55},
        {x: 100,y: 55},
        {x: 100,y: 45}
    ]

    drawLine(context, points, 'green', 2)

    // 绘制多边形
    var points1 = [
        {x: 55, y: 65},
        {x: 100, y: 65},
        {x: 100, y: 85}
    ]
    drawShape(context, points1, 'blue', 1, 'red')

    drawArc(context)
    drawArc2(context)
    drawArc3(context)

    context.fillText('hcxowe', 100, 100)
}

function drawRect(context, x, y, width, height, fColor, sColor, swidth) {
    context.fillStyle = fColor || '#ccc'
    context.strokeStyle = sColor || 'black'
    context.lineWidth = swidth || 1

    context.fillRect(x, y, width, height)
    context.strokeRect(x-swidth, y-swidth, width+swidth, height+swidth)
}

function drawLine(context, points, color, width) {
    context.strokeStyle = color || 'black'
    context.lineWidth = width || 1

    var len = points.length
    if (len < 2) {
        return
    }

    context.beginPath()
    context.moveTo(points[0].x, points[0].y)

    for (var i=1; i<len; i++) {
        context.lineTo(points[i].x, points[i].y)
    }

    //context.closePath()
    context.stroke()
}

function drawShape(context, points, color, width, fColor) {
    var len = points.length
    if (len < 2) {
        return
    }

    context.beginPath()
    context.moveTo(points[0].x, points[0].y)

    for (var i=1; i<len; i++) {
        context.lineTo(points[i].x, points[i].y)
    }

    context.closePath()

    if (width > 0) {
        context.strokeStyle = color || 'black'
        context.lineWidth = width || 1
        context.stroke()
    }

    if (fColor) {
        context.fillStyle = fColor
        context.fill()
    }
}

function drawArc(context){
    context.beginPath();
    context.arc(50, 50, 40, 0, Math.PI / 2, false);
    context.stroke();
}

function drawArc2(context){
    context.beginPath();
    context.arc(50, 50, 40, 0, Math.PI / 2, true);
    context.stroke();

    context.beginPath();
    context.arc(150, 50, 40, 0, -Math.PI / 2, true);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
    context.fill();

    context.beginPath();
    context.arc(150, 150, 40, 0, Math.PI, false);
    context.fill();
}

function drawArc3(context){
    context.beginPath();
    context.moveTo(50, 50);
  	//参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
    context.arcTo(200, 50, 200, 200, 100);
    context.lineTo(200, 200)
    context.stroke();
    
    context.beginPath();
    context.rect(50, 50, 10, 10);
    context.rect(200, 50, 10, 10)
    context.rect(200, 200, 10, 10)
    context.fill()
}

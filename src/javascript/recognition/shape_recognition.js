class ShapeDrawer {
    constructor(ctx, _drawingDoneCallback) {
        this.ctx = ctx;
        this.currentDrawing = [];
        this.drawingDoneCallback = _drawingDoneCallback;
        this.isDrawing = false;
    }
    /* Ugly drawing */
    onDown(e) {
        if (e.button != 0)
            return;
        e.preventDefault();
        this.isDrawing = true;
        this.ctx.moveTo(e.clientX, e.clientY);
        this.draw(e);
    }
    onUp(e) {
        this.isDrawing = false;
        this.drawingDoneCallback();
    }
    clearDrawing() {
        this.currentDrawing = [];
    }
    clearCanvas(width, height) {
        this.ctx.clearRect(0, 0, width, height);
    }
    draw(e) {
        if (!this.isDrawing)
            return;
        this.ctx.lineCap = "round";
        this.ctx.lineTo(e.clientX, e.clientY);
        this.currentDrawing.push({ x: e.clientX, y: e.clientY }); // TODO: Subdivide (ceil) the shape to a certain amount
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX, e.clientY);
    }
    /* Pretty shapes */
    drawShape(shape, offset) {
        this.ctx.beginPath();
        this.ctx.moveTo(shape[0].x - offset.x, shape[0].y - offset.y);
        var i = 0;
        for (i = 1; i < shape.length; i++)
            this.ctx.lineTo(shape[i].x - offset.x, shape[i].y - offset.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}
;
function operate(array, callback) {
    $.each(array, function () {
        callback(this);
    });
}
function distance(a, b) {
    return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
}
class ShapeRecognizer {
    // Calculates the amount you need to offset each coordinate
    // of the drawing, such that the top-left-most corner is in 0,0
    calculateDrawingOffset(drawing) {
        var i = 0;
        var minx = 999999;
        var miny = 999999;
        for (i = 0; i < drawing.length; i++) {
            if (drawing[i].x < minx)
                minx = drawing[i].x;
            if (drawing[i].y < miny)
                miny = drawing[i].y;
        }
        return { x: -minx, y: -miny };
    }
    // Finds the bottom right convex shape corner of the provided shape.
    calculateBottomRightCorner(shape) {
        var i = 0;
        var maxx = 0;
        var maxy = 0;
        for (i = 0; i < shape.length; i++) {
            if (shape[i].x > maxx)
                maxx = shape[i].x;
            if (shape[i].y > maxy)
                maxy = shape[i].y;
        }
        return { x: maxx, y: maxy };
    }
    // Calculates the proportions you need to scale with in order to 
    // force the drawing into the provided scale box
    calulateDrawingScale(non_offset_drawing, scaleToBoxSize) {
        var offsetDrawing = this.offsetShape(non_offset_drawing, this.calculateDrawingOffset(non_offset_drawing));
        var drawingRightCorner = this.calculateBottomRightCorner(offsetDrawing);
        var retVal = { x: scaleToBoxSize.bottomRight.x / drawingRightCorner.x, y: scaleToBoxSize.bottomRight.y / drawingRightCorner.y };
        return retVal;
    }
    // returns a pair: {idx, dist} where index is the 
    // recognizableShape that has the smallest distance to the drawing
    recognize(recognizableShapes, drawing) {
        var i = 0;
        var shapeSimilarities = [];
        var offset = this.calculateDrawingOffset(drawing);
        for (i = 0; i < recognizableShapes.length; i++) {
            var scaleFactor = this.calulateDrawingScale(drawing, { topLeft: { x: 0, y: 0 }, bottomRight: this.calculateBottomRightCorner(recognizableShapes[i]) });
            var scaledShape = this.scaleShape(this.offsetShape(drawing, this.calculateDrawingOffset(drawing)), scaleFactor);
            var xx = this.shortestDistanceSumAvg(scaledShape, recognizableShapes[i]);
            shapeSimilarities.push({ idx: i, distance: xx });
        }
        shapeSimilarities.sort(function (a, b) {
            return a.distance - b.distance;
        });
        return shapeSimilarities[0];
    }
    // Provides the average distance to the closest points in the subject 
    // compared to the test_subject.
    shortestDistanceSumAvg(subject, test_subject) {
        if (subject.length <= 0)
            console.log("At least provide a drawing, dude.");
        var sum = 0;
        operate(subject, function (subjectVertex) {
            var smallest_distance = 999999;
            operate(test_subject, function (testVertex) {
                smallest_distance = Math.min(smallest_distance, distance(subjectVertex, testVertex));
            });
            sum += smallest_distance;
        });
        return sum / subject.length;
    }
    // Returns a scaled copy of the provided shape
    scaleShape(shape, scaleFactor) {
        var shapecpy = JSON.parse(JSON.stringify(shape));
        operate(shapecpy, (el) => {
            el.x = el.x * scaleFactor.x;
            el.y = el.y * scaleFactor.y;
        });
        return shapecpy;
    }
    // Returns an offset copy of the provided shape
    offsetShape(shape, offset) {
        var shapecpy = JSON.parse(JSON.stringify(shape));
        operate(shapecpy, (el) => {
            el.x = el.x + offset.x;
            el.y = el.y + offset.y;
        });
        return shapecpy;
    }
}

interface Point {
    x: number;
    y: number;
}
interface PointBounds {
    topLeft: Point;
    bottomRight: Point;
}

// Use this to calculate a circle
function calcCircle(segment_count, size, offset) {
    var circ: Point[] = [];
    var twopi = 2*Math.PI;
    var step = twopi / segment_count;
    var i = 0;
    // Top Right
    for(i=0; i < twopi/4; i+=step) {
        circ.push({x:Math.cos(i)*size+offset.x, y:Math.sin(i)*size+offset.y})
    }
    // Top Left
    for(i=twopi/4; i > 0; i-=step) {
        circ.push({x:-Math.cos(i)*size+offset.x, y:Math.sin(i)*size+offset.y})
    }
    // Bottom Left
    for(i=0; i < twopi/4; i+=step) {
        circ.push({x:-Math.cos(i)*size+offset.x, y:-Math.sin(i)*size+offset.y})
    }
    // Bottom Right
    for(i=twopi/4; i > 0; i-=step) {
        circ.push({x:Math.cos(i)*size+offset.x, y:-Math.sin(i)*size+offset.y})
    }
    console.log("Circle: ");
    console.log(circ);
    return circ;
}

function calcSquarre(segment_count, size) {
    var sqr: Point[] = [];
    var sideAmnt = (segment_count / 4);
    var seg = size / sideAmnt;
    var i = 0;
    // Top
    for(i=0; i < sideAmnt; i++) { 
        sqr.push({x:i*seg,y:0});
    }
    // Right
    for(i=0; i < sideAmnt; i++) { 
        sqr.push({x:size,y:i*seg});
    }
    // Bottom
    for(i=0; i < sideAmnt; i++) { 
        sqr.push({x:size-(i*seg),y:size});
    }
    // Left
    for(i=0; i < sideAmnt; i++) { 
        sqr.push({x:0,y:size-(i*seg)});
    }
    console.log("Squarre: ");
    console.log(sqr);
    return sqr;
}

// TODO: Implement this
// ____
// \  /
//  \/
//
function calcTriangle(segment_count, size) {
    var triangle: Point[] = [];
    var sideAmnt = (segment_count / 3);
    var seg = size / sideAmnt;
    var halfseg = seg/2;
    var halfsiz = size/2;
    var i = 0;
    // Top
    for(i=0; i < sideAmnt; i++) {
        triangle.push({x:i*seg,y:0});
    }
    // right
    for(i=0; i < sideAmnt; i++) {
        triangle.push({x:size-(i*halfseg),y:i*seg});
    }
    // left
    for(i=0; i < sideAmnt; i++) {
        triangle.push({x:halfsiz-(i*halfseg),y:size-(i*seg)});
    }
    console.log("Triangle: ");
    console.log(triangle);
    return triangle;
    // return [{x:0,y:0},{x:size,y:0},{x:size/2,y:size}];
}

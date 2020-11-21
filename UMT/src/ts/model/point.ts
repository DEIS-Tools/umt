
class Point {
    public x: number;
    public y: number;
    public constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}
class PointBounds {
    public topLeft: Point;
    public bottomRight: Point;
    public constructor(_topLeft: Point, _bottomRight: Point) {
        this.topLeft = _topLeft;
        this.bottomRight = _bottomRight;
    }
}

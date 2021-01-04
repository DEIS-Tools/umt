/// This is a wrapper class for switching arrow 
/// drawing libraries easier.

import LeaderLine from "leader-line-new";
// TODO: This should be done via implementation classes instead.
class Arrow {
    private start: Point;
    private end:   Point;
    private graphics: LeaderLine; // <-- API Specific

    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }
    public UpdateStart(start: Point) {
        this.start = start;
        this.UpdateGraphics();
    }
    public UpdateEnd(end: Point) {
        this.end = end;
        this.UpdateGraphics();
    }
    public Update(start: Point, end: Point) {
        this.UpdateStart(start);
        this.UpdateEnd(end);
    }
    private UpdateGraphics() {
        
    }
};

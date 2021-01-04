/// This is a wrapper class for switching arrow 
/// drawing libraries easier.

// TODO: This should be done via implementation classes instead.
class Arrow {
    private graphics: LeaderLine;

    constructor(start: HTMLElement, end: HTMLElement) {
        this.graphics = new LeaderLine(start, end); // TODO: Styling
    }
    public UpdateGraphics() {
        this.graphics.position();
    }
};

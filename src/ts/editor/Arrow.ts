/// This is a wrapper class for switching arrow 
/// drawing libraries easier.
class Arrow {
    private graphics: LeaderLine;
    private svgElem: HTMLElement | null;

    constructor(start: HTMLElement, end: HTMLElement, clickedCallback: (ev: MouseEvent) => any) {
        this.graphics = new LeaderLine(start, end, {path: "straight"}); // TODO: User styling
        this.svgElem = document.querySelector('body>.leader-line:last-of-type');
        this.svgElem?.addEventListener("click", clickedCallback);
    }

    public UpdateGraphics() {
        this.graphics.position();
    }

    public Highlight() {
        this.graphics.dash = {animation: true};
    }

    public Unhighlight() {
        this.graphics.dash = false;
    }
};

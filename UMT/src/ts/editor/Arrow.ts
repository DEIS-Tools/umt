/// This is a wrapper class for switching arrow 
/// drawing libraries easier.

// TODO: This should be done via implementation classes instead.
type yes = HTMLElement | null;
class Arrow {
    private graphics: LeaderLine;
    private svgElem: HTMLElement | null;

    constructor(start: HTMLElement, end: HTMLElement) {
        this.graphics = new LeaderLine(start, end, {path: "arc"}); // TODO: User styling
        this.svgElem = document.querySelector('body>.leader-line:last-of-type');
        if(!this.svgElem) {
            console.log("Something went wrong. Expect weird behavior");
            return;
        }
        this.svgElem.addEventListener("click", this.editGraphics.bind(this));
    }
    public UpdateGraphics() {
        this.graphics.position();
    }
    public editGraphics(e: Event) {
        console.log("You pressed an arrow!");
    }
};

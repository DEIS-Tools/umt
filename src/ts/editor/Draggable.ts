
type MoveEvent = ((e: MouseEvent) => void);

class Draggable {
    protected location: Point;
    private mouselocation: Point;
    private elmnt: HTMLElement;
    private closeEvent: () => void;
    private moveEvent: MoveEvent;
    private moveSubscribers: Map<number, MoveEvent>;
    private subcounter: number;

    constructor(elmnt: HTMLElement, startLocation: Point) {
        this.location = startLocation;
        this.mouselocation = new Point();
        this.subcounter = 0;
        this.moveSubscribers = new Map();
        this.elmnt = elmnt;
        this.elmnt.style.top = this.location.y + "px";
        this.elmnt.style.left = this.location.x + "px";
        this.closeEvent = this.CloseDragElement.bind(this);
        this.moveEvent = this.ElementDrag.bind(this);
        this.elmnt.addEventListener("mousedown", this.DragMouseDown.bind(this)); // TODO: Do this also for touch events
    }

    DragMouseDown(e: MouseEvent) {
        if(e.button != 0) return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.mouselocation = new Point(e.clientX, e.clientY);
        document.addEventListener("mouseup", this.closeEvent);
        document.addEventListener("mousemove", this.moveEvent);
    }
    
    CloseDragElement() {
        // stop moving when mouse button is released:
        document.removeEventListener("mouseup", this.closeEvent);
        document.removeEventListener("mousemove", this.moveEvent);
    }

    ElementDrag(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        let pos1 = this.mouselocation.x - e.clientX;
        let pos2 = this.mouselocation.y - e.clientY;
        this.mouselocation = new Point(e.clientX, e.clientY);
        // set the element's new position:
        this.elmnt.style.top =  (this.elmnt.offsetTop - pos2) + "px";
        this.elmnt.style.left = (this.elmnt.offsetLeft - pos1) + "px";
        this.location.x = this.elmnt.offsetLeft;
        this.location.y = this.elmnt.offsetTop;
        this.moveSubscribers.forEach(subscriber => { subscriber(e); });
    }

    public SubscribeDragEvent(event: (e: MouseEvent) => void): number {
        this.moveSubscribers.set(this.subcounter++, event);
        return this.subcounter;
    }

    public UnsubscribeDragEvent(num: number) {
        this.moveSubscribers.delete(num);
    }

    public GetLocation(): Point {
        return this.location;
    }

    public GetHTMLElement(): HTMLElement {
        return this.elmnt;
    }
};

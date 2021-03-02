"use strict";
class Draggable {
    constructor(elmnt, startLocation) {
        this.location = startLocation;
        this.mouselocation = new Point(0, 0);
        this.elmnt = elmnt;
        this.subcounter = 0;
        this.moveSubscribers = new Map();
        this.closeEvent = this.closeDragElement.bind(this);
        this.moveEvent = this.elementDrag.bind(this);
        this.elmnt.addEventListener("mousedown", this.dragMouseDown.bind(this)); // TODO: Do this also for touch events
    }
    dragMouseDown(e) {
        if (e.button != 0)
            return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.mouselocation = new Point(e.clientX, e.clientY);
        document.addEventListener("mouseup", this.closeEvent);
        document.addEventListener("mousemove", this.moveEvent);
    }
    closeDragElement() {
        // stop moving when mouse button is released:
        document.removeEventListener("mouseup", this.closeEvent);
        document.removeEventListener("mousemove", this.moveEvent);
    }
    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        let pos1 = this.mouselocation.x - e.clientX;
        let pos2 = this.mouselocation.y - e.clientY;
        this.mouselocation = new Point(e.clientX, e.clientY);
        // set the element's new position:
        this.elmnt.style.top = (this.elmnt.offsetTop - pos2) + "px";
        this.elmnt.style.left = (this.elmnt.offsetLeft - pos1) + "px";
        this.location.x = this.elmnt.offsetLeft;
        this.location.y = this.elmnt.offsetTop;
        this.moveSubscribers.forEach(subscriber => { subscriber(e); });
    }
    subscribeDragEvent(event) {
        this.moveSubscribers.set(this.subcounter++, event);
        return this.subcounter;
    }
    unsubscribeDragEvent(num) {
        this.moveSubscribers.delete(num);
    }
    getLocation() {
        return this.location;
    }
    getHTMLElement() {
        return this.elmnt;
    }
}
;
//# sourceMappingURL=Draggable.js.map
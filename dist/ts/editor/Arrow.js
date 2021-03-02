"use strict";
/// This is a wrapper class for switching arrow 
/// drawing libraries easier.
// TODO: This should be done via implementation classes instead.
class Arrow {
    constructor(start, end, clickedCallback) {
        var _a;
        this.graphics = new LeaderLine(start, end, { path: "straight" }); // TODO: User styling
        this.svgElem = document.querySelector('body>.leader-line:last-of-type');
        (_a = this.svgElem) === null || _a === void 0 ? void 0 : _a.addEventListener("click", clickedCallback);
    }
    UpdateGraphics() {
        this.graphics.position();
    }
}
;
//# sourceMappingURL=Arrow.js.map
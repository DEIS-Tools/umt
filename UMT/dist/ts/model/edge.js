"use strict";
// A logical connector between verteces.
class Edge {
    constructor(start, end, type) {
        this.start = start;
        this.end = end;
        this.type = type ? type : 0;
        this.line = null;
    }
    create() {
        this.line = new Arrow(this.start.getHTMLElement(), this.end.getHTMLElement(), this.focus.bind(this));
    }
    updateArrowGraphics(e) {
        var _a;
        (_a = this.line) === null || _a === void 0 ? void 0 : _a.UpdateGraphics();
    }
    focus(e) {
        console.debug("You clicked me!" + this.type);
    }
}
//# sourceMappingURL=edge.js.map
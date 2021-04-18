// A logical connector between verteces.
class Edge extends Selectable {
    constructor(start, end, type) {
        super();
        this.start = start;
        this.end = end;
        this.type = type ? type : 0;
        this.line = null;
    }
    
    Create() {
        this.line = new Arrow(this.start.GetHTMLElement(), this.end.GetHTMLElement(), this.Focus.bind(this));
    }

    UpdateArrowGraphics(e) {
        var _a;
        (_a = this.line) === null || _a === void 0 ? void 0 : _a.UpdateGraphics();
    }

    Focus(e) {
        editor.SelectElement(this);
    }

    OnSelect() {
        var _a;
        (_a = this.line) === null || _a === void 0 ? void 0 : _a.Highlight();
    }

    OnUnselect() {
        var _a;
        (_a = this.line) === null || _a === void 0 ? void 0 : _a.Unhighlight();
    }

    OnRemove() {
        // Nothing to do. Edges are pretty simple
    }
}

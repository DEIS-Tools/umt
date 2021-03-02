"use strict";
// Verteces are locations (TA), places (P/N) and transitions (P/N).
// They are essentially everything that can be connected via an edge
class Vertex extends Connectable {
    constructor(startlocation, elmnt, type) {
        super(startlocation, elmnt);
        this.type = type ? type : 0;
    }
    getType() {
        return this.type;
    }
}
//# sourceMappingURL=vertex.js.map
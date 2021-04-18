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

    OnRemove() {
        this.outgoingEdges.forEach((edge) => { this.RemoveEdge(edge[0]); });
        this.ingoingEdges.forEach((edge) => { this.RemoveEdge(edge[0]); });
    }
}

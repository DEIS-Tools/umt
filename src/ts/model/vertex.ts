// Verteces are locations (TA), places (P/N) and transitions (P/N).
// They are essentially everything that can be connected via an edge
class Vertex extends Connectable {
	private type: 			number; // TODO: Decide if this is a good approach

	public constructor(startlocation: Point, elmnt: HTMLElement, type?: number) {
		super(startlocation, elmnt);
		this.type = type ? type : 0;
	}

	public getType(): number {
		return this.type;
	}

	public OnRemove() {
		this.outgoingEdges.forEach((edge: [Edge, number]) => {this.RemoveEdge(edge[0]);});
		this.ingoingEdges .forEach((edge: [Edge, number]) => {this.RemoveEdge(edge[0]);});
	}
}

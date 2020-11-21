// Verteces are locations (TA), places (P/N), transitions (P/N).
// They are essentially everything that can be connected via an edge
class Vertex extends Draggable {
	private outgoingEdges: 	Edge[];
	private type: 			number; // TODO: Decide if this is a good approach

	public constructor(startlocation: Point, elmnt: HTMLElement, type?: number) {
		super(elmnt, startlocation);
		this.outgoingEdges = [];
		this.type = type ? type : 0;
	}
	public addEdge(edge: Edge) {
		this.outgoingEdges.push(edge);
	}
	public removeEdge(edge: Edge) {
		const index = this.outgoingEdges.indexOf(edge, 0);
		if (index > -1)
		   this.outgoingEdges.splice(index, 1);
		else
			console.log("Tried to remove an outgoing edge from vertex, that didn't have it in the outgoingEdges list.");
	}
	public getLocation(): Point {
		return this.location;
	}
}

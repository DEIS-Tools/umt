// Verteces are locations (TA), places (P/N), transitions (P/N).
// They are essentially everything that can be connected via an edge
class Vertex {
	location: 		Point;
	outgoingEdges: 	Edge[];
	type: 			number;

	constructor(startlocation: Point, type?: number) {
		this.location = startlocation;
		this.outgoingEdges = [];
		this.type = type ? type : 0;
	}
	addEdge(edge: Edge) {
		this.outgoingEdges.push(edge);
	}
	removeEdge(edge: Edge) {
		const index = this.outgoingEdges.indexOf(edge, 0);
		if (index > -1)
		   this.outgoingEdges.splice(index, 1);
		else
			console.log("Tried to remove an outgoing edge from vertex, that didn't have it in the outgoingEdges list.");
	}
}


// A logical connector between verteces.
class Edge {
	start: Vertex;
	end:   Vertex;
	type:  number;

	constructor(startVertex: Vertex, endVertex: Vertex, type?: number) {
		this.start = startVertex;
		this.end   = endVertex;
		this.type  = type ? type : 0;
		startVertex.AddEdge(this);
	}
}

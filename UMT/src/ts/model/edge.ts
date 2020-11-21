
// A logical connector between verteces.
class Edge {
	public start: Vertex;
	public end:   Vertex;
	public type:  number;

	public constructor(startVertex: Vertex, endVertex: Vertex, type?: number) {
		this.start = startVertex;
		this.end   = endVertex;
		this.type  = type ? type : 0;
		startVertex.addEdge(this);
	}
}

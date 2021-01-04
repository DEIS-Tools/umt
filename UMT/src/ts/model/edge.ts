
// A logical connector between verteces.
class Edge {
	public start: Connectable;
	public end:   Connectable;
	public type:  number;

	public constructor(start: Connectable, end: Connectable, type?: number) {
		this.start = start;
		this.end   = end;
		this.type  = type ? type : 0;
	}
}

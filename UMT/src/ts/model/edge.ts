// A logical connector between verteces.
class Edge {
	public start: Connectable;
	public end:   Connectable;
	public type:  number;
	public line:  Arrow | null;

	public constructor(start: Connectable, end: Connectable, type?: number) {
		this.start = start;
		this.end   = end;
		this.type  = type ? type : 0;
		this.line  = null;
	}

	public Create() {
		this.line  = new Arrow(this.start.getHTMLElement(), this.end.getHTMLElement());
	}

	public updateArrowGraphics(e: MouseEvent) {
		this.line?.UpdateGraphics();
	}
}

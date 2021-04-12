// A logical connector between verteces.
class Edge extends Selectable {
	public start: Connectable;
	public end:   Connectable;
	public type:  number;
	public line:  Arrow | null;

	public constructor(start: Connectable, end: Connectable, type?: number) {
		super();
		this.start = start;
		this.end   = end;
		this.type  = type ? type : 0;
		this.line  = null;
	}

	public Create() {
		this.line  = new Arrow(this.start.GetHTMLElement(), this.end.GetHTMLElement(), this.Focus.bind(this));
	}

	public UpdateArrowGraphics(e: MouseEvent) {
		this.line?.UpdateGraphics();
	}

	public Focus(e: MouseEvent) {
		editor.SelectElement(this);
    }

	public OnSelect(): void {
		this.line?.Highlight();
	}

	public OnUnselect(): void {
		this.line?.Unhighlight();
	}

	public OnRemove() {
		// Nothing to do. Edges are pretty simple
	}
	
}

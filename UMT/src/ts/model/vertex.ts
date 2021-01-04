// Verteces are locations (TA), places (P/N) and transitions (P/N).
// They are essentially everything that can be connected via an edge
class Vertex extends Connectable {
	private type: 			number; // TODO: Decide if this is a good approach

	public constructor(startlocation: Point, elmnt: HTMLElement, type?: number) {
		super(startlocation, elmnt);
		this.type = type ? type : 0;
	}
}

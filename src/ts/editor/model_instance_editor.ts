// More or less the entire User Interfacing class.
class ModelInstanceEditor {
	private static modelInstance: ModelInstance;
	private static keymapping: Map<string, VoidFunction>;
	private vertCounter: number;
	private selectedElements: Selectable[];

	constructor() {
		ModelInstanceEditor.modelInstance = new ModelInstance();
		this.BindKeymapping();
		this.vertCounter = 0;
		this.selectedElements = [];
	}
  
	public AddVertex(type: number) {
    	let locLayer = document.getElementById("locationLayer");
		let newvert = document.createElement("div");
		newvert.className = "vertex"+type;
		newvert.textContent = "V"+this.vertCounter++; // TODO: This vertcounter is not necessarily a good solution
		locLayer?.append(newvert);
		ModelInstanceEditor.modelInstance.AddVertex(new Vertex(new Point(300, 300), newvert, type));
	}

	public AddEdge(edge: Edge): Edge | null {
		return ModelInstanceEditor.modelInstance.AddEdge(edge);
	}

	public RemoveVertex(vert: Vertex) {
		console.error("RemoveVertex is not implemented yet");
	}

	public RemoveEdge(edge: Edge) {
		console.error("RemoveEdge is not implemented yet");
	}

	public RemoveSelection() {
		console.error("RemoveSelection is not implemented yet");
	}

	public UnSelectSelectedElements() {
		this.selectedElements.forEach((element: Selectable) => { element.OnUnselect(); });
		this.selectedElements = [];
	}

	public SelectElement(elemnt: Selectable) {
		// TODO: Selection of multiple elements
		this.UnSelectSelectedElements();
		elemnt.OnSelect();
		this.selectedElements.push(elemnt);
	}

	public PrintModel() {
		ModelInstanceEditor.modelInstance.verteces.forEach(vertex => {
			console.log(`${vertex.GetLocation().x}, ${vertex.GetLocation().y}`);
		});
	}

	public BindKeymapping() {
		// TODO: This should be overridable
        ModelInstanceEditor.keymapping = new Map();
        ModelInstanceEditor.keymapping.set("Delete", 	this.RemoveSelection.bind(this));
        ModelInstanceEditor.keymapping.set("v", 		this.AddVertex.bind(this, 0));
		ModelInstanceEditor.keymapping.set("V", 		this.AddVertex.bind(this, 1));
		document.addEventListener("keydown", ModelInstanceEditor.OnKeyDown);
    }

    public static OnKeyDown(event: KeyboardEvent) {
        ModelInstanceEditor.keymapping.get(event.key)?.();
    }
}

const editor = new ModelInstanceEditor();

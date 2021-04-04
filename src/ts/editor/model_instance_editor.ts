// More or less the entire User Interfacing class.
class ModelInstanceEditor {
	private static modelInstance: ModelInstance;
	private static keydownmapping: Map<string, VoidFunction>;
	private static keyupmapping: Map<string, VoidFunction>;
	private vertCounter: number;
	private selectedElements: Selectable[];
	private controlIsDown: boolean;

	constructor() {
		ModelInstanceEditor.modelInstance = new ModelInstance();
		this.BindKeymapping();
		this.vertCounter = 0;
		this.selectedElements = [];
		this.controlIsDown = false;
	}
  
	public AddVertex(type: number) {
    	let locLayer = document.getElementById("locationLayer");
		let newvert = document.createElement("div");
		newvert.className = "vertex"+" vertex"+type;
		newvert.textContent = "V"+this.vertCounter++; // TODO: This vertcounter is not necessarily a good solution
		locLayer?.append(newvert);
		ModelInstanceEditor.modelInstance.AddVertex(new Vertex(new Point(300, 300), newvert, type));
	}

	public AddEdge(edge: Edge): Edge | null {
		return ModelInstanceEditor.modelInstance.AddEdge(edge);
	}

	public RemoveVertex(vert: Vertex) {
		ModelInstanceEditor.modelInstance.RemoveVertex(vert);
	}

	public RemoveEdge(edge: Edge) {
		ModelInstanceEditor.modelInstance.RemoveEdge(edge);
	}

	public RemoveSelection() {
		this.selectedElements.forEach((element: Selectable) => { element.OnUnselect(); });
		this.selectedElements.forEach((element: Selectable) => {
			if(element instanceof Vertex)
				this.RemoveVertex(element);
			else if(element instanceof Edge) // TODO: We should remove selected edges first
				this.RemoveEdge(element);
			else
				console.error("Unable to remove selectable element that is neither an Edge or Vertex");
		});
		this.selectedElements = [];
	}

	public UnSelectSelectedElements() {
		this.selectedElements.forEach((element: Selectable) => { element.OnUnselect(); });
		this.selectedElements = [];
	}

	public SelectElement(elemnt: Selectable) {
		// TODO: Selection of multiple elements (ergonimic box select)
		if(!this.controlIsDown)
			this.UnSelectSelectedElements();
		elemnt.OnSelect();
		this.selectedElements.push(elemnt);
	}

	public PrintModel() {
		ModelInstanceEditor.modelInstance.vertices.forEach(vertex => {
			console.log(`${vertex.GetLocation().x}, ${vertex.GetLocation().y}`);
		});
	}

	public BindKeymapping() {
		// TODO: This should be overridable
        ModelInstanceEditor.keydownmapping = new Map();
        ModelInstanceEditor.keydownmapping.set("v", 		this.AddVertex.bind(this, 0));
		ModelInstanceEditor.keydownmapping.set("V", 		this.AddVertex.bind(this, 1));
		ModelInstanceEditor.keydownmapping.set("Control", 	() => { this.controlIsDown = true; });
		document.addEventListener("keydown", ModelInstanceEditor.OnKeyDown);

		ModelInstanceEditor.keyupmapping = new Map();
		ModelInstanceEditor.keyupmapping.set("Delete", 		this.RemoveSelection.bind(this));
		ModelInstanceEditor.keyupmapping.set("Control", 	() => { this.controlIsDown = false; });
		document.addEventListener("keyup", ModelInstanceEditor.OnKeyUp);
    }

    public static OnKeyDown(event: KeyboardEvent) {
        ModelInstanceEditor.keydownmapping.get(event.key)?.();
    }

	public static OnKeyUp(event: KeyboardEvent) {
        ModelInstanceEditor.keyupmapping.get(event.key)?.();
	}
}

const editor = new ModelInstanceEditor();

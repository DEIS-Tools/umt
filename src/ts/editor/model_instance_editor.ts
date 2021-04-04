// More or less the entire User Interfacing class.
class ModelInstanceEditor {
	private static modelInstance: ModelInstance;
	private static keymapping: Map<string, VoidFunction>;
	private vertCounter: number;

	constructor() {
		ModelInstanceEditor.modelInstance = new ModelInstance();
		this.BindKeymapping();
		this.vertCounter = 0;
	}
  
	public AddSimpleVertex() {
		this.AddVertex(0);
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

	public RemoveSelectedElement() {
		console.error("RemoveSelectedElement");
	}

	public PrintModel() {
		ModelInstanceEditor.modelInstance.verteces.forEach(vertex => {
			console.log(`${vertex.GetLocation().x}, ${vertex.GetLocation().y}`);
		});
	}

	public BindKeymapping() {
        ModelInstanceEditor.keymapping = new Map();
        ModelInstanceEditor.keymapping.set("Delete", 	this.RemoveSelectedElement.bind(this));
        ModelInstanceEditor.keymapping.set("a", 		this.AddSimpleVertex.bind(this));
		document.addEventListener("keydown", ModelInstanceEditor.OnKeyDown);
    }

    public static OnKeyDown(event: KeyboardEvent) {
        ModelInstanceEditor.keymapping.get(event.key)?.();
    }
}

const editor = new ModelInstanceEditor();

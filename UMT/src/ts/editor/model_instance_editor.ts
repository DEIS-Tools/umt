// More or less the entire User Interfacing class.
class ModelInstanceEditor {
	private static modelInstance: ModelInstance;

	constructor() {
		ModelInstanceEditor.modelInstance = new ModelInstance();
	}
  
	public addVertex(type: number) {
    let locLayer = document.getElementById("locationLayer");
		let newvert = document.createElement("div");
		newvert.className = "vertex"+type;
		newvert.textContent = "V"+type;
		locLayer?.append(newvert);
		ModelInstanceEditor.modelInstance.addVertex(new Vertex(new Point(), newvert, type));
	}

	public addEdge(edge: Edge): Edge | null {
		return ModelInstanceEditor.modelInstance.addEdge(edge);
	}
	
	public printModel() {
		ModelInstanceEditor.modelInstance.verteces.forEach(vertex => {
			console.log(`${vertex.getLocation().x}, ${vertex.getLocation().y}`);
		});
	}
}

const editor = new ModelInstanceEditor();

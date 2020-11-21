
// More or less the entire User Interfacing class.
class ModelInstanceEditor {
	private modelInstance: ModelInstance;

	constructor() {
		this.modelInstance = new ModelInstance();
	}

	/**
	 * addVertex
	 
	 */
	public addVertex() {
		console.log("Adding Vertex!");
		let newvert = document.createElement("div");
		newvert.className = "vertex";
		newvert.textContent = "L0";
		document.body.append(newvert);
		this.modelInstance.addVertex(new Vertex(new Point(0,0), newvert));
	}

	/**
	 * printModel
	 
	 */
	public printModel() {
		this.modelInstance.verteces.forEach(vertex => {
			console.log(`${vertex.getLocation().x}, ${vertex.getLocation().y}`);
		});
	}
}

const editor = new ModelInstanceEditor();


// Those edges that are allowed to be freely floating around
class ModelInstance {
	public verteces: Vertex[];
	private freeFloatingEdges: Edge[]; 
	// TODO: formationRules: InstanceFormationRules;

	public constructor() {
		this.verteces = [];
		this.freeFloatingEdges = []; 
	}
	
	public addVertex(vertex: Vertex) {
		/* TODO: invoke formation rules */
		this.verteces.push(vertex);
	}
}
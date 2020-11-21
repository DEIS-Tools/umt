
// Those edges that are allowed to be freely floating around
class ModelInstance {
	verteces: Vertex[];
	freeFloatingEdges: Edge[]; 
	// TODO: formationRules: InstanceFormationRules;

	constructor() {
		this.verteces = [];
		this.freeFloatingEdges = []; 
	}
	// TODO: addVertex(v: Vertex) { /* invoke formation rules */ }
}
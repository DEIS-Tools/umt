
// Those edges that are allowed to be freely floating around
class ModelInstance {
	public verteces: Vertex[];
	private freeFloatingEdges: Edge[]; 
	private formationRules: InstanceFormationRuleset;

	public constructor() {
		this.verteces = [];
		this.freeFloatingEdges = []; 
		this.formationRules = new DefaultFormationRuleset();
	}
	
	public AddVertex(vertex: Vertex) {
		/* TODO: invoke formation rules */
		var newvert = this.formationRules.OnVertexCreation(vertex);
		if(newvert)
			this.verteces.push(newvert);
	}

	public AddEdge(edge: Edge): Edge | null {
		return this.formationRules.OnEdgeCreation(edge);
	}
}

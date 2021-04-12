
// Those edges that are allowed to be freely floating around
class ModelInstance {
	public vertices: Vertex[];
	private freeFloatingEdges: Edge[]; 
	private formationRules: InstanceFormationRuleset;

	public constructor() {
		this.vertices = [];
		this.freeFloatingEdges = []; 
		this.formationRules = new DefaultFormationRuleset();
	}
	
	public AddVertex(vertex: Vertex) {
		/* TODO: invoke formation rules */
		var newvert = this.formationRules.OnVertexCreation(vertex);
		if(newvert)
			this.vertices.push(newvert);
	}

	public AddEdge(edge: Edge): Edge | null {
		return this.formationRules.OnEdgeCreation(edge);
	}

	public RemoveVertex(vertex: Vertex) {
		var vertexIndex = this.vertices.indexOf(vertex);
		if(vertexIndex <= -1) {
			console.error("Unable to remove vertex");
			return;
		}
		this.vertices[vertexIndex].OnRemove();
		this.vertices.splice(vertexIndex, 1);
	}

	public RemoveEdge(edge: Edge) {
		edge.start.RemoveEdge(edge);
		edge.end.RemoveEdge(edge);
	}
}

// Those edges that are allowed to be freely floating around
class ModelInstance {
    constructor() {
        this.vertices = [];
        this.freeFloatingEdges = [];
        this.formationRules = new DefaultFormationRuleset();
    }
    AddVertex(vertex) {
        /* TODO: invoke formation rules */
        var newvert = this.formationRules.OnVertexCreation(vertex);
        if (newvert)
            this.vertices.push(newvert);
    }
    AddEdge(edge) {
        return this.formationRules.OnEdgeCreation(edge);
    }
    RemoveVertex(vertex) {
        var vertexIndex = this.vertices.indexOf(vertex);
        if (vertexIndex <= -1) {
            console.error("Unable to remove vertex");
            return;
        }
        this.vertices[vertexIndex].OnRemove();
        this.vertices.splice(vertexIndex, 1);
    }
    RemoveEdge(edge) {
        edge.start.RemoveEdge(edge);
        edge.end.RemoveEdge(edge);
    }
}

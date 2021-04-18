class DefaultFormationRuleset extends InstanceFormationRuleset {
    OnVertexCreation(vertex) {
        return vertex;
    }
    OnEdgeCreation(edge) {
        return edge;
    }
}
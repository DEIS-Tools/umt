class DefaultFormationRuleset extends InstanceFormationRuleset {
    OnVertexCreation(vertex) {
        return vertex;
    }
    
    OnEdgeCreation(edge) {
        return edge;
    }
    
    OnVertexDeletion(vertex) {
        return true;
    }

    OnEdgeDeletion(edge) {
        return true;
    }
}

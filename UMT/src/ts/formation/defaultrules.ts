class DefaultFormationRuleset extends InstanceFormationRuleset {
    public OnVertexCreation(vertex: Vertex): Vertex {
        return vertex;
    }

    public OnEdgeCreation(edge: Edge): Edge | null {
        return edge;
    }
};

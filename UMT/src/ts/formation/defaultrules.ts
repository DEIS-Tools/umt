
class DefaultFormationRuleset extends InstanceFormationRuleset {
    public OnVertexCreation(vertex: Vertex): Vertex {
        return vertex;
    }

    public OnEdgeCreation(edge: Edge): Edge | null {
        if((edge.start as Vertex).getType() == 0) {
            if((edge.end as Vertex).getType() == 1)
                return edge;
            return null;
        }
        if((edge.end as Vertex).getType() == 0)
            return edge;
        return null;
    }

};

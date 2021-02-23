

abstract class InstanceFormationRuleset {
    public abstract OnVertexCreation(vertex: Vertex): Vertex | null;
    public abstract OnEdgeCreation(edge: Edge): Edge | null;
};

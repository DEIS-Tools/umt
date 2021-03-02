"use strict";
// Those edges that are allowed to be freely floating around
class ModelInstance {
    constructor() {
        this.verteces = [];
        this.freeFloatingEdges = [];
        this.formationRules = new DefaultFormationRuleset();
    }
    addVertex(vertex) {
        /* TODO: invoke formation rules */
        var newvert = this.formationRules.OnVertexCreation(vertex);
        if (newvert)
            this.verteces.push(newvert);
    }
    addEdge(edge) {
        return this.formationRules.OnEdgeCreation(edge);
    }
}
//# sourceMappingURL=instance.js.map
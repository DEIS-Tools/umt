"use strict";
// More or less the entire User Interfacing class.
class ModelInstanceEditor {
    constructor() {
        ModelInstanceEditor.modelInstance = new ModelInstance();
    }
    addVertex(type) {
        let locLayer = document.getElementById("locationLayer");
        let newvert = document.createElement("div");
        newvert.className = "vertex" + type;
        newvert.textContent = "V" + type;
        locLayer === null || locLayer === void 0 ? void 0 : locLayer.append(newvert);
        ModelInstanceEditor.modelInstance.addVertex(new Vertex(new Point(), newvert, type));
    }
    addEdge(edge) {
        return ModelInstanceEditor.modelInstance.addEdge(edge);
    }
    printModel() {
        ModelInstanceEditor.modelInstance.verteces.forEach(vertex => {
            console.log(`${vertex.getLocation().x}, ${vertex.getLocation().y}`);
        });
    }
}
const editor = new ModelInstanceEditor();
//# sourceMappingURL=model_instance_editor.js.map
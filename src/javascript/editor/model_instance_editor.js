// More or less the entire User Interfacing class.
class ModelInstanceEditor {
    constructor() {
        ModelInstanceEditor.modelInstance = new ModelInstance();
        this.BindKeymapping();
        this.vertCounter = 0;
        this.selectedElements = [];
        this.controlIsDown = false;
    }
    AddVertex(type) {
        let locLayer = document.getElementById("locationLayer");
        let newvert = document.createElement("div");
        newvert.className = "vertex" + " vertex" + type;
        newvert.textContent = "V" + this.vertCounter++; // TODO: This vertcounter is not necessarily a good solution
        locLayer === null || locLayer === void 0 ? void 0 : locLayer.append(newvert);
        ModelInstanceEditor.modelInstance.AddVertex(new Vertex(new Point(300, 300), newvert, type));
    }
    AddEdge(edge) {
        return ModelInstanceEditor.modelInstance.AddEdge(edge);
    }
    RemoveVertex(vert) {
        ModelInstanceEditor.modelInstance.RemoveVertex(vert);
    }
    RemoveEdge(edge) {
        ModelInstanceEditor.modelInstance.RemoveEdge(edge);
    }
    RemoveSelection() {
        this.selectedElements.forEach((element) => { element.OnUnselect(); });
        this.selectedElements.forEach((element) => {
            if (element instanceof Vertex)
                this.RemoveVertex(element);
            else if (element instanceof Edge) // TODO: We should remove selected edges first
                this.RemoveEdge(element);
            else
                console.error("Unable to remove selectable element that is neither an Edge or Vertex");
        });
        this.selectedElements = [];
    }
    UnSelectSelectedElements() {
        this.selectedElements.forEach((element) => { element.OnUnselect(); });
        this.selectedElements = [];
    }
    SelectElement(elemnt) {
        // TODO: Selection of multiple elements (ergonimic box select)
        if (!this.controlIsDown)
            this.UnSelectSelectedElements();
        elemnt.OnSelect();
        this.selectedElements.push(elemnt);
    }
    PrintModel() {
        ModelInstanceEditor.modelInstance.vertices.forEach(vertex => {
            console.log(`${vertex.GetLocation().x}, ${vertex.GetLocation().y}`);
        });
    }
    BindKeymapping() {
        // TODO: This should be overridable
        ModelInstanceEditor.keydownmapping = new Map();
        ModelInstanceEditor.keydownmapping.set("v", this.AddVertex.bind(this, 0));
        ModelInstanceEditor.keydownmapping.set("V", this.AddVertex.bind(this, 1));
        ModelInstanceEditor.keydownmapping.set("Control", () => { this.controlIsDown = true; });
        document.addEventListener("keydown", ModelInstanceEditor.OnKeyDown);
        ModelInstanceEditor.keyupmapping = new Map();
        ModelInstanceEditor.keyupmapping.set("Delete", this.RemoveSelection.bind(this));
        ModelInstanceEditor.keyupmapping.set("Control", () => { this.controlIsDown = false; });
        document.addEventListener("keyup", ModelInstanceEditor.OnKeyUp);
    }
    static OnKeyDown(event) {
        var _a;
        (_a = ModelInstanceEditor.keydownmapping.get(event.key)) === null || _a === void 0 ? void 0 : _a();
    }
    static OnKeyUp(event) {
        var _a;
        (_a = ModelInstanceEditor.keyupmapping.get(event.key)) === null || _a === void 0 ? void 0 : _a();
    }
}
const editor = new ModelInstanceEditor();

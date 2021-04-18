class Connectable extends Draggable {
    constructor(startlocation, elmnt) {
        super(elmnt, startlocation);
        this.isConnecting = false;
        this.outgoingEdges = [];
        this.ingoingEdges = [];
        elmnt.addEventListener("oncontextmenu", () => { return false; });
        elmnt.addEventListener("mouseup", this.EndConnection.bind(this));
        ; // TODO: Do this also for stylus drag events
        elmnt.addEventListener("mousedown", this.StartConnection.bind(this)); // TODO: Do this also for stylus drag events
    }
    AddNewEdge(to) {
        this.AddEdge(new Edge(this, to));
    }
    AddEdge(edge) {
        var newedge = editor.AddEdge(edge);
        if (!newedge)
            return;
        newedge.Create();
        var startval = this.SubscribeDragEvent(edge.UpdateArrowGraphics.bind(edge));
        var endval = edge.end.SubscribeDragEvent(edge.UpdateArrowGraphics.bind(edge));
        this.outgoingEdges.push([edge, startval]);
        edge.end.ingoingEdges.push([edge, endval]);
    }
    RemoveEdge(edge) {
        const outIndex = this.FindEdge(edge, this.outgoingEdges);
        const inIndex = this.FindEdge(edge, this.ingoingEdges);
        if (outIndex[0] > -1) {
            this.UnsubscribeDragEvent(outIndex[1]);
            this.outgoingEdges.splice(outIndex[0], 1);
        }
        if (inIndex[0] > -1) {
            this.UnsubscribeDragEvent(inIndex[1]);
            this.ingoingEdges.splice(inIndex[0], 1);
        }
        if (inIndex[0] <= -1 && outIndex[0] <= -1)
            console.error("Unable to remove edge from connectable");
    }
    FindEdge(edge, collection) {
        var el = collection.find((val) => { val[0] == edge; });
        console.log(el ? "Element!" : "NoElement!");
        return el ? [collection.indexOf(el, 0), el[1]] : [-1, 0];
    }
    StartConnection(e) {
        if (e.button != 2) // TODO: This should be configurable
            return;
        this.isConnecting = true;
        Connectable.inProgressConnection = this;
    }
    static Connect(start, end) {
        start.AddNewEdge(end);
    }
    EndConnection(e) {
        if (e.button != 2) // TODO: This should be configurable
            return;
        if (this.isConnecting) {
            this.isConnecting = false;
            return; // We just clicked on ourselves
        }
        if (Connectable.inProgressConnection) {
            Connectable.Connect(Connectable.inProgressConnection, this);
            Connectable.inProgressConnection.isConnecting = false;
        }
    }
}
"use strict";
class Connectable extends Draggable {
    constructor(startlocation, elmnt) {
        super(elmnt, startlocation);
        this.isConnecting = false;
        this.outgoingEdges = [];
        elmnt.addEventListener("oncontextmenu", () => { return false; });
        elmnt.addEventListener("mouseup", this.EndConnection.bind(this));
        ; // TODO: Do this also for stylus drag events
        elmnt.addEventListener("mousedown", this.StartConnection.bind(this)); // TODO: Do this also for stylus drag events
    }
    addNewEdge(to) {
        this.addEdge(new Edge(this, to));
    }
    addEdge(edge) {
        var newedge = editor.addEdge(edge);
        if (!newedge)
            return;
        newedge.create();
        this.outgoingEdges.push(edge);
        this.subscribeDragEvent(edge.updateArrowGraphics.bind(edge));
        edge.end.subscribeDragEvent(edge.updateArrowGraphics.bind(edge));
    }
    removeEdge(edge) {
        const index = this.outgoingEdges.indexOf(edge, 0);
        if (index > -1)
            this.outgoingEdges.splice(index, 1);
        else
            console.log("Tried to remove an outgoing edge from vertex, that didn't have it in the outgoingEdges list.");
    }
    StartConnection(e) {
        if (e.button != 2)
            return;
        this.isConnecting = true;
        Connectable.inProgressConnection = this;
    }
    static Connect(start, end) {
        start.addNewEdge(end);
    }
    EndConnection(e) {
        if (e.button != 2)
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
;
//# sourceMappingURL=Connectable.js.map

class Connectable extends Draggable {
    private outgoingEdges: 	Edge[];
    public isConnecting: boolean;
    static inProgressConnection?: Connectable;

    constructor(startlocation: Point, elmnt: HTMLElement) {
        super(elmnt, startlocation);
        this.isConnecting = false;
        this.outgoingEdges = [];
        elmnt.addEventListener("oncontextmenu", () => {return false;});
        elmnt.addEventListener("mouseup", this.EndConnection.bind(this));; // TODO: Do this also for stylus drag events
        elmnt.addEventListener("mousedown", this.StartConnection.bind(this)); // TODO: Do this also for stylus drag events
    }

    public addNewEdge(to: Connectable) {
        this.addEdge(new Edge(this, to));
    }

    public addEdge(edge: Edge) {
        var newedge = editor.addEdge(edge);
        if(!newedge)
            return;
        newedge.create();
        this.outgoingEdges.push(edge);
        this.subscribeDragEvent(edge.updateArrowGraphics.bind(edge));
        edge.end.subscribeDragEvent(edge.updateArrowGraphics.bind(edge));
	}

    public removeEdge(edge: Edge) {
        const index = this.outgoingEdges.indexOf(edge, 0);
		if (index > -1)
		   this.outgoingEdges.splice(index, 1);
		else
			console.log("Tried to remove an outgoing edge from vertex, that didn't have it in the outgoingEdges list.");
	}
    
    public StartConnection(e: MouseEvent) {
        if(e.button != 2)
            return;
        this.isConnecting = true;
        Connectable.inProgressConnection = this;
    }
    
    public static Connect(start: Connectable, end: Connectable) {
        start.addNewEdge(end);
    }

    public EndConnection(e: MouseEvent) {
        if(e.button != 2) 
            return;
        if(this.isConnecting) {
            this.isConnecting = false;
            return; // We just clicked on ourselves
        }
        if(Connectable.inProgressConnection) {
            Connectable.Connect(Connectable.inProgressConnection, this);
            Connectable.inProgressConnection.isConnecting = false;
        }
    }
};

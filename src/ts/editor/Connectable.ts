
class Connectable extends Draggable {
    private outgoingEdges: 	Edge[];
    private ingoingEdges: Edge[];
    public isConnecting: boolean;
    // This means that we can only connect one Connectable at a time.
    static inProgressConnection?: Connectable;

    constructor(startlocation: Point, elmnt: HTMLElement) {
        super(elmnt, startlocation);
        this.isConnecting = false;
        this.outgoingEdges = [];
        this.ingoingEdges = [];
        elmnt.addEventListener("oncontextmenu", () => {return false;});
        elmnt.addEventListener("mouseup", this.EndConnection.bind(this));; // TODO: Do this also for stylus drag events
        elmnt.addEventListener("mousedown", this.StartConnection.bind(this)); // TODO: Do this also for stylus drag events
    }
    
    public AddNewEdge(to: Connectable) {
        this.AddEdge(new Edge(this, to));
    }

    public AddEdge(edge: Edge) {
        var newedge = editor.AddEdge(edge);
        if(!newedge)
            return;
        newedge.Create();
        this.outgoingEdges.push(edge);
        edge.end.ingoingEdges.push(edge);
        this.SubscribeDragEvent(edge.UpdateArrowGraphics.bind(edge));
        edge.end.SubscribeDragEvent(edge.UpdateArrowGraphics.bind(edge));
	}

    public RemoveEdge(edge: Edge) {
        const outIndex = this.outgoingEdges.indexOf(edge, 0);
        const inIndex = this.ingoingEdges.indexOf(edge, 0);
		if (outIndex > -1)
		    this.outgoingEdges.splice(outIndex, 1);
        if(inIndex > -1) 
            this.ingoingEdges.splice(inIndex, 1);

        if(inIndex <= -1 && outIndex <= -1)
            console.error("Unable to remove edge from connectable");
	}
    
    public StartConnection(e: MouseEvent) {
        if(e.button != 2)
            return;
        this.isConnecting = true;
        Connectable.inProgressConnection = this;
    }
    
    public static Connect(start: Connectable, end: Connectable) {
        start.AddNewEdge(end);
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

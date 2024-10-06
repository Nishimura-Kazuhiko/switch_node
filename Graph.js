class Graph
{

    constructor()
    {
        this.reset();
    }
    
    reset()
    {
        this.nodeNameArray = [];
        this.edgeNameArray = [];
        this.nodeArray = [];
        this.edgeArray = [];
        this.nodeIndex = 0;
        this.edgeIndex = 0;
    }
    
    addNodeByParam(name, x, y, nodeType)
    {
        let node0 = new Node(name, x, y, nodeType);
        return this.addNode(node0);
    }
    
    // add success true   fail false
    addNode(node0)
    {
        if (!this.nodeNameArray.includes(node0.name)) {
            this.nodeNameArray.push(node0.name);
            this.nodeArray.push(node0);
            this.nodeIndex++;
            return true;
        }else{
            return false;
        }
    }
    
    addNodeByIndices(name, index0, index1, type)
    {
        // same index
        if(index0==index1){
            return false;
        }
        
        // index out of range
        if(index0<0){
            return false;
        }
        if(index0>=this.nodeIndex){
            return false;
        }
        if(index1<0){
            return false;
        }
        if(index1>=this.nodeIndex){
            return false;
        }
        
        let edge0 = new Edge(name, this.nodeArray[index0], this.nodeArray[index1], type);
        return this.addEdge(edge0);
    }
    
    // add success true   fail false
    addEdge(edge0)
    {
        if (!this.edgeNameArray.includes(edge0.name)) {
            this.edgeNameArray.push(edge0.name);
            this.edgeArray.push(edge0);
            this.edgeIndex++;
            return true;
        }else{
            return false;
        }
    }
    
    drawGraph()
    {
        this.drawEdges();
        this.drawNodes();
    }
    
    drawEdges()
    {
        for (const edge0 of this.edgeArray) {
            edge0.drawEdge();
        }
    }

    drawNodes()
    {
        for (const node0 of this.nodeArray) {
            node0.drawNode();
        }
    }
}

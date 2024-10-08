class Graph
{

    constructor()
    {
        this.reset();
    }


    // basic methods
    // TODO: individialy delete method
    // TODO: edges do not know node index on both ends now
    // TODO: nodes do not know their own index

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
            node0.setIndex(this.nodeIndex);
            this.nodeNameArray.push(node0.name);
            this.nodeArray.push(node0);
            this.nodeIndex++;
            return true;
        } else {
            return false;
        }
    }

    addEdgeByIndices(name, index0, index1, type)
    {
        // same index
        if (index0==index1) {
            return false;
        }

        // index out of range
        if (index0<0) {
            return false;
        }
        if (index0>=this.nodeIndex) {
            return false;
        }
        if (index1<0) {
            return false;
        }
        if (index1>=this.nodeIndex) {
            return false;
        }

        let edge0 = new Edge(name, this.nodeArray[index0], this.nodeArray[index1], type);
        return this.addEdge(edge0);
    }

    // add success true   fail false
    addEdge(edge0)
    {
        if (!this.edgeNameArray.includes(edge0.name)) {
            edge0.node0.connectEdge(this.edgeIndex);
            edge0.node1.connectEdge(this.edgeIndex);
            edge0.setIndex(this.edgeIndex);
            this.edgeNameArray.push(edge0.name);
            this.edgeArray.push(edge0);
            this.edgeIndex++;
            return true;
        } else {
            return false;
        }
    }

    // this method return a subgraph of this graph itself
    subGraphing()
    {
        let subGraph = new SubGraph();
        for (let i=0; i<this.nodeArray.length; i++) {
            subGraph.addNode(i);
        }
        for (let i=0; i<this.edgeArray.length; i++) {
            subGraph.addEdge(i);
        }
        return subGraph;
    }








    // connect check methods
    // connect check main
    connectCheck()
    {
        let subGraph = this.subGraphing();

        this.resetEdgeState(subGraph,'new');
        this.resetConnectChecked(false);
        this.offSwitchReject();
        this.deleteChecked(subGraph);
        this.isoratedNodeReject();
        this.deleteChecked(subGraph);

        //console.log(subGraph.descriptionStr());
        // TODO: subgraph check algorithm
        if(!subGraph.isEmpty()){
            let sourceInNodeIndices = this.searchSourceInNodes();
            let isFind = this.findSourceOut(subGraph,sourceInNodeIndices);
            if(isFind){
            
            }else{
            
            }
        }

        this.updateOnEdge('new');
        this.updateOnEdge('undef');
    }

    deleteChecked(subGraph)
    {
        this.deleteCheckedNode(subGraph);
        this.deleteCheckedEdge(subGraph);
    }

    deleteCheckedNode(subGraph){
        for (const node0 of this.nodeArray) {
            if(node0.connectChecked){
                subGraph.deleteNode(node0.getIndex());
            }
        }
    }

    deleteCheckedEdge(subGraph){
        for (const edge0 of this.edgeArray) {
            if(edge0.connectChecked){
                subGraph.deleteEdge(edge0.getIndex());
            }
        }
    }

    // this method set all connectChecked value to each bool value
    resetConnectChecked(boolValue)
    {
        for (const node0 of this.nodeArray) {
            node0.connectChecked = boolValue;
        }

        for (const edge0 of this.edgeArray) {
            edge0.connectChecked = boolValue;
        }
    }

    // this method set all state value to each string value
    resetEdgeState(subGraph, stateValue)
    {
        for(let i=0;i<subGraph.edgeSize();i++){
            this.nodeArray[i].state = stateValue;
        }
    }

    // this method reject off state switches & edges around them switches
    offSwitchReject()
    {
        for (const node0 of this.nodeArray) {
            if (node0.nodeType == 'switch' && !node0.isSelected) {
                node0.connectChecked = true;
                for (const index of node0.connectEdgeIndices) {
                    this.edgeArray[index].state = 'off';
                    this.edgeArray[index].setSelected(false);
                    this.edgeArray[index].setConnectChecked(true);
                }
            }
        }
    }

    // this method reject nodes do not connect to edge
    isoratedNodeReject()
    {
        for (const node0 of this.nodeArray) {
            if (node0.connectEdgeIndices.length==0) {
                node0.setSelected(false);
                node0.setConnectChecked(true);
            } else {
                let allChecked = true;
                let hasSelected = false;
                for (const index of node0.connectEdgeIndices) {
                    if(this.edgeArray[index].connectChecked){
                        if(this.edgeArray[index].isSelected){
                            hasSelected = true;
                        }
                    }else{
                        allChecked = false;
                    }
                }
                if(allChecked){
                    if(!hasSelected){
                        node0.setSelected(false);
                    }
                    node0.setConnectChecked(true);
                }
            }
        }
    }

    // this method change all edge state that match arg state to 'on' state
    updateOnEdge(state)
    {
        for (const edge0 of this.edgeArray) {
            if (edge0.state==state) {
                edge0.state = 'on';
                edge0.setSelected(true);
                edge0.setConnectChecked(true);
            }
        }
    }

    searchSourceInNodes()
    {
        let sourceInNodeIndices = [];
        for (let i=0; i<this.nodeArray.length; i++) {
            if (this.nodeArray[i].nodeType == 'source_in') {
                sourceInNodeIndices.push(i);
            }
        }

        return sourceInNodeIndices;
    }

    // TODO: this method implementation on way
    // first
    // reset all not checked target edge 'new'
    // 
    // all target node checked
    //    -> return isFind
    //    -> all 'undef' edge -> 'on'
    findSourceOut(subGraph, sourceInNodeIndices){
        let isFind = false;
        for(let i=0;i>sourceInNodeIndices.length;i++){
            let checkSub = subGraph.copySubGraph();
            
        }
    }










    _old_connectCheck()
    {
        this.resetEdgeState();
        this.resetConnectChecked(false);

        let sourceInNodeIndices = this.searchSourceInNodes();

        let nextNodeIndices;
        let nextEdgeIndices;

        nextEdgeIndices = this.getCheckEdge(sourceInNodeIndices);
        if (_debug_state.includes('connect_check')) {
            for (const i of nextEdgeIndices) {
                console.log(this.edgeArray[i].name);
            }
        }
        let remaining = true;

        // at least 1 while loop will check 1 node/edge
        // if this class can cope disconnected graph
        // this operation will be a meaningless
        let count = 0;
        let countMax = this.nodeIndex+this.edgeIndex;
        while (remaining) {
            nextNodeIndices = this.edgeConnectCheck(nextEdgeIndices);
            if (_debug_state.includes('connect_check')) {
                for (const i of nextNodeIndices) {
                    console.log(this.nodeArray[i].name);
                }
                break;
            }

            //nextEdgeIndices = this.getCheckEdge(nextNodeIndices);
            //remaining = this.remainingCheck();
            //count++;
            //if(count>countMax){
            //    break;
            //}
        }
        //this.resetConnectChecked(true);
    }

    // this methode update nodeArray[...].connectChecked value
    _old_searchSourceInNodes()
    {
        let sourceInNodeIndices = [];
        for (let i=0; i<this.nodeArray.length; i++) {
            if (this.nodeArray[i].nodeType == 'source_in') {
                sourceInNodeIndices.push(i);
                this.nodeArray[i].connectChecked = true;
            }
        }

        return sourceInNodeIndices;
    }


    getCheckEdge(nodeIndices)
    {
        let nextEdgeIndices = [];
        for (const index of nodeIndices) {
            for (const i of this.nodeArray[index].connectEdgeIndices) {
                let addIndex = true;
                if (this.edgeArray[i].connectChecked) {
                    addIndex = false;
                }
                if (nextEdgeIndices.includes(i)) {
                    addIndex = false;
                }
                if (addIndex) {
                    nextEdgeIndices.push(i);
                }
            }
        }

        return nextEdgeIndices;
    }

    // TODO:
    // add node index to nextNodeIndices
    // smart state management
    edgeConnectCheck(nextEdgeIndices)
    {
        let nextNodeIndices = [];
        for (const i of nextEdgeIndices) {
            let doCheck = true;
            if (this.edgeArray[i].connectChecked) {
                doCheck = false;
            }

            let n0; // checked
            let n1; // other
            if (this.edgeArray[i].node0.connectChecked) {
                n0 = this.edgeArray[i].node0;
                n1 = this.edgeArray[i].node1;
                if (!this.edgeArray[i].node1.connectChecked) {
                    this.edgeArray[i].node1.connectChecked = true;
                }
            } else if (this.edgeArray[i].node1.connectChecked) {
                n1 = this.edgeArray[i].node0;
                n0 = this.edgeArray[i].node1;
                if (!this.edgeArray[i].node0.connectChecked) {
                    this.edgeArray[i].node0.connectChecked = true;
                }
            } else {
                doCheck = false;
            }

            //console.log(n0.name);

            if (doCheck) {
                if (n0.nodeType == 'source_in') {
                    if (n1.nodeType == 'source_in') {
                        this.edgeArray[i].state = 'on';
                        this.edgeArray[i].connectChecked = true;
                    }

                    if (n1.nodeType == 'source_out') {
                        this.edgeArray[i].state = 'on';
                        this.edgeArray[i].connectChecked = true;
                    }

                    if (n1.nodeType == 'switch') {
                        if (n1.isSelected) {
                            this.edgeArray[i].state = 'undef';
                        } else {
                            this.edgeArray[i].state = 'off';
                            this.edgeArray[i].connectChecked = true;
                        }
                    }

                    if (n1.nodeType == 'segment') {
                        this.edgeArray[i].state = 'undef';
                    }
                }

                if (n0.nodeType == 'source_out') {
                    if (n1.nodeType == 'source_in') {
                        this.edgeArray[i].state = 'on';
                        this.edgeArray[i].connectChecked = true;
                    }

                    if (n1.nodeType == 'source_out') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'switch') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'segment') {
                        this.edgeArray[i].state = 'undef';
                    }
                }

                if (n0.nodeType == 'switch') {
                    if (n1.nodeType == 'source_in') {
                        if (n0.isSelected) {
                            this.edgeArray[i].state = 'undef';
                        } else {
                            this.edgeArray[i].state = 'off';
                            this.edgeArray[i].connectChecked = true;
                        }
                    }

                    if (n1.nodeType == 'source_out') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'switch') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'segment') {
                        this.edgeArray[i].state = 'undef';
                    }
                }

                if (n0.nodeType == 'segment') {
                    if (n1.nodeType == 'source_in') {
                        this.edgeArray[i].state = 'on';
                        this.edgeArray[i].connectChecked = true;
                    }

                    if (n1.nodeType == 'source_out') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'switch') {
                        this.edgeArray[i].state = 'undef';
                    }

                    if (n1.nodeType == 'segment') {
                        this.edgeArray[i].state = 'undef';
                    }
                }
            }
        }
        return nextNodeIndices;
    }

    remainingCheck()
    {
        let remaining = false;
        for (const node0 of this.nodeArray) {
            if (!node0.connectChecked)
            {
                remaining = true;
                break;
            }
        }

        for (const edge0 of this.edgeArray) {
            if (!edge0.connectChecked) {
                remaining = true;
                break;
            }
        }
        return remaining;
    }




    // draw methods

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

// this class has only nodes & edges Indices
class SubGraph
{
    constructor()
    {
        this.reset();
    }

    reset()
    {
        this.nodeIndices = [];
        this.edgeIndices = [];
    }

    copySubGraph()
    {
        let copySub = new SubGraph();
        
        for (const index of this.nodeIndices) {
            copySub.addNode(index);
        }
        
        for (const index of this.edgeIndices) {
            copySub.addEdge(index);
        }
        
        return copySub;
    }

    graphSize()
    {
        return this.nodeSize() + this.edgeSize();
    }

    nodeSize()
    {
        return this.nodeIndices.length;
    }

     edgeSize()
    {
        return this.edgeIndices.length;
    }

    isEmpty()
    {
        if(this.graphSize()==0){
            return true;
        }else{
            return false;
        }
    }

    addNode(index) {
        if (!this.nodeIndices.includes(index)) {
            this.nodeIndices.push(index);
            return true;
        } else {
            return false;
        }
    }

    addEdge(index) {
        if (!this.edgeIndices.includes(index)) {
            this.edgeIndices.push(index);
            return true;
        } else {
            return false;
        }
    }

    nodeExist(index)
    {
        if (this.nodeIndices.includes(index)) {
            return true;
        } else {
            return false;
        }
    }

    edgeExist(index)
    {
        if (this.edgeIndices.includes(index)) {
            return true;
        } else {
            return false;
        }
    }

    deleteNode(index) {
        if (this.nodeIndices.includes(index)) {
            this.nodeIndices = this.nodeIndices.filter(function(item) {
                return item != index;
            }
            );
            return true;
        } else {
            return false;
        }
    }

    deleteEdge(index) {
        if (this.edgeIndices.includes(index)) {
            this.edgeIndices = this.edgeIndices.filter(function(item) {
                return item != index;
            }
            );
            return true;
        } else {
            return false;
        }
    }

    descriptionStr()
    {
        let outputStr = '';
        outputStr += 'Node index:\n';
        for (const index of this.nodeIndices) {
            outputStr += index.toString() + ' ';
        }
        outputStr += '\nEdge index:\n';
        for (const index of this.edgeIndices) {
            outputStr += index.toString() + ' ';
        }
        return outputStr;
    }
}

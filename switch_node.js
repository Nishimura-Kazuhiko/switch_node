// main
let config;
let drawFunc;


// for debug
let _debug_state; // check list

// _debug_state.push('draw_test');
// _debug_test_graph00()

// _debug_state.push('draw_test');
// _debug_state.push('graph_move');
// _debug_test_graph_move00()

// _debug_state.push('draw_test');
// _debug_state.push('connect_check');
// _debug_connect_check00()
let _graph;

// _debug_state.push('sub_graph_test');
// _debug_sub_graph_test00();

// _debug_state.push('draw_test');
// _debug_state.push('connect_check');
// _debug_state.push('param_change');
// _debug_state.push('graph_draw');
// _debug_param_change00()
// _debug_test_graph_draw00()


function setup() 
{
    config   = new Config();
    drawFunc = new DrawFunc();

    createCanvas(1024, 768);
    background(255);
    
    _debug_state = [];
    _debug_state.push('draw_test');
    //_debug_state.push('graph_move');
    _debug_state.push('connect_check');
    //_debug_state.push('sub_graph_test');
    //_debug_state.push('param_change');
    //_debug_state.push('graph_draw');
    
    _debug_test_graph00();
    _debug_connect_check00();
    _debug_sub_graph_test00();
}


function draw()
{
    _debug_test_graph_move00();
    _debug_test_graph_draw00();
}


function keyTyped()
{
    _debug_param_change00(key, keyCode);
}

// for debug functions
// make node and edge, and draw them
function _debug_test_graph00()
{
    if(_debug_state.includes('draw_test')){
        _graph = new Graph();
        
        let nodeIndex = 0;
        let edgeIndex = 0;
        let xiMax = 3;
        let yiMax = 5;
        let maxIndex = xiMax*yiMax-1;
        
        for (let yi=0; yi<yiMax; yi++) {
            for (let xi=0; xi<xiMax; xi++) {
                let nodeName = 'SW' + nodeIndex.toString();
                let x = width*(xi+1)/(xiMax+2);
                let y = height*(yi+1)/(yiMax+2);
                let index = yi*xiMax + xi;
                if(index==0){
                    _graph.addNodeByParam('IN'+index.toString(),x,y,'source_in');
                }else if(index==maxIndex){
                    _graph.addNodeByParam('OUT'+index.toString(),x,y,'source_out');

                }else if((yi%2)+(xi%2)!=1){
                    _graph.addNodeByParam(nodeName,x,y,'switch');
                }else{
                    if(_debug_state.includes('connect_check')){
                        _graph.addNodeByParam(nodeName,x,y,'switch');
                    }else{
                        _graph.addNodeByParam(nodeName,x,y,'segment');
                    }
                }
                nodeIndex++;
            }
        }
        
        for(let i=0;i<_graph.nodeIndex;i++){
            let name;
            let index0;
            
            if(floor(i/xiMax)<yiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+xiMax;
                _graph.addEdgeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
            
            if(i%xiMax<xiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+1;
                _graph.addEdgeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
            
            if(floor(i/xiMax)<yiMax-1 && i%xiMax<xiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+xiMax+1;
                _graph.addEdgeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
        }
        
        if(!_debug_state.includes('connect_check')){
            _graph.drawGraph();
        }
    }
}


// jitter function
function _debug_test_graph_move00()
{
    if(_debug_state.includes('graph_move')){
        background(255);
        
        for(let node0 of _graph.nodeArray){
            node0.setX(node0.x+random(-2,2));
            node0.setY(node0.y+random(-2,2));
        }
        _graph.drawGraph();
    }
}

function _debug_connect_check00()
{
    if(_debug_state.includes('connect_check')){
         _graph.nodeArray[1].setSelected(true);
         //_graph.nodeArray[1].setSelected(false);
         //_graph.nodeArray[1].toggleSelected();
         
         _graph.nodeArray[7].setSelected(true);
         //_graph.nodeArray[7].setSelected(false);
         //_graph.nodeArray[7].toggleSelected();
         
         _graph.nodeArray[13].setSelected(true);
         //_graph.nodeArray[13].setSelected(false);
         //_graph.nodeArray[13].toggleSelected();
         
         _graph.nodeArray[12].setNodeType('source_in');
         //_graph.nodeArray[12].toggleSelected();
         //_graph.nodeArray[12].setSelected(true);
         //_graph.nodeArray[12].setSelected(false);
         
         _graph.nodeArray[8].setNodeType('source_out');
         //_graph.nodeArray[8].setNodeType('segment');
         //_graph.nodeArray[8].toggleSelected();
         //_graph.nodeArray[8].setSelected(true);
         //_graph.nodeArray[8].setSelected(false);
         
         
         _graph.addNodeByParam('TEST15',80,80,'source_in');
         _graph.addNodeByParam('TEST16',80,160,'switch');
         _graph.nodeArray[16].setSelected(true);
         _graph.addNodeByParam('TEST17',80,240,'segment');
         _graph.nodeArray[17].setSelected(true);
         _graph.addNodeByParam('TEST18',80,320,'source_out');
         
         _graph.connectCheck();
         _graph.drawGraph();
    }
}

function _debug_sub_graph_test00()
{
    if(_debug_state.includes('sub_graph_test')){
        
        function _sub_description(bool,index)
        {
            if(bool){
                console.log('node '+index.toString()+' exist')
            }else{
                console.log('node '+index.toString()+' is not found')
            }
        }
        
        // add test
        let subGraph = new SubGraph();
        for(let i=2;i<=5;i++){
            subGraph.addNode(i);
            subGraph.addEdge(i+10);
        }
        
        console.log(subGraph.descriptionStr());

        //   check
        _sub_description(subGraph.nodeExist(3),3);
        _sub_description(subGraph.edgeExist(14),14);
        
        // delete test
        subGraph.deleteNode(3);
        subGraph.deleteEdge(14);
        console.log(subGraph.descriptionStr());
        
        //   check
        _sub_description(subGraph.nodeExist(3),3);
        _sub_description(subGraph.edgeExist(14),14);
        
        subGraph.reset();
        console.log(subGraph.descriptionStr());
    }
}

function _debug_param_change00(key0,keyCode0)
{
    if(_debug_state.includes('param_change')){
        if(key0=='a'){
            drawFunc.arrowBoxRate += 0.01;
        }else if(key0=='z'){
            drawFunc.arrowBoxRate -= 0.01;
        }
        console.log(drawFunc.arrowBoxRate);
    }
}

function _debug_test_graph_draw00()
{
    if(_debug_state.includes('graph_draw')){
        background(255);
        _graph.drawGraph();
    }
}

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
    _debug_test_graph00();
    _debug_connect_check00();
}


function draw()
{
    _debug_test_graph_move00();
}


// for debug functions
// make node and edge, and draw them
function _debug_test_graph00()
{
    if(_debug_state.includes('draw_test')){
        _graph = new Graph();
        
        let nodeIndex = 0;
        let edgeIndex = 0;
        let xiMax = 2;
        let yiMax = 2;
        let maxIndex = xiMax*yiMax-1;
        
        for (let yi=0; yi<yiMax; yi++) {
            for (let xi=0; xi<xiMax; xi++) {
                let nodeName = 'RL' + nodeIndex.toString();
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
                _graph.addNodeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
            
            if(i%xiMax<xiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+1;
                _graph.addNodeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
            
            if(floor(i/xiMax)<yiMax-1 && i%xiMax<xiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+xiMax+1;
                _graph.addNodeByIndices(name,i,index0,'undirected');
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
         _graph.nodeArray[1].isSelected = true;
         _graph.connectCheck();
         _graph.drawGraph();
    }
}

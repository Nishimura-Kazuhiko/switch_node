// main
let config;
let drawFunc;


// for debug
let _debug_state;
// _debug_state = 'draw_test';
// _debug_test_graph00()
// _debug_test_graph_move00()
let _graph;

function setup() 
{
    config   = new Config();
    drawFunc = new DrawFunc();

    createCanvas(1024, 768);
    background(255);
    
    _debug_state = 'draw_test';
    _debug_test_graph00();
}


function draw()
{
    _debug_test_graph_move00();
}


// for debug functions
// make node and edge, and draw them
function _debug_test_graph00()
{
    if(_debug_state == 'draw_test'){
        _graph = new Graph();
        
        let nodeIndex = 0;
        let edgeIndex = 0;
        let xiMax = 4;
        let yiMax = 4;
        
        for (let yi=0; yi<yiMax; yi++) {
            for (let xi=0; xi<xiMax; xi++) {
                let nodeName = 'RL' + nodeIndex.toString();
                let x = width*(xi+1)/(xiMax+2);
                let y = height*(yi+1)/(yiMax+2);
                _graph.addNodeByParam(nodeName,x,y);
                nodeIndex++;
            }
        }
        
        for(let i=0;i<_graph.nodeIndex;i++){
            let name;
            let index0;
            
            if(i/yiMax<yiMax-1){
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
            
            if(i/yiMax<yiMax-1 && i%xiMax<xiMax-1){
                name = 'Edge' + edgeIndex.toString();
                index0 = i+xiMax+1;
                _graph.addNodeByIndices(name,i,index0,'undirected');
                edgeIndex++;
            }
        }
        
        _graph.drawGraph();
    }
}


// jitter function
function _debug_test_graph_move00()
{
    if(_debug_state == 'draw_test'){
        background(255);
        
        for(let node0 of _graph.nodeArray){
            node0.setX(node0.x+random(-2,2));
            node0.setY(node0.y+random(-2,2));
        }
        _graph.drawGraph();
    }
}

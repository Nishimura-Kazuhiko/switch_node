class Edge
{
    
    constructor(name,node0,node1,direction)
    {
        this.setConfig();
        
        this.name = name;
        
        this.node0 = node0;
        this.node1 = node1;
        
        //direction type
        // ->  forward
        // <-  reverse
        // <-> both
        // --  undirected
        this.direction  = direction;
        
        //state type
        // new    not define state (temporary)
        // off    visible
        // on     visible
        // undef  unknown on/off (temporary)
        this.state = 'new';
        
        this.connectChecked = false;
        
        //if(_debug_state.includes('connect_check')){this.state = 'on';this.connectChecked = true;} 
    }
    
    setConfig()
    {
        this.fontColor         = config.edge_fontColor;
        this.aboveStrokeColor  = config.edge_aboveStrokeColor;
        this.selectFontColor   = config.edge_selectFontColor;
        this.selectStrokeColor = config.edge_selectStrokeColor;
        this.strokeColor       = config.edge_strokeColor;
        this.strokeWeight      = config.edge_strokeWeight;
    }
    
    setIndex(index)
    {
        this.index = index;
    }
    
    getIndex(index){
        return this.index
    }
    
    indexCheck(index){
        if(index == this.index){
            return true;
        }else{
            return false;
        }
    }
    
    setSelected(boolValue){
        this.isSelected = boolValue;
    }
    
    setConnectChecked(boolValue)
    {
        this.connectChecked = boolValue;
    }
    
    toggleSelected()
    {
            if(this.isSelected){
                this.isSelected = false;
            }else{
                this.isSelected = true;
            }
    }
    
    drawEdge()
    {
        let drawMode = 'normal';
        let foc0 = color(0);
        let sc0  = color(0);
        
        if (this.isSelected) {
            if (this.isAbove) {
                drawMode = 'above'; // temporary
            } else {
                drawMode = 'select';
            }
        } else {
            if (this.isAbove) {
                drawMode = 'select_on';
            } else {
                drawMode = 'normal';
            }
        }

        switch(drawMode) {
        case 'select_on':
            foc0 = this.selectFontColor;
            sc0  = this.aboveStrokeColor;
            break;
        case 'select':
            foc0 = this.selectFontColor;
            sc0  = this.selectStrokeColor;
            break;
        case 'above':
            foc0 = this.fontColor;
            sc0  = this.aboveStrokeColor;
            break;
        case 'normal':
        default:
            foc0 = this.fontColor;
            sc0  = this.strokeColor;
        }
        
        noFill();
        stroke(sc0);
        strokeWeight(this.strokeWeight);
        
        // for debug
        if(_debug_state.includes('connect_check')){
            switch(this.state){
            case 'undef':
                stroke(127);
                break;
            case 'on':
                stroke(255,0,0);
                break;
            case 'off':
                stroke(0);
                break;
            }
            if(this.connectChecked){
                strokeWeight(10);
            }
        }
        
        line(this.node0.cx,this.node0.cy,this.node1.cx,this.node1.cy);
    }
}

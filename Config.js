class Config
{
    constructor()
    {
        this.setDrawFuncConfig();
        this.setNodeConfig();
        this.setEdgeConfig();
    }

    setDrawFuncConfig()
    {
        this.draw_func_lameRectRateMax = 1000;
        this.draw_func_lameRectRateMin = 0.001;
        this.draw_func_lameRectDivMin  = 16;
        this.draw_func_lameRectBase    = 32.0;
        this.draw_func_lameRectDiv     = 32;    // least case 16
        this.draw_func_lameRectRate    = 5.2;
    }

    setNodeConfig()
    {
        this.node_defaultType     = 'switch';
        
        this.node_w = 32;
        this.node_h = 32;
        
        this.node_segmentSize     = 10;

        this.node_heightRate      = 1.75;
        this.node_textUnderRate   = 0.72;

        this.node_strokeWeight    = 3;
        this.node_fontSize        = 20;
        
        this.node_fontColor       = color( 31,  31,  31, 255);
        this.node_fillColor       = color(255, 255, 255, 255);
        this.node_aboveFillColor  = color(255, 215,   0, 255);
        this.node_selectFontColor = color(255, 255, 255, 255);
        this.node_selectFillColor = color(255, 127,   0, 255);
        this.node_strokeColor     = color( 31,  31,  31, 255);
    }
    
    setEdgeConfig()
    {
        this.edge_strokeWeight      = 3;
        this.edge_fontSize          = 20;
        
        this.edge_fontColor         = color( 31,  31,  31, 255);
        this.edge_aboveStrokeColor  = color(255, 215,   0, 255);
        this.edge_selectFontColor   = color(255, 255, 255, 255);
        this.edge_selectStrokeColor = color(255, 127,   0, 255);
        this.edge_strokeColor       = color( 31,  31,  31, 255);
    }
}

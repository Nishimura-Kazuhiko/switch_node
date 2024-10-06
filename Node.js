class Node
{
    constructor(name, x, y)
    {  
        this.setConfig();
        
        this.name = name;
        this.x = x;
        this.y = y;

        this.setNodeSize();
        this.resetCenter();
        
        this.isAbove = false;
        this.isSelected = false;
    }

    setConfig()
    {
        this.w = config.node_w;
        this.h = config.node_h;
        
        this.heightRate      = config.node_heightRate;
        this.textUnderRate   = config.node_textUnderRate;
        
        this.strokeWeight    = config.node_strokeWeight;
        this.fontSize        = config.node_fontSize;
        
        this.fontColor       = config.node_fontColor;
        this.fillColor       = config.node_fillColor;
        this.aboveFillColor  = config.node_aboveFillColor;
        this.selectFontColor = config.node_selectFontColor;
        this.selectFillColor = config.node_selectFillColor;
        this.strokeColor     = config.node_strokeColor;
    }

    setNodeSize()
    {
        textSize(this.fontSize);
        this.charW = textWidth(' ')
        this.w = textWidth(this.name)+2*this.charW;
        this.h = this.heightRate*this.fontSize;
    }

    setX(x)
    {
        this.x = x;
        this.resetCenter();
    }
    
    setY(y)
    {
        this.y = y;
        this.resetCenter();
    }
    
    setW(w)
    {
        this.w = w;
        this.resetCenter();    
    }
    
    setH(h)
    {
        this.h = h;
        this.resetCenter();
    }
    
    resetCenter()
    {
        this.cx = this.x+this.w/2;
        this.cy = this.y+this.h/2;
    }

    onCheck(x0,y0)
    {
        let result = false;
        
        if(this.x<=x0 && x0<=(this.x+this.w)){
            if(this.y<=y0 && y0<=(this.y+this.h)){
                result = true;
            }
        }
        
        return result;
    }

    drawNode()
    {
        let drawMode = 'normal';
        let foc0 = color(0);
        let fic0 = color(0);
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
            fic0 = this.aboveFillColor;
            sc0  = this.selectFillColor;
            break;
        case 'select':
            foc0 = this.selectFontColor;
            fic0 = this.selectFillColor;
            sc0  = this.strokeColor;
            break;
        case 'above':
            foc0 = this.fontColor;
            fic0 = this.aboveFillColor;
            sc0  = this.aboveFillColor;
            break;
        case 'normal':
        default:
            foc0 = this.fontColor;
            fic0 = this.fillColor;
            sc0  = this.strokeColor;
        }

        fill(fic0);
        stroke(sc0);
        strokeWeight(this.strokeWeight);
        drawFunc.lameRect(this.x, this.y, this.w, this.h);
        
        //stroke(foc0);
        fill(foc0);
        noStroke();
        let x0 = this.x+this.charW;
        let y0 = this.y+this.h*this.textUnderRate;
        text(this.name,x0,y0);
    }
}

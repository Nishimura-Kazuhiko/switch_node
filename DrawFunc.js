class DrawFunc
{
    constructor()
    {
        this.setConfig();
    }
    
    setConfig()
    {
        this.lameRectRateMax = config.draw_func_lameRectRateMax;
        this.lameRectRateMin = config.draw_func_lameRectRateMin;
        this.lameRectDivMin  = config.draw_func_lameRectDivMin;
        this.lameRectBase    = config.draw_func_lameRectBase;
        this.lameRectDiv     = config.draw_func_lameRectDiv;
        this.lameRectRate    = config.draw_func_lameRectRate;
    }

    sign(v){
        if(v<0){
            return -1;
        }else if(v==0){
            return 0;
        }else{
            return 1;
        }
    }

    lameRect(x, y, w, h)
    {
        let r = 0;
        let cx0 = 0;
        let cy0 = 0;
        let cx1 = 0;
        let cy1 = 0;
        let startPhase  = 0.0;
        let switchPhase = Number.MAX_VALUE;
        let hw = w/2;
        let hh = h/2;

        if (w>h) {
            r = h/2.0;
            startPhase  = -HALF_PI;
            switchPhase = HALF_PI;
            cx0 = x+w-hh;
            cy0 = y+hh;
            cx1 = x+hh;
            cy1 = y+hh;
        } else if (w==h) {
            r = w/2.0;
            cx0 = x+hw;
            cy0 = y+hh;
        } else {
            r = w/2.0;
            startPhase = 0.0;
            switchPhase = PI;
            cx0 = x+hw;
            cy0 = y+hw;
            cx1 = x+hw;
            cy1 = y+h-hw;
        }
        
        if(this.lameRectRate>this.lameRectRateMax){
            rect(x,y,w,h);
        }else if(this.lameRectRate<this.lameRectRateMin){
            beginShape();
            vertex(x+w,y+hh);
            vertex(x+hw,y+hh);
            vertex(x+hw,y);
            vertex(x+hw,y+hh);
            vertex(x,y+hh);
            vertex(x+hw,y+hh);
            vertex(x+hw,y+h);
            vertex(x+hw,y+hh);
            endShape(CLOSE);
        }else{
            let max0 = 4*round((r/this.lameRectBase)*this.lameRectDiv/4.0);
            if(max0<this.lameRectDivMin){
                max0 = this.lameRectDivMin;
            }
            
            beginShape();
            for(let i=0;i<max0;i++){
                let theta = (TWO_PI*i)/max0 + startPhase;
                let cosT = cos(theta);
                let sinT = sin(theta);
                let x0 = r*this.sign(cosT)*pow(abs(cosT), 2.0/this.lameRectRate);
                let y0 = r*this.sign(sinT)*pow(abs(sinT), 2.0/this.lameRectRate);
                
                if(theta<=switchPhase){
                  vertex(cx0+x0,cy0-y0);
                }else if(theta==switchPhase){
                  vertex(cx0+x0,cy0-y0);
                  vertex(cx1+x0,cy1-y0);
                }else{
                  vertex(cx1+x0,cy1-y0);
                }
            }
            endShape(CLOSE);
        }
    }
}

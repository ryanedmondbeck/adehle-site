import React, { useEffect } from "react";
import * as p5 from "p5";
import Uxumreg from './fonts/UxumGrotesque-Regular.otf';
 
const SketchSplash = () => {
    const Sketch = p5 => {
        let uxumreg;
        let font_size = 450;
        // let t_array;
        let resolution = 0.0001;
        // let a = [];
        let i = 0;
        let w = 3;

        p5.preload = () => {
            uxumreg = p5.loadFont(Uxumreg, font => {
                console.log('Successfully loaded font', uxumreg);
            })
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }

        p5.setup = () => {
            let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
            canvas.position(0, 0);
            canvas.style('z-index', '-1');
            // p5.textSize(67);
            // p5.textFont(uxumreg);
            
        };
        
        p5.draw = () => {
            p5.background(255);
            // p5.textFont(uxumreg);
            
            // p5.text('rrRsfeff', 150, 150);
            let a = uxumreg.textToPoints("Adehle Daley", p5.width/7, p5.height/3, font_size, {
                sampleFactor: resolution
            });
            if (resolution < 0.05) {
                resolution += 0.0001;
            }
            else {
                resolution = 0.0001;
                i = 0;
            }
            p5.strokeWeight(1);
            p5.beginShape();
            for (let i = 0; i < a.length; i++) {
                p5.vertex(a[i].x, a[i].y)
            }
            p5.endShape();
        };
    };
 
    useEffect(() => {
        new p5(Sketch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    return (
  	    <></>
    );
};
 
export default SketchSplash;
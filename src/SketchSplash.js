import React, { useEffect } from "react";
import * as p5 from "p5";
import Uxumreg from './fonts/UxumGrotesque-Regular.otf';
 
const SketchSplash = () => {
    const Sketch = p5 => {
        let uxumreg;
        let font_size = 400;
        let f_top = 500;
        let f_bottom = 150;
        let f_move = 1;
        let resolution = 0.0001;
        let r_top = 0.015;
        let r_bottom = 0.0001;
        let r_move = 0.0001;

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
        };
        
        p5.draw = () => {
            p5.background(255);
            
            //----------------------------------------
            //oscillator for font size
            // if (font_size > f_top) {
            //     f_move = -1;
            // }
            // if (font_size < f_bottom) {
            //     f_move = 1;
            // }
            // font_size += f_move;
            //----------------------------------------

            let a = uxumreg.textToPoints("Adehle", p5.width/7, p5.height/3, font_size, {
                sampleFactor: resolution
            });

            //----------------------------------------
            //oscillator for resolution
            if (resolution > r_top) {
                r_move = -0.0001;
            }
            if (resolution < r_bottom) {
                r_move = 0.0001;
            }
            resolution += r_move;
            // console.log(resolution, move);
            //----------------------------------------

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
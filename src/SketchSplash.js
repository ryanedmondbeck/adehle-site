import React, { useEffect } from "react";
import * as p5 from "p5";
// import Uxumreg from './fonts/UxumGrotesque-Regular.otf';
import im from './images/aa16.jpg';
 
const SketchSplash = () => {
    const Sketch = p5 => {
        // speed of the wobble
        let speed = 0.4;

        // tiling of the wobble
        let tiling = 10;

        // stength of the wobble
        let strength = 2;

        // the shader
        let sh;

        // an image
        let img;

        let vert = 'attribute vec4 aPosition;'+
        'varying vec4 v_uv;'+
        'void main() {'+
        'v_uv = aPosition;'+
        'v_uv.y *= -1.0;'+
        'v_uv.x = v_uv.x * 0.5 + 0.5;'+
        'v_uv.y = v_uv.y * 0.5 + 0.5;'+ 
            'gl_Position = aPosition;'+
        '}';

        let frag = 'precision mediump float;'+

        'uniform sampler2D uSampler;'+
        'uniform float u_time;'+

        'uniform float u_speed;'+
        'uniform float u_tiling;'+
        'uniform float u_strength;'+

        'varying vec4 v_uv;'+

        'void main() {'+
        'vec2 texcoord = vec2(v_uv.x-sin(u_time*u_speed)*0.05*cos(v_uv.y*u_tiling)*u_strength, v_uv.y-cos(u_time*u_speed)*0.05*sin(v_uv.x*u_tiling)*u_strength);'+
        'vec4 col = texture2D(uSampler, texcoord);'+
        'gl_FragColor = col;'+
        '}'


        p5.preload = () => {
            // load the image
            img = p5.loadImage(im);
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }

        p5.setup = () => {
            let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
            sh = p5.createShader(vert, frag);
		    p5.background(0);
            canvas.position(0, 0);
            canvas.style('z-index', '-1');
        };
        
        p5.draw = () => {
            // set uniforms
            sh.setUniform("uSampler", img);
            sh.setUniform("u_time", p5.millis()/1000);
            sh.setUniform("u_speed", speed);
            sh.setUniform("u_tiling", tiling + p5.mouseY*0.001);
            sh.setUniform("u_strength", strength + p5.mouseX*0.001);
            
            // render on a quad
            p5.shader(sh);
            p5.quad(-1, -1, 1, -1, 1, 1, -1, 1);
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
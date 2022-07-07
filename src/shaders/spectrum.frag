#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vMatCapUV;

// get the texture from the class
uniform sampler2D uMatCap;
// get the treeshold of 
uniform float uSpecterSize;
// get wave border size
uniform float uWaveBorder;
// get wave speed
uniform float uWaveSpeed;
// get border colour 
uniform vec3 uBorderColor;
// get uTime to animate the position
uniform float uTime;

void main() {
    // get noise func
    float n3 = snoise3(vec3(vPosition.xz * 2.5, uTime * 0.01)) * .5;

    // create a wave effect by using sin function w/ y position of the elem 
    float w = sin(vPosition.y * 5. - uTime * uWaveSpeed);

    float borderMask = step(w, n3 - (uSpecterSize + .1));
    // set border width
    borderMask -= step(w, n3 - ( uSpecterSize + uWaveBorder ));
    // set border colour
    vec4 borderOut = vec4(uBorderColor * borderMask, borderMask);

    // step gives 0 or 1 by the treeshold so if it is below .6 then it's 0
    float mcMask = step(w, n3 - uSpecterSize);

    // create a vec4 with the texture and the UV map to place it on the obj
    vec4 matCap = texture2D(uMatCap, vMatCapUV);
    // create a vec4 with the colour of matCap w/ the mcMask
    vec4 matCapOut = vec4(matCap.rgb, mcMask);

    float opMask = 1. - vPosition.y;
    opMask *= .15;
    opMask += .5;
    vec4 opMaskOut = vec4(1., 1., 1., opMask);

    vec4 col = matCapOut + borderOut;
    col *= opMaskOut;

    gl_FragColor = vec4(col);

    //set up a gradient based on the y position
    // float ypos = vPosition.y * .2 - .4;
    // if(ypos <= 0.) ypos = 0.;
    // col = vec4(ypos);
    // gl_FragColor = vec4(col.rgb, 1.);
}
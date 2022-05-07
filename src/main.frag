#version 300 es
precision highp float;

#pragma glslify: noise = require(glsl-noise/simplex/3d.glsl)

in vec2 uv;

uniform float time;

layout(location = 0) out vec4 fragColor;

void main()
{
  float b = noise(vec3(uv* 10.0, sin(time*0.2))) * 0.5
  + noise(vec3(uv* 3.0, sin(time*0.1))) * 0.5
  + noise(vec3(uv *4.0, sin(time*0.05))) * 0.3;
  fragColor = vec4(mix(vec3(0.3, 0.6, 0.7), vec3(0.7, 0.8, .99), b),1.0);
}
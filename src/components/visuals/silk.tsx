/* eslint-disable react/no-unknown-property */
"use client";

import React, { forwardRef, useMemo, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber";
import { Color, Mesh, ShaderMaterial, IUniform } from "three";

type RGB = [number, number, number];
const hexToRGB = (hex: string): RGB => {
  const c = hex.replace("#", "");
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
};

interface SilkUniforms {
  uSpeed: { value: number };
  uScale: { value: number };
  uNoiseIntensity: { value: number };
  uColor: { value: Color };
  uRotation: { value: number };
  uTime: { value: number };
  [k: string]: IUniform;
}

const vertex = /* glsl */ `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `;

const fragment = /* glsl */ `
varying vec2 vUv;
uniform float uTime;uniform vec3 uColor;uniform float uSpeed;uniform float uScale;uniform float uRotation;uniform float uNoiseIntensity;
const float e=2.71828182845904523536;
float noise(vec2 t){float G=e;vec2 r=(G*sin(G*t));return fract(r.x*r.y*(1.0+t.x));}
vec2 rot(vec2 uv,float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c)*uv;}
void main(){
  float rnd=noise(gl_FragCoord.xy);
  vec2 uv=rot(vUv*uScale,uRotation);
  vec2 tex=uv*uScale;
  float t=uSpeed*uTime;
  tex.y+=0.03*sin(8.0*tex.x-t);
  float p=0.6+0.4*sin(5.0*(tex.x+tex.y+cos(3.0*tex.x+5.0*tex.y)+0.02*t)+sin(20.0*(tex.x+tex.y-0.1*t)));
  vec4 col=vec4(uColor,1.0)*vec4(p)-rnd/15.0*uNoiseIntensity;
  col.a=1.0;
  gl_FragColor=col;
}`;

const SilkPlane = forwardRef<Mesh, { uniforms: SilkUniforms }>(
  function SilkPlane({ uniforms }, ref) {
    const { viewport } = useThree();
    useLayoutEffect(() => {
      const m = ref as React.MutableRefObject<Mesh | null>;
      if (m.current) m.current.scale.set(viewport.width, viewport.height, 1);
    }, [ref, viewport]);
    useFrame((_s: RootState, delta: number) => {
      const m = ref as React.MutableRefObject<Mesh | null>;
      if (m.current) {
        const mat = m.current.material as ShaderMaterial & {
          uniforms: SilkUniforms;
        };
        mat.uniforms.uTime.value += 0.1 * delta;
      }
    });
    return (
      <mesh ref={ref}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
        />
      </mesh>
    );
  },
);
SilkPlane.displayName = "SilkPlane";

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

export const Silk: React.FC<SilkProps> = ({
  speed = 1.6,
  scale = 1,
  color = "#e8c98a",
  noiseIntensity = 1.1,
  rotation = 0.4,
}) => {
  const meshRef = useRef<Mesh>(null);
  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, noiseIntensity, color, rotation],
  );
  return (
    <Canvas dpr={[1, 2]} frameloop="always" gl={{ antialias: true, alpha: true }}>
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ShaderBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // -----------------------------
    // Scene / Camera / Renderer
    // -----------------------------
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    mountRef.current.appendChild(renderer.domElement)

    // -----------------------------
    // Texture
    // -----------------------------
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin("anonymous")

    const texture = loader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png"
    )

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.minFilter = THREE.LinearFilter

    // -----------------------------
    // Uniforms
    // -----------------------------
    const uniforms = {
      u_time: { value: 1.0 },
      u_resolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ),
      },
      u_noise: { value: texture },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }

    // -----------------------------
    // Material
    // -----------------------------
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform sampler2D u_noise;

        #define TAU 6.

        const float multiplier = 25.5;
        const float zoomSpeed = 10.;
        const int layers = 10;
        const int octaves = 5;

        vec2 hash2(vec2 p){
          return texture2D(u_noise,(p+0.5)/256.0,-100.0).xy;
        }

        mat2 rotate2d(float a){
          return mat2(cos(a),sin(a),-sin(a),cos(a));
        }

        float hash(vec2 p){
          return texture2D(u_noise,(p+0.5)/256.0,-100.0).x;
        }

        float noise(vec2 uv){
          vec2 id = floor(uv);
          vec2 subuv = fract(uv);
          vec2 u = subuv*subuv*(3.-2.*subuv);
          float a = hash(id);
          float b = hash(id+vec2(1.,0.));
          float c = hash(id+vec2(0.,1.));
          float d = hash(id+vec2(1.,1.));
          return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
        }

        float fbm(vec2 uv){
          float s = 0.;
          float m = 0.;
          float a = .5;
          for(int i=0;i<octaves;i++){
            s += a*noise(uv);
            m += a;
            a *= .5;
            uv *= 2.;
          }
          return s/m;
        }

        vec3 render(vec2 uv,float scale){
          vec2 id = floor(uv);
          vec2 subuv = fract(uv);
          vec2 rand = hash2(id);
          float bokeh = abs(scale);
          float particle = 0.;
          if(length(rand)>1.4){
            vec2 pos=subuv-.5;
            float field=length(pos);
            particle=smoothstep(.3,0.,field);
            particle+=smoothstep(.4,0.34*bokeh,field);
          }
          return vec3(particle*2.);
        }

        vec3 renderLayer(int layer,vec2 uv,inout float opacity){
          float scale=mod((u_time+zoomSpeed/float(layers)*float(layer))/zoomSpeed,-1.);
          uv*=35.;
          uv*=scale*scale;
          uv=rotate2d(u_time/10.)*uv;
          uv+=vec2(25.+sin(u_time*.1))*float(layer);
          vec3 pass=render(uv*multiplier,scale)*.2;
          opacity=1.+scale;
          float endOpacity=smoothstep(0.,0.4,scale*-1.);
          opacity+=endOpacity;
          return pass*opacity*endOpacity;
        }

        void main(){
          vec2 uv=(gl_FragCoord.xy-0.5*u_resolution.xy);

          if(u_resolution.y<u_resolution.x)
            uv/=u_resolution.y;
          else
            uv/=u_resolution.x;

          float n=fbm((uv+vec2(sin(u_time*.1),u_time*.1))*2.-2.);

          vec3 colour = n * mix(
  vec3(0.02, 0.02, 0.1),
  vec3(0.4, 0.0, 0.6),
  n
);

          float opacity=1.;
          float opacity_sum=1.;

          for(int i=1;i<=layers;i++){
            colour+=renderLayer(i,uv,opacity);
            opacity_sum+=opacity;
          }

          colour/=opacity_sum;

          gl_FragColor=vec4(clamp(colour*20.,0.,1.),1.);
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // -----------------------------
    // Resize
    // -----------------------------
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      )
    }

    window.addEventListener("resize", handleResize)

    // -----------------------------
    // Pointer
    // -----------------------------
    const handlePointer = (e: PointerEvent) => {
      const ratio = window.innerHeight / window.innerWidth
      uniforms.u_mouse.value.x =
        (e.pageX - window.innerWidth / 2) /
        window.innerWidth /
        ratio

      uniforms.u_mouse.value.y =
        ((e.pageY - window.innerHeight / 2) /
          window.innerHeight) *
        -1
    }

    window.addEventListener("pointermove", handlePointer)

    // -----------------------------
    // Animation
    // -----------------------------
    let frameId: number

    const animate = (delta = 0) => {
      uniforms.u_time.value = -10000 + delta * 0.0005
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointer)

      mountRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ touchAction: "none" }}
    />
  )
}

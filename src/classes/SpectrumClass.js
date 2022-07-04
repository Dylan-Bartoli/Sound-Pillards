import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// shaders
import spectrumFrag from '../shaders/spectrum.frag'
import spectrumVert from '../shaders/spectrum.vert'

class Spectrum {
  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader()
    this.textureLoader = new THREE.TextureLoader() 
  }

  init(scene) {
    this.scene = scene

    this.uniforms = {
        uMatCap : {
            value : this.textureLoader.load('assets/texture/blackMetal.png')
        },
        uSpecterSize : {
            value : .6
        },
        uWaveBorder : {
            value : .25
        },
        uBorderColor : {
          value : new THREE.Color('hsl(74, 100%, 85%)')
        },
        uTime : {
            value : 0
        }
    }

    this.shaderMat = new THREE.ShaderMaterial({
        fragmentShader : spectrumFrag,
        vertexShader : spectrumVert,
        uniforms : this.uniforms,
        transparent : true 
    })

    this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh)
          child.material = this.shaderMat
        // child.scale.multiplyScalar(1.25)
        child.scale.set(1.5, 2, 1.5)
        child.position.y  = -1.35
      })
      this.scene.add(glb.scene)
    })
  }

  update() {
    this.uniforms.uTime.value += 1
  }

  bind() {}
}

const _instance = new Spectrum()
export default _instance

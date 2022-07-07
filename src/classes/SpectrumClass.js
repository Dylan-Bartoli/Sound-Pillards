import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import MyGUI from '../utils/MyGUI'

import LoadingController from './LoadingController'

// shaders
import spectrumFrag from '../shaders/spectrum.frag'
import spectrumVert from '../shaders/spectrum.vert'

class Spectrum {
  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader(LoadingController)
    this.textureLoader = new THREE.TextureLoader(LoadingController)
  }

  init(scene) {
    this.scene = scene

    this.uniforms = {
      uMatCap: {
        value: this.textureLoader.load('assets/texture/blackMetal.png'),
      },
      uSpecterSize: {
        value: 0.6,
      },
      uWaveBorder: {
        value: 0.25,
      },
      uWaveSpeed: {
        value: 0.1,
      },
      uBorderColor: {
        value: new THREE.Color('hsl(74, 100%, 85%)'),
      },
      uTime: {
        value: 0,
      },
    }

    const shaderFolder = MyGUI.addFolder('Spectrum Folder')
    shaderFolder.add(this.uniforms.uSpecterSize, 'value', -1, 1).name('Spectrum Size')
    shaderFolder.add(this.uniforms.uWaveBorder, 'value', 0, 1).name('Wave Border')
    shaderFolder.add(this.uniforms.uWaveSpeed, 'value', 0, 1).step(.01).name('Wave Speed')

    this.shaderMat = new THREE.ShaderMaterial({
      fragmentShader: spectrumFrag,
      vertexShader: spectrumVert,
      uniforms: this.uniforms,
      transparent: true,
    })

    this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = this.shaderMat
        // child.scale.multiplyScalar(1.25)
        child.scale.set(1.5, 2, 1.5)
        child.position.y = -1
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

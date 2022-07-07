import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

// import pillards
import SpherePillards from './SpherePillardsClass'
// import floor
import Floor from './FloorClass'
// import Spectrum
import Spectrum from './SpectrumClass'
// import parlicles
import ParticlesSystem from './ParticlesSystem'

import CamParallax from './CamParallax'

class MainThreeScene {
  constructor() {
    this.bind()
    this.camera
    this.scene
    this.renderer
    this.controls
  }

  init(container) {
    //RENDERER SETUP
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.debug.checkShaderErrors = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    container.appendChild(this.renderer.domElement)

    //MAIN SCENE INSTANCE
    const color = new THREE.Color(0x151515)
    const fog = new THREE.Fog(color, 20, 30)
    this.scene = new THREE.Scene()
    this.scene.fog = fog
    this.scene.background = color

    //CAMERA AND ORBIT CONTROLLER
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 0, 10)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = false
    this.controls.maxDistance = 15
    this.controls.minDistance = 4
    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2 + .25

    CamParallax.init(this.camera)

    // add pillards to the scene
    SpherePillards.init(this.scene)
    // add floor to the scene
    Floor.init(this.scene)
    // add spectrum to the scene
    Spectrum.init(this.scene)
    ParticlesSystem.init(this.scene)

    MyGUI.hide()
    if (config.myGui) MyGUI.show()

    const camFolder = MyGUI.addFolder('Camera Folder')
    camFolder.open()
    camFolder
      .add(this.controls, 'enabled')
      .onChange(() => {
        if (this.controls.enabled) {
          CamParallax.active = false
        }
      })
      .listen()
      .name('Orbit Camera')
    camFolder
      .add(CamParallax, 'active')
      .onChange(() => {
        if (CamParallax.active) {
          this.controls.enabled = false
        }
      })
      .listen()
      .name('Parallax Camera')

    camFolder.add(CamParallax.params, 'intensity', 0.001, 0.01)
    camFolder.add(CamParallax.params, 'ease', 0.01, 0.1)

    //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
    window.addEventListener('resize', this.resizeCanvas)
    RAF.subscribe('threeSceneUpdate', this.update)
  }

  update() {
    this.renderer.render(this.scene, this.camera)
    
    this.scene.rotateY(0.0025)

    SpherePillards.update()
    Spectrum.update()
    ParticlesSystem.update()
    CamParallax.update()
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.update = this.update.bind(this)
    this.init = this.init.bind(this)
  }
}

const _instance = new MainThreeScene()
export default _instance

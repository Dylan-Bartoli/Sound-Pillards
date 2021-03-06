import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import SoundReactor from './SoundReactor'

import MyGUI from '../utils/MyGUI'

import LoadingController from './LoadingController'

class SpherePillardsClass {
  constructor() {
    this.bind()
    // create loader on costruct
    this.modelLoader = new GLTFLoader(LoadingController)
    // material loader
    this.textureLoader = new THREE.TextureLoader(LoadingController)

    // change params
    this.params = {
      waveSpeed : 1,
      subdivNum : 3,
      pillardSize : .2
    }
  }

  init(scene) {
    this.scene = scene
    this.upVec = new THREE.Vector3(0, 1, 0)
    this.pillards = new THREE.Group()
    // declare a pillard
    this.pillard
    // load material
    const gTex = this.textureLoader.load('./assets/texture/greyMetal.png')
    const bTex = this.textureLoader.load('./assets/texture/blackMetal.png')
    // set up material
    this.gMatCap = new THREE.MeshMatcapMaterial({
      matcap: gTex,
    })
    this.bMatCap = new THREE.MeshMatcapMaterial({
      matcap: bTex,
    })
    // load the blender model
    this.modelLoader.load('./assets/models/pillard.glb', (glb) => {
      // pass al children of this scene instace
      glb.scene.traverse((child) => {
        // if one child is an instace of a THREE mesh then add a mesh normal material to it
        if (child.name === 'Torus001') {
          this.pillard = child
          child.material = this.bMatCap
        } else if (child.name === 'Cylinder') child.material = this.gMatCap
      })
      // call position
      this.computePositions()
    })

    const sphereFolder = MyGUI.addFolder('Sphere Pillards')
    sphereFolder.open()
    sphereFolder.add(this.params, 'waveSpeed', 0.001, 3).name('Wave Speed')
    sphereFolder.add(this.params, 'subdivNum', 1, 10).step(1).name('Ico Subdivisions').onChange(this.computePositions)
    sphereFolder.add(this.params, 'pillardSize', 0.01, 1).name('Pillard Size').onChange(this.computePositions)
  }

  computePositions() {

    let ico

    this.scene.traverse(child => {
      if(child.name === 'ico') {
        ico = child
      }
    })

    if (ico)
      this.scene.remove(ico)

    // create a ico sphere 2 --> dim and 4 --> is subsections
    const sphereGeometry = new THREE.IcosahedronGeometry(2, this.params.subdivNum)
    const sphereMat = this.gMatCap
    const sphere = new THREE.Mesh(sphereGeometry, sphereMat)
    sphere.name = 'ico'
    this.scene.add(sphere)

    this.pillards.clear()

    // create and array for storing each vertex coordinates
    let vertexArray = []
    for (
      let i = 0;
      i < sphereGeometry.attributes.position.array.length;
      i += 3
    ) {
      const x = sphereGeometry.attributes.position.array[i]
      const y = sphereGeometry.attributes.position.array[i + 1]
      const z = sphereGeometry.attributes.position.array[i + 2]
      // push coordinates into the array
      vertexArray.push({
        x: x,
        y: y,
        z: z,
      })
    }

    // create an array to store each pillard position
    let pillardPosition = []
    // check if mulitple data repeat itself
    for (let i = 0; i < vertexArray.length; i++) {
      let existsFlag = false
      for (let j = 0; j < pillardPosition.length; j++) {
        if (
          pillardPosition[j].x === vertexArray[i].x &&
          pillardPosition[j].y === vertexArray[i].y &&
          pillardPosition[j].z === vertexArray[i].z
        ) {
          existsFlag = true
        }
      }

      if (!existsFlag) {
        pillardPosition.push({
          x: vertexArray[i].x,
          y: vertexArray[i].y,
          z: vertexArray[i].z,
        })
        const c = this.pillard.clone()
        const posVec = new THREE.Vector3(
          vertexArray[i].x,
          vertexArray[i].y,
          vertexArray[i].z
        )
        c.position.copy(posVec)
        c.scale.multiplyScalar(this.params.pillardSize)
        c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize())
        this.pillards.add(c)
      }
    }
    this.scene.add(this.pillards)
  }

  update() {
    if (SoundReactor.playFlag) {
      let i = 0
      while (i < this.pillards.children.length) {
        this.pillards.children[i].children[0].position.y = SoundReactor.fdata[i] / 255 * 2
        i++
      }
    } else {
      let i = 0
      while (i < this.pillards.children.length) {
        this.pillards.children[i].children[0].position.y =
          (Math.sin(Date.now() * 0.005 * this.params.waveSpeed + this.pillards.children[i].position.x) +
            1) *
          0.75
        i++
      }
    }
  }

  bind() {
    this.computePositions = this.computePositions.bind(this)
  }
}

const _instance = new SpherePillardsClass()
export default _instance

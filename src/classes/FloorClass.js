import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


class FloorClass {
    constructor() {
        this.bind()
        // create loader on costruct
        this.modelLoader = new GLTFLoader()
    }

    init(scene) {
        this.scene = scene
        
        this.floor
        // // load the blender model
        this.modelLoader.load('./assets/models/floor.glb', (glb) => {
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh)
                    this.floor = child
            })
            this.floor.translateY(-3)
            this.scene.add(this.floor)
        })
    }

    update() {

    }

    bind() {

    }
}

const _instance = new FloorClass()
export default _instance
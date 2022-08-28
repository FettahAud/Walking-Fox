import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

let instance = null

export default class App {
   constructor(canvas) {

      if(instance) {
         return instance
      }
      instance = this

      window.app = this

      this.canvas = canvas

      // setup 
      this.debug = new Debug()
      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.resources = new Resources(sources)
      this.camera = new Camera()
      this.renderer = new Renderer()
      this.world = new World()
      
      // size resize event
      this.sizes.on('resize', () => {
         this.resize()
      })

      // time tick event
      this.time.on('tick', () => {
         this.update()
      })
   }
   resize() {
      this.camera.resize()
      this.renderer.resize()
   }

   update() {
      this.camera.update()
      this.world.update()
      this.renderer.update()
   }
   destroy() {
      this.sizes.off('resize')
      this.time.off('tick')

      this.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
               child.geometry.dispose()
                
               for (const key in child.material) {
                  const value = child.material[key];
                  if (value && typeof value.dispose === 'function') {
                     value.dispose()
                  }
               }
            }
      })
      this.camera.controls.dispose()
   }
}
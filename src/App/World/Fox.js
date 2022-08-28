import * as THREE from 'three'
import App from '../App.js'

export default class Fox {
   constructor() {
      this.app = new App()
      this.scene = this.app.scene
      this.resources = this.app.resources
      this.time = this.app.time
      // setup
      this.resource = this.resources.items.foxModel
      
      // debug
      this.debug = this.app.debug
      this.debugFox = this.debug.ui.addFolder('fox')

      this.setModel()
      this.setAnimation()
   }
   setModel() {
      this.model = this.resource.scene
      this.model.scale.set(0.02, 0.02, 0.02)
      this.model.position.set(0, -.5, 0)
      this.scene.add(this.model)
      this.ground = this.app.world.ground

      this.foxMoving = true

      this.model.traverse((child) => {
         if(child instanceof THREE.Mesh) {
            child.castShadow = true
         }
      })
   }
   setAnimation() {
      this.animation = {}
      this.animation.mixer = new THREE.AnimationMixer(this.model)
      this.animation.actions = {}
      this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
      this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
      this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

      this.animation.actions.current = this.animation.actions.walking
      this.animation.actions.current.play()

      this.animation.play = (name) => {
         const newAction = this.animation.actions[name]
         const oldAction = this.animation.actions.current

         newAction.reset()
         newAction.play()
         newAction.crossFadeFrom(oldAction, 1)

         this.animation.actions.current = newAction
      }

      const debugObj = {
         idle: () => {
            this.animation.play('idle')
            this.foxMoving = false
         },
         walk: () => {
            this.animation.play('walking')
            this.foxMoving = true
         },
         run: () => {
            this.animation.play('running')
            this.foxMoving = true
         },
      }
      this.debugFox.add(debugObj, 'idle')
      this.debugFox.add(debugObj, 'walk')
      this.debugFox.add(debugObj, 'run')
   }
   update() {
      this.animation.mixer.update(this.time.delta * 0.001)
   }
}
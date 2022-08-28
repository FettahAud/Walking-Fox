import * as THREE from 'three'

import App from '../App.js'

export default class Environment {
   constructor() {
      this.app = new App()
      this.scene = this.app.scene
      this.resources = this.app.resources
      this.debug = this.app.debug

      this.environmentDebug = this.debug.ui.addFolder('Environment')
       
      this.setSunLight()
      this.setEnvironmentMap()
   }
   setSunLight() {
      this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
      this.sunLight.castShadow = true
      this.sunLight.shadow.camera.far = 15
      this.sunLight.shadow.mapSize.set(1024, 1024)
      this.sunLight.shadow.normalBias = 0.05
      this.sunLight.position.set(3.5, 2, - 1.25)
      this.scene.add(this.sunLight)

      this.environmentDebug
         .add(this.sunLight, 'intensity', 0, 10, 0.001)
         .name('Sun intensity')
      this.environmentDebug
         .add(this.sunLight.position, 'x', -5, 5, 0.001)
         .name('Sun X')
      this.environmentDebug
         .add(this.sunLight.position, 'y', -5, 5, 0.001)
         .name('Sun Y')
      this.environmentDebug
         .add(this.sunLight.position, 'z', -5, 5, 0.001)
         .name('Sun Z')
   }
   setEnvironmentMap() {
      this.environmentMap = {
         intensity: 0.4,
         texture: this.resources.items.environmentMapTexture,
      }
      this.environmentMap.texture.encoding = THREE.sRGBEncoding

      this.scene.environment = this.environmentMap.texture

      this.environmentMap.updateMaterials = () => {
         this.scene.traverse((child) => {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
               child.material.envMap = this.environmentMap.texture
               child.material.envMapIntensity = this.environmentMap.intensity
               child.material.needsUpdate = true
            }
         })
      }
      this.environmentMap.updateMaterials()

      this.environmentDebug
         .add(this.environmentMap, 'intensity', 0, 4, 0.001)
         .name('Env Map Intensity')
         .onChange(this.environmentMap.updateMaterials)

   }
}
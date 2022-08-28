import * as THREE from 'three'

import App from "../App.js";

export default class Ground {
   constructor() {
      this.app = new App()
      this.scene = this.app.scene
      this.resources = this.app.resources
      this.time = this.app.time

      this.setGeometry()
      this.setTexture()
      this.setMaterial()
      this.setMesh()
   }
   setGeometry() {
      this.geometry = new THREE.SphereGeometry(3, 32, 16, 16)
   }
   setTexture() {
      this.textures = {}
      this.textures.color = this.resources.items.grasColorTexture
      this.textures.color.encoding = THREE.sRGBEncoding
      this.textures.color.repeat.set(1.5, 1.5)
      this.textures.color.wrapS = THREE.RepeatWrapping
      this.textures.color.wrapT = THREE.RepeatWrapping

      this.textures.normal = this.resources.items.grasNormalTexture
      this.textures.normal.repeat.set(1.5, 1.5)
      this.textures.normal.wrapS = THREE.RepeatWrapping
      this.textures.normal.wrapT = THREE.RepeatWrapping
   }
   setMaterial() {
      this.material = new THREE.MeshStandardMaterial({
         map: this.textures.color,
         normalMap: this.textures.normal
      })
   }
   setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.rotation.x = - Math.PI * 0.5
      this.mesh.position.set(0, -3.4, 0)
      this.mesh.receiveShadow = true
      this.scene.add(this.mesh)
   }
   rotate() {
      this.mesh.rotation.x += -this.time.delta * 0.001
   }
}
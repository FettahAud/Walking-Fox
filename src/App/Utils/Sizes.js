import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter {
   constructor() {
      super()

      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = window.devicePixelRatio
      
      window.addEventListener('resize', () => {
         this.width = window.innerWidth
         this.height = window.innerHeight
         this.pixelRatio = window.devicePixelRatio

         this.trigger('resize')
      })
   }
}
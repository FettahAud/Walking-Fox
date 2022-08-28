import App from "../App";
import Environment from './Environment.js';
import Ground from './Ground';
import Fox from './Fox';

export default class World {
   constructor() {
      this.app = new App()

      this.scene = this.app.scene
      this.resources = this.app.resources 

      this.resources.on('resources are ready', () => {
         // setup 
         this.ground = new Ground()
         this.fox = new Fox()
         this.environment = new Environment()
      })

   }
   update() {
      if(this.fox)
         this.fox.update()
      if(this.ground && this.fox.foxMoving)
         this.ground.rotate()
   }
}
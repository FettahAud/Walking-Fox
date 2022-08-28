import App from "../App.js";
import * as dat from "lil-gui"

export default class Debug {
   constructor() {
      this.active = window.location.hash === "#debug"
      this.ui = new dat.GUI()

      if (!this.active) {
         this.ui.hide()
      }
   }
}
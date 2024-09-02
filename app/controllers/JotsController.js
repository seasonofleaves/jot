import { AppState } from "../AppState.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";
import { jotService } from "../services/JotService.js";

export class JotsController {
  constructor() {
    AppState.on('Jots', this.drawJots)
    AppState.on('activeJot', this.drawActiveJot)
    AppState.on('Jots', this.jotArrayLength)

    jotService.loadJots()
    this.drawJots()
    this.jotArrayLength()
  }

  jotArrayLength() {
    const jots = AppState.Jots
    const jotLength = jots.length
    const lengthElm = document.getElementById('jot-length')
    lengthElm.innerHTML = jotLength.toString()
    console.log(jotLength);
  }

  drawJots() {
    const jots = AppState.Jots
    let jotsHTML = ''
    jots.forEach(jot => jotsHTML += jot.jotHTMLTemplate)
    setHTML('jot-list', jotsHTML)
  }

  drawActiveJot() {
    const jot = AppState.activeJot
    // console.log('drawing active!', jot)
    setHTML('jot-body', jot.bodyHTMLTemplate)
  }

  setActiveJot(jotId) {
    // console.log(`Setting active jot file with the id of ${jotId}`)
    jotService.setActiveJot(jotId)
  }

  updatedJot() {

    const textareaElm = event.target
    // @ts-ignore
    const updatedBody = textareaElm.value
    console.log(updatedBody)
    jotService.updateJot(updatedBody)

  }


  createJot() {
    event.preventDefault()
    console.log('creating case file!')
    const jotForm = event.target
    const jotFormData = getFormData(jotForm)
    console.log('data from form', jotFormData)
    jotService.createJot(jotFormData)
  }

  deleteJot(jotId) {
    const wantsToDelete = window.confirm("Are you sure you want to delete this car?")
    if (!wantsToDelete) return

    console.log('Deleting car!', jotId)
    jotService.deleteJot(jotId)
    this.drawJots()
  }
}
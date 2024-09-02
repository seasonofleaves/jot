import { AppState } from "../AppState.js";
import { Jot } from "../models/Jots.js";
import { Pop } from "../utils/Pop.js";
import { loadState, saveState } from "../utils/Store.js";

class JotService {
  createJot(rawJotData) {
    const jots = AppState.Jots
    const newJot = new Jot(rawJotData)
    jots.push(newJot)
    this.saveJots()
    this.updateJot()
  }

  updateJot(updatedBody) {
    console.log(updatedBody);

    const jot = AppState.activeJot
    jot.body = updatedBody
    jot.updatedAt = new Date()
    AppState.emit('activeJot')
    AppState.emit('Jots')
    this.saveJots()
    console.log('working')

  }

  setActiveJot(jotId) {
    const jot = AppState.Jots
    const foundJot = jot.find(jot => jot.id == jotId)
    AppState.activeJot = foundJot
    // console.log('found case file!', foundJot)
  }

  saveJots() {
    saveState('jots', AppState.Jots)
  }

  loadJots() {
    const jotsFromLocalStorage = loadState('jots', [Jot])
    AppState.Jots = jotsFromLocalStorage
  }

  deleteJot(jotId) {
    const jots = AppState.Jots
    const jotIndex = jots.findIndex(jot => jot.id == jotId)
    jots.splice(jotIndex, 1)
    this.saveJots()
    Pop.success()
  }

}

export const jotService = new JotService()
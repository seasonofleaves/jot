import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Jot } from './models/Jots.js'

class ObservableAppState extends EventEmitter {
  /**@type{Jot[]}*/
  Jots = [
    new Jot({
      name: 'Test 1',
      body: "Godfather ipsum dolor sit amet. The hotel, the casino. The Corleone Family wants to buy you out. We're both part of the same hypocrisy, senator, but never think it applies to my family."
    }),
    new Jot({
      name: 'Test 2',
      body: "My father is no different than any powerful man, any man with power, like a president or senator. Why did you go to the police? Why didn't you come to me first? That's my family Kay, that's not me"
    })
  ]
  /**@type {Jot}*/
  activeJot = null
  
}

export const AppState = createObservableProxy(new ObservableAppState())
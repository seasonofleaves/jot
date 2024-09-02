import { generateId } from "../utils/GenerateId.js";


export class Jot {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.body = data.body
    this.color = data.color
    this.dateCreated = data.dateCreated == undefined ? new Date() : new Date(data.dateCreated)
    this.updatedAt = data.updatedAt == undefined ? new Date() : new Date(data.updatedAt)
  }

  get jotHTMLTemplate() {
    return `
     <div onclick="app.JotsController.setActiveJot('${this.id}')" class="mb-2 p-2 selectable" role="button">
          <h5>${this.name}</h5>
          <p>${this.createdDate}</p>
        </div>
    `
  }

  get bodyHTMLTemplate() {
    return `
       <div class="m-2" style="background-color: ${this.color};">
       <div class="d-flex justify-content-between">   
       <h3>${this.name}</h3>
       <i onclick="app.JotsController.deleteJot('${this.id}')" class="mdi mdi-delete-forever text-danger"
       role="button" title="Delete this Jot"></i>
       </div>
          <span>Created on: ${this.createdDate}</span>
          <p>Last Updated: ${this.lastUpdatedAt}</p>
          <textarea class="jot-body">${this.body}</textarea>
          <button onclick="app.JotsController.updatedJot()">Save</button>
        </div>
    `
  }

  get createdDate() {
    return this.dateCreated.toLocaleDateString()
  }

  get lastUpdatedAt() {
    return this.updatedAt.toLocaleString()
  }

}

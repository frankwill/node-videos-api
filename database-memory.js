import { randomUUID } from "node:crypto"

/*
  Essa classe vai representar meu banco de dados em memória e as operações
  que posso fazer nele, seus métodos de crud sempre irão jogar os videos para a
  estrutura de dados chamado Map.
*/
export class DatabaseMemory {
  #videos = new Map()

  list(search) {
    return Array.from(this.#videos.entries())
    .map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      const newObject = {
        id,
        ...data,
      }

      return newObject
    })
    .filter(video => {
      if(search){
        return video.title.includes(search)
      }

      return true
    })
  }

  create(video) {
    /* 
      Ao criar um video eu irei gerar um id para esse vídeo
      com o método randomUUID.

      UUID - Unique Universal ID
    */
    const videoId = randomUUID()
    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}

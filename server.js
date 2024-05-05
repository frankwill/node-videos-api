/*
  Criando um servidor http simples
*/
// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write('Hello Word')
//   return response.end()
// })

// server.listen(3333)

// Criando um servidor http com o framework fastify
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
// import { DatabaseMemory } from './database-memory.js'


const server = fastify()

// const database = new DatabaseMemory();
const database = new DatabasePostgres()

/*
  Criando rotas para a aplicação, server.get('/')
  significa quandoo usuário estiver no endereço de /
  irá retornar um 'Hello World' e assim sucessivamente
  para as demais rotas.
*/
server.post('/videos', async (request, reply) => {

  /* REQUEST BODY
    Nas rotas de post e put eu posso envior um corpo
    para a requisição, o corpo seria os dados enviados
    de um formulário para o nosso servidor node.
  */
  // const body = request.body
  const { title, description, duration } = request.body

  /*
    Com os dados pegos do corpo da requisição que é
    o formulário, eu passo esses dados para a minha
    classe database com seu método create, e crio um
    video em meu banco de dados com esses dados do 
    formulário.
  */
  await database.create({
    title: title,
    description: description,
    duration: duration
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search
  const videos = await database.list(search)
  return videos
})

/* 
  Nas duas rotas abaixo o ":id" significa que quando essa rota for
  acessada, a mesma deverá receber o ID do video que esta sendo
  atualizado ou excluido, isso se chama route parameters.
*/
server.put('/videos/:id', async(request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body
  
  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id

  database.delete(videoId)

  return reply.status(204).send()

})


// Definindo a porta que o servidor node vai ouvir nossas requisições http
server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})

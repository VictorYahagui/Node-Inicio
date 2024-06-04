/*
import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.write('hi')
    return response.end()
});

server.listen(3333);
*/

import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres()


server.post('/videos', async (req, res) => {
    const { title, description, duration } = req.body;

    await database.create({
        //short description: utilizado quando a variavel que 
        //esta com o conteudo possui o mesmo nome da variavel que recebe
        //title: title === title na short description
        title,
        description,
        duration,
    });
    return res.status(201).send();
});
server.get('/videos', async (req, res) => {
    const search = req.query.search

    const videos = await database.list(search)
    return videos;
});

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id;
    const { title, description, duration } = req.body;
    await database.update(videoId, {
        title,
        description,
        duration,
    })
    return res.status(204).send();
});

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;
    await database.delete(videoId)
    return res.status(204).send();
});


server.listen({
    port: process.env.PORT ?? 3333,
})
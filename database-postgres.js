import { randomUUID } from "node:crypto"
import { sql } from './db.js';

export class DatabasePostgres {
    #videos = new Map();

    async list(search = '') {
        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos"`
        }
    }

    async create(video) {
        const videoId = randomUUID();

        const { title, descripton, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${descripton}, ${duration} )`
    }

    async update(id, video) {
        const { title, descripton, duration } = video

        await sql`update videos SET title = ${title}, description = ${descripton}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos WHERE id = ${id}`
    }
}
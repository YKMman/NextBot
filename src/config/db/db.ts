import { Pool } from 'pg'

let conn: Pool;


conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    // @ts-ignore
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});




export default conn;
import pkg from 'pg';
const { Pool } = pkg;

class DBhandler {
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'instagramclone',
            password: 'nicetrylol',
            port: 7000,
        });
    }

    async executeQuery(query, client) {
        return client.query(query);
    }

    async addUser(username, password) {
        let client = await this.pool.connect();
        let pfpurl = "C:/Users/Charles/Desktop/Projects/InstagramParody/instagram-frontend/src/Images/defaultpfp.png";
        let query = `INSERT INTO users(username, password, pfpurl) VALUES('${username}', '${password}', '${pfpurl}')`;
        let res = await this.executeQuery(query, client);
        client.release();
    }
    async login(username, password) {
        let client = await this.pool.connect();
        let query = `SELECT password FROM users WHERE username='${username}'`;
        let res = await this.executeQuery(query, client);
        client.release();
        if(res.rows[0].password==password){
            return true;
        }else{
            return false;
        }
    }
    async addPost(username, photo, caption) {
        let client = await this.pool.connect();
        let query = `INSERT INTO post(content, username, caption) VALUES('${photo}', '${username}', '${caption}')`;
        let res = await this.executeQuery(query, client);
        client.release();
        return res;
    }
    async getpostnumber(){
        let client = await this.pool.connect();
        let query = `SELECT * FROM post`;
        let res = await this.executeQuery(query, client);
        client.release();
        return res.rows.length;
    }
}

export default DBhandler;

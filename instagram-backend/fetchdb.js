import pkg from 'pg';
const { Pool } = pkg;

class DBhandler {
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'instagramclone',
            password: 'lol:)',
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
    async getuserdata(username){
        let client = await this.pool.connect();
        let query = `SELECT * FROM users WHERE username='${username}'`;
        let res = await this.executeQuery(query, client);
        let userdata = res.rows[0];
        query = `SELECT * FROM followers WHERE followed='${username}'`;
        res = await this.executeQuery(query, client);
        userdata.followers = res.rows.length;
        query = `SELECT * FROM followers WHERE follower='${username}'`;
        res = await this.executeQuery(query, client);
        userdata.following = res.rows.length;
        client.release();
        return userdata;
    }
    async changepfp(username, pfpurl){
        let client = await this.pool.connect();
        let query = `UPDATE users SET pfpurl='${pfpurl}' WHERE username='${username}'`;
        let res = await this.executeQuery(query, client);
        client.release();
        return res;
    }
    async getuserposts(username){
        let client = await this.pool.connect();
        let query = `SELECT * FROM post WHERE username = '${username}' ORDER BY timeofpost DESC;
        `;
        let res = await this.executeQuery(query, client);
        client.release();
        return res.rows;
    }
    async getfollowing(username){
        let client = await this.pool.connect();
        let query = `SELECT * FROM followers WHERE follower = '${username}'`;
        let res = await this.executeQuery(query, client);
        client.release();
        res.rows.forEach((row, index) => {
            res.rows[index] = row.followed;
        });
        return res.rows;
    }
    async addfollower(follower, followed){
        let client = await this.pool.connect();
        let query = `INSERT INTO followers(follower, followed) VALUES('${follower}', '${followed}')`;
        let res = await this.executeQuery(query, client);
        client.release();
        return res;
    }
    async getrandusers(){
        let client = await this.pool.connect();
        let query = `SELECT * FROM users`;
        let res = await this.executeQuery(query, client);
        client.release();
        return [res.rows[Math.floor((Math.random()*res.rows.length))].username, res.rows[Math.floor((Math.random()*res.rows.length))].username, res.rows[Math.floor((Math.random()*res.rows.length))].username, res.rows[Math.floor((Math.random()*res.rows.length))].username, res.rows[Math.floor((Math.random()*res.rows.length))].username];
    }
    async removeduplicates(arr){
        let dict = {};
        for(let i = 0; i < arr.length; i++){
            dict[arr[i]] = 1;
        }
        let newarr = [];
        for(let key in dict){
            newarr.push(key);
        }
        return newarr;
    }
}

export default DBhandler;

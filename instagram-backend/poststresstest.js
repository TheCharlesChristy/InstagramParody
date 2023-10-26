import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
class testworker {
    constructor() {
        this.username = "Charles";
    }
    doposttest(interval, runtime){
        let runtimeinms = runtime * 60000;
        let posts = 0;
        setInterval(() => {
            this.post();
            posts++;
            console.log("Post #" + posts + " posted")
            runtimeinms -= interval;
            if(runtimeinms <= 0){
                clearInterval();
            }
            if(interval > 1){
                interval--;
            }
        }, interval);
    }
    post(){
        this.generatepost().then((post) => {
            fetch('http://localhost:5000/api/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
    async generatepost(){
        let cap = await this.generatecaption();
        let photo = await this.getimgdata("C:/Users/Charles/Desktop/Projects/InstagramParody/random_noise_image.png")
        photo="data:image/webp;base64,"+photo;
        return {username: this.username, photo: photo, caption: cap};
    }
    async generatecaption(){
        let cap = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 4000; i++){
            cap += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return cap;
    }
    async getimgdata(path){
        const imageData = readFileSync(path);
        const base64Data = imageData.toString('base64');
        return base64Data;
    }
}

export default testworker;
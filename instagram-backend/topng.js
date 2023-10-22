import sharp from 'sharp';
import { writeFileSync} from 'fs';

class Tofile{
    constructor() {
        console.log("Hi")
    }
    async convert(data, name){
        const dataParts = data.split(';base64,');
        const base64Data = dataParts[1];
        const binaryData = Buffer.from(base64Data, 'base64');
        const outputPath = "C:/Users/Charles/Desktop/Projects/InstagramParody/instagram-backend/Postimgs/"+name+".webp";
        writeFileSync(outputPath, binaryData, 'binary');
        sharp(binaryData).webp().toFile(outputPath, (err) => {
            if (err) {
            console.error('Error:', err);
            } else {
            }
        });
        return outputPath;
    }
}

export default Tofile;

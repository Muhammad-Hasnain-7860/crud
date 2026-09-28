import ImageKit, { toFile } from '@imagekit/nodejs';
import config from '../config/dotenv.js';

const client = new ImageKit({
    privateKey : config.image_kit_private,   
});
;


export const uploadFile = async (file, fileName) => {
    const uploadFile = await client.files.upload({
    file: await toFile(file , fileName),
    fileName: fileName,
    folder : 'snitch'
    })

    return uploadFile
}
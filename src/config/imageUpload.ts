import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

export default (buffer) => {
    return new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(buffer).pipe(stream);
    });
};
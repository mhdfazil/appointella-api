import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { ConfigService } from '@nestjs/config'

export default (buffer) => {
  cloudinary.config({
    sign_url: 'cloudinary://571563212378151:zIQn6pBp4dYGnqSZA0sk0ZD7kII@appointella'
  });
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
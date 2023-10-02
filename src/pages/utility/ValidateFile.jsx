

const ValidatorImage = (image) => {
   var image_preview;
   var image_as_base64 = URL.createObjectURL(image);

   var image_as_files = image;

   if (image_as_files !== null) {
      if (parseFloat(image_as_files.size) < 1574364) {
         image_preview = image_as_base64;
         const validJpg = 'jpg';
         const validJpeg = 'jpeg';
         const validPng = 'png';
         const nameFile = image_as_files.name.split('.');

         const extension = nameFile.toString().toLowerCase().slice(-3);
         if (!validJpg.indexOf(extension) || !validPng.indexOf(extension)) {
            if (!validJpg.indexOf(extension)) {
               const data = {
                  image_preview: image_as_base64,
                  fileObject: image_as_files,
               };
               return data;
            } else if (!validPng.indexOf(extension)) {
               const data = {
                  image_preview: image_as_base64,
                  fileObject: image_as_files,
               };
               return data;
            } else {
               const data = {
                  gambarNotValid: 'Error, yang anda upload bukan gambar!!!',
               };
               return data;
            }
         } else {
            const extension = nameFile.toString().toLowerCase().slice(-4);
            if (!validJpeg.indexOf(extension)) {
               const data = {
                  image_preview: image_as_base64,
                  fileObject: image_as_files,
               }
               return data;
            } else {
               const data = {
                  gambarNotValid: 'Error, yang anda upload bukan file!!!',
               };
               return data;
            }
         }
      } else {
         const data = {
            image_preview: image_as_base64,
            sizeOver: 'Size gambar yang diupload maksimal 1 MB',
         };
         return data;
      }
   }
}

const ValidatorVideo = (video) => {
   var video_preview;
   var video_as_base64 = URL.createObjectURL(video);

   var video_as_files = video;

   if (video_as_files !== null) {
      if (parseFloat(video_as_files.size) < 20432800000) {
         const validMp3 = 'mp3';
         const validMp4 = 'mp4';
         const validFlv = 'flv';
         const validMkv = 'mkv';
         const nameFile = video_as_files.name.split('.');

         const extension = nameFile.toString().toLowerCase().slice(-3);
         if (!validMp3.indexOf(extension) || !validMp4.indexOf(extension) || !validFlv.indexOf(extension) || !validMkv.indexOf(extension)) {
            if (!validMp4.indexOf(extension)) {
               const data = {
                  videoObject: video_as_files,
               };
               return data;
            } else if (!validFlv.indexOf(extension)) {
               const data = {
                  videoObject: video_as_files,
               };
               return data;
            } else if (!validMkv.indexOf(extension)) {
               const data = {
                  videoObject: video_as_files,
               };
               return data;
            } if (!validMp3.indexOf(extension)) {
               const data = {
                  videoObject: video_as_files,
               };
               return data;
            } else {
               const data = {
                  videoNotValid: 'Error, yang anda upload bukan video atau audio!!!',
               };
               return data;
            }
         }
      } else {
         const data = {
            video_preview: video_as_base64,
            sizeOver: 'Size video atau audio yang diupload maksimal 20 MB',
         };
         return data;
      }

   }
}


const ValidateFile = {
   ValidatorImage,
   ValidatorVideo
}

export default ValidateFile;
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    if (file) {
      cb(null, `src/assets/uploads`);
    } else {
      cb('multer error');
    }
  },
  filename: function (req: any, file: any, cb: any) {
    if (file) {
      cb(null, Date.now() + '_' + file.originalname);
    } else {
      cb('multer error');
    }
  },
});
const upload = multer({ storage: storage });
export default upload;

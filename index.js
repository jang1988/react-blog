import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validation.js';
import { checkAuth, handleErrors } from './utils/index.js';
import {
  getMe,
  login,
  register,
  create,
  getAll,
  getOne,
  remove,
  update,
} from './controller/index.js';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ielym5z.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => {
    console.log('error', err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, handleErrors, register);
app.post('/auth/login', loginValidation, handleErrors, login);
app.get('/posts', getAll);
app.get('/posts/:id', getOne);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/auth/me', checkAuth, getMe);
app.post('/posts', checkAuth, postCreateValidation, handleErrors, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('WEB SERVER START');
});

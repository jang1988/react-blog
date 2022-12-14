import express from 'express';
import mongoose from 'mongoose';
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controller/UserController.js';
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from './controller/PostController.js';

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

app.use(express.json());


app.post('/auth/register', registerValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/posts', getAll);
app.get('/posts/:id', getOne);

app.get('/auth/me', checkAuth, getMe);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('WEB SERVER START');
});

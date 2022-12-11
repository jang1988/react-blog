import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controller/UserController.js';

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.ielym5z.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => {
    console.log('errrror', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('WEB SERVER START');
});

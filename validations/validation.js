import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Не верный формат').isEmail(),
  body('password', 'Не верный формат').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Не верный формат').isEmail(),
  body('password', 'Не верный формат').isLength({ min: 5 }),
  body('fullName', 'Не верный формат').isLength({ min: 3 }),
  body('avatarUrl', 'Не верный формат').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Введите формат тэга').optional().isArray(),
  body('imageUrl', 'Не верная ссылка').optional().isString(),
];

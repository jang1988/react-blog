import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imagesUrl: req.body.imagesUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    console.log('post: ', post)

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

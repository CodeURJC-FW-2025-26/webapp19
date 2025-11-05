import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as clothing_shop from './clothing_shop.js';

const router = express.Router();
export default router;

const upload = multer({ dest: clothing_shop.UPLOADS_FOLDER })

router.get('/', async (req, res) => {

    let posts = await clothing_shop.getPosts();

    res.render('index', { posts });
});

router.get(['/form.html', '/form'], (req, res) => {
    res.render('form');
});

router.get(['/detail.html', '/detail'], (req, res) => {
    res.render('detail');
});

router.post('/post/new', upload.single('image'), async (req, res) => {

    let post = {
        user: req.body.user,
        title: req.body.title,
        text: req.body.text,
        imageFilename: req.file?.filename
    };

    await clothing_shop.addPost(post);

    res.render('saved_post', { _id: post._id.toString() });

});

router.get('/post/:id', async (req, res) => {

    let post = await clothing_shop.getPost(req.params.id);

    res.render('show_post', { post });
});

router.get('/post/:id/delete', async (req, res) => {

    let post = await clothing_shop.deletePost(req.params.id);

    if (post && post.imageFilename) {
        await fs.rm(clothing_shop.UPLOADS_FOLDER + '/' + post.imageFilename);
    }

    res.render('deleted_post');
});

router.get('/post/:id/image', async (req, res) => {

    let post = await clothing_shop.getPost(req.params.id);

    res.download(clothing_shop.UPLOADS_FOLDER + '/' + post.imageFilename);

});


import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as clothing_shop from './clothing_shop.js';

const router = express.Router();
export default router;

const upload = multer({ dest: clothing_shop.UPLOADS_FOLDER })

router.get('/', async (req, res) => {

    let garments = await clothing_shop.getgarments();

    res.render('index', { garments });
});

router.get(['/form.html', '/form'], (req, res) => {
    res.render('form');
});

router.get(['/detail.html', '/detail'], (req, res) => {
    res.render('detail');
});

router.post('/garment/new', upload.single('image'), async (req, res) => {

    let garment = {
        user: req.body.user,
        title: req.body.title,
        text: req.body.text,
        imageFilename: req.file?.filename
    };

    await clothing_shop.addGarment(garment);

    res.render('saved_garment', { _id: garment._id.toString() });

});

router.get('/garment/:id', async (req, res) => {

    let garment = await clothing_shop.getGarment(req.params.id);

    res.render('show_garment', { garment });
});

router.get('/garment/:id/delete', async (req, res) => {

    let garment = await clothing_shop.deleteGarment(req.params.id);

    if (garment && garment.imageFilename) {
        await fs.rm(clothing_shop.UPLOADS_FOLDER + '/' + garment.imageFilename);
    }

    res.render('deleted_garment');
});

router.get('/garment/:id/image', async (req, res) => {

    let garment = await clothing_shop.getGarment(req.params.id);

    res.download(clothing_shop.UPLOADS_FOLDER + '/' + garment.imageFilename);

});


import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as clothing_shop from './clothing_shop.js';

const router = express.Router();
export default router;

const upload = multer({ dest: clothing_shop.UPLOADS_FOLDER })

router.get('/', async (req, res) => {

    let garments = await clothing_shop.getgarments();

    const page = parseInt(req.query.page) || 1;  
    const perPage = 6;

    const totalPages = Math.ceil(garments.length / perPage);

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const garmentsPage = garments.slice(start, end);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push({
            number: i,
            url: '/?page=' + i,
            isCurrent: i === page
        });
    }

    res.render('index', {
        garments: garmentsPage,
        pages: pages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
        prevUrl: '/?page=' + (page - 1),
        nextUrl: '/?page=' + (page + 1)
    });
});

router.get('/form', (req, res) => {
    res.render('form');
});

router.get(['/detail.html/:id', '/detail/:id'], async (req, res) => {

    const garment = await clothing_shop.getGarment(req.params.id);

    //converting rating into boolean array for mustache use
    const renderInfo = structuredClone(garment);
    for (let i = 0; i<renderInfo.customerReviews.length; i++) {
        let currentReview = renderInfo.customerReviews[i];
        const rating = [];
        for (let j = 0; j<5; j++) {
            rating.push(j<currentReview.rating);
        }
        currentReview.rating = rating;
    }
    res.render('detail', renderInfo);
});

router.post('/garment/new', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const { title, price, description, size, color, fabric} = req.body;

    if (!title || !price) {
        return res.redirect('/error?message=Campos%20vacíos:%20título%20y%20precio%20son%20obligatorios&redirect=/form');
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.redirect('/error?message=Precio%20inválido&redirect=/form');
    }

    const allGarments = await clothing_shop.getgarments();
    const exists = allGarments.some(g => g.title === title);

    if (exists) {
        return res.redirect('/error?message=Título%20duplicado&redirect=/form');
    }

    if (!req.file) {
        return res.redirect('/error?message=Debes%20subir%20una%20imagen&redirect=/form');
    }
   
    let garment = {
        title,
        price: Number(price),
        imageFilename: req.file?.filename,
        description,
        size,
        color,
        fabric,
        customerReviews: []
    };

    await clothing_shop.addGarment(garment);

    res.render('saved_garment', { _id: garment._id.toString() });
});

router.get('/garment/:id', async (req, res) => {
  const garment = await clothing_shop.getGarment(req.params.id);
  console.log(garment);

  if (!garment) {
    return res.redirect('/error?message=Producto%20no%20encontrado');
  }

  res.render('detail', { garment });
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

router.get('/error', (req, res) => {
    const message = req.query.message || "Unknown error";
    const redirectUrl = req.query.redirect || "/";

    res.render('error', { message, redirectUrl });
});

router.get('/search', async (req, res) => {
    const query = req.query['product-search'];
    if (!query) {
        return res.redirect('/');
    }

    const garments = await clothing_shop.getgarments();
    const garment = garments.find(g => g.title.toLowerCase() === query.toLowerCase());

    if (!garment) {
        return res.redirect('/error?message=Product%20not%20found');
    }

    res.redirect(`/garment/${garment._id}`);
});

router.get('/search-category', async (req, res) => {
    const category = req.query.category;
    if (!category) return res.redirect('/');

    const garments = await clothing_shop.getgarments();

    
    const filteredGarments = garments.filter(g => {
        if (!g.title) return false;
        const productTitle = g.title.trim().toLowerCase();
        const searchCategory = category.trim().toLowerCase();
        return productTitle.includes(searchCategory);
    });

    if (filteredGarments.length === 0) {
        return res.redirect('/error?message=No%20products%20found');
    }

    res.render('index', {
        garments: filteredGarments,
        pages: [],       // No pagination
        hasPrev: false,
        hasNext: false,
        prevUrl: '',
        nextUrl: ''
    });
});

router.get(['/edit','/edit.html'], (req, res) => {
    res.render('edit');
})


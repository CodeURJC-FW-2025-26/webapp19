import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as clothing_shop from './clothing_shop.js';

const DESCRIPTION_MAX_LENGTH=100;
const DESCRIPTION_MIN_LENGTH=2;

const router = express.Router();
export default router;

const upload = multer({ dest: clothing_shop.UPLOADS_FOLDER })

function ratingToArray(rating) {
    const ratingArray = [];
    for (let j = 0; j<5; j++) {
        ratingArray.push(j<rating);
    }
    return ratingArray;
}

function addSelectedRating(renderInfo, rating) {
    renderInfo.is1 = 1 === rating;
    renderInfo.is2 = 2 === rating;
    renderInfo.is3 = 3 === rating;
    renderInfo.is4 = 4 === rating;
    renderInfo.is5 = 5 === rating;
}

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
    const { id } = req.params;
    const garment = await clothing_shop.getGarment(req.params.id);
    console.log(id);

    const renderInfo = JSON.parse(JSON.stringify(garment));
    renderInfo.garmentId = id;
    for (let i = 0; i<renderInfo.customerReviews.length; i++) {
        let currentReview = renderInfo.customerReviews[i];
        currentReview.arrayRating = ratingToArray(currentReview.rating);
        currentReview.reviewId = currentReview._id.toString();
        delete currentReview._id;
    }
    renderInfo.edit = false;
    renderInfo.newReview={
        username: "",
        reviewDate: "",
        reviewText: "",
        rating: 0
    }
    addSelectedRating(renderInfo.newReview, renderInfo.newReview.rating);
    res.render('detail', renderInfo);
});

router.get(['/detail.html/:id/:reviewId', '/detail/:id/:reviewId'], async (req, res) => {
    function formatDate(date) {
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
    }
    const { id, reviewId } = req.params;
    const garment = await clothing_shop.getGarment(id);
    garment._id= garment._id.toString();
    let editedElement = undefined;
    const renderInfo = JSON.parse(JSON.stringify(garment));
    renderInfo.garmentId = garment._id;
    for (let i = 0; i<renderInfo.customerReviews.length; i++) {
        let currentReview = renderInfo.customerReviews[i];
        currentReview.arrayRating = ratingToArray(currentReview.rating);
        currentReview.reviewId = currentReview._id.toString();
        delete currentReview._id;
        if (currentReview.reviewId === reviewId) {
            editedElement = currentReview;
        }
    }
    renderInfo.edit = true;
    renderInfo.newReview = {
        id: reviewId,
        username: editedElement.username,
        reviewDate: formatDate(editedElement.date),
        reviewText: editedElement.review,
        rating: editedElement.rating
    }
    addSelectedRating(renderInfo.newReview, renderInfo.newReview.rating);
    console.log(renderInfo);
    res.render('detail', renderInfo);
});

router.post('/garment/new', upload.single('image'), async (req, res) => {
    const { title, price, description, size, color, fabric} = req.body;

    if (!title || !price || !description || !size || !color || !fabric) {
        return res.redirect('/error?message=Empty%20fields&redirect=/form');
    }

    if (!("A"<= title[0] && title[0]<="Z")) {
        return res.redirect('/error?message=Title%20must%20start%20with%20a%20capital%20letter&redirect=/form');
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.redirect('/error?message=Invalid%20price&redirect=/form');
    }

    if (description.length < DESCRIPTION_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
        return res.redirect('/error?message=Description%20length%20invalid&redirect=/form');
    }

    const allGarments = await clothing_shop.getgarments();
    const exists = allGarments.some(g => g.title === title);

    if (exists) {
        return res.redirect('/error?message=Duplicate%20title&redirect=/form');
    }

    if (!req.file) {
        return res.redirect('/error?message=You%20must%20upload%20an%20image&redirect=/form');
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

    try { 
        clothing_shop.addGarment(garment);
        res.render('confirmation', {
            header: 'Element created',
            message: `Element: "${garment.title}" has been succesfully created.`,
            redirect: '/detail/' + garment._id.toString()
            });
    }
    catch {
        return res.redirect('/error?message=Error%20al%20subir%20elemento&redirect=/form');
    }
});

/*router.get('/garment/:id', async (req, res) => {
  const garment = await clothing_shop.getGarment(req.params.id);
  console.log(garment);

  if (!garment) {
    return res.redirect('/error?message=Product%20not%20found');
  }

  res.render('detail', { garment });
}); */

router.get('/garment/:id/delete', async (req, res) => {

    let garment = await clothing_shop.deleteGarment(req.params.id);

    if (garment && garment.imageFilename) {
        await fs.rm(clothing_shop.UPLOADS_FOLDER + garment.imageFilename);
    }

    res.render('confirmation', {
        header: 'Element deleted',
        message: `Element: "${garment.title}" has been succesfully deleted.`,
        redirect: "/"
    });
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

    res.redirect(`/detail/${garment._id}`);
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

router.get('/edit/:id', async (req, res) => {
    const garment = await clothing_shop.getGarment(req.params.id);
    if (!garment) {
        return res.redirect('/error?message=No%20products%20found');
    }

    garment.id = garment.id.toString();

    garment.isXS = garment.size === 'XS';
    garment.isS = garment.size === 'S';
    garment.isM = garment.size === 'M';
    garment.isL = garment.size === 'L';
    garment.isXL = garment.size === 'XL';

    garment.isWhite = garment.color === 'White';
    garment.isBlue = garment.color === 'Blue';
    garment.isDarkBlue = garment.color === 'Dark Blue';
    garment.isLightBlue = garment.color === 'Light Blue';
    garment.isBlack = garment.color === 'Black';
    garment.isOrange = garment.color === 'Orange';
    garment.isYellow = garment.color === 'Yellow';

    garment.isCotton = garment.fabric === 'Cotton';
    garment.isWool = garment.fabric === 'Wool';
    garment.isLeather = garment.fabric === 'Leather';
    garment.isSilk = garment.fabric === 'Silk';
    garment.isSynthetic = garment.fabric === 'Synthetic';

    res.render('edit', {garment});
});

router.post('/garment/:id/update', upload.single('image'), async (req, res) => {
    const id = req.params.id; 

    const { title, description, size, color, fabirc, price } = req.body;
    
    const updatedData = {
        title,
        description,
        size,
        color, 
        fabirc, 
        price
    };

    if (req.file) {
        updatedData.imageFilename = req.file.filename;
    }

    await clothing_shop.updateGarment(id, updatedData);

    res.render('confirmation', {
        header: 'Element updated',
        message: `Element: "${updatedData.title}" has been succesfully updated.`,
        redirect: '/detail/id'
    });
});

router.post(['/garment/:id/customerReviews/new/', '/garment/:id/customerReviews/new/:reviewId'], async (req, res) => {
    const { id, reviewId } = req.params;

    const { username, reviewDate, reviewText, rating } = req.body;

    if (!username || !reviewDate || !reviewText || !rating ) {
        return res.redirect('/error?message=Empty%20fields&redirect=/detail/' + id);
    }

    
    if (reviewText.length < DESCRIPTION_MIN_LENGTH || reviewText.length > DESCRIPTION_MAX_LENGTH) {
        return res.redirect('/error?message=Description%20length%20invalid&redirect=/detail/' + id);
    }

    const [year, month, day] = reviewDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    const newReview = {
        username,
        rating: Number(rating),
        review: reviewText,
        date: formattedDate
    };

    if (!reviewId) {
        const allGarments = await clothing_shop.getgarments();
        const exists = allGarments.some(g => g.customerReviews.some(review => review.username === username));

        if (exists) {
            return res.redirect('/error?message=Duplicate%20title&redirect=/form');
        }

        await clothing_shop.pushReview(id, newReview);

        res.render('confirmation', {
            header: 'Review added',
            message: 'Review was added to the element',
            redirect: '/detail/' + id
        });
    }
    else {
        await clothing_shop.updateReview(id, reviewId, newReview);

        res.render('confirmation', {
            header: 'Review updated',
            message: 'Review was updated',
            redirect: '/detail/' + id
        })
    }
});

router.get('/garment/:id/customerReviews/:reviewId/delete', async (req, res) => {
    const { id, reviewId } = req.params;
    await clothing_shop.deleteReview(id, reviewId);
    res.render('confirmation', {
        header: 'Review deleted',
        message: 'Review was succesfully deleted',
        redirect: '/detail/' + id
    });
});


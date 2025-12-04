import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';
import * as clothing_shop from './clothing_shop.js';

const DESCRIPTION_MAX_LENGTH=100;
const DESCRIPTION_MIN_LENGTH=2;

const CATERGORIES = ["T-Shirt", "Jeans", "Trousers", "Socks", "Cap", "Sweatshirt", "Sneakers"];

const router = express.Router();
export default router;

const upload = multer({ dest: clothing_shop.UPLOADS_FOLDER });

function ratingToArray(rating) {
    return Array.from({ length: 5 }, (_, i) => i < rating);
}

function addSelectedRating(renderInfo, rating) {
    for (let i = 1; i <= 5; i++) {
        renderInfo['is' + i] = i === rating;
    }
}

function addGarmentTypesInfo(renderInfo, garment) {
    const attributes = ['type', 'size', 'color', 'fabric'];
    attributes.forEach(attr => {
        const value = garment[attr];
        if (value) {
            const key = 'is' + value.replace(/\s+/g, '');
            renderInfo[key] = true;
        }
    });
}

router.get('/', async (req, res) => {
    
    const { text, category } = req.query;

    console.log(text);

    let garments;

    if (!text & !category) {
        garments = await clothing_shop.getgarments();
    }
    else if (category) {
        garments = await clothing_shop.searchByCategory(category);
    }
    else {
        garments = await clothing_shop.searchByTitle(text);
    }

    const perPage = 6;
    const garmentsPage = garments.slice(0, perPage);

    res.render('index', {
        text,
        category,
        garments: garmentsPage,
        totalGarments: garments.length,
        perPage: perPage
    });
});

// API endpoint for infinite scroll
router.get('/api/garments', async (req, res) => {
    
    const { text, category, page = 1 } = req.query;
    const pageNum = parseInt(page) || 1;

    let garments;

    if (!text && !category) {
        garments = await clothing_shop.getgarments();
    }
    else if (category) {
        garments = await clothing_shop.searchByCategory(category);
    }
    else {
        garments = await clothing_shop.searchByTitle(text);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const perPage = 6;
    const totalPages = Math.ceil(garments.length / perPage);
    const startIndex = (pageNum - 1) * perPage;
    const endIndex = startIndex + perPage;
    const garmentsPage = garments.slice(startIndex, endIndex);

    res.json({
        garments: garmentsPage,
        page: pageNum,
        totalPages: totalPages,
        hasMore: pageNum < totalPages,
        totalGarments: garments.length
    });
});

router.get(['/form', '/form/:id'], async (req, res) => {
    const { id } = req.params;
    if (!id) {
        const renderInfo = {
            garment: {
                title: "",
                imageFilename: "",
                description: "",
                category: "",
                size: "",
                color: "",
                fabric: "",
                price: ""
            },
            edit: false
        };
        addGarmentTypesInfo(renderInfo.garment, renderInfo.garment);
        return res.render('edit', renderInfo);
    }
    else {
        const garment = await clothing_shop.getGarment(id);
        if (!garment) {
            return res.render('message', { header: 'Error', message: `Error: No products found`, redirect: '/' });
        }
        garment.id = garment._id.toString();
        addGarmentTypesInfo(garment, garment);
        return res.render('edit', { garment, edit: true });
    }
});

router.get(['/detail.html/:id', '/detail/:id'], async (req, res) => {
    const { id } = req.params;
    const garment = await clothing_shop.getGarment(id);
    const renderInfo = JSON.parse(JSON.stringify(garment));
    renderInfo.garmentId = id;
    for (let review of renderInfo.customerReviews) {
        review.arrayRating = ratingToArray(review.rating);
        review.reviewId = review._id.toString();
        delete review._id;
    }
    renderInfo.edit = false;
    renderInfo.newReview = { username: "", reviewDate: "", reviewText: "", rating: 0 };
    addSelectedRating(renderInfo.newReview, renderInfo.newReview.rating);
    addGarmentTypesInfo(renderInfo, garment);
    res.render('detail', renderInfo);
});

router.get(['/detail.html/:id/:reviewId', '/detail/:id/:reviewId'], async (req, res) => {
    const { id, reviewId } = req.params;
    const garment = await clothing_shop.getGarment(id);
    garment._id = garment._id.toString();
    let editedElement;
    const renderInfo = JSON.parse(JSON.stringify(garment));
    renderInfo.garmentId = garment._id;

    for (let review of renderInfo.customerReviews) {
        review.arrayRating = ratingToArray(review.rating);
        review.reviewId = review._id.toString();
        delete review._id;
        if (review.reviewId === reviewId) editedElement = review;
    }

    function formatDate(date) {
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
    }

    renderInfo.edit = true;
    renderInfo.newReview = {
        id: reviewId,
        username: editedElement.username,
        reviewDate: formatDate(editedElement.date),
        reviewText: editedElement.review,
        rating: editedElement.rating
    };
    addSelectedRating(renderInfo.newReview, renderInfo.newReview.rating);
    addGarmentTypesInfo(renderInfo, garment);
    res.render('detail', renderInfo);
});

router.post(['/garment/new', '/garment/:id/update'], upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const redirect = id ? '/form/' + id : '/form';
    const { title, price, description, size, color, fabric, type } = req.body;

    if (!title || !price || !description || !size || !color || !fabric || !type) {
        return res.render('message', { header: 'Error', message: `Error: Empty fields`, redirect });
    }

    if (!("A" <= title[0] && title[0] <= "Z")) {
        return res.render('message', { header: 'Error', message: `Error: Title must start with a capital letter`, redirect });
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.render('message', { header: 'Error', message: `Error: Invalid price`, redirect });
    }

    if (description.length < DESCRIPTION_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
        return res.render('message', { header: 'Error', message: `Error: Description length invalid`, redirect });
    }

    if (!id) {
        const exists = await clothing_shop.getGarmentByTitle(title);
        console.log(exists);

        if (exists) {
            return res.render('message', {
                header: 'Error',
                message: `Error: Title already exists`,
                redirect: '/form'
            });
        }
        if (!req.file) {
            return res.render('message', {
                header: 'Error',
                message: `Error: You must upload an image`,
                redirect: '/form'
                });
        }
    
        let garment = {
            title,
            price: Number(price),
            imageFilename: req.file?.filename,
            description,
            size,
            color,
            fabric,
            category: type,
            customerReviews: []
        };

        try { 
            const result = await clothing_shop.addGarment(garment); // wait for DB
            const newId = result.insertedId ? result.insertedId.toString() : (garment._id ? garment._id.toString() : null);
            return res.render('message', {
                header: 'Element created',
                message: `Element: "${garment.title}" has been succesfully created.`,
                redirect: '/detail/' + newId,
                });
        }
        catch {
            return res.render('message', {
                header: 'Error',
                message: `Error: problem uploading the element to database`,
                redirect: '/form'
                });
        }
    }
    else {
        const updatedData = {
            title,
            description,
            size,
            color,
            fabric,
            price: Number(price)
        };

        if (req.file) {
            updatedData.imageFilename = req.file.filename;
        }
        else {
            const saved_garment = await clothing_shop.getGarment(id);
            updatedData.imageFilename = saved_garment.imageFilename;
        }

        // keep category in sync with form 'type' field
        updatedData.category = type;

        try {
            await clothing_shop.updateGarment(id, updatedData);
            return res.render('message', { header: 'Element updated', message: `Element: "${updatedData.title}" has been successfully edited.`, redirect: '/detail/' + id });
        } catch {
            return res.render('message', { header: 'Error', message: `Error: problem updating the element in database`, redirect });
        }
    }
});

router.get('/garment/:id/delete', async (req, res) => {
    const result = await clothing_shop.deleteGarment(req.params.id);
    const garment = result?.value || result;
    if (garment?.imageFilename) await fs.rm(clothing_shop.UPLOADS_FOLDER + garment.imageFilename);
    return res.render('message', { header: 'Element deleted', message: `Element: "${garment.title}" has been successfully deleted.` });
});

router.get('/garment/:id/image', async (req, res) => {
    const garment = await clothing_shop.getGarment(req.params.id);
    res.download(clothing_shop.UPLOADS_FOLDER + '/' + garment.imageFilename);
});

router.get('/search', async (req, res) => {
    const query = req.query['product-search'];
    if (!query) return res.redirect('/');
    const garments = await clothing_shop.getgarments();
    const garment = garments.filter(g => g.title.toLowerCase() === query.toLowerCase());

    if (!garment) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Product not found`
            });
    }

    res.redirect(`/detail/${garment._id}`);
});

router.get('/search-category', async (req, res) => {
    const category = req.query.category;
    if (!category) return res.redirect('/');
    const garments = await clothing_shop.getgarments();
    const filteredGarments = garments.filter(g => g.title?.trim().toLowerCase().includes(category.trim().toLowerCase()));
    if (!filteredGarments.length) return res.render('message', { header: 'Error', message: `Error: No products found` });
    res.render('index', { garments: filteredGarments, pages: [], hasPrev: false, hasNext: false, prevUrl: '', nextUrl: '' });
});

router.post(['/garment/:id/customerReviews/new/', '/garment/:id/customerReviews/new/:reviewId'], async (req, res) => {
    const { id, reviewId } = req.params;
    const { username, reviewDate, reviewText, rating } = req.body;

    if (!username || !reviewDate || !reviewText || !rating) return res.render('message', { header: 'Error', message: `Error: Empty fields`, redirect: '/detail/' + id });
    if (reviewText.length < DESCRIPTION_MIN_LENGTH || reviewText.length > DESCRIPTION_MAX_LENGTH) return res.render('message', { header: 'Error', message: `Error: Description length invalid`, redirect: '/detail/' + id });

    const [year, month, day] = reviewDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    const newReview = { username, rating: Number(rating), review: reviewText, date: formattedDate };

    if (!reviewId) {
        const garment = await clothing_shop.getGarment(id);
        const exists = garment.customerReviews.some(review => review.username === username);

        if (exists) {
            return res.render('message', {
                header: 'Error',
                message: `Error: Title already exists`,
                redirect: '/form'
                });
        }
        await clothing_shop.pushReview(id, newReview);
        return res.render('message', { header: 'Review added', message: 'Review was added to the element', redirect: '/detail/' + id });
    } else {
        await clothing_shop.updateReview(id, reviewId, newReview);
        return res.render('message', { header: 'Review updated', message: 'Review was updated', redirect: '/detail/' + id });
    }
});

router.get('/garment/:id/customerReviews/:reviewId/delete', async (req, res) => {
    const { id, reviewId } = req.params;
    await clothing_shop.deleteReview(id, reviewId);
    return res.render('message', { header: 'Review deleted', message: 'Review was successfully deleted', redirect: '/detail/' + id });
});

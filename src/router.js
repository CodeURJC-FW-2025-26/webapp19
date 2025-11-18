import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as clothing_shop from './clothing_shop.js';

const DESCRIPTION_MAX_LENGTH=100;
const DESCRIPTION_MIN_LENGTH=2;

const CATERGORIES = ["T-Shirt", "Jeans", "Trousers", "Socks", "Cap", "Sweatshirt", "Sneakers"];

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

function addGarmentTypesInfo(renderInfo, garment) {
    renderInfo.isXS = garment.size === 'XS';
    renderInfo.isS = garment.size === 'S';
    renderInfo.isM = garment.size === 'M';
    renderInfo.isL = garment.size === 'L';
    renderInfo.isXL = garment.size === 'XL';

    renderInfo.isWhite = garment.color === 'White';
    renderInfo.isBlue = garment.color === 'Blue';
    renderInfo.isDarkBlue = garment.color === 'Dark Blue';
    renderInfo.isLightBlue = garment.color === 'Light Blue';
    renderInfo.isBlack = garment.color === 'Black';
    renderInfo.isOrange = garment.color === 'Orange';
    renderInfo.isYellow = garment.color === 'Yellow';

    renderInfo.isCotton = garment.fabric === 'Cotton';
    renderInfo.isWool = garment.fabric === 'Wool';
    renderInfo.isLeather = garment.fabric === 'Leather';
    renderInfo.isSilk = garment.fabric === 'Silk';
    renderInfo.isSynthetic = garment.fabric === 'Synthetic';
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

router.get(['/form', '/form/:id'], async (req, res) => {
    const { id } = req.params;
    if (!id) {
        const renderInfo = {
            garment: {
                title: "",
                imageFilename: "",
                description: "",
                size: "",
                color: "",
                fabric: "",
                price: ""
            },
            edit: false
        }
        addGarmentTypesInfo(renderInfo.garment, renderInfo.garment);
        return res.render('edit', renderInfo);
    }
    else {
        const garment = await clothing_shop.getGarment(id);
        if (!garment) {
            return res.render('message', {
                header: 'Error',
                message: `Error: No products found`,
                redirect: '/'
            });
        }

        garment.id = garment._id.toString();


        addGarmentTypesInfo(garment, garment);

        return res.render('edit', {
            garment,
            edit: true
        });
    }
});

router.get(['/detail.html/:id', '/detail/:id'], async (req, res) => {
    const { id } = req.params;
    const garment = await clothing_shop.getGarment(req.params.id);

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
    res.render('detail', renderInfo);
});

router.post(['/garment/new', '/garment/:id/update'], upload.single('image'), async (req, res) => {
    const { id } = req.params;
    let redirect = '/form';
    if (id) {
        redirect = '/form/' + id;
    }
    const { title, price, description, size, color, fabric} = req.body;


    if (!title || !price || !description || !size || !color || !fabric) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Empty fields`,
            redirect
            });
    }

    if (!("A"<= title[0] && title[0]<="Z")) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Title must start with a capital letter`,
            redirect
            });
    }

    if (!CATERGORIES.some( category => title.includes(category))) {
        return res.render('message', {
            header: 'Error',
            message: 'Error: Element title does not include any of the known categories',
            redirect
        });
    }

    if (isNaN(price) || Number(price) <= 0) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Invalid price`,
            redirect
            });
    }

    if (description.length < DESCRIPTION_MIN_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Description length invalid`,
            redirect
            });
    }

    if (!id) {
        const allGarments = await clothing_shop.getgarments();
        const exists = allGarments.some(g => g.title === title);

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
            customerReviews: []
        };

        try { 
            const result = await clothing_shop.addGarment(garment); // wait for DB
            const newId = result.insertedId ? result.insertedId.toString() : (garment._id ? garment._id.toString() : null);
            return res.render('message', {
                header: 'Element created',
                message: `Element: "${garment.title}" has been succesfully created.`,
                redirect: '/detail/' + newId,
                detail: '/detail/' + newId
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
            price
        };

        if (req.file) {
            updatedData.imageFilename = req.file.filename;
        }

        await clothing_shop.updateGarment(id, updatedData);

        return res.render('message', {
            header: 'Element updated',
            message: `Element: "${updatedData.title}" has been succesfully updated.`,
            redirect: '/detail/' + id,
            detail: '/detail/' + id
        });
    }
});



router.get('/garment/:id/delete', async (req, res) => {

    let result = await clothing_shop.deleteGarment(req.params.id);
    let garment = result && result.value ? result.value : result;

    if (garment && garment.imageFilename) {
        await fs.rm(clothing_shop.UPLOADS_FOLDER + garment.imageFilename);
    }

    return res.render('message', {
        header: 'Element deleted',
        message: `Element: "${garment.title}" has been succesfully deleted.`,
        redirect: "/"
    });
});

router.get('/garment/:id/image', async (req, res) => {

    let garment = await clothing_shop.getGarment(req.params.id);

    res.download(clothing_shop.UPLOADS_FOLDER + '/' + garment.imageFilename);

});

router.get('/search', async (req, res) => {
    const query = req.query['product-search'];
    if (!query) {
        return res.redirect('/');
    }

    const garments = await clothing_shop.getgarments();
    const garment = garments.find(g => g.title.toLowerCase() === query.toLowerCase());

    if (!garment) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Product not found`,
            redirect: '/'
            });
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
        return res.render('message', {
            header: 'Error',
            message: `Error: No products found`,
            redirect: '/'
            });
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



router.post(['/garment/:id/customerReviews/new/', '/garment/:id/customerReviews/new/:reviewId'], async (req, res) => {
    const { id, reviewId } = req.params;

    const { username, reviewDate, reviewText, rating } = req.body;

    if (!username || !reviewDate || !reviewText || !rating ) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Empty fields`,
            redirect: '/detail/' + id
        });
    }

    
    if (reviewText.length < DESCRIPTION_MIN_LENGTH || reviewText.length > DESCRIPTION_MAX_LENGTH) {
        return res.render('message', {
            header: 'Error',
            message: `Error: Description length invalid`,
            redirect: '/detail/' + id
            });
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
            return res.render('message', {
                header: 'Error',
                message: `Error: Title already exists`,
                redirect: '/form'
                });
        }

        await clothing_shop.pushReview(id, newReview);

        return res.render('message', {
            header: 'Review added',
            message: 'Review was added to the element',
            redirect: '/detail/' + id
        });
    }
    else {
        await clothing_shop.updateReview(id, reviewId, newReview);

        return res.render('message', {
            header: 'Review updated',
            message: 'Review was updated',
            redirect: '/detail/' + id
        })
    }
});

router.get('/garment/:id/customerReviews/:reviewId/delete', async (req, res) => {
    const { id, reviewId } = req.params;
    await clothing_shop.deleteReview(id, reviewId);
    return res.render('message', {
        header: 'Review deleted',
        message: 'Review was succesfully deleted',
        redirect: '/detail/' + id
    });
});


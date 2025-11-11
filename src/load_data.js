import fs from 'node:fs/promises';
import * as clothing_shop from './clothing_shop.js';

const UPLOADS_FOLDER = './uploads';
const DATA_FOLDER = './data';
const PUBLIC_FOLDER = './public';

let dataFile = 'data.json';

// Load data.json and try to populate the database. Protect DB operations so failures
// (e.g., MongoDB not running) don't stop the rest of the initialization (images copy).
let garments = [];
try {
    const dataString = await fs.readFile(DATA_FOLDER + '/' + dataFile, 'utf8');
    garments = JSON.parse(dataString);

    await clothing_shop.deletegarments();
    for (let garment of garments) {
        await clothing_shop.addGarment(garment);
    }
    console.log('Demo data inserted into database');
} catch (err) {
    console.warn('Could not load demo data into DB (continuing):', err.message);
}

// Prepare uploads folder
await fs.rm(UPLOADS_FOLDER, { recursive: true, force: true });
await fs.mkdir(UPLOADS_FOLDER, { recursive: true });

// Ensure images are present in data/images. If data/images doesn't exist or is empty,
// copy from public/images into data/images so the canonical example images live in data.
const dataImagesFolder = DATA_FOLDER + '/images';
const publicImagesFolder = PUBLIC_FOLDER + '/images';

let dataImagesExist = false;
try {
    const files = await fs.readdir(dataImagesFolder);
    dataImagesExist = files.length > 0;
} catch (err) {
    dataImagesExist = false;
}

if (!dataImagesExist) {
    try {
        // Create or replace data/images with contents from public/images
        await fs.rm(dataImagesFolder, { recursive: true, force: true });
        await fs.cp(publicImagesFolder, dataImagesFolder, { recursive: true });
        console.log('Copied example images from public/images to data/images');
    } catch (err) {
        console.warn('Could not copy images from public/images to data/images:', err.message);
    }
}

// Finally copy the (now-canonical) data/images into uploads
try {
    await fs.cp(dataImagesFolder, UPLOADS_FOLDER, { recursive: true });
    console.log('Demo data and images loaded');
} catch (err) {
    console.warn('Could not copy images into uploads folder:', err.message);
}
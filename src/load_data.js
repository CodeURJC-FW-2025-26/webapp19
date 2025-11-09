import fs from 'node:fs/promises';
import * as clothing_shop from './clothing_shop.js';

const UPLOADS_FOLDER = './uploads';
const DATA_FOLDER = './data';
const PUBLIC_FOLDER = './public';

let dataFile = 'data.json';

const dataString = await fs.readFile(DATA_FOLDER + '/' + dataFile, 'utf8');

const garments = JSON.parse(dataString);

await clothing_shop.deletegarments();
for(let garment of garments){
    await clothing_shop.addGarment(garment);
}

await fs.rm(UPLOADS_FOLDER, { recursive: true, force: true });
await fs.mkdir(UPLOADS_FOLDER);
await fs.cp(PUBLIC_FOLDER + '/images', UPLOADS_FOLDER, { recursive: true });

console.log('Demo data loaded');
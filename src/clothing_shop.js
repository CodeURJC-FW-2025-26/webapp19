import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('clothing_shop');
const garments = db.collection('garments');
garments.createIndex({
    title: "text"
});

export const UPLOADS_FOLDER = 'uploads/';

export async function addGarment(garment) {
    for (let review of garment.customerReviews) {
        review._id = new ObjectId();
    }
    return await garments.insertOne(garment);
}

export async function deleteGarment(id){

    return await garments.findOneAndDelete({ _id: new ObjectId(id) });
}

export async function deletegarments(){

    return await garments.deleteMany();
}

export async function getgarments(){

    return await garments.find().toArray();
}

export async function getGarment(id){

    return await garments.findOne({ _id: new ObjectId(id) });
}

export async function getGarmentByTitle(title) {
    if (!title) return null;
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return await garments.findOne({ title: { $regex: `^${escaped}$`, $options: 'i' } });
}

export async function searchByTitle(title) {
    return await garments.find({ $text:  { $search: title }}).sort({ score: { $meta: "textScore"}}).toArray();
}

export async function searchByCategory(category) {
    return await garments.find({ category: category }).toArray();
}

export async function updateGarment(id, updatedFields){
    
    const result = await garments.updateOne(
        { _id : new ObjectId(id) },
        { $set: updatedFields }
    )
    return result; 
}

export async function pushReview(id, review) {
    review._id = new ObjectId();
    const result = await garments.updateOne(
        { _id : new ObjectId(id) },
        { $push : {customerReviews: review }}
    );
    return review;
}

export async function deleteReview(id, reviewId) {
    const result = await garments.updateOne(
        { _id: new ObjectId(id) },
        { $pull: { customerReviews: { _id: new ObjectId(reviewId) } } }
    );
    return result;
}

export async function updateReview(id, reviewId, newReview) {
    newReview._id = new ObjectId(reviewId);
    const result = await garments.updateOne(
        { _id: new ObjectId(id), "customerReviews._id": new ObjectId(reviewId) },
        { $set: { "customerReviews.$": newReview }}
    );
    return newReview;
}

export async function dropImage(id) {
    const result = await garments.updateOne(
        { _id: new ObjectId(id) },
        { $unset: { imageFilename: "" } } 
    );
    return result
}
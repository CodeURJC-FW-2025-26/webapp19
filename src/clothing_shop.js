import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('clothing_shop');
const garments = db.collection('garments');

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
    return result;
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
    return result;
}
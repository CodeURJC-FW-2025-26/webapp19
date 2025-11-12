import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('clothing_shop');
const garments = db.collection('garments');

export const UPLOADS_FOLDER = 'uploads/';

export async function addGarment(garment) {

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
    
    result = await garments.updateOne(
        { _id : ObjectId(id) },
        { $set: updatedFields }
    )
    return result; 
}
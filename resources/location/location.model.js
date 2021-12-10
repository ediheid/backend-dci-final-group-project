import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true 
    },
    description: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
   
    

}, { timestamps: true })

export const Location = mongoose.model('location', locationSchema)

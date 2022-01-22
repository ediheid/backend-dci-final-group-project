import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema(
    {
      buffer: Buffer,
      mimetype: String,
      encoding: String,
      originalname: String,
      fieldname: String
},
{ timestamps: true }
);

export const Picture = mongoose.model("picture", pictureSchema);
import { Picture } from "./picture.model.js"


export const findPicture = async (req, res) => {
    const filename = req.params.id;
      
    Picture.findOne({'_id': filename }, (err, result) => {
        if (err) return console.log(err)

        res.set('Content-Type', result.mimetype)
        res.send(Buffer.from(result.buffer))
      })
  }

  export const createPicture = async (req, res) => {
    try { 
        const img = await Picture.create({
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
            encoding: req.file.encoding,
            originalname: req.file.originalname,
            fieldname: req.file.fieldname,
          });

          return res.status(201).json(img._id);

    } catch (e) {
        console.log(e)
    }
}

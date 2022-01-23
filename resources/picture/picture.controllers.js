import { Picture } from "./picture.model.js"

export const findPicture = async (req, res) => {
    const filename = req.params.id;
      
    Picture.findOne({'_id': filename }, (err, result) => {
        if (err) return console.log(err)

        res.set('Content-Type', result.mimetype)
        res.send(Buffer.from(result.buffer))
      })
  }
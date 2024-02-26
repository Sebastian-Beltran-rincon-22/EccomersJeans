import multer from 'multer'
import sharp from 'sharp'

const helperImage = (filePath, fileName, width = 400, height = 400)=> {
  return sharp (filePath)
      .resize(width, height)
      // .toFormat('webp', {quality:90})
      .toFile(`./src/uploads/${fileName}.webp`)
}
const storage = multer.diskStorage ({

  filename: async(req, file,cb)=> {
    cb(null, `${file.originalname}`)
  }
})


export const upload = multer({storage}).single('img')

export const uploadFile = (req, res,)=> {
  try {
      const originalFileName = req.file.originalname;
      // console.log(req.file)
      const fileNameWithoutExtension = originalFileName.split('.').slice(0, -1).join('.');
      helperImage(req.file.path, fileNameWithoutExtension,   1500, 1100 );
      // helperImage(req.file.path,`large-resize-${req.file.filename}`, 1000);
      res.send({data: 'Imagen cargada'})
      // next();
    } catch (error) {
        // console.error('Error al procesar la carga de imagen:', error);
        res.status(500).send({ error: 'Error interno del servidor'});
    }
}


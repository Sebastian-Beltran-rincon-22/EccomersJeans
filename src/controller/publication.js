import Publication from "../schema/Publicacion.js";
import Pants from "../schema/pants.js"
//Create

export const createPublication = async (req, res) =>{

  const {title, description,} = req.body;
  if (!title || !description){
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });}

  const lasterPants = await Pants.findOne().sort({ uploadedAt: -1}).limit(1);
  const lasterPantsId = lasterPants._id;

  try {
    const newPublication = new Publication ({
      title,
      description,
      post: lasterPantsId
    });

    const publicacionSaved = await newPublication.save();

    res.status(201).json(publicacionSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
};

//Get
export const getPublication = async (req, res) => {
  try {
    const Publicacions = await Publication.find({})
    return res.json(Publicacions);
  }
  catch (error) {
    return res.status(500).json({ msg:error.message })
  }
};

//GetForId

export const getPublicationById = async (req, res) => {
  try{
    const { id } = req.params;
    const Publications = await Publication.findById(id);
    res.status(200).json(Publications)
  }catch (error){
    return res.status(500).json({ msg: error.message})
  }
};

//Update

export const updatePublicationById = async (req, res) =>{
  try {
    const { id } = req.params
    const { title, description} = req.body

    const existingPublication = await Publication.findById(id);
    if (!existingPublication) {
      return res.status(404).json({ message: "Publication not found"})
    }

    await Publication.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });

    const updatePublication = await Publication.findById(id);
    return res.json(updatePublication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete
export const deletePublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    await Publication.findByIdAndDelete(id);
    res.json({ msg: "Publication deleted" })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
}

};

import Pant from "../../schema/product/pants.js";


//Create

export const createPants = async (req, res) =>{

  const {name, price, img, img2, img3, img4, size, colors, counterPants} = req.body;
  if (!name){
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });}


  try {
    const newPants = new Pant ({
      name,
      price,
      img,
      img2,
      img3,
      img4,
      size,
      colors,
      counterPants
    });

    const pantsSaved = await newPants.save();

    res.status(201).json(pantsSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
};

//GetPants
export const getPants = async (req, res) => {
  try {
    const Pants = await Pant.find({})
    return res.json(Pants);
  }
  catch (error) {
    return res.status(500).json({ msg:error.message })
  }
};

//GetPantsForId

export const getPantsById = async (req, res) => {
  try{
    const { id } = req.params;
    const Pants = await Pant.findById(id);
    res.status(200).json(Pants)
  }catch (error){
    return res.status(500).json({ msg: error.message})
  }
};

//Update

export const updatePantsById = async (req, res) =>{
  try {
    const { id } = req.params
    const { name, price, img, img2, img3, img4, size, colors, counterPants} = req.body

    const existingPants = await Pant.findById(id);
    if (!existingPants) {
      return res.status(404).json({ message: "Pantalon no Encotrado"})
    }

    await Pant.findByIdAndUpdate(id, {
      name: name,
      price: price,
      img: img,
      img2: img2,
      img3: img3,
      img4: img4,
      size: size,
      colors: colors,
      counterPants: counterPants
    });

    const updatePants = await Pant.findById(id);
    return res.json(updatePants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//UpdateCounter
export const updateCounterForId = async (req, res) =>{
  try {
    const { id } = req.params

    const pant = await Pant.findById(id);

    if (!pant) {
      return res.status(404).json({ message: 'Prenda no encontrada' });
    }

    if (pant. counterPants > 0) {
      pant.counterPants -= 1;
    } else {
      return res.status(400).json({ message: 'El contador ya está en cero' });
    }

    await pant.save();

    return res.json(pant);
  }catch (error){
    return res.status(500).json({ message: error.message })
  }
};


//Delete
export const deletePantsById = async (req, res) => {
  try {
    const { id } = req.params;
    await Pant.findByIdAndDelete(id);
    res.json({ msg: "Pantalon borrado" })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
}

};

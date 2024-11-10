let categories = require("../models/CategorieModel");

let CategroieCtrl = {
  Ajouter: async (req, res) => {
    try {
      const { service } = req.body;
      const image = req.files ? req.files.image : null;
  
      if (!service) return res.status(400).json({ msg: "Service is required" });
      if (!image) return res.status(400).json({ msg: "Image is required" });
  
      let findCategori = await categories.findOne({ service });
  
      if (findCategori) {
        return res.status(302).json({ msg: "Category already exists" });
      }
  
      // Define the upload path
      const uploadPath =  "./upload/" + image.name;
  
      // Move the file
      image.mv(uploadPath, (err) => {
        if (err) {
          console.error("Error moving file:", err); // Log detailed error
          return res.status(500).json({ msg: "Failed to upload image", error: err.message });
        }
  
        // Create and save the new category
        let newCategorie = new categories({
          service,
          icon: image.name,
        });
        
        newCategorie.save()
          .then(() => res.json({ result: newCategorie }))
          .catch((saveError) => {
            console.error("Error saving category:", saveError); // Log detailed error
            res.status(500).json({ msg: "Failed to save category", error: saveError.message });
          });
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = CategroieCtrl;

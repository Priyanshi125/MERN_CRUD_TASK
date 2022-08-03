const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer')
const router = express.Router();
const productSchema = new mongoose.Schema({
 
  categoryId: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  price: {
    type: Number,
    required: true,
  },
  images:{
    type:String,
    required: true
  },
  createAt: {
    type: Date,
    required:true,
    default: new Date()
  },
  updateAt: {
    type: Date,
  },
});
const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    categoryId: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(1024).required(),
    price: Joi.required(),
    // images: Joi.string()
  });
  return schema.validate(product);
}

// DISPLAY
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
module.exports = router;

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({storage: storage})

//ADD
router.post('/',upload.single('file'),async (req,res)=>{

  // console.log(req.file)
  const {
    body: {name, description, price}
  } = req

  // console.log(name)
  // console.log(description)
  // console.log(price);
  // console.log(product.name)
  // const { error } = validateProduct(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // console.log(req.file);

  const product = new Product({
    name: name,
    description: description,
    price: price,
    images: req.file.filename
  });
  console.log(product);
  await product.save()
  res.send(product)

})

//UPDATE

router.put("/:id", async (req, res) => {
  console.log("BACKEND",req.body)
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let product = await Product.findByIdAndUpdate(

    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      updateAt: new Date(),


    },
    { new: true }
  );
  if (!product) return res.status(404).send("404 - The genre Not Found");
  res.send(product);
});



//DELETE
router.delete('/:id', async (req, res) =>{
  const product = await Product.findByIdAndDelete(req.params.id)
})
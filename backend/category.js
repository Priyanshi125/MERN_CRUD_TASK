const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  parent: {
    type: String,
    default: null,
  },
  createAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
});
const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    parent: Joi.optional({ nullable: true }),
  });
  return schema.validate(category);
}

// DISPLAY
router.get("/", async (req, res) => {
  const categories = await Category.find({ parent: null });
  res.send(categories);
});
router.get("/subcategories", async (req, res) => {
  const categories = await Category.find({parent: {"$ne": null}});
  res.send(categories);
});


//ADD
router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let category = await new Category({
    name: req.body.name,
    parent: req.body.parent,
    createAt: new Date()
  });
  console.log(category);
  category.save();
  res.send(category);
});

//UPDATE

router.put("/:id", async (req, res) => {
  console.log("BACKEND",req.body)
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let category = await Category.findByIdAndUpdate(

    req.params.id,
    {
      name: req.body.name,
      parent: req.body.parent,
      updateAt: new Date(),
    },
    { new: true }
  );
  if (!category) return res.status(404).send("404 - The genre Not Found");
  res.send(category);
});
module.exports = router;


router.delete('/:id', async (req, res) =>{
  const category = await Category.findByIdAndDelete(req.params.id)
})
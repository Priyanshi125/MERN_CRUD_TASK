import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import axios from "axios";
import Dropdown from "react-dropdown";
import Modal from "../../UI/Modal";
const Category = () => {
  const [parentCategoryName, setparentCategoryName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  let parentcategories = [];
  const categoryHandler = (id) => {
    console.log(id);
  };
  useEffect(() => {
    axios.get("http://localhost:3000/category").then((response) => {
      console.log(response.data);
      setparentCategoryName(response.data);
    });
  }, []);
  const addCategory = () => {
    const catagory = {
      name: parentCategoryName,
      parent: parent,
    };

    axios
      .post("http://localhost:3000/category", catagory)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("Categories", categories);
  axios.get("http://localhost:3000/category/all").then((response) => {
    console.log(response.data);

    console.log(response.data[0]._id);
  });
  /* axios.get("http://localhost:3000/category/onlyparentid").then((response) => {
    console.log("ID", response.data);
    response.data.map((p) => {
      name = p.parentCategoryName;
      parentcategories.push(name);
      console.log(parentcategories);
    });
  }); */

  /*   const defaultOption = options[0];
  <Dropdown options={options}
   onChange={this._onSelect} 
   value={defaultOption} 
   placeholder="Select a Parent Category" />; */

  return (
    <div className="App">
      <h2>Category</h2>
      <ul>
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              onClick={() => categoryHandler(category._id)}
            >
              <li>{category.parentCategoryName}</li>
            </div>
          );
        })}
      </ul>

      {/* <Modal>
      <form>
        <label htmlFor="name">
          Name
        </label>
        <input type="text" id="name" name="name" />
        <br />

        <label  htmlFor="parentcategory">
          Main Categories
        </label>

        <br />

        <button >Cancle</button>
        <button stype="submit" >Add Category</button>
      </form>
    </Modal> */}

      {/* <Card>
        <label>Category</label>
        <input
          type="text"
          onChange={(event) => {
            setCategoryName(event.target.value);
          }}
        />

        <br />
        <br />

        <label>Parent</label>
        <input
          type="text"
          onChange={(event) => {
            setParent(event.target.value);
          }}
        />

        <button onClick={addCategory}>Add Category</button>
      </Card> */}
    </div>
  );
};
export default Category;


import React, { useState, useEffect } from "react";
import Card from "../../UI/Card";
import axios from "axios";
import Select from "react-select";
import Modal from "../../UI/Modal";
import classes from "./Category.module.css";
import UpdatePic from '../../Assets/update.png'
import DeletePic from '../../Assets/delete.png'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Category = () => {

//--------------- Set null value to add Parent category-----------------

          let parentCategory = [
            {
              value: null,
              label: "None",
            },
          ];
     /*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        Display Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */

  const [categories, setCategories] = useState([]);
  const[search,setSearch] =useState("")
 
    // -----------------------API CALL To Get Parent Category-----------------------
    useEffect(() => {
      axios.get("http://localhost:3000/category").then((response) => {
       //  console.log(response.data);
        setCategories(response.data);
      });
    }, []);
    const filteredCategory = categories.filter((category) => {
      return category.name.toLowerCase().trim().includes(search.toLowerCase());
    });
  
   /*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        ADD Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */

  const [addCategoryModel, setAddCategoryModel] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  //-----------------------Display Add category Model-----------------------------
  function showAddCategoryModel() {
    setAddCategoryModel(true);
  }

  //----------------------- Hide Add category Model-----------------------
  function hideAddCategoryModel() {
    setAddCategoryModel(false);
  }
  //----------------------- API CALL To Add Category-----------------------
   categories.map((category) => {
    let a = {
      value: category._id,
      label: category.name,
    };
    parentCategory.push(a);
  });
  // console.log("##Parent Category", parentCategory);

  const [selectedParentCategory, setSelectedParentCategory] = useState(  );

  const setParentCategoryHandler = (e) => {
    setSelectedParentCategory(e.value);

  };
 
  // console.log(selectedParentCategory);
  //----------------------------------------------------------------------------------------------
  function addCategory(e){

    console.log("-----------------",selectedParentCategory)
    const catagory = {
      name: categoryName,
      parent: selectedParentCategory,
    };

    axios
      .post("http://localhost:3000/category", catagory)
      .then((res) => {
        console.log(res.data);
        hideAddCategoryModel()
      })
      .catch((error) => {
        console.log(error);
      });
      setCategoryName('');
      setSelectedParentCategory('')

  } 
/*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        UPDATE Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
  const [updateModal,setUpdateModal]= useState(false)
  const[updateParentId,setUpdateParentId]= useState("");

  function updateModalHandler(updateParentIdSelected){
    setUpdateParentId(updateParentIdSelected)

    console.log("Update id",updateParentId)
    setUpdateModal(true)
  }
  const [UpdatedParentCategory, setUpdatedParentCategory] = useState();

  const setUpdatedParentCategoryHandler = (e) => {
    setUpdatedParentCategory(e.value);

  };
function updateCategory()
{  
       const catagory = {
        name: categoryName,
        parent: UpdatedParentCategory }; 

        console.log("UID",updateParentId)
        console.log("UPDATED NAME",catagory.name)
       console.log("UPDATED PARENT",catagory.parent)

       axios.put(`http://localhost:3000/category/${updateParentId}`,catagory)
      .then( ()=>{console.log("UPDATED  Successfully:")
      toast('Hello Geeks')

    })
    .catch((error) => {
      console.log(error);
    }); 
    setUpdateModal(false)
  }
/*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        DELETE Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
  function deleteCategory(id){
    console.log("D id",id)
    axios.delete(`http://localhost:3000/category/${id}`)
    .then( ()=>{       
       console.log("Deleted  Successfully:")
      })
  .catch((error) => {
    console.log(error);
  }); 
  }

 

return (
    <div>
      {/* Listing Categories */}
        <h1> C a t e g o r i e s </h1>
        <div>


        <button className={classes.addbutton} onClick={showAddCategoryModel}>
          A d d C a t e g o r y
        </button>
        {addCategoryModel && (
          <Modal onClose={hideAddCategoryModel} >
            <Card className={classes.card_wrapper}>
            <h2>Add Category</h2>
            <form onSubmit={addCategory} >
              <input
                className={classes.input}
                type="text"
                id="name"
                required
                minlength={3}
                placeholder="Name"

                onChange={(event) => {
                  setCategoryName(event.target.value); }}/>
                <br /><br />

              <Select
                className={classes.select}
                id="SelectedParent"
                required
                options={parentCategory}
                placeholder="Select Parent Category"
                onChange={setParentCategoryHandler}
              />
              <br />  <br />
              <button
                className={classes.add_button_in_model}
           type="submit">A d d </button>
              <br />
              <br />
              </form>
            </Card>
          </Modal>
        )}
      </div>
        <br/>  <br /><br/>  
        <input className={classes.input} onChange={(e)=>setSearch(e.target.value)}  placeholder="Search"/>   
        {filteredCategory.map((category) => {
          return (
           <div className={classes.div_li_button} key={category._id}>
              <li>{category.name}</li>
              <div >

              <img className={classes.update_delete_pic} src={UpdatePic} alt={UpdatePic}
               onClick={() => updateModalHandler(category._id)}>
              </img>
              {updateModal && 
              
                <Modal onClose={()=>setUpdateModal(false)}>
                  <Card >
                    <h2>Update</h2>
                    <input
                          className={classes.input}
                          type="text"
                          required
                          minlength={3}
                          placeholder="Name"
                          onChange={(event) => {
                            setCategoryName(event.target.value)}}/>
                          <Select
                                className={classes.select}
                                id="SelectedParent"
                                required
                                options={parentCategory}
                                placeholder="Select Parent Category"
                                onChange={setUpdatedParentCategoryHandler}  />
                          <button  className={classes.add_button_in_model} 
                                  onClick={updateCategory}>U p d a t e </button>              <br />  <br />
                  </Card>         
                </Modal>
              }

              <img className={classes.update_delete_pic} src={DeletePic} alt={DeletePic}
              onClick={() => deleteCategory(category._id)} />
               
              </div>

              


            </div>
          );
        })}

     
    </div>
  );
};
export default Category;

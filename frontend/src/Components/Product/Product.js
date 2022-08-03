import React,{useState,useEffect} from "react";
import axios from "axios";
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import classes from "./Product.module.css";
import UpdatePic from '../../Assets/update.png'
import DeletePic from '../../Assets/delete.png'

const Product = () => {
  // const formik = useFormik({
  //       initialValues:{

  //       },
  //       onSubmit: values =>{
  //         alert("Hii")

  //       }
  //   }
  // )



     /*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        Display Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
   const [products, setProducts] = useState([]);
   const[search,setSearch] =useState("")

   // -----------------------API CALL To Get Products-----------------------

   useEffect(() => {
    console.log(products)
    axios.get("http://localhost:3000/product")
    .then((response) => {
      setProducts(response.data);
    });
  },[]);
  const filteredProduct = products.filter((product) => {
    return product.name.toLowerCase().trim().includes(search.toLowerCase());
  });
   /*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        ADD Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
   const [productDescription, setProductDescription] = useState();
   const [addProductModel, setAddProductModel] = useState(false);
   const [productPrice, setProductPrice] = useState();
   const [productName, setProductName] = useState("");
   const [file, setFile] = useState()
  
    //-----------------------Display Add product Model-----------------------------
    function showAddProductModel() {
      setAddProductModel(true);
    }

     //-----------------------Hide Add product Model-----------------------------
     function hideAddProductModel() {
      setAddProductModel(false);
    }

  // -----------------------API CALL To Add Products-----------------------

  const addProduct = () => {

    const data = new FormData()
    data.append('file',file)
    data.append('name',productName)
    data.append('description', productDescription)
    data.append('price', productPrice)
    console.log(data);
    
    // const product = {
    //   name: productName,
    //   description: productDescription,
    //   price: productPrice,
    // };

    // data.append('product', product)

    axios
      .post("http://localhost:3000/product", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setAddProductModel(false)
      setProductName("")
      setProductDescription("")
      setProductPrice()

  };
/*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        UPDATE Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
   const [updateModal,setUpdateModal]= useState(false)

   const[updateProductId,setUpdateProductId]= useState("");

       function updateModalHandler(id){

        setUpdateProductId(id)
        setUpdateModal(true);

  
       


       }
       function updateProduct(){

        const product = {
          name: productName,
          description: productDescription,
          price: productPrice,
    
        };
        axios.put(`http://localhost:3000/product/${updateProductId}`,product)
        .then( ()=>{console.log("UPDATED  Successfully:")
      })
      .catch((error) => {
        console.log(error);
      }); 
        console.log("Slected Product Id",updateProductId)
        console.log("UPDATED name",productName)
        console.log("UPDATED Des",productDescription) 
        console.log("Updated PRIZE",productPrice) 

       }
   /*
   -------------------------------------------------------------------------------------------------------------------------------------------
                                                        Delete Category
   -------------------------------------------------------------------------------------------------------------------------------------------      */
    function deleteProduct(id){
      console.log("D id",id)

      axios.delete(`http://localhost:3000/product/${id}`)
      .then( ()=>{       
        console.log("Deleted  Successfully:")
       })
   .catch((error) => {
     console.log(error);
   }); 



    }




  return (
    <div>
    <h1>P r o d u c t s</h1>
    <div>
        <button className={classes.addbutton} onClick={showAddProductModel}> 
          A d d P r o d u c t
        </button>
        <br />
              <br />
        {addProductModel && (
          <Modal onClose={hideAddProductModel}>
            <Card >
          <form onSubmit={addProduct}>
            <h2>Add Product</h2>
              <input
                className={classes.input}
                type="text"
                required
                minLength={3}
                placeholder=" Name"
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              />
              <br />
              <br />
              <input
                className={classes.input}
                type="text"
                required
                minLength={5}
                placeholder=" Description"
                onChange={(event) => {
                  setProductDescription(event.target.value);
                }}
              />
              <br />
              <br />
              <input
                className={classes.input}
                type="text"
                required
                min={1}
                placeholder=" Price"
                onChange={(event) => {
                  setProductPrice(event.target.value);
                }}
              />
              <br />
              <br />

              <input type='file' accept=".jpg, .jpeg, .png" required onChange={(e) => setFile(e.target.files[0])}/>
              <br />
              <button type='submit' className={classes.add_button_in_model}
              >
                A d d
              </button>
              <br />
              <br />
              </form>
            </Card>
          </Modal>
        )}
      </div>
      <input className={classes.input} onChange={(e)=>setSearch(e.target.value)}  placeholder="Search"/>   


    <ul className={classes.product_card_wrapper}>
        {filteredProduct.map((products) => {
          return (
            <div   key={products._id}>
              <Card className={classes.productCard}>

                <img className={classes.img} src={`http://localhost:3000/${products.images}`} alt={`http://localhost:3000/${products.images}`}/> 

                <h3>{products.name}</h3>
                <h4> {products.description}</h4>
                <h4>₹ {products.price}</h4>
                <img className={classes.update_delete_pic} src={UpdatePic} alt={UpdatePic}
                onClick={() => updateModalHandler(products._id)}/>

              { 
                  updateModal && <Modal onClose={()=>setUpdateModal(false)}> <Card>
                          <h2>Update Product</h2>
                          <input
                className={classes.input}
                type="text"
                placeholder=" Name"
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              />
              <br />
              <br />
              <input
                className={classes.input}
                type="text"
                placeholder=" Description"
                onChange={(event) => {
                  setProductDescription(event.target.value);
                }}
              />
              <br />
              <br />
              <input
                className={classes.input}
                type="text"
                placeholder=" Price"
                onChange={(event) => {
                  setProductPrice(event.target.value);
                }}
              />
            
              <br />
              <button className={classes.add_button_in_model}
                onClick={updateProduct}
              >
              U p d a t e
              </button>
                          
                          </Card> </Modal>
              }
            





                <img className={classes.update_delete_pic} src={DeletePic}  alt={DeletePic}
                onClick={()=>deleteProduct(products._id)} />

               </Card>
              
            </div>
          );
        })}
      </ul>
    

  </div>
  )

};
export default Product;



/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { items } from "./Data";
import { useEffect, useState } from "react";
import Product from "./Product";
items;
const ProductDetails = ({cart,setCart}) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])
  useEffect(() => {
    const filterProduct = items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);


    const relatedProduct=items.filter((relatedProduct)=>relatedProduct.category===product.category);
    // console.log(relatedProducts);
    setRelatedProducts(relatedProduct)
  }, [id, product.category]);
  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id,
      price,
      title,
      description,
      imgSrc,
    };
    setCart([...cart, obj]);
    // console.log("cart elemnet =", cart);
    toast.success("Your item is added on cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container container1">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
                        onClick={() =>
                          addToCart(
                            product.id,
                            product.price,
                            product.title,
                            product.description,
                            product.imgSrc
                          )
                        }
                        className="btn btn-warning"
                      >
                        Add To Cart
                      </button>
        </div>
      </div>
      <Product cart={cart} setCart={setCart} items={relatedProducts}/>
    </>
  );
};

export default ProductDetails;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = ({ setData,cart }) => {
const location=useLocation();
  const navigate=useNavigate();
  const [searchItem, setSearchItem] = useState("");
// console.log(searchItem);
  const FilterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };
  const filterByPrize = (price) => {
    const element = items.filter((product) => product.price >= price);
    setData(element);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/search/${searchItem}`)
    setSearchItem("")
  }

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            E-commerce
          </Link>

          <form 
          onSubmit={handleSubmit}
           className="search-bar">
            <input
            value={searchItem}
            onChange={(e)=>setSearchItem(e.target.value)}
             type="text" placeholder="Search Products" />
          </form>

          <Link to={"/cart"} className="cart">
          <button type="button" className="btn btn-primary position-relative">
          <FaShoppingCart style={{fontSize:'1.5rem'}}/>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cart.length}
    <span className="visually-hidden">unread messages</span>
  </span>
</button>
          </Link>
        </div>

        {/* ------------2nd Navbar --------- */}
        {
          location.pathname=='/' && ( <div className="nav-bar-wrapper">
          <div className="items">Filter by {"->"}</div>
          <div onClick={() => setData(items)} className="items">
            No Filter
          </div>
          <div onClick={() => FilterByCategory("mobiles")} className="items">
            Mobiles
          </div>
          <div onClick={() => FilterByCategory("laptops")} className="items">
            Laptops
          </div>
          <div onClick={() => FilterByCategory("tablets")} className="items">
            Tablets
          </div>
          <div onClick={() => filterByPrize(29999)} className="items">
            {">="}29999
          </div>
          <div onClick={() => filterByPrize(49999)} className="items">
            {">="}79999
          </div>
          <div onClick={() => filterByPrize(69999)} className="items">
            {">="}279999
          </div>
          <div onClick={() => filterByPrize(89999)} className="items">
            {">="}19999
          </div>
        </div>)
        }
       
      </header>
    </>
  );
};

export default Navbar;

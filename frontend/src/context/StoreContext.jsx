import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // const addToCart = (itemId) => {
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   }
  // };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      return updatedCart;
    });
  };


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of food_list) {
      if (cartItems[item._id]) {
        totalAmount += cartItems[item._id] * item.price;
      }
    }
    return totalAmount;
  };

  //fun to fetch the food_list from the database
  const fetchFoodList = async() => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

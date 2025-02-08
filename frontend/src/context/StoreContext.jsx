import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      return updatedCart;
    });

    if(token){
      await axios.post(url+'/api/cart/add', {itemId}, {headers: {token}});
    }
  };


  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token){
      await axios.post(url+'/api/cart/remove', {itemId}, {headers: {token}});
    }
  };

  // const removeFromCart = async (itemId) => {
  //   setCartItems((prev) => {
  //     if (!prev[itemId] || prev[itemId] <= 1) {
  //       const updatedCart = { ...prev };
  //       delete updatedCart[itemId]; // Remove item if quantity is 1 or less
  //       return updatedCart;
  //     }
  //     return { ...prev, [itemId]: prev[itemId] - 1 };
  //   });
  
  //   if (token) {
  //     await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
  //   }
  // };
  


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

  // so that after refreshing page the cart data will stored 
  const loadCartData = async (token) => {
    const response = await axios.post(url+'/api/cart/get', {}, {headers: {token}});
    console.log("Cart Data Fetched:", response.data.cartData);
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
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

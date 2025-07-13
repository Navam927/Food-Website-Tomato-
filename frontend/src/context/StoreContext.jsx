import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); 
  const [backendDown, setBackendDown] = useState(false);

  const url="https://food-website-tomato.onrender.com";
  const [token,setToken]=useState("")
  const [food_list,setFoodList]=useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }

    }
    return totalAmount;
  }

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
      setBackendDown(false); // backend is reachable
    } catch (error) {
      console.error("Backend is down:", error);
      setBackendDown(true);
    }
  };

  const loadCartdata = async (token) => {
  try {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
    setBackendDown(false);
  } catch (error) {
    console.error("Backend is down:", error);
    setBackendDown(true);
  }
};
    
  useEffect(()=>{
     async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartdata(localStorage.getItem("token"))
       }
     }
     loadData();
  },[])
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
    {backendDown ? (
      <div style={{
        height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        backgroundColor: "#f8d7da", color: "#721c24", textAlign: "center", padding: "2rem"
      }}>
        <h2>🚫 Service Unavailable</h2>
        <p>Our servers are temporarily down. Please try again after a few minutes or drop <a href="https://www.linkedin.com/in/navam-sharma-baab95247/"></a> me a message</p>
      </div>
    ) : (
      props.children
    )}
  </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 

export default StoreContextProvider;

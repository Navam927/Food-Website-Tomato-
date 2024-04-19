import { createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import PropTypes from "prop-types";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});  // Creates blank page 
  const addToCart = (itemId) => {
      if(cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }
      else {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }

      
  }

  const removeFromCart = (itemId) => {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  

  const ContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;

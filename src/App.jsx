import { Routes, Route } from "react-router-dom"
import RestaurantHome from "./pages/RestaurantHome"
import ReviewsPage from "./pages/ReviewsPage"
import Footer from "./components/Footer"
import { useState } from "react"
import CartPage from "./pages/CartPage."

function App() {

    const [nav, setNav] = useState("home");
    const [cartCount,setCartCount]=useState(0)
    const [cartTotal,setCartTotal]=useState(0)
    const [cart, setCart] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<RestaurantHome setCartCount={setCartCount} setCartTotal={setCartTotal} cart={cart} setCart={setCart}/>} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/cart" element={<CartPage cart={cart}/>} />
      </Routes>
      <Footer nav={nav} cartCount={cartCount} setNav={setNav} cartTotal={cartTotal}/>
    </>
  )
}

export default App
import { Routes, Route } from "react-router-dom"
import RestaurantHome from "./pages/RestaurantHome"
import ReviewsPage from "./pages/ReviewsPage"
import Footer from "./components/Footer"
import { useState } from "react"
import CartPage from "./pages/CartPage"
import QuickActions from "./components/QuickActions"
import ScrollFoodCourt from "./pages/Scrollfoodcourt"

function App() {

    const [nav, setNav] = useState("home");
    const [cartCount,setCartCount]=useState(0)
    const [cartTotal,setCartTotal]=useState(0)
    const [cart, setCart] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/homescreen" element={<RestaurantHome setCartCount={setCartCount} setCartTotal={setCartTotal} cart={cart} setCart={setCart}/>} />
        <Route path="/" element={<ScrollFoodCourt/>} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/cart" element={<CartPage cart={cart}/>} />
      </Routes>
      <div className="fixed bottom-0 w-full">
        <Footer nav={nav} cartCount={cartCount} setNav={setNav} cartTotal={cartTotal}/>
      </div>
      <div className="fixed bottom-0 w-full">
      <QuickActions/>
      </div>
    </>
  )
}

export default App
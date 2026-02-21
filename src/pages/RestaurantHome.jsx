import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";

const BANNERS = [
  {
    label: "Today's Special",
    title: "Malabar Feast",
    subtitle: "Authentic coastal flavours, crafted fresh daily",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
  },
  {
    label: "Chef's Special",
    title: "Pepper Crab Masala",
    subtitle: "Chef Rajan's signature — limited portions daily",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
  },
  {
    label: "Most Ordered",
    title: "Kerala Prawn Fry",
    subtitle: "Ordered 200+ times this week",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=800&q=80",
  },
];

const ITEMS = [
  {
    id: 1, name: "Kerala Fish Curry", category: "Mains", price: 420,
    rating: 4.8, reviews: 142, veg: false, tag: "House Special",
    desc: "Wild-caught Karimeen slow-simmered in a roasted coconut and raw mango gravy. Served with red rice.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  },
  {
    id: 2, name: "Chicken Biryani", category: "Mains", price: 360,
    rating: 4.7, reviews: 289, veg: false, tag: "Popular",
    desc: "Dum-cooked Malabar biryani with Kaima rice, whole spices, caramelised onions and raita.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
  {
    id: 3, name: "Mushroom Pepper Toss", category: "Starters", price: 220,
    rating: 4.5, reviews: 76, veg: true, tag: null,
    desc: "Button mushrooms flash-fried with cracked black pepper, garlic butter and fresh curry leaves.",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&q=80",
  },
  {
    id: 4, name: "Prawn Moilee", category: "Mains", price: 480,
    rating: 4.9, reviews: 98, veg: false, tag: "Chef's Pick",
    desc: "Jumbo prawns poached in a delicate coconut milk broth with green chillies and turmeric.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
  },
  {
    id: 5, name: "Masala Dosa", category: "Breakfast", price: 160,
    rating: 4.6, reviews: 211, veg: true, tag: "Popular",
    desc: "Crispy golden dosa with spiced potato filling, served with coconut chutney and sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
  },
  {
    id: 6, name: "Beef Ularthiyathu", category: "Mains", price: 390,
    rating: 4.8, reviews: 167, veg: false, tag: "House Special",
    desc: "Tender beef dry-roasted with coconut slices, pearl onions and freshly ground spices.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
  },
];

const QUICK_ACTIONS = [
  { label: "Request Water", emoji: "💧" },
  { label: "Call Waiter", emoji: "🔔" },
  { label: "Ask for Bill", emoji: "🧾" },
];

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);



export default function RestaurantHome({setCartCount, setCartTotal, cart, setCart}) {
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(null);
  
  const [justAdded, setJustAdded] = useState(null);
  const sliderRef = useRef(null);
useEffect(() => {
  const interval = setInterval(() => {
    const nextSlide = (slide + 1) % BANNERS.length
    setSlide(nextSlide)
    sliderRef.current.scrollTo({
      left: sliderRef.current.offsetWidth * nextSlide,
      behavior: "smooth"
    })
  }, 3000)

  return () => clearInterval(interval)
}, [slide])

  const addToCart = (item) => {
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      return ex ? c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...c, { ...item, qty: 1 }];
    });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 900);
  };

  setCartCount(cart.reduce((s, i) => s + i.qty, 0))
  setCartTotal(cart.reduce((s, i) => s + i.price * i.qty, 0))

  return (
    <div className="font-sans bg-orange-50 text-gray-900 min-h-screen max-w mx-auto relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }
        .hide-scroll { scrollbar-width: none; }
        .slide-up { animation: slideUp 0.32s cubic-bezier(0.22,1,0.36,1); }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .pop { animation: pop 0.3s cubic-bezier(0.17,0.89,0.32,1.28); }
        @keyframes pop { from { transform: scale(0.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 bg-orange-50/95 backdrop-blur border-b border-gray-100 px-5 py-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-300" />
              <span className="text-green-600 text-xs font-semibold tracking-widest uppercase">Open Now</span>
            </div>
            <h1 className="font-display text-xl font-semibold text-gray-900 leading-tight">Zara Kerala Kitchen</h1>
            <p className="text-xs text-gray-400 mt-0.5">Marine Drive, Kochi</p>
          </div>
          <div className="bg-orange-100 border border-orange-200 rounded-xl px-4 py-2 text-center">
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-0.5">Table</p>
            <p className="font-display text-2xl font-semibold text-orange-500 leading-none">07</p>
          </div>
        </div>
      </div>

      {/* ── BANNER SLIDER ── */}
      <div className="pt-5">
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll hide-scroll scroll-smooth pb-1"
          style={{ scrollSnapType: "x mandatory" }}
          onScroll={e => setSlide(Math.round(e.target.scrollLeft / e.target.offsetWidth))}
        >
          {BANNERS.map((b, i) => (
            <div key={i} className="px-5 min-w-full" style={{ scrollSnapAlign: "start" }}>
              <div className="rounded-2xl overflow-hidden relative h-44">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/10" />
                <div className="absolute top-3 left-3 bg-white/20 backdrop-blur border border-white/30 rounded-full px-3 py-1 text-white text-xs font-semibold tracking-widest uppercase">
                  {b.label}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-display text-xl font-semibold text-white leading-tight mb-1">{b.title}</h2>
                  <p className="text-white/70 text-xs font-light">{b.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
  setSlide(i)
  sliderRef.current.scrollTo({
    left: sliderRef.current.offsetWidth * i,
    behavior: "smooth"
  })
}}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === slide ? 22 : 6, background: i === slide ? "#e8622a" : "#d1d5db" }}
            />
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="flex gap-2 px-5 pt-5 pb-1 overflow-x-auto hide-scroll">
        {QUICK_ACTIONS.map(a => (
          <button
            key={a.label}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium text-gray-600 whitespace-nowrap shadow-sm active:scale-95 transition-transform"
          >
            <span>{a.emoji}</span>
            {a.label}
          </button>
        ))}
      </div>

      {/* ── MENU HEADER ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-3">
        <h2 className="font-display text-lg font-semibold text-gray-900">Our Menu</h2>
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">{ITEMS.length} dishes</span>
      </div>

      {/* ── FOOD LIST ── */}
      <div className="px-5">
        {ITEMS.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setModal(item)}
            className="flex gap-3 items-center py-3.5 active:opacity-75 transition-opacity cursor-pointer"
            style={{ borderBottom: idx < ITEMS.length - 1 ? "1px solid #f3f4f6" : "none" }}
          >
            {/* image */}
            <div className="relative flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className={`absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-sm border-2 bg-white flex items-center justify-center ${item.veg ? "border-green-500" : "border-red-500"}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
              </div>
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <span className="text-sm font-medium text-gray-900 leading-snug">{item.name}</span>
                {item.tag && (
                  <span className="text-xs font-semibold bg-orange-50 text-orange-500 border border-orange-200 px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide uppercase flex-shrink-0" style={{fontSize: 9}}>
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-orange-500 mb-0.5">₹{item.price}</p>
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="text-xs font-semibold text-gray-600">{item.rating}</span>
                    <span className="text-xs text-gray-400">({item.reviews})</span>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); addToCart(item); }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md active:scale-90 transition-all ${justAdded === item.id ? "bg-green-500" : "bg-orange-500"}`}
                >
                  {justAdded === item.id
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-24" />

      

      {/* ── ITEM MODAL ── */}
      {modal && (
        <>
          <div className="fade-in fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setModal(null)} />
          <div className="slide-up fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-t-3xl z-50 flex flex-col max-h-[88vh] shadow-2xl">
            
            {/* close */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <img src={modal.image} alt={modal.name} className="w-full h-56 object-cover rounded-t-3xl flex-shrink-0" />

            <div className="p-5 overflow-y-auto">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-display text-2xl font-semibold text-gray-900 leading-tight flex-1">{modal.name}</h2>
                <span className="text-xl font-bold text-orange-500 ml-3 flex-shrink-0">₹{modal.price}</span>
              </div>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  <span className="text-sm font-semibold text-gray-700 ml-1">{modal.rating}</span>
                </div>
                <span className="text-xs text-gray-400">· {modal.reviews} reviews</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 border-2 rounded-sm bg-white flex items-center justify-center ${modal.veg ? "border-green-500" : "border-red-500"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${modal.veg ? "bg-green-500" : "bg-red-500"}`} />
                  </div>
                  <span className={`text-xs font-medium ${modal.veg ? "text-green-600" : "text-red-500"}`}>
                    {modal.veg ? "Vegetarian" : "Non-veg"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-5 font-light">{modal.desc}</p>

              {modal.tag && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-5">
                  <span className="text-xs font-semibold text-orange-500">✦ {modal.tag}</span>
                </div>
              )}

              <button
                onClick={() => { addToCart(modal); setModal(null); }}
                className="w-full py-4 bg-orange-500 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-200 active:scale-98 transition-transform"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add to Cart — ₹{modal.price}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
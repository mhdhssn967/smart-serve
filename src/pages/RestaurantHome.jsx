import { useState, useEffect, useRef } from "react";
import { Search, X, Flame } from "lucide-react";
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
  {
    id: 7, name: "Appam & Stew", category: "Breakfast", price: 180,
    rating: 4.7, reviews: 134, veg: true, tag: "Popular",
    desc: "Soft lacy appams served with a mildly spiced coconut milk vegetable stew. A Kerala breakfast classic.",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80",
  },
  {
    id: 8, name: "Chicken 65", category: "Starters", price: 280,
    rating: 4.6, reviews: 203, veg: false, tag: "Popular",
    desc: "Crispy deep-fried chicken bites marinated in yoghurt, red chilli and curry leaves.",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=80",
  },
  {
    id: 9, name: "Paneer Butter Masala", category: "Mains", price: 300,
    rating: 4.4, reviews: 88, veg: true, tag: null,
    desc: "Soft paneer cubes simmered in a rich, buttery tomato-cashew gravy. Best with garlic naan.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
  },
  {
    id: 10, name: "Karimeen Pollichathu", category: "Mains", price: 520,
    rating: 4.9, reviews: 61, veg: false, tag: "House Special",
    desc: "Pearl spot fish marinated in a spiced masala, wrapped in banana leaf and pan-roasted to perfection.",
    image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80",
  },
  {
    id: 11, name: "Veg Spring Rolls", category: "Starters", price: 180,
    rating: 4.3, reviews: 55, veg: true, tag: null,
    desc: "Crispy golden rolls stuffed with spiced glass noodles and fresh vegetables. Served with sweet chilli dip.",
    image: "https://i0.wp.com/s.lightorangebean.com/media/20240914144947/Thai-Veggie-Spring-Rolls_done.png?resize=480%2C270&quality=80&ssl=1",
  },
  {
    id: 12, name: "Mango Lassi", category: "Drinks", price: 120,
    rating: 4.7, reviews: 177, veg: true, tag: "Popular",
    desc: "Thick, chilled yoghurt blended with ripe Alphonso mango pulp. Refreshing and naturally sweet.",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80",
  },
  {
    id: 13, name: "Filter Coffee", category: "Drinks", price: 80,
    rating: 4.8, reviews: 320, veg: true, tag: "Popular",
    desc: "Traditional South Indian filter coffee, brewed strong and served with frothed milk in a classic tumbler.",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&q=80",
  },
  {
    id: 14, name: "Mutton Stew", category: "Mains", price: 440,
    rating: 4.6, reviews: 72, veg: false, tag: null,
    desc: "Tender mutton slow-cooked with potatoes, carrots and whole spices in a light coconut milk gravy.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  },
  {
    id: 15, name: "Gulab Jamun", category: "Desserts", price: 110,
    rating: 4.5, reviews: 143, veg: true, tag: null,
    desc: "Soft milk-solid dumplings soaked in rose-cardamom sugar syrup. Served warm with a scoop of vanilla ice cream.",
    image: "https://www.cookwithmanali.com/wp-content/uploads/2018/09/Gulab-Jamun-Indian-Sweet-500x500.jpg",
  },
  {
    id: 16, name: "Payasam", category: "Desserts", price: 130,
    rating: 4.8, reviews: 98, veg: true, tag: "House Special",
    desc: "Traditional Kerala rice pudding made with coconut milk, jaggery, cardamom and cashews.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
  },
];

const CATEGORIES = ["All", "Starters", "Mains", "Breakfast", "Drinks", "Desserts"];

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

function ItemList({ items, justAdded, setModal, addToCart, cartQtyFor, onDecrement }) {
  return (
    <div className="px-5">
      {items.map((item, idx) => (
        <div
          key={item.id}
          onClick={() => setModal(item)}
          className="flex gap-3 items-center py-3.5 active:opacity-75 transition-opacity cursor-pointer"
          style={{ borderBottom: idx < items.length - 1 ? "1px solid #f3f4f6" : "none" }}
        >
          <div className="relative flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className={`absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-sm border-2 bg-white flex items-center justify-center ${item.veg ? "border-green-500" : "border-red-500"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
            </div>
            {item.tag === "Popular" && (
              <div className="absolute -top-1.5 -right-1.5 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                <Flame size={10} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <span className="text-sm font-medium text-gray-900 leading-snug">{item.name}</span>
              {item.tag && item.tag !== "Popular" && (
                <span className="font-semibold bg-orange-50 text-orange-500 border border-orange-200 px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide uppercase flex-shrink-0" style={{ fontSize: 9 }}>
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

              {cartQtyFor(item.id) > 0 ? (
                <div
                  onClick={e => e.stopPropagation()}
                  className="flex items-center bg-white border border-orange-300 rounded-full overflow-hidden"
                >
                  <button
                    onClick={e => { e.stopPropagation(); onDecrement(item.id); }}
                    className="w-7 h-7 flex items-center justify-center text-orange-500 text-base font-medium active:bg-orange-50"
                  >−</button>
                  <span className="w-5 text-center text-xs font-bold text-gray-800">{cartQtyFor(item.id)}</span>
                  <button
                    onClick={e => { e.stopPropagation(); addToCart(item); }}
                    className="w-7 h-7 flex items-center justify-center text-orange-500 text-base font-medium active:bg-orange-50"
                  >+</button>
                </div>
              ) : (
                <button
                  onClick={e => { e.stopPropagation(); addToCart(item); }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md active:scale-90 transition-all ${justAdded === item.id ? "bg-green-500" : "bg-orange-500"}`}
                >
                  {justAdded === item.id
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RestaurantHome({ setCartCount, setCartTotal, cart, setCart }) {
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(null);
  const [justAdded, setJustAdded] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const sliderRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (slide + 1) % BANNERS.length;
      setSlide(next);
      sliderRef.current?.scrollTo({ left: sliderRef.current.offsetWidth * next, behavior: "smooth" });
    }, 3000);
    return () => clearInterval(interval);
  }, [slide]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const addToCart = (item) => {
    navigator.vibrate(15)
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      return ex ? c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...c, { ...item, qty: 1 }];
    });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 900);
  };

  const decrementCart = (id) => {
    navigator.vibrate(15)
    setCart(c => c.map(x => x.id === id ? { ...x, qty: x.qty - 1 } : x).filter(x => x.qty > 0));
  };

  const cartQtyFor = (id) => cart.find(x => x.id === id)?.qty || 0;

  setCartCount(cart.reduce((s, i) => s + i.qty, 0));
  setCartTotal(cart.reduce((s, i) => s + i.price * i.qty, 0));

  const isFiltering = search || activeCategory !== "All" || vegOnly;

  const filtered = ITEMS.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchVeg = !vegOnly || item.veg;
    return matchSearch && matchCat && matchVeg;
  });

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(i => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="font-sans bg-orange-50 text-gray-900 min-h-screen max-w mx-auto relative" style={{ marginBottom: '60px' }}>
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
        .search-in { animation: searchIn 0.18s ease; }
        @keyframes searchIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-50 bg-orange-50/95 backdrop-blur border-b border-gray-100 px-5 py-3">
        {searchOpen ? (
          <div className="search-in flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white border border-orange-200 rounded-xl px-3 py-2.5 shadow-sm">
              <Search size={15} className="text-orange-400 flex-shrink-0" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search dishes, categories…"
                className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} className="text-gray-300" />
                </button>
              )}
            </div>
            <button
              onClick={() => { setSearchOpen(false); setSearch(""); }}
              className="text-sm font-semibold text-orange-500 whitespace-nowrap"
            >Cancel</button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-300" />
                <span className="text-green-600 text-xs font-semibold tracking-widest uppercase">Open Now</span>
              </div>
              <div className="flex gap-1 items-center">
                <img width={"40px"} className="rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vsuAjpDQesDbTzNFeR80EpYH3VOYu07yhQ&s" alt="" />
                <div>
                  <h1 className="font-display text-xl font-semibold text-gray-900 leading-tight">Avi Express</h1>
                  <p className="text-xs text-gray-400 mt-0.5">Kakkanad, Kochi</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 border border-orange-200 rounded px-2 py-2 text-center">
                <p className="text-orange-500 font-bold tracking-widest uppercase mb-0.5" style={{fontSize:'8px'}}>Table</p>
                <p className="font-display text-sm font-semibold text-orange-500 leading-none">07</p>
              </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center active:scale-90 transition-transform"
              >
                <Search size={16} className="text-gray-500" />
              </button>
              
            </div>
          </div>
        )}
      </div>

      {/* ── BANNER SLIDER ── hidden when filtering */}
      
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
          <div className="flex justify-center gap-1.5 mt-3">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSlide(i); sliderRef.current?.scrollTo({ left: sliderRef.current.offsetWidth * i, behavior: "smooth" }); }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === slide ? 22 : 6, background: i === slide ? "#e8622a" : "#d1d5db" }}
              />
            ))}
          </div>
        </div>
      
      {/* ── FILTER BAR ── */}
      <div className="pt-4 pb-1">
        <div className="flex gap-2 px-5 overflow-x-auto hide-scroll items-center">
          <button
            onClick={() => setVegOnly(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${vegOnly ? "bg-green-500 text-white border-green-500 shadow-sm" : "bg-white text-gray-500 border-gray-200"}`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? "bg-white" : "bg-green-500"}`} />
            Veg Only
          </button>
          <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all active:scale-95 flex-shrink-0 ${activeCategory === cat ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-100" : "bg-white text-gray-500 border-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FILTER RESULT COUNT ── */}
      {isFiltering && (
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{filtered.length}</span> {filtered.length === 1 ? "dish" : "dishes"} found
          </p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); setVegOnly(false); setSearchOpen(false); }}
            className="text-xs font-semibold text-orange-500"
          >Clear all</button>
        </div>
      )}

      {/* ── MENU ITEMS ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <p className="text-4xl mb-4">🍽️</p>
          <p className="text-base font-semibold text-gray-700 mb-1">No dishes found</p>
          <p className="text-sm text-gray-400 font-light">Try a different search or filter.</p>
        </div>
      ) : activeCategory === "All" && !search ? (
        // Grouped view
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-3 px-5 pt-6 pb-3">
              <h2 className="font-display text-lg font-semibold text-gray-900">{cat}</h2>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">{items.length}</span>
            </div>
            <ItemList items={items} justAdded={justAdded} setModal={setModal} addToCart={addToCart} cartQtyFor={cartQtyFor} onDecrement={decrementCart} />
          </div>
        ))
      ) : (
        // Flat filtered view
        <div>
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <h2 className="font-display text-lg font-semibold text-gray-900">
              {search ? "Search Results" : activeCategory}
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">{filtered.length}</span>
          </div>
          <ItemList items={filtered} justAdded={justAdded} setModal={setModal} addToCart={addToCart} cartQtyFor={cartQtyFor} onDecrement={decrementCart} />
        </div>
      )}

      <div className="h-24" />

      {/* ── ITEM MODAL ── */}
      {modal && (
        <>
          <div className="fade-in fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setModal(null)} />
          <div className="slide-up fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-t-3xl z-50 flex flex-col max-h-[88vh] shadow-2xl">
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm"
            >
              <X size={15} />
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                  <span className="text-xs font-semibold text-orange-500">✦ {modal.tag}</span>
                </div>
              )}

              {cartQtyFor(modal.id) > 0 && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-4">
                  <span className="text-green-600 text-xs font-semibold">✓ {cartQtyFor(modal.id)} already in your cart</span>
                </div>
              )}

              <button
                onClick={() => { addToCart(modal); setModal(null); }}
                className="w-full py-4 bg-orange-500 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-200 active:scale-95 transition-transform"
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
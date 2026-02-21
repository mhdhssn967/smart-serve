import React from 'react'
import { Link } from 'react-router-dom';

const Footer = ({ nav, cartCount, setNav, cartTotal }) => {

  const HomeIcon = ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#e8622a" : "none"} stroke={active ? "#e8622a" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );

  const ReviewIcon = ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#e8622a" : "none"} stroke={active ? "#e8622a" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );

  const CartIcon = ({ active, count }) => (
    <div className="relative">
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#e8622a" : "none"} stroke={active ? "#e8622a" : "#9ca3af"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ fontSize: 9 }}>
          {count}
        </span>
      )}
    </div>
  );

  return (
    // ✅ `relative` here is the key fix — lets the absolute cart strip anchor correctly
    <div className="fixed bottom-0 w-full max-w-sm bg-white/95 backdrop-blur border-t border-gray-100 shadow-lg z-40 relative flex justify-around px-0 pt-2.5 pb-6">
      
      {[
        { key: "home",    label: "Home",    Icon: HomeIcon,   pageLink: '/'        },
        { key: "reviews", label: "Reviews", Icon: ReviewIcon, pageLink: '/reviews' },
        { key: "cart",    label: "Cart",    Icon: CartIcon,   pageLink: '/cart'    },
      ].map(({ key, label, Icon, pageLink }) => (
        <Link to={pageLink} key={key}>
          <button
            onClick={() => setNav(key)}
            className="flex flex-col items-center gap-1 px-6 relative"
          >
            {nav === key && (
              <span className="absolute -top-2.5 w-7 h-0.5 rounded-full bg-orange-500" />
            )}
            <Icon active={nav === key} count={key === "cart" ? cartCount : 0} />
            <span className={`text-xs font-semibold tracking-widest uppercase ${nav === key ? "text-orange-500" : "text-gray-400"}`} style={{ fontSize: 9 }}>
              {label}
            </span>
          </button>
        </Link>
      ))}

      {/* View Cart Strip — anchors to the relative footer above */}
      {cartCount > 0 && nav !== "cart" && (
        <Link to="/cart" className="absolute -top-14 left-4 right-4">
          <div
            onClick={() => setNav("cart")}
            className="bg-orange-500 rounded-2xl px-4 py-3 flex justify-between items-center cursor-pointer shadow-lg shadow-orange-200"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-white/25 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
              <span className="text-white text-sm font-semibold">View Cart</span>
            </div>
            <span className="text-white text-sm font-semibold">₹{cartTotal}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Footer;
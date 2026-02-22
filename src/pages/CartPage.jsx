import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const EmptyCartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const TAXES = 0.05;
const DELIVERY = 0;
const PLATFORM_FEE = 5;

export default function CartPage({ cart: initialCart = [], onCartUpdate }) {
  const [cart, setCart] = useState(initialCart);
  const [orders, setOrders] = useState([]);
  const [note, setNote] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQty = (id, delta) => {
    setCart(c => {
      const updated = c
        .map(x => x.id === id ? { ...x, qty: x.qty + delta } : x)
        .filter(x => x.qty > 0);
      onCartUpdate?.(updated);
      return updated;
    });
  };

  const removeItem = (id) => {
    setCart(c => {
      const updated = c.filter(x => x.id !== id);
      onCartUpdate?.(updated);
      return updated;
    });
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * TAXES);
  const total = subtotal + tax + PLATFORM_FEE + DELIVERY;

  const placeOrder = async () => {
    navigator.vibrate([200, 100, 200]);
    if (cart.length === 0) return;

    // Build the SweetAlert2 HTML
    const itemRows = cart.map(i => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f3f4f6;">
        <div style="text-align:left;">
          <div style="font-size:13px;font-weight:500;color:#111;">${i.name} <span style="color:#9ca3af;font-weight:400;">×${i.qty}</span></div>
        </div>
        <div style="font-size:13px;font-weight:600;color:#e8622a;">₹${i.price * i.qty}</div>
      </div>
    `).join("");

    const summaryHTML = `
      <div style="font-family:'DM Sans',sans-serif;text-align:left;">
        <p style="font-size:12px;color:#9ca3af;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.08em;">Order Summary</p>
        ${itemRows}
        <div style="display:flex;justify-content:space-between;padding:10px 0 4px;margin-top:4px;">
          <span style="font-size:12px;color:#6b7280;">Subtotal</span>
          <span style="font-size:12px;color:#374151;">₹${subtotal}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:2px 0;">
          <span style="font-size:12px;color:#6b7280;">Tax (5%)</span>
          <span style="font-size:12px;color:#374151;">₹${tax}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:2px 0;">
          <span style="font-size:12px;color:#6b7280;">Platform fee</span>
          <span style="font-size:12px;color:#374151;">₹${PLATFORM_FEE}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:10px 0 0;border-top:2px solid #f3f4f6;margin-top:8px;">
          <span style="font-size:15px;font-weight:700;color:#111;">Total</span>
          <span style="font-size:15px;font-weight:700;color:#e8622a;">₹${total}</span>
        </div>
        ${note ? `<div style="margin-top:12px;padding:10px;background:#fef9f6;border:1px solid #fde4d3;border-radius:10px;font-size:12px;color:#92400e;"><span style="font-weight:600;">Note:</span> ${note}</div>` : ""}
      </div>
    `;

    const Swal = (await import("https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js")).default;

    const result = await Swal.fire({
      title: "Confirm Order?",
      html: summaryHTML,
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
      cancelButtonText: "Go Back",
      confirmButtonColor: "#e8622a",
      cancelButtonColor: "#f3f4f6",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        cancelButton: "swal-cancel",
        actions: "swal-actions",
      },
      didOpen: () => {
        const style = document.createElement("style");
        style.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
          .swal-popup { font-family: 'DM Sans', sans-serif !important; border-radius: 20px !important; padding: 24px !important; }
          .swal-title { font-family: 'DM Sans', sans-serif !important; font-size: 18px !important; font-weight: 700 !important; color: #111 !important; }
          .swal-cancel { color: #374151 !important; font-weight: 600 !important; }
          .swal-actions { gap: 10px !important; }
          .swal2-confirm { border-radius: 12px !important; font-weight: 600 !important; font-size: 14px !important; padding: 12px 24px !important; }
          .swal2-cancel { border-radius: 12px !important; font-weight: 600 !important; font-size: 14px !important; padding: 12px 24px !important; color: #374151 !important; border: 1px solid #e5e7eb !important; }
        `;
        document.head.appendChild(style);
      },
    });

    if (result.isConfirmed) {
      const newOrder = {
        id: Date.now(),
        items: [...cart],
        note,
        subtotal,
        tax,
        platformFee: PLATFORM_FEE,
        total,
        placedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Preparing",
      };
      setOrders(o => [newOrder, ...o]);
      setCart([]);
      setNote("");
      onCartUpdate?.([]);
      setOrderPlaced(true);
      setTimeout(() => setOrderPlaced(false), 4000);
      navigator.vibrate([100,100,100,100])
    }
  };

  // ── EMPTY STATE ──
  if (cart.length === 0 && orders.length === 0) {
    return (
      <div className="font-sans bg-orange-50 min-h-screen max-w mx-auto flex flex-col">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap'); .font-sans{font-family:'DM Sans',sans-serif;} .font-display{font-family:'Playfair Display',serif;}`}</style>
        <div className="sticky top-0 z-40 bg-orange-50/95 backdrop-blur border-b border-gray-100 px-5 py-4">
          <h1 className="font-display text-xl font-semibold text-gray-900">Your Cart</h1>
          <p className="text-xs text-gray-400 mt-0.5">Table 07 · Zara Kerala Kitchen</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <EmptyCartIcon />
          <div>
            <p className="text-base font-semibold text-gray-700 mb-1">Your cart is empty</p>
            <p className="text-sm text-gray-400 font-light">Browse the menu and add items you'd like to order.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-orange-50 mx-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }
        .fade-up { animation: fadeUp 0.3s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .order-success { animation: successPop 0.4s cubic-bezier(0.17,0.89,0.32,1.28) both; }
        @keyframes successPop { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
      `}</style>

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-orange-50/95 backdrop-blur border-b border-gray-100 px-5 py-4">
        <h1 className="font-display text-xl font-semibold text-gray-900">Your Cart</h1>
        <p className="text-xs text-gray-400 mt-0.5">Table 07 · Zara Kerala Kitchen</p>
      </div>

      <div className="px-5 pt-5 pb-4 flex flex-col gap-4">

        {/* ORDER PLACED TOAST */}
        {orderPlaced && (
          <div className="order-success flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Order placed!</p>
              <p className="text-xs text-green-600">Your food is being prepared.</p>
            </div>
          </div>
        )}

        {/* CART ITEMS */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 pt-4 pb-2 border-b border-gray-50 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">Items ({cart.reduce((s, i) => s + i.qty, 0)})</p>
              <button
                onClick={() => { setCart([]); onCartUpdate?.([]); }}
                className="text-xs text-red-400 font-medium active:opacity-60"
              >
                Clear all
              </button>
            </div>

            {cart.map((item, idx) => (
              <div
                key={item.id}
                className="fade-up flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom: idx < cart.length - 1 ? "1px solid #f9fafb" : "none",
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-snug mb-0.5">{item.name}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <StarIcon /><span className="text-xs text-gray-500 font-medium">{item.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-orange-500">₹{item.price * item.qty}</p>
                  {item.qty > 1 && (
                    <p className="text-xs text-gray-400">₹{item.price} × {item.qty}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* qty control */}
                  <div className="flex items-center gap-0 bg-gray-50 border border-gray-200 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 text-lg font-light active:bg-gray-100 transition-colors"
                    >−</button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-800">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center text-orange-500 text-lg font-light active:bg-orange-50 transition-colors"
                    >+</button>
                  </div>
                  {/* remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 active:text-red-400 transition-colors"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SPECIAL INSTRUCTIONS */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">Special Instructions</p>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="E.g. Less spicy, no onions, extra chutney…"
              rows={2}
              className="w-full text-sm text-gray-600 placeholder-gray-300 resize-none outline-none font-light bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100 focus:border-orange-200 transition-colors"
            />
          </div>
        )}

        {/* PRICE BREAKDOWN */}
        {cart.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Price Details</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="text-sm text-gray-700 font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">GST & taxes (5%)</span>
                <span className="text-sm text-gray-700 font-medium">₹{tax}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Platform fee</span>
                <span className="text-sm text-gray-700 font-medium">₹{PLATFORM_FEE}</span>
              </div>
              
              <div className="border-t border-dashed border-gray-100 pt-2.5 mt-0.5 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Total Payable</span>
                <span className="text-base font-bold text-orange-500">₹{total}</span>
              </div>
            </div>

            {/* savings note */}
           
          </div>
        )}

        {/* PAST ORDERS */}
        {orders.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sm font-semibold text-gray-700">Past Orders</p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-3">
              {orders.map((order, i) => (
                <div key={order.id} className="fade-up bg-white rounded-2xl shadow-sm border border-gray-100 p-4" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Order #{String(order.id).slice(-4)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-semibold text-amber-600">{order.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {order.items.map(it => (
                      <span key={it.id} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full font-medium">
                        {it.name} ×{it.qty}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Placed at {order.placedAt}</span>
                    <span className="text-sm font-bold text-orange-500">₹{order.total}</span>
                  </div>
                  {order.note && (
                    <p className="text-xs text-gray-400 mt-1.5 italic">"{order.note}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      {cart.length > 0 && (
        <div className=" w-full max-w backdrop-blur border-t border-gray-100 z-40 px-8 pt-3 pb-7" style={{marginBottom:'120px'}}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs text-gray-400">Total payable</p>
              <p className="text-lg font-bold text-gray-900">₹{total}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{cart.reduce((s, i) => s + i.qty, 0)} items · Table 07</p>
              {/* <p className="text-xs text-green-600 font-medium">Free delivery ✓</p> */}
            </div>
          </div>
          <button
            onClick={placeOrder}
            className="w-full py-4 bg-orange-500 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-200 active:scale-95 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
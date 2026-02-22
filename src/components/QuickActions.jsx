import React, { useState, useEffect, useRef } from 'react';
import { Droplets, BellRing, Receipt, X, UtensilsCrossed } from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const COMMON_TAGS = ["Tissue", "Glass", "Plate", "Spoon", "Fork", "Napkin", "Straw", "Toothpick"];

const QuickActions = () => {
  const [open, setOpen] = useState(false);
  const [waiterModal, setWaiterModal] = useState(false);
  const [waiterNote, setWaiterNote] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const injectSwalStyles = () => {
    if (document.getElementById('swal-custom-style')) return;
    const style = document.createElement('style');
    style.id = 'swal-custom-style';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
      .swal-custom-popup { font-family: 'DM Sans', sans-serif !important; border-radius: 22px !important; padding: 28px 24px !important; }
      .swal-custom-confirm { border-radius: 12px !important; font-weight: 600 !important; font-size: 14px !important; padding: 12px 28px !important; }
    `;
    document.head.appendChild(style);
  };

  const confirmAction = async (title, text, confirmColor) => {
    const result = await Swal.fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: confirmColor,
      customClass: {
        popup: "swal-custom-popup",
        confirmButton: "swal-custom-confirm",
      },
      didOpen: injectSwalStyles,
    });
    return result.isConfirmed;
  };

  const handleWater = async () => {
    navigator.vibrate(60)
    setOpen(false);

    const confirmed = await confirmAction(
      "Request Water?",
      "A staff member will bring water to your table.",
      "#3b82f6"
    );

    if (!confirmed) return;

    await Swal.fire({
      html: `
        <div style="font-family:'DM Sans',sans-serif;padding:8px 0;">
          <h2 style="font-size:18px;font-weight:700;color:#111;margin-bottom:8px;">Water Requested!</h2>
          <p style="font-size:14px;color:#6b7280;">A glass of water will arrive shortly.</p>
        </div>
      `,
      confirmButtonText: "Got it",
      confirmButtonColor: "#3b82f6",
      customClass: { popup: "swal-custom-popup", confirmButton: "swal-custom-confirm" },
      didOpen: injectSwalStyles,
    });
  };

  const handleBill = async () => {
    navigator.vibrate(60)
    setOpen(false);

    const confirmed = await confirmAction(
      "Request Bill?",
      "Your bill will be prepared and brought to your table.",
      "#16a34a"
    );

    if (!confirmed) return;

    await Swal.fire({
      html: `
        <div style="font-family:'DM Sans',sans-serif;padding:8px 0;">
          <h2 style="font-size:18px;font-weight:700;color:#111;margin-bottom:8px;">Bill is on its way!</h2>
          <p style="font-size:14px;color:#6b7280;">Thank you for dining with us! 🙏</p>
        </div>
      `,
      confirmButtonText: "Thank you",
      confirmButtonColor: "#16a34a",
      customClass: { popup: "swal-custom-popup", confirmButton: "swal-custom-confirm" },
      didOpen: injectSwalStyles,
    });
  };

  const handleWaiterSubmit = async () => {
    
    setWaiterModal(false);

    const items = selectedTags.length > 0 ? selectedTags.join(', ') : null;

    await Swal.fire({
      html: `
        <div style="font-family:'DM Sans',sans-serif;padding:8px 0;">
          <h2 style="font-size:18px;font-weight:700;color:#111;margin-bottom:8px;">Waiter Notified!</h2>
          <p style="font-size:14px;color:#6b7280;">
            ${items ? `<strong style="color:#374151;">${items}</strong> — someone will be` : 'Someone will be'} at your table shortly.
          </p>
          ${waiterNote ? `<div style="margin-top:12px;background:#fef9f6;border:1px solid #fde4d3;border-radius:10px;padding:10px 12px;font-size:13px;color:#92400e;text-align:left;"><span style="font-weight:600;">Note:</span> ${waiterNote}</div>` : ''}
        </div>
      `,
      confirmButtonText: "Got it",
      confirmButtonColor: "#e8622a",
      customClass: { popup: "swal-custom-popup", confirmButton: "swal-custom-confirm" },
      didOpen: injectSwalStyles,
    });

    setWaiterNote('');
    setSelectedTags([]);
  };

  const ACTIONS = [
    {
      label: "Request Water",
      icon: <Droplets size={18} className="text-blue-500" />,
      bg: "bg-blue-50 border-blue-100",
      onClick: handleWater,
    },
    {
      label: "Call Waiter",
      icon: <BellRing size={18} className="text-orange-500" />,
      bg: "bg-orange-50 border-orange-100",
      onClick: () => { setOpen(false); setWaiterModal(true); navigator.vibrate(60); },
    },
    {
      label: "Request Bill",
      icon: <Receipt size={18} className="text-green-600" />,
      bg: "bg-green-50 border-green-100",
      onClick: handleBill,
    },
  ];

  return (
    <>
      <div ref={menuRef} className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
        {open && ACTIONS.map((action, i) => (
          <div
            key={action.label}
            className="flex items-center gap-2.5"
            style={{
              animation: `fabIn 0.22s cubic-bezier(0.22,1,0.36,1) both`,
              animationDelay: `${(ACTIONS.length - 1 - i) * 0.06}s`,
            }}
          >
            <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-gray-100 whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={action.onClick}
              className={`w-11 h-11 rounded-full border flex items-center justify-center shadow-md active:scale-90 transition-transform ${action.bg}`}
            >
              {action.icon}
            </button>
          </div>
        ))}

        <button
          onClick={() => setOpen(o => !o)}
          className={`wiggle w-13 h-13 rounded-full shadow-xl flex items-center justify-center transition-all active:scale-90 ${open ? 'bg-gray-800' : 'bg-blue-500 fab-attention'}`}
          style={{ width: 52, height: 52 }}
        >
          {open
            ? <X size={22} className="text-white" />
            : <UtensilsCrossed size={20} className="text-white" />
          }
        </button>
      </div>

      {waiterModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setWaiterModal(false)}
          />
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-t-3xl z-50 shadow-2xl"
            style={{ animation: 'slideUp 0.3s cubic-bezier(0.22,1,0.36,1)' }}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1" />

            <div className="px-5 pb-8 pt-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <BellRing size={17} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 leading-tight">Call Waiter</p>
                    <p className="text-xs text-gray-400">What do you need?</p>
                  </div>
                </div>
                <button
                  onClick={() => setWaiterModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 active:bg-gray-200"
                >
                  <X size={15} />
                </button>
              </div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2.5">Quick Select</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {COMMON_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all active:scale-95 ${
                      selectedTags.includes(tag)
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Anything else?</p>
              <textarea
                value={waiterNote}
                onChange={e => setWaiterNote(e.target.value)}
                placeholder="E.g. We need an extra chair, our food is cold…"
                rows={2}
                className="w-full text-sm text-gray-700 placeholder-gray-300 resize-none outline-none bg-gray-50 border border-gray-100 focus:border-orange-200 rounded-xl px-3.5 py-3 transition-colors font-light"
              />

              <button
                onClick={handleWaiterSubmit}
                className="mt-4 w-full py-3.5 bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-100 active:scale-95 transition-all"
              >
                <BellRing size={16} />
                {selectedTags.length === 0 && !waiterNote.trim() ? "Call Waiter" : "Notify waiter"}
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fabIn {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0);    }
        }
      `}</style>
    </>
  );
};

export default QuickActions;
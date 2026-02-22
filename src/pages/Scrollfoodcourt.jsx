import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, Clock, Star } from "lucide-react";

const COURTS = [
  {
    id: 1,
    name: "Kimchi Tower",
    cuisine: "Korean",
    tag: "Korean BBQ & Bowls",
    wait: "10–15 min",
    rating: 4.6,
    open: true,
    color: "#e83a3a",
    bg: "#fff0f0",
    emoji: "🇰🇷",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfTGbiQ_C-R4DkwzZwHenxaojLNE7rF35ow&s",
  },
  {
    id: 2,
    name: "Aavi Express",
    cuisine: "South Indian",
    tag: "Steam & Spice",
    wait: "8–12 min",
    rating: 4.7,
    open: true,
    color: "#e8622a",
    bg: "#fff5f0",
    emoji: "🥘",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vsuAjpDQesDbTzNFeR80EpYH3VOYu07yhQ&s",
  },
  {
    id: 3,
    name: "Salado",
    cuisine: "Salads & Wraps",
    tag: "Fresh & Healthy",
    wait: "5–8 min",
    rating: 4.4,
    open: true,
    color: "#2e9e5b",
    bg: "#f0fdf4",
    emoji: "🥗",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDBMEfPzYg_KfRMg2-uSSZ8teixWvmI3mFQ&s",
  },
  {
    id: 4,
    name: "Porch Grill",
    cuisine: "Grills & BBQ",
    tag: "Flame-kissed Goodness",
    wait: "15–20 min",
    rating: 4.8,
    open: true,
    color: "#c05a1e",
    bg: "#fdf4ef",
    emoji: "🔥",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7NfWiM4xYjEbmCbBv3eM-9Oaq3ijiqtXWQ&s",
  },
  {
    id: 5,
    name: "Juzo",
    cuisine: "Shakes and snacks",
    tag: "Burgers and ce Cream",
    wait: "12–18 min",
    rating: 4.5,
    open: true,
    color: "#c0392b",
    bg: "#fff5f5",
    emoji: "🍜",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPC4dXq0j9sTp9HNt9sto44ifgcNnX6ukkBQ&s",
  },
  {
    id: 6,
    name: "Aladdin Shawarma",
    cuisine: "Arabian",
    tag: "Wraps & Mezze",
    wait: "8–10 min",
    rating: 4.9,
    open: true,
    color: "#d4a017",
    bg: "#fffbeb",
    emoji: "🫔",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCoJyC2wWjy19swxGGzEZ42efiYf9z3PRaA&s",
  },
  {
    id: 7,
    name: "Stacked by Wing Culture",
    cuisine: "American",
    tag: "Wings & Burgers",
    wait: "12–15 min",
    rating: 4.7,
    open: true,
    color: "#e8622a",
    bg: "#fff5f0",
    emoji: "🍔",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYdODTtI3m5SmKsAviwTj8VoOx77y6glRftg&s",
  },
  {
    id: 8,
    name: "Aryaas",
    cuisine: "Kerala",
    tag: "Traditional Meals",
    wait: "10–15 min",
    rating: 4.8,
    open: true,
    color: "#16803c",
    bg: "#f0fdf4",
    emoji: "🌿",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLf6yjOilSeVJKegDAHAJ0HwhE_jfdH-NnBg&s",
  },
  {
    id: 9,
    name: "GoGrill",
    cuisine: "Continental",
    tag: "Grills & Steaks",
    wait: "15–20 min",
    rating: 4.5,
    open: false,
    color: "#374151",
    bg: "#f9fafb",
    emoji: "🥩",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYziVyOKaaLIL2GY8RvxV_6wchALbxgR5LQ&s",
  },
  {
    id: 10,
    name: "Fishbae",
    cuisine: "Seafood",
    tag: "Fresh from the Sea",
    wait: "12–16 min",
    rating: 4.6,
    open: true,
    color: "#0284c7",
    bg: "#f0f9ff",
    emoji: "🐟",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs34NLsxXi49tNQASW_k7PWhVilLJvl7yIGw&s",
  },
  {
    id: 11,
    name: "Donutopia",
    cuisine: "Desserts",
    tag: "Donuts & Sweet Bites",
    wait: "3–5 min",
    rating: 4.7,
    open: true,
    color: "#db2777",
    bg: "#fdf2f8",
    emoji: "🍩",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Rw2BgCzzSXyJLNaRqM-r1qMbLougOXSRAw&s",
  },
  {
    id: 12,
    name: "Dessertly",
    cuisine: "Desserts",
    tag: "Cakes & Shakes",
    wait: "5–8 min",
    rating: 4.8,
    open: true,
    color: "#7c3aed",
    bg: "#faf5ff",
    emoji: "🍰",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKLeJdwLtK37p2qzXOs07bICEiiN7OUp0Cg&s",
  },
];

export default function FoodCourtPage() {
  const navigate = useNavigate();

  const openCount = COURTS.filter(c => c.open).length;

  return (
    <div className="font-sans bg-orange-50 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-sans    { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }
        .court-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .court-card:active { transform: scale(0.97); }
        .court-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .fade-up { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .img-zoom img { transition: transform 0.4s ease; }
        .img-zoom:hover img { transform: scale(1.06); }
      `}</style>

      {/* ── HEADER ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200 flex-shrink-0">
                <span className="text-white text-base">🍽️</span>
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-gray-900 leading-tight">Scroll Food Court</h1>
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-gray-400" />
                  <span className="text-xs text-gray-400">Kakkanad, Kochi</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-400" />
              <span className="text-xs font-semibold text-green-700">{openCount} Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO STRIP ── */}
      <div className="max-w-lg mx-auto px-5 pt-5 pb-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5 flex items-center gap-3">
          <div className="text-2xl flex-shrink-0">🛒</div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">Order from any outlet</p>
            <p className="text-xs text-gray-400 mt-0.5">Pick a counter, browse the menu, order right from your phone.</p>
          </div>
        </div>
      </div>

      {/* ── SECTION LABEL ── */}
      <div className="max-w-lg mx-auto px-5 pt-5 pb-3 flex items-center gap-3">
        <p className="font-display text-base font-semibold text-gray-900">Our Outlets</p>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">{COURTS.length} counters</span>
      </div>

      {/* ── COURT GRID ── */}
      <div className="max-w-lg mx-auto px-5 pb-10">
        <div className="grid grid-cols-2 gap-3">
          {COURTS.map((court, i) => (
            <div
              key={court.id}
              className={`court-card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer fade-up ${!court.open ? "opacity-60" : ""}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => court.open && navigate(`/homescreen`)}
            >
              {/* image */}
              <div className="img-zoom relative h-28 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 " />

                {/* emoji badge */}
                <div
                  className="absolute top-2.5 left-2.5 w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-sm"
                  style={{ background: court.bg, border: `1.5px solid ${court.color}22` }}
                >
                  {court.emoji}
                </div>

                {/* closed tag */}
                {!court.open && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <span className="bg-white text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                      Closed
                    </span>
                  </div>
                )}

                {/* rating */}
                {court.open && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
                    <Star size={9} fill="#f59e0b" className="text-amber-400" />
                    <span className="text-xs font-bold text-gray-800">{court.rating}</span>
                  </div>
                )}
              </div>

              {/* content */}
              <div className="p-3">
                <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-0.5 line-clamp-1">{court.name}</h2>
                <p className="text-xs font-medium mb-2" style={{ color: court.color }}>{court.tag}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-gray-300" />
                    <span className="text-xs text-gray-400">{court.wait}</span>
                  </div>
                  {court.open && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: court.bg }}
                    >
                      <ChevronRight size={13} style={{ color: court.color }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER NOTE ── */}
      <div className="max-w-lg mx-auto px-5 pb-8 text-center">
        <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-orange-500">TableQ</span> · No app needed</p>
      </div>
    </div>
  );
}
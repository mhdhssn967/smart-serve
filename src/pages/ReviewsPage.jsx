import { useState } from "react";
import Footer from "../components/Footer";

const REVIEWS = [
  {
    id: 1,
    name: "Arjun Menon",
    avatar: "AM",
    color: "bg-orange-100 text-orange-600",
    item: "Kerala Fish Curry",
    itemImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=80",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely incredible. The Karimeen curry had that perfect balance of raw mango sourness and coconut richness. Reminded me of my grandmother's cooking in Alappuzha. Will come back just for this.",
    helpful: 14,
  },
  {
    id: 2,
    name: "Sneha Krishnan",
    avatar: "SK",
    color: "bg-rose-100 text-rose-600",
    item: "Chicken Biryani",
    itemImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&q=80",
    rating: 5,
    date: "4 days ago",
    text: "The Malabar biryani is the real deal. Kaima rice, perfectly caramelised onions, and the chicken was so tender. The raita on the side was a nice touch. Best biryani I've had in Kochi.",
    helpful: 22,
  },
  {
    id: 3,
    name: "Rahul Nair",
    avatar: "RN",
    color: "bg-blue-100 text-blue-600",
    item: "Prawn Moilee",
    itemImage: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=100&q=80",
    rating: 5,
    date: "1 week ago",
    text: "Chef's special is no joke. The coconut milk broth was so delicate and fragrant — not overpowering at all. The prawns were fresh and perfectly cooked. A must-try if you're here.",
    helpful: 18,
  },
  {
    id: 4,
    name: "Divya Pillai",
    avatar: "DP",
    color: "bg-violet-100 text-violet-600",
    item: "Masala Dosa",
    itemImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=100&q=80",
    rating: 4,
    date: "1 week ago",
    text: "Crispy dosa with a filling that's actually well-seasoned — not too dry, not too mushy. The coconut chutney is freshly ground, you can tell. Sambar was a bit too salty for my taste but everything else was great.",
    helpful: 9,
  },
  {
    id: 5,
    name: "Anoop George",
    avatar: "AG",
    color: "bg-green-100 text-green-600",
    item: "Beef Ularthiyathu",
    itemImage: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=100&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "This is the best beef ularthiyathu I've had outside my own home. The coconut slices were roasted to perfection, the spices were bold without being harsh. Paired it with appam — heaven.",
    helpful: 31,
  },
  {
    id: 6,
    name: "Meera Thomas",
    avatar: "MT",
    color: "bg-amber-100 text-amber-600",
    item: "Mushroom Pepper Toss",
    itemImage: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=100&q=80",
    rating: 4,
    date: "2 weeks ago",
    text: "As a vegetarian, it's hard to find starters that feel as indulgent as the non-veg options. This mushroom dish delivers. The cracked pepper hit was bold and the garlic butter aroma was incredible.",
    helpful: 7,
  },
  {
    id: 7,
    name: "Vishnu Rajan",
    avatar: "VR",
    color: "bg-teal-100 text-teal-600",
    item: "Kerala Fish Curry",
    itemImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=80",
    rating: 5,
    date: "3 weeks ago",
    text: "Ordered this on a whim and it blew me away. The fish was fresh, the gravy was tangy and coconutty in exactly the right proportions. Service was fast too — came to the table in under 10 minutes.",
    helpful: 12,
  },
];

const SUMMARY = {
  overall: 4.8,
  total: 284,
  breakdown: [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ],
};

const FILTERS = ["All", "5 Star", "4 Star", "Most Helpful", "Recent"];

const StarIcon = ({ filled = true, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "#e5e7eb"}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const ThumbsUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
);

export default function ReviewsPage() {
  const [filter, setFilter] = useState("All");
  const [helpfulClicked, setHelpfulClicked] = useState({});

  const toggleHelpful = (id) => {
    setHelpfulClicked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = REVIEWS.filter(r => {
    if (filter === "5 Star") return r.rating === 5;
    if (filter === "4 Star") return r.rating === 4;
    if (filter === "Most Helpful") return [...REVIEWS].sort((a, b) => b.helpful - a.helpful).slice(0, 4).find(x => x.id === r.id);
    return true;
  }).sort((a, b) => filter === "Most Helpful" ? b.helpful - a.helpful : 0);

  return (
    <div className="font-sans bg-orange-50 text-gray-900 min-h-screen max-w mx-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }
        .hide-scroll { scrollbar-width: none; }
        .fade-up { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-orange-50/95 backdrop-blur border-b border-gray-100 px-5 py-4">
        <h1 className="font-display text-xl font-semibold text-gray-900">Reviews</h1>
        <p className="text-xs text-gray-400 mt-0.5">Zara Kerala Kitchen · {SUMMARY.total} reviews</p>
      </div>

      {/* RATING SUMMARY CARD */}
      <div className="mx-5 mt-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex gap-5 items-center">
          {/* big score */}
          <div className="text-center flex-shrink-0">
            <div className="font-display text-5xl font-semibold text-gray-900 leading-none mb-1">{SUMMARY.overall}</div>
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(SUMMARY.overall)} size={13} />)}
            </div>
            <p className="text-xs text-gray-400">{SUMMARY.total} ratings</p>
          </div>

          {/* bar breakdown */}
          <div className="flex-1 flex flex-col gap-1.5">
            {SUMMARY.breakdown.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-3 text-right">{stars}</span>
                <StarIcon filled size={10} />
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {["Fresh Ingredients", "Great Portions", "Authentic Taste", "Fast Service"].map(tag => (
            <span key={tag} className="text-xs font-medium text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex gap-2 px-5 pt-4 pb-1 overflow-x-auto hide-scroll">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              filter === f
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "bg-white text-gray-500 border border-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* REVIEW CARDS */}
      <div className="px-5 pt-3 pb-28 flex flex-col gap-3">
        {filtered.map((r, i) => (
          <div
            key={r.id}
            className="fade-up bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {/* avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${r.color}`}>
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>
              {/* stars */}
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < r.rating} size={12} />)}
              </div>
            </div>

            {/* item chip */}
            <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-xl p-2">
              <img src={r.itemImage} alt={r.item} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 leading-none mb-0.5">Reviewed</p>
                <p className="text-xs font-semibold text-gray-700">{r.item}</p>
              </div>
            </div>

            {/* review text */}
            <p className="text-sm text-gray-600 leading-relaxed mb-3 font-light">{r.text}</p>

            {/* helpful */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-400">Helpful?</span>
              <button
                onClick={() => toggleHelpful(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  helpfulClicked[r.id]
                    ? "bg-orange-500 text-white"
                    : "bg-gray-50 text-gray-500 border border-gray-100"
                }`}
              >
                <ThumbsUp />
                {r.helpful + (helpfulClicked[r.id] ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
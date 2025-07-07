import React from "react";

const reviews = [
  {
    id: 1,
    customer: "John Doe",
    rating: 4,
    comment: "Great product, fast delivery!",
    date: "2025-06-18",
    product: "Organic Honey",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    customer: "Jane Smith",
    rating: 5,
    comment: "Absolutely loved it. Will buy again!",
    date: "2025-06-17",
    product: "Spicy Mango Pickle",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    customer: "Nimal Perera",
    rating: 3,
    comment: "Product was okay, but packaging could be better.",
    date: "2025-06-16",
    product: "Jackfruit Chips",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex text-yellow-500 text-2xl">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < count ? "★" : "☆"}</span>
    ))}
  </div>
);

const ReviewPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Product Reviews</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <select className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3">
          <option value="">Filter by Rating</option>
          <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
          <option value="4">⭐⭐⭐⭐ (4 stars)</option>
          <option value="3">⭐⭐⭐ (3 stars)</option>
          <option value="2">⭐⭐ (2 stars)</option>
          <option value="1">⭐ (1 star)</option>
        </select>

        <select className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3">
          <option value="">Filter by Product</option>
          <option>Organic Honey</option>
          <option>Spicy Mango Pickle</option>
          <option>Jackfruit Chips</option>
        </select>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.customer}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.customer}</p>
                  <p className="text-xs text-gray-500">{review.product}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <StarRating count={review.rating} />
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;

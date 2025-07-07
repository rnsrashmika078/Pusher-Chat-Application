import React from "react";
import { HiOutlineChat } from "react-icons/hi";

const LatestReview = ({ ...props }) => (
    <div {...props} className="bg-white rounded-2xl shadow-md p-6 max-w-md">
        <div className="flex items-center gap-3 mb-4">
            <HiOutlineChat className="text-blue-600 w-8 h-8" />
            <h3 className="text-lg font-semibold text-gray-700">
                Latest Review
            </h3>
        </div>

        <p className="text-gray-600 italic mb-4">
            "Absolutely love the quality! Packaging was eco-friendly and
            delivery was right on time."
        </p>

        <div className="flex items-center gap-3 mb-2">
            <img
                src="https://randomuser.me/api/portraits/men/27.jpg"
                alt="Reviewer"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
                <p className="font-semibold text-gray-700">
                    Chathura Wijesinghe
                </p>
                <p className="text-sm text-gray-500">Reviewed: Herbal Tea</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
        </div>

        <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                    ★
                </span>
            ))}
        </div>

        <div className="text-sm text-blue-600 mt-3 hover:underline cursor-pointer">
            View All Reviews →
        </div>
    </div>
);

export default LatestReview;

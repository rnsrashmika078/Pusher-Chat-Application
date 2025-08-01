"use client";
import { News } from "@/src/types";
import React from "react";
import Image from "next/image";
const NewsLayout = ({ news }: News) => {
  return (
    <div className="p-5 space-y-5">
      <NewsCard news={news} sm={2} md={2} lg={3} xl={3} mobile={2} />
      <NewsCard news={news} sm={2} md={2} lg={3} xl={3} mobile={2} />
    </div>
  );
};

interface CardProps {
  news: News[];
  sm: number;
  md: number;
  lg: number;
  xl: number;
  mobile: number;
}
const NewsCard: React.FC<CardProps> = ({ news, mobile, sm, md, lg, xl }) => {
  const grid = `grid-cols-${mobile} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`;
  return (
    <div className={`rounded-xl grid ${grid} justify-center items-center`}>
      {news?.slice(0, 3).map((news: News) => (
        <div
          style={{
            backgroundImage: 'url("/3.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          key={news.id}
          className="border border-[var(--border)] h-50 p-1 rounded-xl"
        >
          <div className="flex flex-col justify-between h-full">
            <h1 className="p-2 bg-[var(--news-heading)]  rounded-sm text-sm sm:text-xl md:text-xl lg:text-xl xl:text-2xl  stroke-3 stroke-black">
              {news.heading}
            </h1>
            <span className="p-1 px-2 text-amber-500">{news.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NewsLayout;

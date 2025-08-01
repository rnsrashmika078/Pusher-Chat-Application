import NewsLayout from "@/src/compnents/News/NewsLayout";
import React from "react";
import { News } from "@/src/compnents/News/news";
const page = () => {
  return (
    <div>
      <NewsLayout news={News} />
    </div>
  );
};

export default page;

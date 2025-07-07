import React from "react";
import style from "./Pagination.module.css";

interface PageProps {
    children?: React.ReactNode;
}
const Page = ({ children }: PageProps) => {
    return <div className={style.fade}>{children}</div>;
};

export default Page;

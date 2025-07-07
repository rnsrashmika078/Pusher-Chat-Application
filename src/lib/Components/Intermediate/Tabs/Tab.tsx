import React from "react";
import style from "./Tab.module.css";

interface TabProps {
    children?: React.ReactNode;
}
const Tab = ({ children }: TabProps) => {
    return <div className={`${style.fade} p-5`}>{children}</div>;
};

export default Tab;

import React from "react";
import packageJson from "../../../package.json";
const Version = () => {
  return <div className="fixed bottom-0 left-2 text-xs text-white">v{packageJson.version}</div>;
};

export default Version;

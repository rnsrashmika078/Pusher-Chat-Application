import React from "react";
// import Theme from "../../theme/Theme";
// import SignOut from "./SignOut";
import Theme from "@/src/lib/Components/Advanced/Theme/Theme";
import DeviceInfo from "./DeviceInfo";
const SettingsCard = () => {
  return (
    <div className="opacity_animation px-2 w-full ">
      <h1
        className="text-2xl font-bold p-2  mb-2 "
        style={{ fontFamily: "var(--font-new)" }}
      >
        Settings
      </h1>
      <div className=" bg-[var(--card-background)] shadow-sm  border border-[var(--border)] rounded-xl p-3">
        <div className="flex flex-col gap-3 font-bold  text-xs sm:text-sm p-2 ">
          <div>
            <h1 className="text-xl">Preference</h1>
            <div className="border border-[var(--border)]"></div>
          </div>

          <div className="flex justify-between z-500">
            <div className="flex flex-col">
              <h1>Theme</h1>
              <p>Select your theme preference.</p>
            </div>
            <div className="flex flex-col justify-end items-center">
              <Theme />
            </div>
          </div>
          {/* <div className="border border-[var(--border)]"></div>
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <h1>Change Language</h1>
              <p>Select your language preference.</p>
            </div>
            <div className="flex flex-col justify-end items-center">
              <Theme />
            </div>
          </div> */}
          {/* <div className="border border-[var(--border)]"></div>
          <div className="flex justify-between ">
            <div className="flex flex-col">
              <h1>Sign Out</h1>
              <p>Sign out from the Unimate.</p>
            </div>
            <div className="flex flex-col justify-end items-center">
              <SignOut />
            </div>
          </div> */}

          <div className="border border-[var(--border)]"></div>
          <div className="flex flex-col">
            <h1>Device Info</h1>
            <p>Your device information</p>
            <DeviceInfo />
          </div>
          <div className="flex justify-between ">
            <div className="flex flex-col justify-end items-center">
              {/* <SignOut /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;

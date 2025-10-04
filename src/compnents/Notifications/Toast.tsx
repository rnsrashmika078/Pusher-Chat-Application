"use client";
import { ReduxtState } from "@/src/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const newMessage = useSelector(
    (store: ReduxtState) => store.notify.simpleMessage
  );

  useEffect(() => {
    if (newMessage?.message) {
      toast.success(newMessage.message);
    }
  }, [newMessage]);
  return (
    <div>
      {/* <button onClick={() => toast.info("Hello from Toastify!")}>
        Show Toast
      </button> */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

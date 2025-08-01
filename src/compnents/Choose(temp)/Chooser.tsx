"use client";
import Button from "@/src/lib/Components/Basic/Button";
import Test_ from "@/src/lib/Components/TestComponent/Test_";
import { useRouter } from "next/navigation";

const Chooser = () => {
  const router = useRouter();
  return (
    // <Test_ />
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-5">
      <Button
        name="Chat"
        variant="windows"
        radius="md"
        onClick={() => router.push("/service/chat")}
      />
      <Button
        name="Email"
        radius="md"
        variant="dark"
        onClick={() => router.push("/service/email")}
      />
      <Button
        name="Chat Bot"
        radius="md"
        onClick={() => router.push("/service/chatbot")}
      />
    </div>
  );
};

export default Chooser;

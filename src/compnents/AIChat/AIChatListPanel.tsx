import { ReduxDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { FaVideo } from "react-icons/fa";
import { setOpenChat } from "@/src/redux/aiChatSlicer";

const AIChatListPanel = ({ toggle }: { toggle: boolean }) => {
  const chatHistory = [
    {
      title: "Playing Guitar",
    },
    {
      title: "Google AI Services",
    },
  ];
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="relative w-full select-none">
      {!toggle && (
        <div>
          <div className="sticky top-1 bg-white p-5 shadow-sm mt-1">
            <h1 className="text-xl font-bold mb-2">Chat History</h1>
            <input
              placeholder="Search"
              className="mb-2 border shadow-sm rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200"
            ></input>
          </div>
          <div className="p-5">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                onClick={() => dispatch(setOpenChat({ title: chat.title }))}
                className="flex gap-3 mt-2 bg-white p-3 rounded-2xl shadow-sm transition-all duration-500 hover:bg-gray-200 hover:cursor-pointer"
              >
                <div className="w-full">
                  <div className="flex justify-between items-center  ">
                    <p>
                      <FaVideo />
                    </p>
                    <p className="font-bold">{chat.title}</p>
                  </div>
                  <div className="flex justify-between items-center ">
                    {/* whitespace-nowrap overflow-hidden text-ellipsis */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default AIChatListPanel;

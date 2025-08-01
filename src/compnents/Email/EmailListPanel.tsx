import { setCurrentInbox } from "@/src/redux/emailSlicer";
import { ReduxDispatch } from "@/src/redux/store";
import { EmailType } from "@/src/types";
import { GoStarFill } from "react-icons/go";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import Image from "next/image";
const EmailListPanel = ({
  toggle,
  emails,
}: {
  toggle: boolean;
  emails: EmailType[];
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="relative w-full select-none">
      {!toggle && (
        <div>
          <div className="sticky -top-5 bg-[var(--search)] py-2 px-2 transition-all">
            <input
              type="search"
              placeholder="Search"
              className={`${
                toggle ? "hidden" : "flex"
              } border border-[var(--border)]   items-center justify-center gap-2 w-full py-2 px-4 rounded-full bg-white  shadow-sm hover:shadow-md transition`}
            />
            <button
              className={`${
                toggle ? "hidden" : "absolute"
              } top-0 right-0 mr-5 mt-4 text-black`}
            >
              <MdOutlineSearch size={25} color="gray" />
            </button>
            <h1 className={`${toggle ? "hidden" : "block"} px-2 mt-4 text-2xl`}>
              Inbox
            </h1>
          </div>
          <div
            className={`${
              toggle ? "hidden" : "block"
            } border border-[var(--border)]`}
          ></div>

          {emails.map((item, index) => (
            <Friends
              onClick={() => dispatch(setCurrentInbox(item))}
              key={index}
              toggle={toggle}
              from={item.from}
              to={item.from}
              header={item.header}
              body={item.body}
              subject={item.subject}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default EmailListPanel;

type FriendsProps = {
  toggle: boolean;
  from: string;
  to: string;
  header: string;
  subject: string;
  body: string;
  html?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const Friends = ({ toggle, to, subject, body, ...props }: FriendsProps) => {
  return (
    <div {...props}>
      <div
        className="flex gap-3 mt-2 bg-[var(--card-background)] rounded-2xl p-2 hover:bg-[var(--hover-bg-color)] hover:cursor-pointer transition-all duration-100"
        //   onClick={() => dispatch(setChatWith(friend))}
      >
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={40}
          height={40}
          className="w-10 h-10  min-h-10 max-w-10 max-h-10 rounded-full object-cover"
        />
        <div className={`w-full `}>
          <div className="flex justify-between items-start ">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">{to}</p>
              <h1 className="text-sm font-bold">{subject}</h1>
              <p className="text-xs text-gray-400 truncate  max-w-[180px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[150px] xl:max-w-[250px]">
                {body}
              </p>
            </div>
            <div className="flex flex-col items-center justify-between ">
              <p className="text-[10px] md:text-xs text-gray-400">3.24 PM</p>
              <div className="py-3 ">
                <GoStarFill
                  stroke="black"
                  fill="yellow"
                  size={20}
                  className="text-yellow-400 drop-shadow-[0_0_0.5px_black]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!toggle && (
        <div className="border border-[var(--border)] w-full mt-2 "></div>
      )}
    </div>
  );
};

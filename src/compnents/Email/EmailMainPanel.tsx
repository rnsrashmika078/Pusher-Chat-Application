import AutoGrowTextarea from "@/src/lib/Components/Basic/AutoGrowTextArea";
import Button from "@/src/lib/Components/Basic/Button";
import { ReduxtState } from "@/src/redux/store";
import SendEmail from "@/src/server_side/actions/SendEmail";
import { IContent } from "@/src/types";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdAccessTimeFilled, MdArchive } from "react-icons/md";
import { RiDeleteBin4Fill, RiErrorWarningFill } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
const EmailMainPanel = () => {
  // const email = `Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka

  // Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka

  // Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka
  // `;
  const inbox = useSelector((store: ReduxtState) => store.inbox.currentInbox);

  const content: IContent = {
    from: "rnsrashmika078@gmail.com",
    to: "gamini12327rns@gmail.com",
    subject: "First Email On Ozone",
    header: "Congatualation for the first email sending by the ozone",
    body: "Hi , Rashmika, I am so greatfull that the first email sending by ozone app and my involement in this exclusive movement.Thank you in advance!",
  };

  return (
    <div className="flex flex-col w-full p-4 sm:p-5 gap-3 sm:gap-4 md:gap-6">
      {/* Top button + image row */}
      <div className="flex justify-between items-center w-full gap-2 sm:gap-4">
        <button className="p-2 sm:p-3 w-full rounded-xl bg-transparent border border-[var(--border)] text-[var(--secondary-color)] text-sm sm:text-base shadow-sm hover:shadow-md transition">
          Click here to load new Mails
        </button>
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </div>

      {/* Options */}
      <div className="sticky top-0 text-[var(--foreground)] bg-[var(--background)] py-5">
        <Options />
      </div>

      {/* Title + avatar */}
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={60}
          height={60}
          className="w-12 h-12 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center items-start gap-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
            {inbox?.subject}
          </h1>
          <h3 className="text-xs sm:text-sm text-gray-600">
            {inbox?.to} <span className="text-gray-400">to</span> me
          </h3>
        </div>
      </div>

      {/* AutoGrowTextarea */}
      {/* Main Content Area */}
      <h1 className="text-2xl">{inbox?.header}</h1>

      <div className="">
        <AutoGrowTextarea
          readOnly
          value={inbox?.body}
          className="w-full text-base sm:text-lg md:text-xl text-gray-700 border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
        ></AutoGrowTextarea>
      </div>
      <div className="flex gap-5 pb-5">
        <Button name={"Reply"} onClick={() => SendEmail(content)} />
        <Button name={"Forward"} />
      </div>
    </div>
  );
};
export default EmailMainPanel;

const Options = () => {
  return (
    <div className="flex gap-5 px-5">
      <IoMdArrowBack />
      <MdArchive />
      <RiErrorWarningFill />
      <RiDeleteBin4Fill />
      <MdAccessTimeFilled />
      <HiOutlineDotsVertical />
    </div>
  );
};

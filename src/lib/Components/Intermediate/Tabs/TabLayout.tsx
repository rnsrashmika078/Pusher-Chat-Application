"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Button from "../../Basic/Button";

interface Tabs {
  id: number;
  title: string;
}
interface TabLayout {
  children?: ReactNode | ReactNode[];
  className?: string;
}
const TabLayout = ({ className, children }: TabLayout) => {
  const [tabs, setTabs] = useState<Tabs[]>([]);
  const childCount = React.Children.count(children);
  // const [canEdit, setCanEdit] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<Tabs>();

  const [editTabData, setEditTabData] = useState<{
    title: string;
    id: number;
  }>();

  const handleCloseTab = (id: number) => {
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
  };

  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!paraRef.current?.contains(event.target as Node)) {
        handleSaveTab();
        return;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleTabTitleChange = (
    id: number,
    e: React.FormEvent<HTMLParagraphElement>
  ) => {
    const newTitle = e.currentTarget.textContent || "";
    setEditTabData({ id: id, title: newTitle });
    // setCanEdit(true);
  };

  const handleSaveTab = () => {
    if (editTabData) {
      setTabs((tabs) =>
        tabs.map((t: Tabs) =>
          t.id === editTabData.id
            ? {
                ...t,
                title: editTabData.title ? editTabData.title : "",
              }
            : t
        )
      );
    }
    // setCanEdit(false);
    setEditTabData({ title: "", id: 0 });
  };
  useEffect(() => {
    if (tabs.length === 0 && childCount > 0) {
      const id = Date.now();
      const newTabs = Array.from({ length: childCount }, (_, i) => ({
        id: id + i,
        title: `Tab ${i + 1}`,
      }));

      setTabs(newTabs);
      setActiveTab(newTabs[0]);
    }
  }, [childCount, tabs.length]);
  return (
    <div className={`flex flex-col h-screen ${className}`}>
      <div className="flex flex-col flex-grow  ">
        <div className=" p-1 bg-[#1919197b]  flex flex-row gap-2 text-center min-w-md overflow-x-auto ">
          {tabs?.map((tab: Tabs, index: number) => (
            <div
              key={index}
              onClick={() => {
                setActiveTab({
                  title: tab.title,
                  id: tab.id,
                });
              }}
              className={`relative flex justify-center transition-all duration-300 hover:cursor-pointer select-none  items-center w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 hover:bg-gray-900 ${
                activeTab && activeTab.id == tab.id
                  ? "bg-[#0514eb]"
                  : "bg-[#1919197b]"
              } rounded-t-2xl py-1`}
            >
              <p
                contentEditable
                suppressContentEditableWarning
                ref={paraRef}
                onDoubleClick={(e) => handleTabTitleChange(tab.id, e)}
                onBlur={() => handleSaveTab()}
                className="w-auto text-white p-2 mx-10  whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
              >
                {tab && tab.title ? tab.title : "New Tab"}
              </p>

              <div
                className="text-white absolute right-2 bg-[#000000] px-2 rounded-sm"
                onClick={() => handleCloseTab(tab.id)}
              >
                X
              </div>
            </div>
          ))}

          <Button
            name="+"
            radius="full"
            size="md"
            disabled={tabs.length == 5 ? true : false}
            variant="windows"
            onClick={() => {
              if (tabs.length == 0) {
                setActiveTab({
                  id: Number(new Date().getTime()),
                  title: "New Tab",
                });
              }
              setTabs((prev) => [
                ...prev,
                {
                  id: Number(new Date().getTime()),
                  title: "New Tab",
                },
              ]);
            }}
          />
        </div>
        {Array.isArray(children) ? (
          children &&
          children.map((child, index) => (
            <div className="relative" key={index}>
              {activeTab && tabs && activeTab?.id == tabs[index]?.id && child}
            </div>
          ))
        ) : (
          <div className="relative">{tabs.length == 1 && children}</div>
        )}
      </div>
    </div>
  );
};
<div className="w-1/2 bg-[#1919197b] rounded-t-2xl py-1">
  <p className="text-center text-white ">Tab one</p>
</div>;
export default TabLayout;

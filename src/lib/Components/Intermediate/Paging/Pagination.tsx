"use client";
import Button from "@/src/lib/Components/Basic/Button";
import { ReactNode, useState } from "react";
import ListItem from "../../Basic/ListItem";
interface PageProps {
    children?: ReactNode | ReactNode[];
    className: string;
}
const PageArea = ({ children, className }: PageProps) => {
    const [page, setPage] = useState<number>(1);
    const pageCount = Array.isArray(children) && children.length;

    return (
        <div className={`flex flex-col h-screen overflow-y-auto ${className}`}>
            <div className=" mt-2 flex flex-col flex-grow">
                {children && Array.isArray(children) ? (
                    children.map((child, index) => (
                        <div className="relative p-5 " key={index}>
                            {page == index + 1 && child}
                        </div>
                    ))
                ) : (
                    <div className="relative p-5 ">{page == 1 && children}</div>
                )}
            </div>
            <div className="flex justify-between sticky bottom-0 bg-gray-300  p-5">
                <Button
                    variant="windows"
                    name="Next"
                    size="md"
                    radius="md"
                    onClick={() => {
                        if (page >= 1 && pageCount && page < pageCount) {
                            setPage((prev) => prev + 1);
                        }
                    }}
                />
                <div className="flex gap-1">
                    {[...Array(pageCount)].map((p, index) => (
                        <ListItem
                            key={index}
                            index={index + 1}
                            variant="outline"
                            name={(index + 1).toString()}
                            size="md"
                            active={page}
                            radius="md"
                            onClick={() => {
                                setPage(index + 1);
                            }}
                        />
                    ))}
                </div>
                <Button
                    variant="windows"
                    name="Back"
                    size="md"
                    radius="md"
                    onClick={() => {
                        if (page > 1 && pageCount && page <= pageCount) {
                            setPage((prev) => prev - 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default PageArea;

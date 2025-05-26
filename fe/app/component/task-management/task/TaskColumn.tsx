'use client'
import { ReactNode } from "react";

type TaskColumnProps = {
    title: string;
    color: string; // e.g. bg-red-100
    accent: string; // e.g. border-red-500
    children: ReactNode;
    innerRef?: (element: HTMLElement | null) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TaskColumn({
    title,
    color,
    accent,
    children,
    innerRef,
    ...props
}: TaskColumnProps) {
    return (
        <div ref={innerRef} {...props} className={`w-1/3 p-4 rounded-lg ${color}`}>
        <h3 className={`text-${accent}-700 font-bold text-lg mb-2`}>{title}</h3>
        <div className="space-y-4">{children}</div>
        </div>
    );
}

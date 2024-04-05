import { ReactNode } from "react";

export default function Label({
  type,
  children,
}: {
  type: any;
  children: ReactNode;
}) {
  const bgColor =
    type === "queue"
      ? "bg-slate-200"
      : type === "failed"
      ? "bg-red-500 text-white"
      : "bg-red-100";

  return (
    <span
      className={`text-xs text-black font-medium rounded-full w-max px-4 py-1 text-center }
      ${bgColor}`}
    >
      {children}
    </span>
  );
}

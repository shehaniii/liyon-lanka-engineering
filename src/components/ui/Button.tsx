import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export default function Button({
  children,
}: ButtonProps) {
  return (
    <button className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
      {children}
    </button>
  );
}
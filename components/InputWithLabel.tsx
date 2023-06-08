import React, { ReactNode } from "react";

interface InputWithLabelProps {
  label: string;
  children: ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputWithLabel;

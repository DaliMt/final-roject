import React from "react";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      className="bg-[#9F50AC] select-none font-bold h-[45px] min-w-[120px] rounded-[10px] text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

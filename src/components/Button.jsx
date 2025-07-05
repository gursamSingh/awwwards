import React from "react";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={`group relative z-10 w-fit flex items-center gap-2 cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${props.containerClass}`}
    >
      {props.leftIcon}
      <span className="relative inline-flex  overflow-hidden font-general text-xs uppercase">
        <div>{props.title}</div>
      </span>
      {props.rightIcon}
    </button>
  );
};

export default Button;

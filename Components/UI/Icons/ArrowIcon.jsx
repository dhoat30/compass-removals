import React from "react";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      viewBox="0 0 48 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block" }}
    >
      <path
        d="M5.64 29.64L24 11.32L42.36 29.64L48 24L24 0L0 24L5.64 29.64Z"
        fill="white"
      />
    </svg>
  );
}

export default ArrowIcon;

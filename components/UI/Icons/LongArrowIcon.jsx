import React from "react";

export default function LongArrowIcon({ className, color }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_126_6532)">
        <path
          d="M0.264371 20.6412L9.35507 29.732C9.68163 30.1133 10.2555 30.1578 10.6368 29.8312C11.0182 29.5046 11.0626 28.9307 10.736 28.5494C10.7055 28.5138 10.6724 28.4806 10.6368 28.4502L3.10065 20.9049L39.091 20.9049C39.593 20.9049 40 20.4979 40 19.9958C40 19.4937 39.593 19.0867 39.091 19.0867L3.10065 19.0867L10.6368 11.5505C11.0182 11.224 11.0626 10.6501 10.736 10.2688C10.4093 9.88745 9.83553 9.843 9.45421 10.1696C9.41866 10.2001 9.38546 10.2332 9.35507 10.2688L0.264291 19.3595C-0.0881224 19.714 -0.0881225 20.2866 0.264371 20.6412Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_126_6532">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(40 40) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

import * as React from "react";
const WalletLogo = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.8}>
      <path
        d="M5 20.5C3.9 20.5 3 19.6 3 18.5V5.5C3 6.5 4 8.5 5 8.5H19V20.5H5Z"
        fill="url(#paint0_radial_1263_3766)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.03725 7.5C5.01893 7.49075 4.98016 7.46784 4.92056 7.41619C4.79003 7.30307 4.63484 7.11441 4.48249 6.8605C4.16066 6.32411 4 5.75411 4 5.5H2V18.5C2 20.1523 3.34772 21.5 5 21.5H19C19.5523 21.5 20 21.0523 20 20.5V8.5C20 7.94772 19.5523 7.5 19 7.5H5.03725ZM4 9.21043V18.5C4 19.0477 4.45228 19.5 5 19.5H18V9.5H5C4.61565 9.5 4.27889 9.37606 4 9.21043Z"
        fill="url(#paint1_radial_1263_3766)"
      />
      <path
        d="M4.60714 3.5C2.96429 3.5 2 4.21677 2 5.5C2 6.78323 3 7.5 4.60714 7.5H17.0001V3.5H4.60714Z"
        fill="url(#paint2_radial_1263_3766)"
      />
      <path
        d="M4.60714 3.5C2.96429 3.5 2 4.21677 2 5.5C2 6.78323 3 7.5 4.60714 7.5H17.0001V3.5H4.60714Z"
        fill="url(#paint3_linear_1263_3766)"
        fillOpacity={0.56}
        style={{
          mixBlendMode: "overlay",
        }}
      />
      <path
        d="M18 12.5C17.4696 12.5 16.9609 12.7107 16.5858 13.0858C16.2107 13.4609 16 13.9696 16 14.5C16 15.6 16.9 16.5 18 16.5H21C21.5523 16.5 22 16.0523 22 15.5V13.5C22 12.9477 21.5523 12.5 21 12.5H18Z"
        fill="url(#paint4_radial_1263_3766)"
      />
      <path
        d="M18 12.5C17.4696 12.5 16.9609 12.7107 16.5858 13.0858C16.2107 13.4609 16 13.9696 16 14.5C16 15.6 16.9 16.5 18 16.5H21C21.5523 16.5 22 16.0523 22 15.5V13.5C22 12.9477 21.5523 12.5 21 12.5H18Z"
        fill="white"
        fillOpacity={0.32}
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1263_3766"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(11 17.6429) rotate(-90) scale(16.0714 17.1429)"
      >
        <stop stopColor="#6F1AFF" />
        <stop offset={1} stopColor="#C6A4FF" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_1263_3766"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(11 18.4524) rotate(-90) scale(17.1429 19.2857)"
      >
        <stop stopColor="#6F1AFF" />
        <stop offset={1} stopColor="#C6A4FF" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_1263_3766"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(9.5 6.7381) rotate(-90) scale(4.28571 16.0714)"
      >
        <stop stopColor="#6F1AFF" />
        <stop offset={1} stopColor="#C6A4FF" />
      </radialGradient>
      <linearGradient
        id="paint3_linear_1263_3766"
        x1={9.5}
        y1={3.5}
        x2={8.5}
        y2={7.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0} />
        <stop offset={1} />
      </linearGradient>
      <radialGradient
        id="paint4_radial_1263_3766"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(19 15.7381) rotate(-90) scale(4.28571 6.42857)"
      >
        <stop stopColor="#6F1AFF" />
        <stop offset={1} stopColor="#C6A4FF" />
      </radialGradient>
    </defs>
  </svg>

);
export default WalletLogo;

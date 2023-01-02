const ArrowLeft = (hoverBackBtn) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.875 10H3.125"
        stroke="#000000"
        strokeOpacity={hoverBackBtn ? "0.8" : "0.6"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 4.375L3.125 10L8.75 15.625"
        stroke="#000000"
        strokeOpacity={hoverBackBtn ? "0.8" : "0.6"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;

const Cross: React.FC<{ type?: "small" | "large"; stroke?: string }> = ({
  type = "large",
  stroke = "#EC4747",
}) => {
  return (
    <svg
      width={type === "small" ? "16" : "20"}
      height={type === "small" ? "16" : "20"}
      viewBox={type === "small" ? "0 0 16 16" : "0 0 20 20"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={type === "small" ? "M12 4L4 12" : "M15 5L5 15"}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={type === "small" ? "M4 4L12 12" : "M5 5L15 15"}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Cross;

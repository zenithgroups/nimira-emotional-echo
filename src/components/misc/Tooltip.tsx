import React, { useState } from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute card-glass p-6 md:p-3 z-50  text-xs rounded-md px-6 py-3 whitespace-nowrap"
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: 4,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

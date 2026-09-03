import React from "react";
import "../styles/starBorder.css";

type StarBorderProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "color" | "speed">;

export default function StarBorder<T extends React.ElementType = "div">({
  as,
  className = "",
  color = "#a855f7", // Purple glow default
  speed = "6s",
  thickness = 1,
  backgroundColor = "transparent",
  textColor = "inherit",
  borderColor = "transparent",
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="inner-content"
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor: borderColor,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

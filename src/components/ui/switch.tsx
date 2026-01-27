"use client";

import * as React from "react";
import { cn } from "./utils";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        // Base styles
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        "border-2 border-transparent transition-colors duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        // State-based background colors
        checked ? "bg-[#2D3508]" : "bg-[#D4D4C4]",
        // Disabled styles
        disabled && "cursor-not-allowed opacity-30",
        className
      )}
      style={{
        width: '44px',
        height: '26px',
        backgroundColor: checked ? '#2D3508' : '#D4D4C4',
        borderRadius: '12px'
      }}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg",
          "transition-transform duration-200 ease-in-out"
        )}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#ffffff',
          transform: checked ? 'translateX(18px)' : 'translateX(2px)',
        }}
      />
    </button>
  );
}

export { Switch };

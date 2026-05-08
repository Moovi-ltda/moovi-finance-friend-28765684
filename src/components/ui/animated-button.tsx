import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export interface AnimatedButtonProps extends ButtonProps {
  text: string;
  emoji?: string;
  hideArrow?: boolean;
}

export function AnimatedButton({ 
  text, 
  emoji, 
  hideArrow = false, 
  className = "", 
  ...props 
}: AnimatedButtonProps) {
  return (
    <Button className={`group inline-flex items-center justify-center gap-2 ${className}`} {...props}>
      <span className="flex items-center gap-2">
        {text} 
        {emoji && <span className="text-xl leading-none">{emoji}</span>}
      </span>
      {!hideArrow && (
        <ArrowRight
          className="-me-1 ms-1 opacity-80 transition-transform group-hover:translate-x-1.5"
          size={18}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      )}
    </Button>
  );
}

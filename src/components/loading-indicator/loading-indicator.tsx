import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export type LoadingIndicatorProps = {
  backdrop?: boolean;
  size?: string;
  className?: string;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
  const { backdrop, className, size = "64px" } = props;

  return (
    <div className={cn("flex flex-1 items-center justify-center", backdrop ?? "bg-stone-800 bg-opacity-40", className)}>
      <Loader2 className="animate-spin opacity-40" size={size} />
    </div>
  );
};

export default LoadingIndicator;

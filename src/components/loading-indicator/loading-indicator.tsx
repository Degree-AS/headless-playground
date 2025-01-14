import { Loader2 } from "lucide-react";
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-stone-800 bg-opacity-40 p-12">
      <Loader2 className="animate-spin opacity-40" size={"64px"} />
    </div>
  );
};

export default LoadingIndicator;

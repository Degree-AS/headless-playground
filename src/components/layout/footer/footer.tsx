import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

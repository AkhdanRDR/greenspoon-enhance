import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-2xl bg-white shadow-md hover:shadow-lg card-shadow hover:card-shadow-hover transition-shadow duration-300 p-6 mx-auto my-6 w-full max-w-6xl">
      {children}
    </div>
  );
};

export default Card;

import React from "react";
import { Header } from "./LayoutComponents";

export const BaseLayout = ({ children, type }) => {
  return (
    <>
      {type === "wrap" ? (
        <div>
          <Header />
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

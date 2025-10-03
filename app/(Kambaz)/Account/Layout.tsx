import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account">
      <AccountNavigation />
      <div className="d-none d-md-block" style={{ marginLeft: "110px" }}>
        {children}
      </div>
      <div className="d-md-none">{children}</div>
    </div>
  );
}

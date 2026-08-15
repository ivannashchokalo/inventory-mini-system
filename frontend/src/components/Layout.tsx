import { Outlet } from "react-router";
import "../index.css";

export default function Layout() {
  return (
    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

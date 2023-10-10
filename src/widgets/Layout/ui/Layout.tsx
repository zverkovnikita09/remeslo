import { Outlet } from "react-router-dom";
import { Header } from "src/widgets/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
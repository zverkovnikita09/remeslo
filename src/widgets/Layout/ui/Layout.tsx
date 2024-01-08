import { Outlet } from "react-router-dom";
import { Footer } from "src/widgets/Footer";
import { Header } from "src/widgets/Header";

interface LayoutProps {
  noFooter?: boolean
}

export const Layout = ({ noFooter }: LayoutProps) => {
  return (
    <>
      <Header />
      <Outlet />
      {!noFooter &&
        <Footer />
      }
    </>
  )
}
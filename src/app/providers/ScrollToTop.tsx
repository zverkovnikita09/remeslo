import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IScrollToTop {
  children: React.ReactNode
}

const root = document.querySelector('#root');

const ScrollToTop: React.FC<IScrollToTop> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    root?.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>
};

export default ScrollToTop;
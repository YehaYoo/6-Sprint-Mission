import { useEffect } from "react";
import { throttle } from "lodash-es";

const useResizeHandler = (handler: () => void, duration: number) => {
  useEffect(() => {
    const handleResize = throttle(handler, duration);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handler]);
};

export default useResizeHandler;

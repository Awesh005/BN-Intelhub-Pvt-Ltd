import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollBehavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    let timeoutId: number | undefined;
    let attempts = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: scrollBehavior, block: "start" });
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToTarget, 50);
      }
    };

    scrollToTarget();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname, hash]);

  return null;
}

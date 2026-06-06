import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useScrollAndOpacity(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);
  return { opacity };
}

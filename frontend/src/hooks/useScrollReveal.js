import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';

/**
 * Hook to trigger framer-motion animations when elements scroll into the viewport.
 * @param {boolean} once - If true, the animation only plays the first time it's seen.
 * @param {string} margin - Viewport margin (e.g., "-50px" means it triggers slightly after entering).
 */
export const useScrollReveal = (once = true, margin = "-50px") => {
  const ref = useRef(null);
  
  // Detects if the element attached to 'ref' is in the viewport
  const isInView = useInView(ref, { once, margin });
  
  // Controls the animation states ("hidden" / "visible")
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else if (!once) {
      // If we want it to animate every single time it scrolls out and back in
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, once]);

  return { ref, mainControls };
};

export default useScrollReveal;
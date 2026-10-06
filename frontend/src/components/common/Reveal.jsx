import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Reveal = ({ children, delay = 0, once = true, direction = 'up', className = '' }) => {
  const { ref, mainControls } = useScrollReveal(once);
  const reduceMotion = useReducedMotion();

  // People who ask their OS for less motion get a plain fade instead of a slide.
  const distance = reduceMotion ? 0 : 50;
  const slideVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  // Only sideways slides can cause a horizontal scrollbar, so only those clip.
  // (A blanket overflow-hidden also cuts off hover shadows and focus rings on the children.)
  const clipsSideways = direction === 'left' || direction === 'right';

  // className="h-full" is meant to make the content fill its grid cell, but the animated inner
  // div sits in between, so it needs the height too (otherwise cards in a row end up uneven).
  const fillsHeight = /(^|\s)h-full(\s|$)/.test(className);

  return (
    <div ref={ref} className={`relative ${clipsSideways ? 'overflow-x-clip' : ''} ${className}`}>
      <motion.div
        className={fillsHeight ? 'h-full' : undefined}
        variants={slideVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
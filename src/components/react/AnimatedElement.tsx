import { motion } from "framer-motion";
import type { ReactElement, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactElement | ReactElement[];
  className?: string;
  delay?: number;
  duration?: number;
  as?: keyof typeof motion;
  animation?: "fadeUp" | "fadeIn" | "stagger";
}

const animations = {
  fadeUp: {
    hidden: { y: 20, opacity: 0 },
    show: (delay = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.77, 0, 0.175, 1],
        delay,
      },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: (delay = 0) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.77, 0, 0.175, 1],
        delay,
      },
    }),
  },
  stagger: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
};

export default function AnimatedElement({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
  as = "div",
  animation = "fadeUp",
  ...props
}: Props) {
  const Component = motion[as];
  const selectedAnimation = animations[animation];

  return (
    <Component
      className={className}
      variants={selectedAnimation}
      initial="hidden"
      animate="show"
      custom={delay}
      {...props}
    >
      {children}
    </Component>
  );
}

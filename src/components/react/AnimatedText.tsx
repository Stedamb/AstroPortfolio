import { motion } from "framer-motion";

interface Props {
  text: string;
  delay?: number;
  className?: string;
}

export default function AnimatedText({ text, delay = 0, className = "" }: Props) {
  const letterVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 1,
        ease: [0.77, 0, 0.175, 1],
        delay: delay + i * 0.08,
      },
    }),
  };

  return (
    <div className="overflow-hidden">
      <div className={className}>
        {Array.from(text).map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

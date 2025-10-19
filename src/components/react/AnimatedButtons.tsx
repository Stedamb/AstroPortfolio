import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Mail, Linkedin, CircleArrowDown } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 0, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

export default function AnimatedButtons() {
  return (
    <motion.div
      className="mx-auto grid w-fit grid-cols-3 gap-4 pt-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.a
        href="https://github.com/Stedamb"
        target="_blank"
        rel="noopener noreferrer"
        variants={item}
        aria-label="Visit my GitHub profile"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-white/20 bg-white/10 backdrop-blur-xs hover:bg-white/20"
        >
          <Github size={8} />
          <span className="sr-only">GitHub</span>
        </Button>
      </motion.a>

      <motion.a
        href="https://linkedin.com/in/ste-damb"
        target="_blank"
        rel="noopener noreferrer"
        variants={item}
        aria-label="Visit my LinkedIn profile"
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-white/20 bg-white/10 backdrop-blur-xs hover:bg-white/20"
        >
          <Linkedin size={8} />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </motion.a>

      <motion.a href="mailto:stedamb@protonmail.com" variants={item} aria-label="Send me an email">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-white/20 bg-white/10 backdrop-blur-xs hover:bg-white/20"
        >
          <Mail size={8} />
          <span className="sr-only">Email</span>
        </Button>
      </motion.a>

      <motion.a
        href="/CV_Stefano_DAmbrosio.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-3"
        variants={item}
      >
        <Button
          variant="outline"
          size="fluid"
          className="group-hover h-9 rounded-full border-white/20 bg-white/10 backdrop-blur-xs hover:bg-white/20"
        >
          <span>CV</span>
          <CircleArrowDown size={8} />
        </Button>
      </motion.a>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin } from "lucide-react";

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
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

export default function AnimatedSocials() {
  return (
    <motion.div 
      className="flex gap-4 justify-center pt-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.a 
        href="https://github.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="transform hover:scale-110 transition-transform"
        variants={item}
      >
        <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
          <Github className="size-8" />
        </Button>
      </motion.a>
      
      <motion.a 
        href="https://linkedin.com/in/yourusername" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="transform hover:scale-110 transition-transform"
        variants={item}
      >
        <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
          <Linkedin className="size-8" />
        </Button>
      </motion.a>
      
      <motion.a 
        href="mailto:your.email@example.com" 
        className="transform hover:scale-110 transition-transform"
        variants={item}
      >
        <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
          <Mail className="size-8" />
        </Button>
      </motion.a>
    </motion.div>
  );
}

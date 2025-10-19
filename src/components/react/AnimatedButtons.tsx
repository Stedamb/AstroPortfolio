import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin, ArrowDown, CircleArrowDown } from "lucide-react";

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
      className="grid grid-cols-3 gap-4 w-fit mx-auto pt-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.a 
        href="https://github.com/Stedamb" 
        target="_blank" 
        rel="noopener noreferrer" 
        variants={item}

      >
        <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-xs border-white/20 hover:bg-white/20">
          <Github size={8} />
        </Button>
      </motion.a>
      
      <motion.a 
        href="https://linkedin.com/in/ste-damb" 
        target="_blank" 
        rel="noopener noreferrer" 
        variants={item}
      >
        <Button variant="outline" size="icon" className=" rounded-full bg-white/10 backdrop-blur-xs border-white/20 hover:bg-white/20">
          <Linkedin size={8} />
        </Button>
      </motion.a>
      
      <motion.a 
        href="mailto:stedamb@protonmail.com" 
        variants={item}
      >
        <Button variant="outline" size="icon" className=" rounded-full bg-white/10 backdrop-blur-xs border-white/20 hover:bg-white/20">
          <Mail size={8} />
        </Button>
      </motion.a>

 <motion.a 
        href="/CV_Stefano_DAmbrosio.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="col-span-3"
        variants={item}
      >
        <Button variant="outline" size="fluid" className="rounded-full h-9 bg-white/10 backdrop-blur-xs border-white/20 hover:bg-white/20 group-hover">
          <span>CV</span>
          <CircleArrowDown size={8} />
        </Button>
      </motion.a>
    </motion.div>
  );
}

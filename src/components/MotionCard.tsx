"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionCard({ children, delay = 0, className }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0px 20px 40px rgba(242, 202, 80, 0.15), 0px 0px 20px rgba(242, 202, 80, 0.2)"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

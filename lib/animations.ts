"use client";

import { Variants } from "framer-motion";

/**
 * ENHANCED ANIMATIONS - Orchestrated entrances with depth
 * Duration guidelines:
 * - Micro: 150-200ms (hover states, button feedback)
 * - Small: 200-300ms (tooltips, dropdowns)
 * - Medium: 300-400ms (modals, page sections)
 * - Large: 400-600ms (page transitions)
 * - Hero: 800-1000ms (hero section entrance)
 */

// === ORCHESTRATED ENTRANCES ===

// Hero section - slow, confident reveal with depth
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // custom bezier
  },
};

// Stagger children with orchestrated delay
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Card entrance - scale with depth
export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Section reveal - staggered cascade
export const cascadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// === MICRO INTERACTIONS ===

// Button tap with subtle bounce
export const tapScale = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1, ease: "easeOut" },
};

// Card hover - lift with glow
export const cardHover = {
  whileHover: { 
    y: -8,
    boxShadow: "0 20px 40px -15px rgba(212, 168, 83, 0.2)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// Micro interaction (button hover)
export const microInteraction = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 },
};

// === BASIC ANIMATIONS ===

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Scale in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// === MOTION EFFECTS ===

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// === PAGE TRANSITIONS ===

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Number counter animation (for stats)
export const countUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// Progress bar fill
export const progressFill = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// === MODAL & OVERLAY ===

// Modal variants
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// Drawer variants
export const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { x: "-100%", transition: { duration: 0.2 } },
};

// Accordion variants (following guide)
export const accordionVariants = {
  open: { height: "auto", opacity: 1 },
  closed: { height: 0, opacity: 0 },
};

// === SPRING PHYSICS ===

// Spring physics (natural feel)
export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

// === SKELETON ===

// Skeleton loading
export const skeletonVariants: Variants = {
  idle: {
    background: "hsl(var(--muted))",
  },
  loading: {
    background: [
      "hsl(var(--muted))",
      "hsl(var(--accent))",
      "hsl(var(--muted))",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Animation hook with reduced motion support
export const animationSettings = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
};
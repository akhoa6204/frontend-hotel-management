import type { Variants } from "framer-motion";

export const editorialEase = [0.22, 1, 0.36, 1] as const;
export const revealViewport = { once: true, amount: 0.16 } as const;

export const fadeUp = (
  reducedMotion: boolean | null,
  distance = 28,
  delay = 0,
): Variants => ({
  hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: editorialEase },
  },
});

export const fadeScale = (
  reducedMotion: boolean | null,
  scale = 0.985,
  delay = 0,
): Variants => ({
  hidden: { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : scale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : delay, ease: editorialEase },
  },
});

export const stagger = (
  reducedMotion: boolean | null,
  delayChildren = 0,
  staggerChildren = 0.09,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: reducedMotion ? 0 : delayChildren,
      staggerChildren: reducedMotion ? 0 : staggerChildren,
    },
  },
});

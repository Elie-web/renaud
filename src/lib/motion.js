export const ease = [0.25, 0.1, 0.25, 1]
export const easeOut = [0.0, 0.0, 0.2, 1]
export const spring = { type: 'spring', stiffness: 80, damping: 18 }

export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
}

export const slideRight = {
  hidden: { opacity: 0, x: -64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease },
  },
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

export const imageReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.1, ease: easeOut },
  },
}

export const viewportSettings = { once: true, amount: 0.15 }

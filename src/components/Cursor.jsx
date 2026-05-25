import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springCfg = { stiffness: 600, damping: 36, mass: 0.5 }
  const ringX = useSpring(dotX, { stiffness: 120, damping: 22, mass: 0.8 })
  const ringY = useSpring(dotY, { stiffness: 120, damping: 22, mass: 0.8 })

  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    const enter = () => setHidden(false)
    const leave = () => setHidden(true)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseleave', leave)

    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })
    addHover()

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseleave', leave)
      observer.disconnect()
    }
  }, [])

  if (window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Small dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 0 : 1, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="cursor-dot"
      />
      {/* Large ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 2.2 : 1,
          opacity: hidden ? 0 : 0.6,
          borderColor: hovered ? 'var(--c-or)' : 'rgba(196,160,64,0.4)',
        }}
        transition={{ duration: 0.3 }}
        className="cursor-ring"
      />

      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--c-or);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(196,160,64,0.4);
          pointer-events: none;
          z-index: 99998;
          transition: border-color 0.3s ease;
        }
      `}</style>
    </>
  )
}




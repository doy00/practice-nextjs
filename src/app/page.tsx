'use client';

import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import styles from './styles.module.css';

const X_LINES = 40

const PAGE_COUNT = 5

const INITIAL_WIDTH = 20

export default function App() {
  const { scrollYProgress} = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className='container'>
      <div className={styles.animated__layers}>

        <motion.div
          className={styles.dot}
          style={{
            clipPath: useTransform(scrollYProgress, [0, 0.5], ['circle(0%)', 'circle(100%)']
            )
          }}>
          <h1 className={styles.title}>
            <span>
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: scrollYProgress.get() > 0.7 ? '0%' : '100%'}}
                >
                  Aha!
                </motion.span>
            </span>
            <span>
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: scrollYProgress.get() > 0.7 ? '0%' : '100%'}}
              >
                You found me!
              </motion.span>
            </span>
          </h1>
        </motion.div>
      </div>

      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={styles.full__page} key={index} />
      ))}
      
    </div>
  )
}

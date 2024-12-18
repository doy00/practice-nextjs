'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, useScroll } from 'framer-motion';

function AnimatedNumberFramerMotion({ value }: { value: number }) {
  // 여기에 코드를 작성해주세요.
  const motionValue = useMotionValue(0);
  const springValue = useSpring( motionValue, { stiffness: 50, damping: 10, restDelta: 0.001 }); // motionValue를 기반으로 스프링 적용
  const displayValue = useTransform( springValue, (latest) => Math.round(latest)); // 변환함수
  const [color, setColor] = useState("#00f") // useState사용, 따옴표
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);


  useMotionValueEvent(motionValue, "change", (latest) => {
    console.log("Target value changed to:", latest);
    setColor(`hsl(${Math.random() * 360}, 100%, 50%)`);
  })

  return (
    <motion.span
      style={{ 
        backgroundColor: color,
        height: "50px",
        top: 0,
        left: 0,
        right: 0,
        scaleX: scrollYProgress,
        position: "fixed"
        }}
      animate={{ backgroundColor: color, opacity: 0.5, x: 100, scale: 1  }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      
    >{displayValue}</motion.span>
  )
}

function App() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const newNum = (Math.random() * 100).toFixed();
      setNum(parseInt(newNum));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span>{num}</span>
      <AnimatedNumberFramerMotion value={num} />
      <div style={{ marginTop: "100vh" }}>스크롤 테스트를 위한 추가 컨텐츠</div>
    </div>
  );
}

export default App;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';

const INITIAL_CARDS = [
  {
    id: 1,
    title: "ИМЯ",
    desc: "Описание",
    imageUrl: "",
    color: "linear-gradient(135deg, #00f0ff 0%, #0044ff 100%)"
  }
];

export default function Home() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const activeCard = cards[0];

  const controls = useAnimation();
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  const onSwipeLeft = (cardId: number) => {
    console.log(`Отклонено: карточка ${cardId}`);
  };

  const onSwipeRight = (cardId: number) => {
    console.log(`Одобрено: карточка ${cardId}`);
  };

  const removeTopCard = (direction: 'left' | 'right') => {
    if (!activeCard) return;

    if (direction === 'left') onSwipeLeft(activeCard.id);
    if (direction === 'right') onSwipeRight(activeCard.id);

    if (cards.length === 1) {
      setCards(INITIAL_CARDS);
    } else {
      setCards((prevCards) => prevCards.slice(1));
    }

    controls.set({ x: 0, opacity: 1 });
  };

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 120;

    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      removeTopCard('right');
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      removeTopCard('left');
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <main className="neon-main-layout">
      <div className="neon-app-container" >
        <header className="neon-app-header">
          <Link href="/.." className="neon-btn-link">GL</Link>
        </header>

        <div style={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          userSelect: 'none',
          background: 'radial-gradient(circle at center, #0b112c 0%, #05070f 100%)'
        }}>

          {activeCard && (
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              height: '85vh',
              maxHeight: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1000px',
              boxSizing: 'border-box'
            }}>
              <motion.div
                key={activeCard.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                animate={controls}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
                style={{
                  x,
                  rotate,
                  opacity,
                  width: '100%',
                  height: '100%',
                  background: '#090d1a',
                  borderRadius: '24px',
                  boxShadow: '0 0 20px #0044ff, 0 0 40px rgba(0, 240, 255, 0.6), inset 0 0 20px rgba(0, 240, 255, 0.2)',
                  border: '2px solid #00f0ff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  color: '#ffffff',
                  cursor: 'grab',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  touchAction: 'none'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '65%',
                  position: 'relative',
                  background: activeCard.color || '#0d1530',
                  pointerEvents: 'none',
                  borderBottom: '2px solid #00f0ff',
                  boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)'
                }}>
                  {activeCard.imageUrl && (
                    <Image
                      src={activeCard.imageUrl}
                      alt={activeCard.title}
                      fill
                      sizes="(max-width: 480px) 100vw, 360px"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textAlign: 'left',
                  pointerEvents: 'none',
                  flexGrow: 1,
                  justifyContent: 'center',
                  backgroundColor: '#060914'
                }}>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '900',
                    margin: 0,
                    color: '#ffffff',
                    textShadow: '0 0 2px #ffffff, 0 0 15px #00f0ff, 0 0 30px #0044ff',
                    letterSpacing: '0.5px'
                  }}>
                    {activeCard.title}
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#8fa0dd',
                    margin: 0,
                    textShadow: '0 0 2px rgba(143, 160, 221, 0.3)'
                  }}>
                    {activeCard.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

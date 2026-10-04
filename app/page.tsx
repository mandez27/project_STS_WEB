'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridTemplateColumns = () => {
    if (!isMenuOpen) return "0% auto";
    return isMobile ? "75% auto" : "30% auto";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="neon-main-layout">
      <div className="neon-app-container">
        <header className="neon-app-header" style={{ gridTemplateColumns: "60px 60px auto 60px" }}>
          
          <div className="neon-btn-link" onClick={toggleMenu} style={{ fontSize: "20px" }}>
            ...
          </div>

          <Link href="/Choice" className="neon-btn-link">
            CH
          </Link>

          <h1 className="neon-header-title" style={{ paddingRight: '120px' }}>
            Моё приложение
          </h1>

          <Link href="/login" className="neon-btn-link">
            Log
          </Link>
        </header>

        <div 
          id="page" 
          className="neon-contacts-layout"
          style={{ gridTemplateColumns: getGridTemplateColumns() }}
        >
          {/* Список контактов */}
          <div className={`neon-sidebar ${isMenuOpen ? 'neon-sidebar-active' : ''}`}>
            
            {/* Карточка 1 */}
            <div className="neon-contact-card">
              <div className="neon-avatar">ik</div>
              <div className="neon-contact-name">name1</div>
            </div>

            {/* Карточка 2 */}
            <div className="neon-contact-card">
              <div className="neon-avatar">ik</div>
              <div className="neon-contact-name">name2</div>
            </div>

          </div>

          <div style={{ padding: '20px' }}>
            <p className="neon-form-footer"></p>
          </div>
        </div>
      </div>
    </main>
  );
}

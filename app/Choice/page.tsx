'use client';
import Link from 'next/link';

import { useState } from 'react';

export default function Home() {   
  const [gridColumns, setGridColumns] = useState("30% auto");

  const changeDirectly = () => {
    if (gridColumns !== "30% auto") {
      setGridColumns("30% auto");
    } else {
      setGridColumns("0% auto");
    }
  };



  return (
    <main style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>

      <div style={{
        height: '100vh',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateRows: '15% auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <header style={{
          display: 'grid',
          gridTemplateColumns: "10% auto",
          borderBottom: '1px solid #eee'
        }}>

          <div style={{
            backgroundColor: "#999",
            color: "#fff",
            fontSize: "3vw",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer" 
          }}
            onClick={changeDirectly}>...</div>

          <h1 style={{
            margin: 0,
            fontSize: '1.2rem',
            gridColumn: 2,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
          }}>Моё приложение</h1>
        </header>

        

        </div>
    </main>
  );
}

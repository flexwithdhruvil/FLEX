import React, { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Save original styles
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    const originalTitle = document.title;

    // Apply classic server style
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.title = '404 Not Found';

    return () => {
      // Restore styles when component unmounts
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
      document.title = originalTitle;
    };
  }, []);

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif',
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '16px 20px',
      minHeight: '100vh',
      width: '100%',
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      textAlign: 'left',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '2.4em',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif',
        border: 'none',
        padding: '0'
      }}>
        Not Found
      </h1>
      <p style={{
        fontSize: '1em',
        margin: '0',
        color: '#000000',
        fontFamily: '"Times New Roman", Times, serif'
      }}>
        The requested URL {window.location.pathname} was not found on this server.
      </p>
    </div>
  );
}

import React from 'react';
import './GlitchText.css';

const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const inlineStyle = {
    '--glitch-speed': `${3 / speed}s`
  };

  return (
    <span
      className={`glitch-wrapper ${enableOnHover ? 'hover-trigger' : 'always-active'} ${className}`}
      style={inlineStyle}
    >
      <span 
        className={`glitch-text ${enableShadows ? 'with-shadows' : ''}`} 
        data-text={children}
      >
        {children}
      </span>
    </span>
  );
};

export default GlitchText;

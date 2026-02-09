import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LogoLoop = ({
    logos = [],
    speed = 100, // pixels per sec
    direction = 'left',
    logoHeight = 48,
    gap = 40,
    hoverSpeed, // speed on hover
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = '#121212', // changed default to dark to match likely theme, but will update based on verify
    ariaLabel = 'Logo Loop',
}) => {
    const isVertical = direction === 'up' || direction === 'down';

    return (
        <div
            className="logo-loop-container"
            style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                height: isVertical ? '100%' : 'auto',
                width: isVertical ? 'auto' : '100%',
                maskImage: fadeOut ? `linear-gradient(to ${isVertical ? 'bottom' : 'right'}, transparent, black 20%, black 80%, transparent)` : 'none',
                WebkitMaskImage: fadeOut ? `linear-gradient(to ${isVertical ? 'bottom' : 'right'}, transparent, black 10%, black 90%, transparent)` : 'none'
            }}
            aria-label={ariaLabel}
        >
            <InnerLoop
                items={logos}
                speed={speed}
                direction={direction}
                gap={gap}
                logoHeight={logoHeight}
                hoverSpeed={hoverSpeed}
                scaleOnHover={scaleOnHover}
                isVertical={isVertical}
            />
        </div>
    );
};

// Mask logic using maskImage is better than overlay divs for transparency support.
// But fadeOutColor overlay allows matching solid background explicitly.
// The user sample used fadeOutColor prop which implies overlay divs.
// I will support overlay divs as fallback or primary if mask doesn't suit 'color'. 
// Actually mask is strictly transparency. fadeOutColor implies a color.
// So I will revert to overlay divs if color is provided.
// But wait, the user's snippet has `fadeOutColor="#ffffff"`. 
// I'll stick to the user's request. 

const LogoLoopWithOverlay = ({
    logos = [],
    speed = 100,
    direction = 'left',
    logoHeight = 48,
    gap = 40,
    hoverSpeed,
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = '#0a0a0a', // Default to probable dark bg color if not specified
    ariaLabel = 'Logo Loop',
}) => {
    const isVertical = direction === 'up' || direction === 'down';

    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                height: isVertical ? '100%' : 'auto',
                width: isVertical ? 'auto' : '100%',
            }}
            aria-label={ariaLabel}
        >
            {fadeOut && (
                <>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        right: isVertical ? 0 : 'auto',
                        bottom: isVertical ? 'auto' : 0,
                        width: isVertical ? '100%' : '100px',
                        height: isVertical ? '100px' : '100%',
                        background: `linear-gradient(${isVertical ? 'to bottom' : 'to right'}, ${fadeOutColor}, transparent)`,
                        zIndex: 10,
                        pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: 0, right: 0,
                        top: isVertical ? 'auto' : 0,
                        left: isVertical ? 0 : 'auto',
                        width: isVertical ? '100%' : '100px',
                        height: isVertical ? '100px' : '100%',
                        background: `linear-gradient(${isVertical ? 'to top' : 'to left'}, ${fadeOutColor}, transparent)`,
                        zIndex: 10,
                        pointerEvents: 'none'
                    }} />
                </>
            )}

            <InnerLoop
                items={logos}
                speed={speed}
                direction={direction}
                gap={gap}
                logoHeight={logoHeight}
                hoverSpeed={hoverSpeed}
                scaleOnHover={scaleOnHover}
                isVertical={isVertical}
            />
        </div>
    );
};

const InnerLoop = ({ items, speed, direction, gap, logoHeight, hoverSpeed, scaleOnHover, isVertical }) => {
    const [size, setSize] = useState(0);
    const contentRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            // We measure the first half (the original set)
            // But contentRef contains both sets.
            // So we divide roughly by 2.
            const totalSize = isVertical ? contentRef.current.scrollHeight : contentRef.current.scrollWidth;
            setSize(totalSize / 2);
        }
    }, [items, isVertical, logoHeight, gap]);

    const currentSpeed = isHovered && hoverSpeed !== undefined ? hoverSpeed : speed;
    const duration = currentSpeed > 0 && size > 0 ? size / currentSpeed : 0;

    // Logic: 
    // left: x: 0 -> -size
    // right: x: -size -> 0
    // up: y: 0 -> -size
    // down: y: -size -> 0

    const isReverse = direction === 'right' || direction === 'down';

    const initial = isReverse
        ? (isVertical ? { y: -size } : { x: -size })
        : (isVertical ? { y: 0 } : { x: 0 });

    const animateTarget = isReverse
        ? (isVertical ? { y: 0 } : { x: 0 })
        : (isVertical ? { y: -size } : { x: -size });

    // Use a custom key to force reset when params change
    const animKey = `${direction}-${size}-${duration}`;

    return (
        <motion.div
            ref={contentRef}
            className="logo-loop-track"
            style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                gap: `${gap}px`,
                width: isVertical ? '100%' : 'max-content',
                height: isVertical ? 'max-content' : '100%',
                willChange: 'transform'
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={size > 0 && currentSpeed !== 0 ? animateTarget : initial}
            initial={initial}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: duration,
            }}
            key={animKey}
        >
            {[...items, ...items, ...items].map((logo, index) => ( // 3 copies to be safe for wide screens
                <div
                    key={index}
                    style={{
                        height: isVertical ? 'auto' : `${logoHeight}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}
                >
                    <LogoItem item={logo} height={logoHeight} scaleOnHover={scaleOnHover} />
                </div>
            ))}
        </motion.div>
    );
};

const LogoItem = ({ item, height, scaleOnHover }) => {
    // Check if node
    const isNode = item.node !== undefined;

    const content = isNode ? (
        <div className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors">
            <span style={{ fontSize: `${height}px`, lineHeight: 1 }}>{item.node}</span>
            {item.title && <span className="text-lg font-semibold whitespace-nowrap">{item.title}</span>}
        </div>
    ) : (
        <img src={item.src} alt={item.alt} style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} />
    );

    const Wrapper = item.href ? 'a' : 'div';
    const props = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Wrapper {...props} className={`block ${scaleOnHover ? "hover:scale-105 transition-transform duration-300" : ""}`}>
            {content}
        </Wrapper>
    );
}

export default LogoLoopWithOverlay;

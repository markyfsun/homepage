'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {inspect} from "util";
import styles from './ParallaxImage.module.css'

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
    src: string;
    speed: number;
    style: React.CSSProperties;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, speed ,style }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        gsap.to(element, {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: "top bottom", // when the top of the trigger hits the bottom of the viewport
                end: "bottom top", // when the bottom of the trigger hits the top of the viewport
                scrub: true,
            }
        });

        return () => {
            ScrollTrigger.killAll();
        };
    }, [speed]);

    return (
        <div ref={ref} className={styles.parallaxImage} style={style}>
            <img src={src} alt="parallax" />
        </div>
    );
};

export default ParallaxImage;

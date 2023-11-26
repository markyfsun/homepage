'use client';
import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';

const Loading = () => {
    // Define letters as the string "SOME"
    const letters = 'FURCHAIN';

    const wordRef = useRef(null);

    const line1 = useRef(null);
    const line2 = useRef(null);
    // Reference for the diagonal line
    const diagonalLine = useRef(null);
    const constructRef = useRef(null);

    useEffect(() => {

        // Initialize opacity of the word to 0

        // @ts-ignore
        gsap.set(wordRef.current.children, {autoAlpha: 0});
        gsap.set([line1.current, line2.current], {autoAlpha: 0, x: 50});
        gsap.set(diagonalLine.current, {autoAlpha: 0});


        // 创建时间线
        const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

        // @ts-ignore
        console.log(((window.innerWidth - 200) / letters.length) - wordRef.current.children[0].offsetWidth)
        // Calculate the scale factor based on the screen width and the original width of the letter
        // @ts-ignore
        const marginFactor = Math.max(10, ((window.innerWidth - 200) / letters.length) - wordRef.current.children[0].offsetWidth);
        // @ts-ignore
        const scaleFactor = Math.max(1.5, ((window.innerWidth - 400) / letters.length) / (wordRef.current.children[0].offsetWidth));
        // Calculate the margin factor based on the screen width and the number of letters

        // @ts-ignore
        tl.to(wordRef.current.children, {
            autoAlpha: 1,
            x: -50,
            duration: 1 - 0.05 * letters.length,
            stagger: {each: 0.05, from: "end"},
            ease: 'power3.out',
            marginRight: marginFactor,
            scale: scaleFactor,
            fontWeight: 'bold'
        });
        // @ts-ignore
        tl.to(wordRef.current.children, {x: 20, duration: 0.5, scale: 1, marginRight: '5px', border: 0,}, '+=.7');

        // Animate the diagonal line
        tl.to(diagonalLine.current, {autoAlpha: 1, x: 20, duration: 1},);
        // 两行文字和竖线的动画
        // Animate each line separately
        tl.to(line1.current, {autoAlpha: 1, x: 20, duration: 1}, '+=0.2')
            .to(line2.current, {autoAlpha: 1, x: 20, duration: 1}, '+=0.3');
        tl.fromTo(constructRef.current, {autoAlpha:0,position:'absolute',translateY: 100},{autoAlpha:1})


    }, []);


    return (
        <div className="animation-container"
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{marginRight: '20px', fontSize: '1.4rem',marginLeft: '5vw',fontStyle: "italic"}}>
                <div ref={line1}>Furry Visions</div>
                <div ref={line2}>AI Missions</div>
            </div>
            <div ref={diagonalLine} style={{marginRight: '20px', fontSize: '2rem', lineHeight: '0'}}>/</div>
            <div ref={wordRef} style={{display: 'flex', flexDirection: 'row', fontSize: '1.6rem',marginRight: '5vw'}}>
                {Array.from(letters).map((letter, index) => (
                    <p key={index}>{letter}</p>
                ))}
            </div>
        <span ref={constructRef}>Website under construction🔨</span>
        </div>
    );
};

export default Loading;

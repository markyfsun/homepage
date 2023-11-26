'use client';
import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';

const Loading = () => {
    // Define letters as the string "SOME"
    const letters = 'FURCHAIN';

    const wordRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<SVGSVGElement>(null);

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
        console.log(((window.innerWidth - 200) / letters.length) - wordRef.current.children[1].offsetWidth)
        // Calculate the scale factor based on the screen width and the original width of the letter
        // @ts-ignore
        const marginFactor = Math.max(10, ((window.innerWidth - 200) / letters.length) - wordRef.current.children[1].offsetWidth);
        // @ts-ignore
        const scaleFactor = Math.max(1.5, ((window.innerWidth - 400) / letters.length) / (wordRef.current.children[1].offsetWidth));
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
        tl.to(wordRef.current.children, {x: 20, duration: 0.5, scale: 1, marginRight: '5px'}, '+=.7');

        // Animate the diagonal line
        tl.to(diagonalLine.current, {autoAlpha: 1, x: 20, duration: .5}, '-=.2');
        // 两行文字和竖线的动画
        // Animate each line separately
        tl.to(line1.current, {autoAlpha: 1, x: 20, duration: .5},)
            .to(line2.current, {autoAlpha: 1, x: 20, duration: .5}, '+=0.3');
        tl.fromTo(constructRef.current, {autoAlpha: 0, position: 'absolute', translateY: 100}, {autoAlpha: 1})


        // @ts-ignore

        if (wordRef.current && logoRef.current) {
            // Get the position of the first child of wordRef.current
            const rect = wordRef.current.children[0].getBoundingClientRect();

            tl.to(wordRef.current.children[0], {
                scaleY: 0, duration: .5,
                onComplete: () => {

                }
            },);

            // Set the position of the SVG to be the same as the first child of wordRef.current
            console.log('rect', rect.top, rect.left, rect.width, rect.height)
            tl.set(logoRef.current, {
                position: 'absolute',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                autoAlpha: 1, // Make the SVG visible
                scaleY: 0,
                // verticalAlign: 'middle' // Add this line
            });
            tl.to(logoRef.current, {scaleY: 1, duration: .5});
            const rect2 = logoRef.current.getBoundingClientRect();
            console.log('rect2', rect2.top, rect2.left, rect2.width, rect2.height)
            const polygons = logoRef.current.querySelectorAll('polygon');
            console.log(polygons)

            // 为每个polygon添加一个独特的动画
            polygons.forEach(polygon => {

                tl.to(polygon, {
                    // 随机改变polygon的位置
                    x: gsap.utils.random(-5000, 5000),
                    y: gsap.utils.random(-5000, 5000),
                    // 动画的持续时间
                    duration: 1,
                    scale: 10,
                    // 动画的缓动函数
                    ease: 'power1.inOut',
                    // 动画结束后，将polygon的位置重置为原来的位置
                    onComplete: () => {
                        gsap.to(polygon, {
                            x: 0,
                            y: 0,
                            scale: 1,
                            duration: 1,
                            ease: 'power1.inOut'
                        });
                    }
                }, '-=80%');
            });
        }


        // Hide the first child of wordRef.current
        // tl.set(wordRef.current.children[0], {autoAlpha:0})

    }, []);


    return (
        <div>
            <div className="animation-container"
                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div style={{marginRight: '20px', fontSize: '1.4rem', marginLeft: '5vw', fontStyle: "italic"}}>
                    <div ref={line1}>Furry Visions</div>
                    <div ref={line2}>AI Missions</div>
                </div>
                <div ref={diagonalLine} style={{marginRight: '20px', fontSize: '2rem', lineHeight: '0'}}>/</div>
                <div ref={wordRef}
                     style={{display: 'flex', flexDirection: 'row', fontSize: '1.6rem', marginRight: '5vw'}}>

                    {Array.from(letters).map((letter, index) => (
                        <p key={index}>{letter}</p>
                    ))}
                </div>
                <span ref={constructRef}>Website under construction🔨</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" style={{visibility: 'hidden'}} ref={logoRef} height="1.6rem"
                 version="1.1" overflow="visible" viewBox="0 0 420 680">
                <defs/>
                <polygon fill="rgb(5,10,11)" points="40 20 60 20 60 0"></polygon>
                <polygon fill="rgb(28,140,188)" points="60 0 80 0 80 20"></polygon>
                <polygon fill="rgb(32,147,205)" points="60 0 60 20 80 20"></polygon>
                <polygon fill="rgb(31,158,222)" points="80 20 100 20 100 0"></polygon>
                <polygon fill="rgb(28,146,194)" points="80 20 80 0 100 0"></polygon>
                <polygon fill="rgb(21,75,101)" points="100 0 100 20 120 20"></polygon>
                <polygon fill="rgb(7,33,45)" points="280 20 300 20 300 0"></polygon>
                <polygon fill="rgb(19,115,158)" points="300 0 320 0 320 20"></polygon>
                <polygon fill="rgb(26,143,198)" points="300 0 300 20 320 20"></polygon>
                <polygon fill="rgb(22,146,209)" points="320 20 340 20 340 0"></polygon>
                <polygon fill="rgb(21,134,184)" points="320 20 320 0 340 0"></polygon>
                <polygon fill="rgb(2,13,18)" points="340 0 340 20 360 20"></polygon>
                <polygon fill="rgb(24,67,93)" points="40 20 60 20 60 40"></polygon>
                <polygon fill="rgb(5,13,18)" points="40 20 40 40 60 40"></polygon>
                <polygon fill="rgb(24,141,224)" points="60 40 80 40 80 20"></polygon>
                <polygon fill="rgb(24,161,243)" points="60 40 60 20 80 20"></polygon>
                <polygon fill="rgb(30,168,252)" points="80 20 100 20 100 40"></polygon>
                <polygon fill="rgb(22,92,143)" points="80 20 80 40 100 40"></polygon>
                <polygon fill="rgb(31,160,235)" points="100 40 120 40 120 20"></polygon>
                <polygon fill="rgb(33,164,239)" points="100 40 100 20 120 20"></polygon>
                <polygon fill="rgb(21,78,109)" points="120 20 120 40 140 40"></polygon>
                <polygon fill="rgb(6,27,38)" points="260 40 280 40 280 20"></polygon>
                <polygon fill="rgb(28,150,215)" points="280 20 300 20 300 40"></polygon>
                <polygon fill="rgb(26,146,215)" points="280 20 280 40 300 40"></polygon>
                <polygon fill="rgb(28,129,200)" points="300 40 320 40 320 20"></polygon>
                <polygon fill="rgb(27,172,253)" points="300 40 300 20 320 20"></polygon>
                <polygon fill="rgb(22,156,244)" points="320 20 340 20 340 40"></polygon>
                <polygon fill="rgb(19,111,189)" points="320 20 320 40 340 40"></polygon>
                <polygon fill="rgb(3,23,40)" points="340 40 360 40 360 20"></polygon>
                <polygon fill="rgb(11,75,117)" points="340 40 340 20 360 20"></polygon>
                <polygon fill="rgb(8,61,107)" points="40 60 60 60 60 40"></polygon>
                <polygon fill="rgb(3,11,17)" points="40 60 40 40 60 40"></polygon>
                <polygon fill="rgb(19,120,204)" points="60 40 80 40 80 60"></polygon>
                <polygon fill="rgb(13,118,216)" points="60 40 60 60 80 60"></polygon>
                <polygon fill="rgb(12,36,62)" points="80 60 100 60 100 40"></polygon>
                <polygon fill="rgb(10,33,59)" points="80 60 80 40 100 40"></polygon>
                <polygon fill="rgb(28,165,253)" points="100 40 120 40 120 60"></polygon>
                <polygon fill="rgb(24,104,167)" points="100 40 100 60 120 60"></polygon>
                <polygon fill="rgb(24,147,228)" points="120 60 140 60 140 40"></polygon>
                <polygon fill="rgb(28,154,234)" points="120 60 120 40 140 40"></polygon>
                <polygon fill="rgb(11,40,59)" points="140 40 140 60 160 60"></polygon>
                <polygon fill="rgb(0,5,8)" points="240 60 260 60 260 40"></polygon>
                <polygon fill="rgb(23,131,205)" points="260 40 280 40 280 60"></polygon>
                <polygon fill="rgb(17,120,192)" points="260 40 260 60 280 60"></polygon>
                <polygon fill="rgb(24,131,213)" points="280 60 300 60 300 40"></polygon>
                <polygon fill="rgb(24,159,253)" points="280 60 280 40 300 40"></polygon>
                <polygon fill="rgb(16,46,78)" points="300 40 320 40 320 60"></polygon>
                <polygon fill="rgb(16,45,76)" points="300 40 300 60 320 60"></polygon>
                <polygon fill="rgb(13,102,206)" points="320 60 340 60 340 40"></polygon>
                <polygon fill="rgb(13,83,162)" points="320 60 320 40 340 40"></polygon>
                <polygon fill="rgb(4,26,47)" points="340 40 360 40 360 60"></polygon>
                <polygon fill="rgb(10,76,150)" points="340 40 340 60 360 60"></polygon>
                <polygon fill="rgb(6,29,55)" points="40 60 60 60 60 80"></polygon>
                <polygon fill="rgb(0,1,3)" points="40 60 40 80 60 80"></polygon>
                <polygon fill="rgb(12,37,64)" points="60 80 80 80 80 60"></polygon>
                <polygon fill="rgb(10,76,141)" points="60 80 60 60 80 60"></polygon>
                <polygon fill="rgb(12,27,48)" points="80 60 100 60 100 80"></polygon>
                <polygon fill="rgb(10,26,49)" points="80 60 80 80 100 80"></polygon>
                <polygon fill="rgb(14,40,70)" points="100 80 120 80 120 60"></polygon>
                <polygon fill="rgb(13,37,65)" points="100 80 100 60 120 60"></polygon>
                <polygon fill="rgb(18,154,251)" points="120 60 140 60 140 80"></polygon>
                <polygon fill="rgb(20,122,203)" points="120 60 120 80 140 80"></polygon>
                <polygon fill="rgb(47,161,186)" points="140 80 160 80 160 60"></polygon>
                <polygon fill="rgb(18,125,200)" points="140 80 140 60 160 60"></polygon>
                <polygon fill="rgb(34,89,89)" points="160 60 180 60 180 80"></polygon>
                <polygon fill="rgb(68,192,190)" points="160 60 160 80 180 80"></polygon>
                <polygon fill="rgb(77,227,227)" points="180 80 200 80 200 60"></polygon>
                <polygon fill="rgb(40,106,105)" points="180 80 180 60 200 60"></polygon>
                <polygon fill="rgb(42,114,113)" points="200 60 220 60 220 80"></polygon>
                <polygon fill="rgb(79,232,233)" points="200 60 200 80 220 80"></polygon>
                <polygon fill="rgb(66,189,187)" points="220 80 240 80 240 60"></polygon>
                <polygon fill="rgb(32,86,84)" points="220 80 220 60 240 60"></polygon>
                <polygon fill="rgb(17,98,157)" points="240 60 260 60 260 80"></polygon>
                <polygon fill="rgb(53,160,167)" points="240 60 240 80 260 80"></polygon>
                <polygon fill="rgb(17,137,231)" points="260 80 280 80 280 60"></polygon>
                <polygon fill="rgb(15,145,248)" points="260 80 260 60 280 60"></polygon>
                <polygon fill="rgb(16,51,88)" points="280 60 300 60 300 80"></polygon>
                <polygon fill="rgb(16,54,92)" points="280 60 280 80 300 80"></polygon>
                <polygon fill="rgb(12,27,48)" points="300 80 320 80 320 60"></polygon>
                <polygon fill="rgb(12,26,48)" points="300 80 300 60 320 60"></polygon>
                <polygon fill="rgb(10,63,131)" points="320 60 340 60 340 80"></polygon>
                <polygon fill="rgb(9,28,52)" points="320 60 320 80 340 80"></polygon>
                <polygon fill="rgb(2,6,11)" points="340 80 360 80 360 60"></polygon>
                <polygon fill="rgb(9,45,91)" points="340 80 340 60 360 60"></polygon>
                <polygon fill="rgb(5,12,22)" points="40 100 60 100 60 80"></polygon>
                <polygon fill="rgb(1,1,3)" points="40 100 40 80 60 80"></polygon>
                <polygon fill="rgb(11,27,48)" points="60 80 80 80 80 100"></polygon>
                <polygon fill="rgb(12,27,49)" points="60 80 60 100 80 100"></polygon>
                <polygon fill="rgb(10,26,48)" points="80 100 100 100 100 80"></polygon>
                <polygon fill="rgb(10,26,48)" points="80 100 80 80 100 80"></polygon>
                <polygon fill="rgb(13,43,73)" points="100 80 120 80 120 100"></polygon>
                <polygon fill="rgb(10,43,81)" points="100 80 100 100 120 100"></polygon>
                <polygon fill="rgb(45,171,230)" points="120 100 140 100 140 80"></polygon>
                <polygon fill="rgb(41,129,161)" points="120 100 120 80 140 80"></polygon>
                <polygon fill="rgb(85,244,250)" points="140 80 160 80 160 100"></polygon>
                <polygon fill="rgb(47,188,240)" points="140 80 140 100 160 100"></polygon>
                <polygon fill="rgb(80,239,250)" points="160 100 180 100 180 80"></polygon>
                <polygon fill="rgb(86,250,253)" points="160 100 160 80 180 80"></polygon>
                <polygon fill="rgb(85,254,254)" points="180 80 200 80 200 100"></polygon>
                <polygon fill="rgb(86,254,252)" points="180 80 180 100 200 100"></polygon>
                <polygon fill="rgb(84,254,253)" points="200 100 220 100 220 80"></polygon>
                <polygon fill="rgb(84,254,253)" points="200 100 200 80 220 80"></polygon>
                <polygon fill="rgb(84,254,253)" points="220 80 240 80 240 100"></polygon>
                <polygon fill="rgb(84,254,253)" points="220 80 220 100 240 100"></polygon>
                <polygon fill="rgb(87,254,253)" points="240 100 260 100 260 80"></polygon>
                <polygon fill="rgb(85,254,252)" points="240 100 240 80 260 80"></polygon>
                <polygon fill="rgb(67,197,213)" points="260 80 280 80 280 100"></polygon>
                <polygon fill="rgb(87,254,253)" points="260 80 260 100 280 100"></polygon>
                <polygon fill="rgb(39,107,120)" points="280 100 300 100 300 80"></polygon>
                <polygon fill="rgb(28,74,90)" points="280 100 280 80 300 80"></polygon>
                <polygon fill="rgb(12,27,48)" points="300 80 320 80 320 100"></polygon>
                <polygon fill="rgb(13,27,48)" points="300 80 300 100 320 100"></polygon>
                <polygon fill="rgb(11,26,47)" points="320 100 340 100 340 80"></polygon>
                <polygon fill="rgb(10,27,47)" points="320 100 320 80 340 80"></polygon>
                <polygon fill="rgb(2,6,11)" points="340 80 360 80 360 100"></polygon>
                <polygon fill="rgb(6,19,34)" points="340 80 340 100 360 100"></polygon>
                <polygon fill="rgb(5,12,23)" points="40 100 60 100 60 120"></polygon>
                <polygon fill="rgb(0,1,3)" points="40 100 40 120 60 120"></polygon>
                <polygon fill="rgb(10,27,52)" points="60 120 80 120 80 100"></polygon>
                <polygon fill="rgb(12,26,49)" points="60 120 60 100 80 100"></polygon>
                <polygon fill="rgb(9,53,106)" points="80 100 100 100 100 120"></polygon>
                <polygon fill="rgb(7,64,123)" points="80 100 80 120 100 120"></polygon>
                <polygon fill="rgb(9,125,228)" points="100 120 120 120 120 100"></polygon>
                <polygon fill="rgb(9,98,192)" points="100 120 100 100 120 100"></polygon>
                <polygon fill="rgb(17,141,238)" points="120 100 140 100 140 120"></polygon>
                <polygon fill="rgb(15,139,241)" points="120 100 120 120 140 120"></polygon>
                <polygon fill="rgb(28,165,250)" points="140 120 160 120 160 100"></polygon>
                <polygon fill="rgb(21,155,245)" points="140 120 140 100 160 100"></polygon>
                <polygon fill="rgb(30,167,246)" points="160 100 180 100 180 120"></polygon>
                <polygon fill="rgb(32,169,250)" points="160 100 160 120 180 120"></polygon>
                <polygon fill="rgb(46,194,249)" points="180 120 200 120 200 100"></polygon>
                <polygon fill="rgb(56,207,249)" points="180 120 180 100 200 100"></polygon>
                <polygon fill="rgb(82,253,254)" points="200 100 220 100 220 120"></polygon>
                <polygon fill="rgb(74,240,250)" points="200 100 200 120 220 120"></polygon>
                <polygon fill="rgb(80,254,254)" points="220 120 240 120 240 100"></polygon>
                <polygon fill="rgb(82,254,254)" points="220 120 220 100 240 100"></polygon>
                <polygon fill="rgb(85,254,254)" points="240 100 260 100 260 120"></polygon>
                <polygon fill="rgb(82,254,254)" points="240 100 240 120 260 120"></polygon>
                <polygon fill="rgb(86,254,254)" points="260 120 280 120 280 100"></polygon>
                <polygon fill="rgb(87,254,254)" points="260 120 260 100 280 100"></polygon>
                <polygon fill="rgb(88,252,252)" points="280 100 300 100 300 120"></polygon>
                <polygon fill="rgb(88,254,254)" points="280 100 280 120 300 120"></polygon>
                <polygon fill="rgb(62,171,178)" points="300 120 320 120 320 100"></polygon>
                <polygon fill="rgb(54,148,158)" points="300 120 300 100 320 100"></polygon>
                <polygon fill="rgb(12,25,48)" points="320 100 340 100 340 120"></polygon>
                <polygon fill="rgb(16,40,60)" points="320 100 320 120 340 120"></polygon>
                <polygon fill="rgb(2,6,10)" points="340 120 360 120 360 100"></polygon>
                <polygon fill="rgb(6,19,33)" points="340 120 340 100 360 100"></polygon>
                <polygon fill="rgb(4,19,35)" points="40 140 60 140 60 120"></polygon>
                <polygon fill="rgb(0,1,2)" points="40 140 40 120 60 120"></polygon>
                <polygon fill="rgb(11,97,171)" points="60 120 80 120 80 140"></polygon>
                <polygon fill="rgb(11,108,186)" points="60 120 60 140 80 140"></polygon>
                <polygon fill="rgb(8,145,251)" points="80 140 100 140 100 120"></polygon>
                <polygon fill="rgb(10,144,249)" points="80 140 80 120 100 120"></polygon>
                <polygon fill="rgb(9,143,252)" points="100 120 120 120 120 140"></polygon>
                <polygon fill="rgb(9,143,253)" points="100 120 100 140 120 140"></polygon>
                <polygon fill="rgb(8,143,251)" points="120 140 140 140 140 120"></polygon>
                <polygon fill="rgb(9,141,251)" points="120 140 120 120 140 120"></polygon>
                <polygon fill="rgb(13,147,248)" points="140 120 160 120 160 140"></polygon>
                <polygon fill="rgb(8,141,250)" points="140 120 140 140 160 140"></polygon>
                <polygon fill="rgb(23,156,248)" points="160 140 180 140 180 120"></polygon>
                <polygon fill="rgb(28,163,250)" points="160 140 160 120 180 120"></polygon>
                <polygon fill="rgb(39,177,252)" points="180 120 200 120 200 140"></polygon>
                <polygon fill="rgb(43,178,253)" points="180 120 180 140 200 140"></polygon>
                <polygon fill="rgb(45,193,246)" points="200 140 220 140 220 120"></polygon>
                <polygon fill="rgb(42,189,247)" points="200 140 200 120 220 120"></polygon>
                <polygon fill="rgb(80,254,254)" points="220 120 240 120 240 140"></polygon>
                <polygon fill="rgb(76,249,251)" points="220 120 220 140 240 140"></polygon>
                <polygon fill="rgb(79,253,254)" points="240 140 260 140 260 120"></polygon>
                <polygon fill="rgb(80,254,254)" points="240 140 240 120 260 120"></polygon>
                <polygon fill="rgb(84,254,254)" points="260 120 280 120 280 140"></polygon>
                <polygon fill="rgb(81,253,253)" points="260 120 260 140 280 140"></polygon>
                <polygon fill="rgb(88,254,253)" points="280 140 300 140 300 120"></polygon>
                <polygon fill="rgb(87,254,254)" points="280 140 280 120 300 120"></polygon>
                <polygon fill="rgb(86,254,254)" points="300 120 320 120 320 140"></polygon>
                <polygon fill="rgb(88,254,254)" points="300 120 300 140 320 140"></polygon>
                <polygon fill="rgb(69,199,204)" points="320 140 340 140 340 120"></polygon>
                <polygon fill="rgb(67,195,199)" points="320 140 320 120 340 120"></polygon>
                <polygon fill="rgb(2,5,10)" points="340 120 360 120 360 140"></polygon>
                <polygon fill="rgb(20,52,63)" points="340 120 340 140 360 140"></polygon>
                <polygon fill="rgb(15,108,175)" points="40 140 60 140 60 160"></polygon>
                <polygon fill="rgb(13,55,93)" points="40 140 40 160 60 160"></polygon>
                <polygon fill="rgb(16,96,165)" points="60 160 80 160 80 140"></polygon>
                <polygon fill="rgb(14,143,239)" points="60 160 60 140 80 140"></polygon>
                <polygon fill="rgb(16,126,228)" points="80 140 100 140 100 160"></polygon>
                <polygon fill="rgb(26,87,174)" points="80 140 80 160 100 160"></polygon>
                <polygon fill="rgb(32,51,130)" points="100 160 120 160 120 140"></polygon>
                <polygon fill="rgb(18,119,218)" points="100 160 100 140 120 140"></polygon>
                <polygon fill="rgb(77,119,206)" points="120 140 140 140 140 160"></polygon>
                <polygon fill="rgb(101,56,118)" points="120 140 120 160 140 160"></polygon>
                <polygon fill="rgb(135,95,164)" points="140 160 160 160 160 140"></polygon>
                <polygon fill="rgb(55,124,217)" points="140 160 140 140 160 140"></polygon>
                <polygon fill="rgb(6,139,248)" points="160 140 180 140 180 160"></polygon>
                <polygon fill="rgb(25,133,236)" points="160 140 160 160 180 160"></polygon>
                <polygon fill="rgb(20,156,249)" points="180 160 200 160 200 140"></polygon>
                <polygon fill="rgb(19,152,249)" points="180 160 180 140 200 140"></polygon>
                <polygon fill="rgb(39,178,252)" points="200 140 220 140 220 160"></polygon>
                <polygon fill="rgb(43,180,253)" points="200 140 200 160 220 160"></polygon>
                <polygon fill="rgb(79,229,236)" points="220 160 240 160 240 140"></polygon>
                <polygon fill="rgb(57,217,247)" points="220 160 220 140 240 140"></polygon>
                <polygon fill="rgb(115,236,196)" points="240 140 260 140 260 160"></polygon>
                <polygon fill="rgb(168,215,123)" points="240 140 240 160 260 160"></polygon>
                <polygon fill="rgb(173,159,149)" points="260 160 280 160 280 140"></polygon>
                <polygon fill="rgb(131,235,182)" points="260 160 260 140 280 140"></polygon>
                <polygon fill="rgb(102,216,250)" points="280 140 300 140 300 160"></polygon>
                <polygon fill="rgb(129,105,247)" points="280 140 280 160 300 160"></polygon>
                <polygon fill="rgb(93,162,222)" points="300 160 320 160 320 140"></polygon>
                <polygon fill="rgb(94,234,251)" points="300 160 300 140 320 140"></polygon>
                <polygon fill="rgb(81,237,239)" points="320 140 340 140 340 160"></polygon>
                <polygon fill="rgb(58,153,164)" points="320 140 320 160 340 160"></polygon>
                <polygon fill="rgb(44,110,119)" points="340 160 360 160 360 140"></polygon>
                <polygon fill="rgb(73,200,201)" points="340 160 340 140 360 140"></polygon>
                <polygon fill="rgb(1,4,6)" points="360 140 360 160 380 160"></polygon>
                <polygon fill="rgb(5,16,30)" points="20 160 40 160 40 180"></polygon>
                <polygon fill="rgb(5,16,29)" points="20 160 20 180 40 180"></polygon>
                <polygon fill="rgb(16,23,64)" points="40 180 60 180 60 160"></polygon>
                <polygon fill="rgb(9,25,50)" points="40 180 40 160 60 160"></polygon>
                <polygon fill="rgb(39,28,96)" points="60 160 80 160 80 180"></polygon>
                <polygon fill="rgb(50,29,111)" points="60 160 60 180 80 180"></polygon>
                <polygon fill="rgb(59,30,121)" points="80 180 100 180 100 160"></polygon>
                <polygon fill="rgb(50,28,110)" points="80 180 80 160 100 160"></polygon>
                <polygon fill="rgb(52,25,112)" points="100 160 120 160 120 180"></polygon>
                <polygon fill="rgb(62,30,129)" points="100 160 100 180 120 180"></polygon>
                <polygon fill="rgb(202,53,96)" points="120 180 140 180 140 160"></polygon>
                <polygon fill="rgb(117,33,91)" points="120 180 120 160 140 160"></polygon>
                <polygon fill="rgb(251,56,83)" points="140 160 160 160 160 180"></polygon>
                <polygon fill="rgb(248,57,86)" points="140 160 140 180 160 180"></polygon>
                <polygon fill="rgb(194,73,121)" points="160 180 180 180 180 160"></polygon>
                <polygon fill="rgb(195,73,121)" points="160 180 160 160 180 160"></polygon>
                <polygon fill="rgb(6,142,248)" points="180 160 200 160 200 180"></polygon>
                <polygon fill="rgb(26,134,234)" points="180 160 180 180 200 180"></polygon>
                <polygon fill="rgb(37,172,242)" points="200 180 220 180 220 160"></polygon>
                <polygon fill="rgb(28,166,250)" points="200 180 200 160 220 160"></polygon>
                <polygon fill="rgb(198,190,70)" points="220 160 240 160 240 180"></polygon>
                <polygon fill="rgb(190,180,72)" points="220 160 220 180 240 180"></polygon>
                <polygon fill="rgb(252,184,6)" points="240 180 260 180 260 160"></polygon>
                <polygon fill="rgb(252,185,3)" points="240 180 240 160 260 160"></polygon>
                <polygon fill="rgb(181,117,130)" points="260 160 280 160 280 180"></polygon>
                <polygon fill="rgb(225,166,43)" points="260 160 260 180 280 180"></polygon>
                <polygon fill="rgb(136,63,242)" points="280 180 300 180 300 160"></polygon>
                <polygon fill="rgb(133,61,241)" points="280 180 280 160 300 160"></polygon>
                <polygon fill="rgb(149,60,251)" points="300 160 320 160 320 180"></polygon>
                <polygon fill="rgb(149,61,252)" points="300 160 300 180 320 180"></polygon>
                <polygon fill="rgb(125,57,211)" points="320 180 340 180 340 160"></polygon>
                <polygon fill="rgb(103,49,182)" points="320 180 320 160 340 160"></polygon>
                <polygon fill="rgb(7,27,49)" points="340 160 360 160 360 180"></polygon>
                <polygon fill="rgb(53,36,107)" points="340 160 340 180 360 180"></polygon>
                <polygon fill="rgb(6,19,36)" points="360 180 380 180 380 160"></polygon>
                <polygon fill="rgb(5,20,36)" points="360 180 360 160 380 160"></polygon>
                <polygon fill="rgb(0,1,2)" points="380 160 380 180 400 180"></polygon>
                <polygon fill="rgb(5,12,21)" points="0 180 20 180 20 200"></polygon>
                <polygon fill="rgb(3,7,11)" points="0 180 0 200 20 200"></polygon>
                <polygon fill="rgb(13,23,56)" points="20 200 40 200 40 180"></polygon>
                <polygon fill="rgb(9,26,47)" points="20 200 20 180 40 180"></polygon>
                <polygon fill="rgb(59,33,131)" points="40 180 60 180 60 200"></polygon>
                <polygon fill="rgb(61,35,134)" points="40 180 40 200 60 200"></polygon>
                <polygon fill="rgb(76,35,152)" points="60 200 80 200 80 180"></polygon>
                <polygon fill="rgb(69,35,142)" points="60 200 60 180 80 180"></polygon>
                <polygon fill="rgb(105,48,192)" points="80 180 100 180 100 200"></polygon>
                <polygon fill="rgb(123,58,216)" points="80 180 80 200 100 200"></polygon>
                <polygon fill="rgb(145,67,251)" points="100 200 120 200 120 180"></polygon>
                <polygon fill="rgb(137,66,240)" points="100 200 100 180 120 180"></polygon>
                <polygon fill="rgb(29,28,80)" points="120 180 140 180 140 200"></polygon>
                <polygon fill="rgb(114,54,211)" points="120 180 120 200 140 200"></polygon>
                <polygon fill="rgb(69,28,54)" points="140 200 160 200 160 180"></polygon>
                <polygon fill="rgb(66,31,56)" points="140 200 140 180 160 180"></polygon>
                <polygon fill="rgb(252,55,81)" points="160 180 180 180 180 200"></polygon>
                <polygon fill="rgb(247,57,83)" points="160 180 160 200 180 200"></polygon>
                <polygon fill="rgb(71,123,207)" points="180 200 200 200 200 180"></polygon>
                <polygon fill="rgb(144,93,154)" points="180 200 180 180 200 180"></polygon>
                <polygon fill="rgb(116,168,150)" points="200 180 220 180 220 200"></polygon>
                <polygon fill="rgb(41,148,214)" points="200 180 200 200 220 200"></polygon>
                <polygon fill="rgb(253,181,4)" points="220 200 240 200 240 180"></polygon>
                <polygon fill="rgb(253,181,4)" points="220 200 220 180 240 180"></polygon>
                <polygon fill="rgb(89,78,43)" points="240 180 260 180 260 200"></polygon>
                <polygon fill="rgb(107,89,39)" points="240 180 240 200 260 200"></polygon>
                <polygon fill="rgb(65,39,146)" points="260 200 280 200 280 180"></polygon>
                <polygon fill="rgb(15,23,65)" points="260 200 260 180 280 180"></polygon>
                <polygon fill="rgb(130,62,234)" points="280 180 300 180 300 200"></polygon>
                <polygon fill="rgb(112,55,214)" points="280 180 280 200 300 200"></polygon>
                <polygon fill="rgb(153,66,250)" points="300 200 320 200 320 180"></polygon>
                <polygon fill="rgb(147,64,250)" points="300 200 300 180 320 180"></polygon>
                <polygon fill="rgb(167,66,228)" points="320 180 340 180 340 200"></polygon>
                <polygon fill="rgb(175,65,217)" points="320 180 320 200 340 200"></polygon>
                <polygon fill="rgb(232,53,80)" points="340 200 360 200 360 180"></polygon>
                <polygon fill="rgb(191,60,148)" points="340 200 340 180 360 180"></polygon>
                <polygon fill="rgb(10,27,50)" points="360 180 380 180 380 200"></polygon>
                <polygon fill="rgb(92,34,56)" points="360 180 360 200 380 200"></polygon>
                <polygon fill="rgb(4,9,18)" points="380 200 400 200 400 180"></polygon>
                <polygon fill="rgb(6,15,29)" points="380 200 380 180 400 180"></polygon>
                <polygon fill="rgb(11,25,48)" points="0 220 20 220 20 200"></polygon>
                <polygon fill="rgb(7,14,27)" points="0 220 0 200 20 200"></polygon>
                <polygon fill="rgb(50,33,115)" points="20 200 40 200 40 220"></polygon>
                <polygon fill="rgb(32,29,84)" points="20 200 20 220 40 220"></polygon>
                <polygon fill="rgb(77,40,160)" points="40 220 60 220 60 200"></polygon>
                <polygon fill="rgb(77,42,158)" points="40 220 40 200 60 200"></polygon>
                <polygon fill="rgb(126,59,224)" points="60 200 80 200 80 220"></polygon>
                <polygon fill="rgb(122,57,220)" points="60 200 60 220 80 220"></polygon>
                <polygon fill="rgb(148,69,252)" points="80 220 100 220 100 200"></polygon>
                <polygon fill="rgb(149,71,252)" points="80 220 80 200 100 200"></polygon>
                <polygon fill="rgb(140,87,250)" points="100 200 120 200 120 220"></polygon>
                <polygon fill="rgb(135,104,247)" points="100 200 100 220 120 220"></polygon>
                <polygon fill="rgb(68,200,237)" points="120 220 140 220 140 200"></polygon>
                <polygon fill="rgb(120,91,240)" points="120 220 120 200 140 200"></polygon>
                <polygon fill="rgb(17,75,94)" points="140 200 160 200 160 220"></polygon>
                <polygon fill="rgb(35,178,204)" points="140 200 140 220 160 220"></polygon>
                <polygon fill="rgb(249,158,19)" points="160 220 180 220 180 200"></polygon>
                <polygon fill="rgb(223,95,60)" points="160 220 160 200 180 200"></polygon>
                <polygon fill="rgb(89,123,189)" points="180 200 200 200 200 220"></polygon>
                <polygon fill="rgb(207,157,66)" points="180 200 180 220 200 220"></polygon>
                <polygon fill="rgb(162,167,93)" points="200 220 220 220 220 200"></polygon>
                <polygon fill="rgb(46,148,207)" points="200 220 200 200 220 200"></polygon>
                <polygon fill="rgb(252,180,6)" points="220 200 240 200 240 220"></polygon>
                <polygon fill="rgb(253,181,3)" points="220 200 220 220 240 220"></polygon>
                <polygon fill="rgb(183,27,74)" points="240 220 260 220 260 200"></polygon>
                <polygon fill="rgb(93,49,51)" points="240 220 240 200 260 200"></polygon>
                <polygon fill="rgb(127,45,137)" points="260 200 280 200 280 220"></polygon>
                <polygon fill="rgb(210,42,92)" points="260 200 260 220 280 220"></polygon>
                <polygon fill="rgb(225,53,114)" points="280 220 300 220 300 200"></polygon>
                <polygon fill="rgb(147,51,171)" points="280 220 280 200 300 200"></polygon>
                <polygon fill="rgb(211,58,147)" points="300 200 320 200 320 220"></polygon>
                <polygon fill="rgb(237,53,101)" points="300 200 300 220 320 220"></polygon>
                <polygon fill="rgb(252,56,85)" points="320 220 340 220 340 200"></polygon>
                <polygon fill="rgb(247,56,92)" points="320 220 320 200 340 200"></polygon>
                <polygon fill="rgb(253,58,85)" points="340 200 360 200 360 220"></polygon>
                <polygon fill="rgb(253,58,86)" points="340 200 340 220 360 220"></polygon>
                <polygon fill="rgb(150,37,66)" points="360 220 380 220 380 200"></polygon>
                <polygon fill="rgb(210,53,77)" points="360 220 360 200 380 200"></polygon>
                <polygon fill="rgb(10,22,41)" points="380 200 400 200 400 220"></polygon>
                <polygon fill="rgb(10,27,49)" points="380 200 380 220 400 220"></polygon>
                <polygon fill="rgb(11,25,48)" points="0 220 20 220 20 240"></polygon>
                <polygon fill="rgb(9,20,38)" points="0 220 0 240 20 240"></polygon>
                <polygon fill="rgb(77,42,153)" points="20 240 40 240 40 220"></polygon>
                <polygon fill="rgb(48,33,109)" points="20 240 20 220 40 220"></polygon>
                <polygon fill="rgb(101,51,193)" points="40 220 60 220 60 240"></polygon>
                <polygon fill="rgb(86,44,173)" points="40 220 40 240 60 240"></polygon>
                <polygon fill="rgb(127,62,231)" points="60 240 80 240 80 220"></polygon>
                <polygon fill="rgb(136,65,239)" points="60 240 60 220 80 220"></polygon>
                <polygon fill="rgb(114,134,242)" points="80 220 100 220 100 240"></polygon>
                <polygon fill="rgb(103,137,234)" points="80 220 80 240 100 240"></polygon>
                <polygon fill="rgb(80,254,254)" points="100 240 120 240 120 220"></polygon>
                <polygon fill="rgb(88,240,249)" points="100 240 100 220 120 220"></polygon>
                <polygon fill="rgb(65,248,250)" points="120 220 140 220 140 240"></polygon>
                <polygon fill="rgb(73,253,254)" points="120 220 120 240 140 240"></polygon>
                <polygon fill="rgb(59,217,219)" points="140 240 160 240 160 220"></polygon>
                <polygon fill="rgb(47,227,233)" points="140 240 140 220 160 220"></polygon>
                <polygon fill="rgb(252,183,4)" points="160 220 180 220 180 240"></polygon>
                <polygon fill="rgb(230,181,20)" points="160 220 160 240 180 240"></polygon>
                <polygon fill="rgb(89,160,172)" points="180 240 200 240 200 220"></polygon>
                <polygon fill="rgb(207,178,55)" points="180 240 180 220 200 220"></polygon>
                <polygon fill="rgb(162,164,92)" points="200 220 220 220 220 240"></polygon>
                <polygon fill="rgb(49,148,206)" points="200 220 200 240 220 240"></polygon>
                <polygon fill="rgb(254,179,7)" points="220 240 240 240 240 220"></polygon>
                <polygon fill="rgb(253,180,4)" points="220 240 220 220 240 220"></polygon>
                <polygon fill="rgb(237,32,69)" points="240 220 260 220 260 240"></polygon>
                <polygon fill="rgb(231,53,61)" points="240 220 240 240 260 240"></polygon>
                <polygon fill="rgb(251,48,82)" points="260 240 280 240 280 220"></polygon>
                <polygon fill="rgb(252,43,78)" points="260 240 260 220 280 220"></polygon>
                <polygon fill="rgb(253,50,85)" points="280 220 300 220 300 240"></polygon>
                <polygon fill="rgb(252,51,85)" points="280 220 280 240 300 240"></polygon>
                <polygon fill="rgb(251,52,85)" points="300 240 320 240 320 220"></polygon>
                <polygon fill="rgb(252,52,85)" points="300 240 300 220 320 220"></polygon>
                <polygon fill="rgb(250,52,85)" points="320 220 340 220 340 240"></polygon>
                <polygon fill="rgb(243,43,80)" points="320 220 320 240 340 240"></polygon>
                <polygon fill="rgb(234,25,67)" points="340 240 360 240 360 220"></polygon>
                <polygon fill="rgb(248,50,83)" points="340 240 340 220 360 220"></polygon>
                <polygon fill="rgb(183,38,69)" points="360 220 380 220 380 240"></polygon>
                <polygon fill="rgb(233,34,70)" points="360 220 360 240 380 240"></polygon>
                <polygon fill="rgb(11,27,49)" points="380 240 400 240 400 220"></polygon>
                <polygon fill="rgb(11,27,49)" points="380 240 380 220 400 220"></polygon>
                <polygon fill="rgb(11,26,48)" points="0 260 20 260 20 240"></polygon>
                <polygon fill="rgb(9,21,39)" points="0 260 0 240 20 240"></polygon>
                <polygon fill="rgb(73,39,149)" points="20 240 40 240 40 260"></polygon>
                <polygon fill="rgb(54,33,118)" points="20 240 20 260 40 260"></polygon>
                <polygon fill="rgb(112,57,203)" points="40 260 60 260 60 240"></polygon>
                <polygon fill="rgb(88,44,176)" points="40 260 40 240 60 240"></polygon>
                <polygon fill="rgb(97,119,222)" points="60 240 80 240 80 260"></polygon>
                <polygon fill="rgb(100,98,212)" points="60 240 60 260 80 260"></polygon>
                <polygon fill="rgb(82,253,253)" points="80 260 100 260 100 240"></polygon>
                <polygon fill="rgb(83,247,250)" points="80 260 80 240 100 240"></polygon>
                <polygon fill="rgb(72,244,245)" points="100 240 120 240 120 260"></polygon>
                <polygon fill="rgb(72,241,243)" points="100 240 100 260 120 260"></polygon>
                <polygon fill="rgb(9,157,175)" points="120 260 140 260 140 240"></polygon>
                <polygon fill="rgb(54,222,228)" points="120 260 120 240 140 240"></polygon>
                <polygon fill="rgb(15,133,149)" points="140 240 160 240 160 260"></polygon>
                <polygon fill="rgb(6,142,164)" points="140 240 140 260 160 260"></polygon>
                <polygon fill="rgb(252,182,3)" points="160 260 180 260 180 240"></polygon>
                <polygon fill="rgb(230,174,13)" points="160 260 160 240 180 240"></polygon>
                <polygon fill="rgb(91,160,174)" points="180 240 200 240 200 260"></polygon>
                <polygon fill="rgb(205,178,57)" points="180 240 180 260 200 260"></polygon>
                <polygon fill="rgb(164,162,94)" points="200 260 220 260 220 240"></polygon>
                <polygon fill="rgb(53,148,205)" points="200 260 200 240 220 240"></polygon>
                <polygon fill="rgb(254,178,6)" points="220 240 240 240 240 260"></polygon>
                <polygon fill="rgb(252,178,5)" points="220 240 220 260 240 260"></polygon>
                <polygon fill="rgb(182,5,53)" points="240 260 260 260 260 240"></polygon>
                <polygon fill="rgb(194,39,47)" points="240 260 240 240 260 240"></polygon>
                <polygon fill="rgb(193,4,58)" points="260 240 280 240 280 260"></polygon>
                <polygon fill="rgb(190,1,57)" points="260 240 260 260 280 260"></polygon>
                <polygon fill="rgb(199,3,59)" points="280 260 300 260 300 240"></polygon>
                <polygon fill="rgb(196,5,60)" points="280 260 280 240 300 240"></polygon>
                <polygon fill="rgb(204,5,62)" points="300 240 320 240 320 260"></polygon>
                <polygon fill="rgb(204,4,61)" points="300 240 300 260 320 260"></polygon>
                <polygon fill="rgb(218,11,63)" points="320 260 340 260 340 240"></polygon>
                <polygon fill="rgb(213,8,63)" points="320 260 320 240 340 240"></polygon>
                <polygon fill="rgb(227,26,68)" points="340 240 360 240 360 260"></polygon>
                <polygon fill="rgb(222,22,67)" points="340 240 340 260 360 260"></polygon>
                <polygon fill="rgb(14,25,48)" points="360 260 380 260 380 240"></polygon>
                <polygon fill="rgb(191,37,68)" points="360 260 360 240 380 240"></polygon>
                <polygon fill="rgb(6,17,31)" points="380 240 400 240 400 260"></polygon>
                <polygon fill="rgb(7,23,42)" points="380 240 380 260 400 260"></polygon>
                <polygon fill="rgb(10,26,49)" points="0 260 20 260 20 280"></polygon>
                <polygon fill="rgb(8,21,40)" points="0 260 0 280 20 280"></polygon>
                <polygon fill="rgb(65,33,135)" points="20 280 40 280 40 260"></polygon>
                <polygon fill="rgb(53,32,115)" points="20 280 20 260 40 260"></polygon>
                <polygon fill="rgb(95,49,183)" points="40 260 60 260 60 280"></polygon>
                <polygon fill="rgb(73,39,153)" points="40 260 40 280 60 280"></polygon>
                <polygon fill="rgb(82,252,254)" points="60 280 80 280 80 260"></polygon>
                <polygon fill="rgb(81,176,221)" points="60 280 60 260 80 260"></polygon>
                <polygon fill="rgb(70,241,243)" points="80 260 100 260 100 280"></polygon>
                <polygon fill="rgb(74,244,246)" points="80 260 80 280 100 280"></polygon>
                <polygon fill="rgb(20,178,189)" points="100 280 120 280 120 260"></polygon>
                <polygon fill="rgb(28,190,198)" points="100 280 100 260 120 260"></polygon>
                <polygon fill="rgb(14,166,179)" points="120 260 140 260 140 280"></polygon>
                <polygon fill="rgb(21,174,184)" points="120 260 120 280 140 280"></polygon>
                <polygon fill="rgb(18,74,89)" points="140 280 160 280 160 260"></polygon>
                <polygon fill="rgb(13,152,169)" points="140 280 140 260 160 260"></polygon>
                <polygon fill="rgb(252,180,3)" points="160 260 180 260 180 280"></polygon>
                <polygon fill="rgb(233,167,12)" points="160 260 160 280 180 280"></polygon>
                <polygon fill="rgb(92,160,172)" points="180 280 200 280 200 260"></polygon>
                <polygon fill="rgb(205,177,57)" points="180 280 180 260 200 260"></polygon>
                <polygon fill="rgb(164,158,95)" points="200 260 220 260 220 280"></polygon>
                <polygon fill="rgb(56,149,206)" points="200 260 200 280 220 280"></polygon>
                <polygon fill="rgb(251,175,7)" points="220 280 240 280 240 260"></polygon>
                <polygon fill="rgb(252,174,4)" points="220 280 220 260 240 260"></polygon>
                <polygon fill="rgb(82,21,52)" points="240 260 260 260 260 280"></polygon>
                <polygon fill="rgb(63,57,45)" points="240 260 240 280 260 280"></polygon>
                <polygon fill="rgb(23,24,47)" points="260 280 280 280 280 260"></polygon>
                <polygon fill="rgb(89,18,55)" points="260 280 260 260 280 260"></polygon>
                <polygon fill="rgb(86,18,55)" points="280 260 300 260 300 280"></polygon>
                <polygon fill="rgb(18,24,45)" points="280 260 280 280 300 280"></polygon>
                <polygon fill="rgb(20,25,47)" points="300 280 320 280 320 260"></polygon>
                <polygon fill="rgb(92,19,55)" points="300 280 300 260 320 260"></polygon>
                <polygon fill="rgb(88,22,56)" points="320 260 340 260 340 280"></polygon>
                <polygon fill="rgb(17,25,47)" points="320 260 320 280 340 280"></polygon>
                <polygon fill="rgb(7,26,46)" points="340 280 360 280 360 260"></polygon>
                <polygon fill="rgb(51,26,53)" points="340 280 340 260 360 260"></polygon>
                <polygon fill="rgb(7,23,41)" points="360 260 380 260 380 280"></polygon>
                <polygon fill="rgb(5,23,38)" points="360 260 360 280 380 280"></polygon>
                <polygon fill="rgb(3,8,14)" points="380 280 380 260 400 260"></polygon>
                <polygon fill="rgb(10,26,50)" points="0 300 20 300 20 280"></polygon>
                <polygon fill="rgb(8,21,41)" points="0 300 0 280 20 280"></polygon>
                <polygon fill="rgb(60,30,124)" points="20 280 40 280 40 300"></polygon>
                <polygon fill="rgb(45,27,101)" points="20 280 20 300 40 300"></polygon>
                <polygon fill="rgb(61,100,168)" points="40 300 60 300 60 280"></polygon>
                <polygon fill="rgb(58,34,132)" points="40 300 40 280 60 280"></polygon>
                <polygon fill="rgb(79,252,253)" points="60 280 80 280 80 300"></polygon>
                <polygon fill="rgb(80,253,253)" points="60 280 60 300 80 300"></polygon>
                <polygon fill="rgb(26,185,193)" points="80 300 100 300 100 280"></polygon>
                <polygon fill="rgb(47,214,219)" points="80 300 80 280 100 280"></polygon>
                <polygon fill="rgb(33,181,186)" points="100 280 120 280 120 300"></polygon>
                <polygon fill="rgb(31,183,189)" points="100 280 100 300 120 300"></polygon>
                <polygon fill="rgb(157,62,23)" points="120 300 140 300 140 280"></polygon>
                <polygon fill="rgb(92,147,131)" points="120 300 120 280 140 280"></polygon>
                <polygon fill="rgb(13,27,44)" points="140 280 160 280 160 300"></polygon>
                <polygon fill="rgb(8,28,52)" points="140 280 140 300 160 300"></polygon>
                <polygon fill="rgb(252,182,4)" points="160 300 180 300 180 280"></polygon>
                <polygon fill="rgb(231,164,10)" points="160 300 160 280 180 280"></polygon>
                <polygon fill="rgb(93,163,173)" points="180 280 200 280 200 300"></polygon>
                <polygon fill="rgb(206,181,58)" points="180 280 180 300 200 300"></polygon>
                <polygon fill="rgb(162,156,99)" points="200 300 220 300 220 280"></polygon>
                <polygon fill="rgb(57,152,209)" points="200 300 200 280 220 280"></polygon>
                <polygon fill="rgb(250,174,7)" points="220 280 240 280 240 300"></polygon>
                <polygon fill="rgb(251,167,4)" points="220 280 220 300 240 300"></polygon>
                <polygon fill="rgb(17,28,46)" points="240 300 260 300 260 280"></polygon>
                <polygon fill="rgb(60,57,45)" points="240 300 240 280 260 280"></polygon>
                <polygon fill="rgb(5,15,25)" points="260 280 280 280 280 300"></polygon>
                <polygon fill="rgb(5,11,20)" points="260 280 260 300 280 300"></polygon>
                <polygon fill="rgb(1,3,6)" points="280 300 300 300 300 280"></polygon>
                <polygon fill="rgb(6,16,26)" points="280 300 280 280 300 280"></polygon>
                <polygon fill="rgb(4,15,26)" points="300 280 320 280 320 300"></polygon>
                <polygon fill="rgb(1,3,5)" points="300 280 300 300 320 300"></polygon>
                <polygon fill="rgb(1,3,6)" points="320 300 340 300 340 280"></polygon>
                <polygon fill="rgb(5,15,28)" points="320 300 320 280 340 280"></polygon>
                <polygon fill="rgb(3,10,19)" points="340 280 360 280 360 300"></polygon>
                <polygon fill="rgb(1,3,5)" points="340 280 340 300 360 300"></polygon>
                <polygon fill="rgb(0,0,1)" points="360 300 360 280 380 280"></polygon>
                <polygon fill="rgb(10,26,50)" points="0 300 20 300 20 320"></polygon>
                <polygon fill="rgb(10,23,44)" points="0 300 0 320 20 320"></polygon>
                <polygon fill="rgb(48,26,105)" points="20 320 40 320 40 300"></polygon>
                <polygon fill="rgb(43,27,97)" points="20 320 20 300 40 300"></polygon>
                <polygon fill="rgb(59,141,180)" points="40 300 60 300 60 320"></polygon>
                <polygon fill="rgb(39,45,107)" points="40 300 40 320 60 320"></polygon>
                <polygon fill="rgb(51,215,219)" points="60 320 80 320 80 300"></polygon>
                <polygon fill="rgb(78,252,253)" points="60 320 60 300 80 300"></polygon>
                <polygon fill="rgb(27,183,189)" points="80 300 100 300 100 320"></polygon>
                <polygon fill="rgb(28,185,190)" points="80 300 80 320 100 320"></polygon>
                <polygon fill="rgb(211,131,32)" points="100 320 120 320 120 300"></polygon>
                <polygon fill="rgb(52,178,170)" points="100 320 100 300 120 300"></polygon>
                <polygon fill="rgb(162,66,22)" points="120 300 140 300 140 320"></polygon>
                <polygon fill="rgb(225,91,10)" points="120 300 120 320 140 320"></polygon>
                <polygon fill="rgb(12,26,43)" points="140 320 160 320 160 300"></polygon>
                <polygon fill="rgb(9,28,50)" points="140 320 140 300 160 300"></polygon>
                <polygon fill="rgb(235,182,29)" points="160 300 180 300 180 320"></polygon>
                <polygon fill="rgb(219,163,26)" points="160 300 160 320 180 320"></polygon>
                <polygon fill="rgb(50,180,247)" points="180 320 200 320 200 300"></polygon>
                <polygon fill="rgb(160,182,117)" points="180 320 180 300 200 300"></polygon>
                <polygon fill="rgb(113,162,163)" points="200 300 220 300 220 320"></polygon>
                <polygon fill="rgb(52,184,249)" points="200 300 200 320 220 320"></polygon>
                <polygon fill="rgb(225,167,37)" points="220 320 240 320 240 300"></polygon>
                <polygon fill="rgb(227,162,37)" points="220 320 220 300 240 300"></polygon>
                <polygon fill="rgb(19,29,47)" points="240 300 260 300 260 320"></polygon>
                <polygon fill="rgb(60,57,46)" points="240 300 240 320 260 320"></polygon>
                <polygon fill="rgb(0,1,2)" points="260 320 280 320 280 300"></polygon>
                <polygon fill="rgb(5,10,17)" points="260 320 260 300 280 300"></polygon>
                <polygon fill="rgb(9,26,48)" points="0 340 20 340 20 320"></polygon>
                <polygon fill="rgb(10,23,43)" points="0 340 0 320 20 320"></polygon>
                <polygon fill="rgb(40,26,93)" points="20 320 40 320 40 340"></polygon>
                <polygon fill="rgb(31,26,78)" points="20 320 20 340 40 340"></polygon>
                <polygon fill="rgb(47,162,199)" points="40 340 60 340 60 320"></polygon>
                <polygon fill="rgb(27,51,109)" points="40 340 40 320 60 320"></polygon>
                <polygon fill="rgb(40,203,207)" points="60 320 80 320 80 340"></polygon>
                <polygon fill="rgb(66,232,235)" points="60 320 60 340 80 340"></polygon>
                <polygon fill="rgb(67,180,152)" points="80 340 100 340 100 320"></polygon>
                <polygon fill="rgb(28,184,188)" points="80 340 80 320 100 320"></polygon>
                <polygon fill="rgb(234,129,14)" points="100 320 120 320 120 340"></polygon>
                <polygon fill="rgb(235,158,17)" points="100 320 100 340 120 340"></polygon>
                <polygon fill="rgb(176,84,21)" points="120 340 140 340 140 320"></polygon>
                <polygon fill="rgb(230,103,9)" points="120 340 120 320 140 320"></polygon>
                <polygon fill="rgb(12,27,43)" points="140 320 160 320 160 340"></polygon>
                <polygon fill="rgb(9,27,51)" points="140 320 140 340 160 340"></polygon>
                <polygon fill="rgb(141,108,56)" points="160 340 180 340 180 320"></polygon>
                <polygon fill="rgb(208,154,36)" points="160 340 160 320 180 320"></polygon>
                <polygon fill="rgb(39,115,160)" points="180 320 200 320 200 340"></polygon>
                <polygon fill="rgb(15,43,72)" points="180 320 180 340 200 340"></polygon>
                <polygon fill="rgb(17,47,78)" points="200 340 220 340 220 320"></polygon>
                <polygon fill="rgb(42,122,167)" points="200 340 200 320 220 320"></polygon>
                <polygon fill="rgb(208,160,55)" points="220 320 240 320 240 340"></polygon>
                <polygon fill="rgb(99,81,53)" points="220 320 220 340 240 340"></polygon>
                <polygon fill="rgb(15,28,48)" points="240 340 260 340 260 320"></polygon>
                <polygon fill="rgb(59,57,45)" points="240 340 240 320 260 320"></polygon>
                <polygon fill="rgb(0,1,2)" points="260 320 280 320 280 340"></polygon>
                <polygon fill="rgb(5,11,18)" points="260 320 260 340 280 340"></polygon>
                <polygon fill="rgb(9,25,47)" points="0 340 20 340 20 360"></polygon>
                <polygon fill="rgb(8,21,39)" points="0 340 0 360 20 360"></polygon>
                <polygon fill="rgb(17,39,101)" points="20 360 40 360 40 340"></polygon>
                <polygon fill="rgb(24,25,72)" points="20 360 20 340 40 340"></polygon>
                <polygon fill="rgb(33,133,185)" points="40 340 60 340 60 360"></polygon>
                <polygon fill="rgb(5,72,155)" points="40 340 40 360 60 360"></polygon>
                <polygon fill="rgb(37,198,203)" points="60 360 80 360 80 340"></polygon>
                <polygon fill="rgb(68,229,232)" points="60 360 60 340 80 340"></polygon>
                <polygon fill="rgb(161,180,77)" points="80 340 100 340 100 360"></polygon>
                <polygon fill="rgb(85,184,140)" points="80 340 80 360 100 360"></polygon>
                <polygon fill="rgb(249,148,5)" points="100 360 120 360 120 340"></polygon>
                <polygon fill="rgb(251,159,6)" points="100 360 100 340 120 340"></polygon>
                <polygon fill="rgb(219,104,17)" points="120 340 140 340 140 360"></polygon>
                <polygon fill="rgb(241,124,8)" points="120 340 120 360 140 360"></polygon>
                <polygon fill="rgb(19,27,48)" points="140 360 160 360 160 340"></polygon>
                <polygon fill="rgb(27,31,47)" points="140 360 140 340 160 340"></polygon>
                <polygon fill="rgb(229,116,15)" points="160 340 180 340 180 360"></polygon>
                <polygon fill="rgb(105,63,32)" points="160 340 160 360 180 360"></polygon>
                <polygon fill="rgb(120,49,31)" points="180 360 200 360 200 340"></polygon>
                <polygon fill="rgb(74,43,37)" points="180 360 180 340 200 340"></polygon>
                <polygon fill="rgb(56,34,39)" points="200 340 220 340 220 360"></polygon>
                <polygon fill="rgb(111,45,29)" points="200 340 200 360 220 360"></polygon>
                <polygon fill="rgb(174,93,31)" points="220 360 240 360 240 340"></polygon>
                <polygon fill="rgb(205,95,16)" points="220 360 220 340 240 340"></polygon>
                <polygon fill="rgb(13,28,47)" points="240 340 260 340 260 360"></polygon>
                <polygon fill="rgb(14,28,44)" points="240 340 240 360 260 360"></polygon>
                <polygon fill="rgb(10,27,46)" points="260 360 280 360 280 340"></polygon>
                <polygon fill="rgb(10,21,37)" points="260 360 260 340 280 340"></polygon>
                <polygon fill="rgb(6,17,30)" points="280 340 300 340 300 360"></polygon>
                <polygon fill="rgb(9,26,45)" points="280 340 280 360 300 360"></polygon>
                <polygon fill="rgb(9,25,44)" points="300 360 320 360 320 340"></polygon>
                <polygon fill="rgb(6,17,29)" points="300 360 300 340 320 340"></polygon>
                <polygon fill="rgb(6,16,29)" points="320 340 340 340 340 360"></polygon>
                <polygon fill="rgb(8,25,44)" points="320 340 320 360 340 360"></polygon>
                <polygon fill="rgb(8,22,41)" points="340 360 360 360 360 340"></polygon>
                <polygon fill="rgb(4,13,23)" points="340 360 340 340 360 340"></polygon>
                <polygon fill="rgb(7,19,35)" points="360 340 360 360 380 360"></polygon>
                <polygon fill="rgb(10,26,49)" points="0 380 20 380 20 360"></polygon>
                <polygon fill="rgb(8,21,39)" points="0 380 0 360 20 360"></polygon>
                <polygon fill="rgb(9,57,131)" points="20 360 40 360 40 380"></polygon>
                <polygon fill="rgb(11,44,100)" points="20 360 20 380 40 380"></polygon>
                <polygon fill="rgb(5,83,170)" points="40 380 60 380 60 360"></polygon>
                <polygon fill="rgb(2,71,157)" points="40 380 40 360 60 360"></polygon>
                <polygon fill="rgb(38,201,208)" points="60 360 80 360 80 380"></polygon>
                <polygon fill="rgb(51,183,211)" points="60 360 60 380 80 380"></polygon>
                <polygon fill="rgb(226,183,25)" points="80 380 100 380 100 360"></polygon>
                <polygon fill="rgb(109,185,122)" points="80 380 80 360 100 360"></polygon>
                <polygon fill="rgb(251,160,4)" points="100 360 120 360 120 380"></polygon>
                <polygon fill="rgb(252,174,3)" points="100 360 100 380 120 380"></polygon>
                <polygon fill="rgb(242,118,16)" points="120 380 140 380 140 360"></polygon>
                <polygon fill="rgb(246,135,7)" points="120 380 120 360 140 360"></polygon>
                <polygon fill="rgb(50,21,48)" points="140 360 160 360 160 380"></polygon>
                <polygon fill="rgb(180,6,52)" points="140 360 140 380 160 380"></polygon>
                <polygon fill="rgb(26,30,48)" points="160 380 180 380 180 360"></polygon>
                <polygon fill="rgb(25,31,46)" points="160 380 160 360 180 360"></polygon>
                <polygon fill="rgb(178,65,28)" points="180 360 200 360 200 380"></polygon>
                <polygon fill="rgb(40,33,45)" points="180 360 180 380 200 380"></polygon>
                <polygon fill="rgb(57,39,45)" points="200 380 220 380 220 360"></polygon>
                <polygon fill="rgb(189,66,24)" points="200 380 200 360 220 360"></polygon>
                <polygon fill="rgb(40,37,45)" points="220 360 240 360 240 380"></polygon>
                <polygon fill="rgb(25,34,47)" points="220 360 220 380 240 380"></polygon>
                <polygon fill="rgb(14,118,137)" points="240 380 260 380 260 360"></polygon>
                <polygon fill="rgb(8,28,48)" points="240 380 240 360 260 360"></polygon>
                <polygon fill="rgb(28,106,123)" points="260 360 280 360 280 380"></polygon>
                <polygon fill="rgb(32,174,187)" points="260 360 260 380 280 380"></polygon>
                <polygon fill="rgb(66,214,219)" points="280 380 300 380 300 360"></polygon>
                <polygon fill="rgb(32,109,123)" points="280 380 280 360 300 360"></polygon>
                <polygon fill="rgb(43,121,132)" points="300 360 320 360 320 380"></polygon>
                <polygon fill="rgb(76,225,228)" points="300 360 300 380 320 380"></polygon>
                <polygon fill="rgb(78,221,223)" points="320 380 340 380 340 360"></polygon>
                <polygon fill="rgb(40,115,127)" points="320 380 320 360 340 360"></polygon>
                <polygon fill="rgb(28,79,94)" points="340 360 360 360 360 380"></polygon>
                <polygon fill="rgb(77,223,225)" points="340 360 340 380 360 380"></polygon>
                <polygon fill="rgb(17,45,65)" points="360 380 380 380 380 360"></polygon>
                <polygon fill="rgb(15,39,60)" points="360 380 360 360 380 360"></polygon>
                <polygon fill="rgb(9,23,44)" points="380 360 380 380 400 380"></polygon>
                <polygon fill="rgb(11,26,50)" points="0 380 20 380 20 400"></polygon>
                <polygon fill="rgb(9,22,41)" points="0 380 0 400 20 400"></polygon>
                <polygon fill="rgb(5,71,155)" points="20 400 40 400 40 380"></polygon>
                <polygon fill="rgb(6,55,120)" points="20 400 20 380 40 380"></polygon>
                <polygon fill="rgb(8,87,180)" points="40 380 60 380 60 400"></polygon>
                <polygon fill="rgb(5,79,166)" points="40 380 40 400 60 400"></polygon>
                <polygon fill="rgb(14,128,186)" points="60 400 80 400 80 380"></polygon>
                <polygon fill="rgb(18,119,187)" points="60 400 60 380 80 380"></polygon>
                <polygon fill="rgb(230,183,21)" points="80 380 100 380 100 400"></polygon>
                <polygon fill="rgb(142,183,95)" points="80 380 80 400 100 400"></polygon>
                <polygon fill="rgb(252,176,2)" points="100 400 120 400 120 380"></polygon>
                <polygon fill="rgb(254,176,3)" points="100 400 100 380 120 380"></polygon>
                <polygon fill="rgb(244,126,20)" points="120 380 140 380 140 400"></polygon>
                <polygon fill="rgb(252,163,6)" points="120 380 120 400 140 400"></polygon>
                <polygon fill="rgb(196,6,59)" points="140 400 160 400 160 380"></polygon>
                <polygon fill="rgb(196,7,58)" points="140 400 140 380 160 380"></polygon>
                <polygon fill="rgb(91,14,51)" points="160 380 180 380 180 400"></polygon>
                <polygon fill="rgb(178,2,54)" points="160 380 160 400 180 400"></polygon>
                <polygon fill="rgb(62,37,71)" points="180 400 200 400 200 380"></polygon>
                <polygon fill="rgb(42,22,50)" points="180 400 180 380 200 380"></polygon>
                <polygon fill="rgb(9,45,66)" points="200 380 220 380 220 400"></polygon>
                <polygon fill="rgb(6,81,104)" points="200 380 200 400 220 400"></polygon>
                <polygon fill="rgb(6,133,154)" points="220 400 240 400 240 380"></polygon>
                <polygon fill="rgb(7,58,81)" points="220 400 220 380 240 380"></polygon>
                <polygon fill="rgb(19,167,180)" points="240 380 260 380 260 400"></polygon>
                <polygon fill="rgb(13,159,173)" points="240 380 240 400 260 400"></polygon>
                <polygon fill="rgb(49,222,228)" points="260 400 280 400 280 380"></polygon>
                <polygon fill="rgb(40,203,213)" points="260 400 260 380 280 380"></polygon>
                <polygon fill="rgb(72,249,250)" points="280 380 300 380 300 400"></polygon>
                <polygon fill="rgb(64,243,246)" points="280 380 280 400 300 400"></polygon>
                <polygon fill="rgb(84,254,253)" points="300 400 320 400 320 380"></polygon>
                <polygon fill="rgb(82,254,254)" points="300 400 300 380 320 380"></polygon>
                <polygon fill="rgb(88,254,254)" points="320 380 340 380 340 400"></polygon>
                <polygon fill="rgb(88,255,254)" points="320 380 320 400 340 400"></polygon>
                <polygon fill="rgb(85,253,253)" points="340 400 360 400 360 380"></polygon>
                <polygon fill="rgb(88,254,253)" points="340 400 340 380 360 380"></polygon>
                <polygon fill="rgb(47,129,141)" points="360 380 380 380 380 400"></polygon>
                <polygon fill="rgb(74,244,245)" points="360 380 360 400 380 400"></polygon>
                <polygon fill="rgb(10,25,44)" points="380 400 400 400 400 380"></polygon>
                <polygon fill="rgb(10,26,46)" points="380 400 380 380 400 380"></polygon>
                <polygon fill="rgb(10,26,52)" points="0 420 20 420 20 400"></polygon>
                <polygon fill="rgb(9,22,41)" points="0 420 0 400 20 400"></polygon>
                <polygon fill="rgb(6,73,160)" points="20 400 40 400 40 420"></polygon>
                <polygon fill="rgb(8,68,148)" points="20 400 20 420 40 420"></polygon>
                <polygon fill="rgb(11,102,199)" points="40 420 60 420 60 400"></polygon>
                <polygon fill="rgb(6,80,172)" points="40 420 40 400 60 400"></polygon>
                <polygon fill="rgb(9,90,182)" points="60 400 80 400 80 420"></polygon>
                <polygon fill="rgb(11,104,200)" points="60 400 60 420 80 420"></polygon>
                <polygon fill="rgb(223,170,28)" points="80 420 100 420 100 400"></polygon>
                <polygon fill="rgb(128,142,92)" points="80 420 80 400 100 400"></polygon>
                <polygon fill="rgb(254,182,3)" points="100 400 120 400 120 420"></polygon>
                <polygon fill="rgb(254,181,3)" points="100 400 100 420 120 420"></polygon>
                <polygon fill="rgb(251,161,15)" points="120 420 140 420 140 400"></polygon>
                <polygon fill="rgb(252,173,4)" points="120 420 120 400 140 400"></polygon>
                <polygon fill="rgb(213,13,65)" points="140 400 160 400 160 420"></polygon>
                <polygon fill="rgb(228,29,63)" points="140 400 140 420 160 420"></polygon>
                <polygon fill="rgb(197,7,61)" points="160 420 180 420 180 400"></polygon>
                <polygon fill="rgb(195,7,61)" points="160 420 160 400 180 400"></polygon>
                <polygon fill="rgb(78,72,110)" points="180 400 200 400 200 420"></polygon>
                <polygon fill="rgb(163,19,71)" points="180 400 180 420 200 420"></polygon>
                <polygon fill="rgb(5,145,163)" points="200 420 220 420 220 400"></polygon>
                <polygon fill="rgb(3,130,153)" points="200 420 200 400 220 400"></polygon>
                <polygon fill="rgb(7,153,169)" points="220 400 240 400 240 420"></polygon>
                <polygon fill="rgb(8,159,172)" points="220 400 220 420 240 420"></polygon>
                <polygon fill="rgb(15,178,188)" points="240 420 260 420 260 400"></polygon>
                <polygon fill="rgb(10,167,179)" points="240 420 240 400 260 400"></polygon>
                <polygon fill="rgb(24,192,202)" points="260 400 280 400 280 420"></polygon>
                <polygon fill="rgb(17,182,192)" points="260 400 260 420 280 420"></polygon>
                <polygon fill="rgb(21,190,202)" points="280 420 300 420 300 400"></polygon>
                <polygon fill="rgb(36,208,217)" points="280 420 280 400 300 400"></polygon>
                <polygon fill="rgb(48,218,224)" points="300 400 320 400 320 420"></polygon>
                <polygon fill="rgb(23,191,204)" points="300 400 300 420 320 420"></polygon>
                <polygon fill="rgb(32,202,214)" points="320 420 340 420 340 400"></polygon>
                <polygon fill="rgb(49,219,228)" points="320 420 320 400 340 400"></polygon>
                <polygon fill="rgb(53,226,233)" points="340 400 360 400 360 420"></polygon>
                <polygon fill="rgb(41,213,222)" points="340 400 340 420 360 420"></polygon>
                <polygon fill="rgb(57,186,193)" points="360 420 380 420 380 400"></polygon>
                <polygon fill="rgb(59,232,237)" points="360 420 360 400 380 400"></polygon>
                <polygon fill="rgb(12,27,47)" points="380 400 400 400 400 420"></polygon>
                <polygon fill="rgb(12,28,49)" points="380 400 380 420 400 420"></polygon>
                <polygon fill="rgb(8,25,52)" points="0 420 20 420 20 440"></polygon>
                <polygon fill="rgb(9,22,44)" points="0 420 0 440 20 440"></polygon>
                <polygon fill="rgb(7,75,164)" points="20 440 40 440 40 420"></polygon>
                <polygon fill="rgb(8,71,153)" points="20 440 20 420 40 420"></polygon>
                <polygon fill="rgb(14,111,209)" points="40 420 60 420 60 440"></polygon>
                <polygon fill="rgb(7,79,172)" points="40 420 40 440 60 440"></polygon>
                <polygon fill="rgb(14,119,217)" points="60 440 80 440 80 420"></polygon>
                <polygon fill="rgb(15,118,218)" points="60 440 60 420 80 420"></polygon>
                <polygon fill="rgb(213,166,37)" points="80 420 100 420 100 440"></polygon>
                <polygon fill="rgb(72,124,152)" points="80 420 80 440 100 440"></polygon>
                <polygon fill="rgb(253,181,4)" points="100 440 120 440 120 420"></polygon>
                <polygon fill="rgb(253,179,3)" points="100 440 100 420 120 420"></polygon>
                <polygon fill="rgb(252,181,4)" points="120 420 140 420 140 440"></polygon>
                <polygon fill="rgb(253,186,3)" points="120 420 120 440 140 440"></polygon>
                <polygon fill="rgb(244,48,70)" points="140 440 160 440 160 420"></polygon>
                <polygon fill="rgb(245,75,58)" points="140 440 140 420 160 420"></polygon>
                <polygon fill="rgb(218,16,66)" points="160 420 180 420 180 440"></polygon>
                <polygon fill="rgb(233,24,71)" points="160 420 160 440 180 440"></polygon>
                <polygon fill="rgb(103,93,125)" points="180 440 200 440 200 420"></polygon>
                <polygon fill="rgb(182,26,75)" points="180 440 180 420 200 420"></polygon>
                <polygon fill="rgb(11,167,179)" points="200 420 220 420 220 440"></polygon>
                <polygon fill="rgb(12,170,179)" points="200 420 200 440 220 440"></polygon>
                <polygon fill="rgb(19,184,193)" points="220 440 240 440 240 420"></polygon>
                <polygon fill="rgb(15,177,187)" points="220 440 220 420 240 420"></polygon>
                <polygon fill="rgb(20,185,194)" points="240 420 260 420 260 440"></polygon>
                <polygon fill="rgb(22,186,195)" points="240 420 240 440 260 440"></polygon>
                <polygon fill="rgb(23,188,198)" points="260 440 280 440 280 420"></polygon>
                <polygon fill="rgb(21,186,195)" points="260 440 260 420 280 420"></polygon>
                <polygon fill="rgb(21,186,200)" points="280 420 300 420 300 440"></polygon>
                <polygon fill="rgb(22,187,199)" points="280 420 280 440 300 440"></polygon>
                <polygon fill="rgb(24,188,201)" points="300 440 320 440 320 420"></polygon>
                <polygon fill="rgb(23,188,202)" points="300 440 300 420 320 420"></polygon>
                <polygon fill="rgb(31,198,209)" points="320 420 340 420 340 440"></polygon>
                <polygon fill="rgb(29,192,203)" points="320 420 320 440 340 440"></polygon>
                <polygon fill="rgb(45,200,210)" points="340 440 360 440 360 420"></polygon>
                <polygon fill="rgb(37,207,218)" points="340 440 340 420 360 420"></polygon>
                <polygon fill="rgb(33,102,118)" points="360 420 380 420 380 440"></polygon>
                <polygon fill="rgb(33,107,123)" points="360 420 360 440 380 440"></polygon>
                <polygon fill="rgb(6,15,28)" points="380 440 400 440 400 420"></polygon>
                <polygon fill="rgb(12,27,50)" points="380 440 380 420 400 420"></polygon>
                <polygon fill="rgb(138,30,63)" points="0 460 20 460 20 440"></polygon>
                <polygon fill="rgb(104,28,53)" points="0 460 0 440 20 440"></polygon>
                <polygon fill="rgb(7,77,166)" points="20 440 40 440 40 460"></polygon>
                <polygon fill="rgb(9,64,138)" points="20 440 20 460 40 460"></polygon>
                <polygon fill="rgb(11,93,187)" points="40 460 60 460 60 440"></polygon>
                <polygon fill="rgb(6,78,170)" points="40 460 40 440 60 440"></polygon>
                <polygon fill="rgb(18,130,229)" points="60 440 80 440 80 460"></polygon>
                <polygon fill="rgb(22,140,241)" points="60 440 60 460 80 460"></polygon>
                <polygon fill="rgb(109,143,138)" points="80 460 100 460 100 440"></polygon>
                <polygon fill="rgb(46,128,186)" points="80 460 80 440 100 440"></polygon>
                <polygon fill="rgb(253,179,4)" points="100 440 120 440 120 460"></polygon>
                <polygon fill="rgb(252,175,7)" points="100 440 100 460 120 460"></polygon>
                <polygon fill="rgb(254,184,2)" points="120 460 140 460 140 440"></polygon>
                <polygon fill="rgb(253,185,3)" points="120 460 120 440 140 440"></polygon>
                <polygon fill="rgb(249,76,64)" points="140 440 160 440 160 460"></polygon>
                <polygon fill="rgb(252,177,12)" points="140 440 140 460 160 460"></polygon>
                <polygon fill="rgb(251,34,76)" points="160 460 180 460 180 440"></polygon>
                <polygon fill="rgb(247,33,77)" points="160 460 160 440 180 440"></polygon>
                <polygon fill="rgb(110,33,69)" points="180 440 200 440 200 460"></polygon>
                <polygon fill="rgb(217,29,71)" points="180 440 180 460 200 460"></polygon>
                <polygon fill="rgb(10,29,52)" points="200 460 220 460 220 440"></polygon>
                <polygon fill="rgb(15,62,81)" points="200 460 200 440 220 440"></polygon>
                <polygon fill="rgb(17,62,82)" points="220 440 240 440 240 460"></polygon>
                <polygon fill="rgb(9,27,51)" points="220 440 220 460 240 460"></polygon>
                <polygon fill="rgb(9,29,52)" points="240 460 260 460 260 440"></polygon>
                <polygon fill="rgb(17,63,83)" points="240 460 240 440 260 440"></polygon>
                <polygon fill="rgb(18,61,82)" points="260 440 280 440 280 460"></polygon>
                <polygon fill="rgb(10,27,50)" points="260 440 260 460 280 460"></polygon>
                <polygon fill="rgb(10,28,49)" points="280 460 300 460 300 440"></polygon>
                <polygon fill="rgb(18,62,82)" points="280 460 280 440 300 440"></polygon>
                <polygon fill="rgb(18,61,81)" points="300 440 320 440 320 460"></polygon>
                <polygon fill="rgb(10,26,48)" points="300 440 300 460 320 460"></polygon>
                <polygon fill="rgb(12,30,51)" points="320 460 340 460 340 440"></polygon>
                <polygon fill="rgb(21,65,84)" points="320 460 320 440 340 440"></polygon>
                <polygon fill="rgb(16,44,67)" points="340 440 360 440 360 460"></polygon>
                <polygon fill="rgb(10,28,49)" points="340 440 340 460 360 460"></polygon>
                <polygon fill="rgb(8,19,36)" points="360 460 380 460 380 440"></polygon>
                <polygon fill="rgb(11,26,50)" points="360 460 360 440 380 440"></polygon>
                <polygon fill="rgb(1,3,6)" points="380 460 380 440 400 440"></polygon>
                <polygon fill="rgb(237,29,70)" points="0 460 20 460 20 480"></polygon>
                <polygon fill="rgb(225,27,67)" points="0 460 0 480 20 480"></polygon>
                <polygon fill="rgb(58,72,150)" points="20 480 40 480 40 460"></polygon>
                <polygon fill="rgb(101,52,119)" points="20 480 20 460 40 460"></polygon>
                <polygon fill="rgb(5,73,164)" points="40 460 60 460 60 480"></polygon>
                <polygon fill="rgb(7,75,165)" points="40 460 40 480 60 480"></polygon>
                <polygon fill="rgb(22,139,237)" points="60 480 80 480 80 460"></polygon>
                <polygon fill="rgb(21,131,229)" points="60 480 60 460 80 460"></polygon>
                <polygon fill="rgb(24,131,220)" points="80 460 100 460 100 480"></polygon>
                <polygon fill="rgb(19,141,240)" points="80 460 80 480 100 480"></polygon>
                <polygon fill="rgb(222,164,34)" points="100 480 120 480 120 460"></polygon>
                <polygon fill="rgb(201,163,54)" points="100 480 100 460 120 460"></polygon>
                <polygon fill="rgb(253,182,4)" points="120 460 140 460 140 480"></polygon>
                <polygon fill="rgb(251,175,4)" points="120 460 120 480 140 480"></polygon>
                <polygon fill="rgb(253,178,8)" points="140 480 160 480 160 460"></polygon>
                <polygon fill="rgb(252,183,7)" points="140 480 140 460 160 460"></polygon>
                <polygon fill="rgb(252,44,81)" points="160 460 180 460 180 480"></polygon>
                <polygon fill="rgb(247,97,51)" points="160 460 160 480 180 480"></polygon>
                <polygon fill="rgb(106,22,39)" points="180 480 200 480 200 460"></polygon>
                <polygon fill="rgb(224,37,74)" points="180 480 180 460 200 460"></polygon>
                <polygon fill="rgb(5,14,28)" points="200 460 220 460 220 480"></polygon>
                <polygon fill="rgb(0,2,4)" points="200 460 200 480 220 480"></polygon>
                <polygon fill="rgb(1,2,5)" points="220 480 240 480 240 460"></polygon>
                <polygon fill="rgb(5,13,27)" points="220 480 220 460 240 460"></polygon>
                <polygon fill="rgb(4,13,24)" points="240 460 260 460 260 480"></polygon>
                <polygon fill="rgb(0,2,4)" points="240 460 240 480 260 480"></polygon>
                <polygon fill="rgb(1,2,4)" points="260 480 280 480 280 460"></polygon>
                <polygon fill="rgb(4,13,24)" points="260 480 260 460 280 460"></polygon>
                <polygon fill="rgb(4,12,23)" points="280 460 300 460 300 480"></polygon>
                <polygon fill="rgb(0,1,3)" points="280 460 280 480 300 480"></polygon>
                <polygon fill="rgb(1,2,4)" points="300 480 320 480 320 460"></polygon>
                <polygon fill="rgb(5,13,24)" points="300 480 300 460 320 460"></polygon>
                <polygon fill="rgb(5,13,24)" points="320 460 340 460 340 480"></polygon>
                <polygon fill="rgb(0,2,3)" points="320 460 320 480 340 480"></polygon>
                <polygon fill="rgb(0,1,1)" points="340 480 360 480 360 460"></polygon>
                <polygon fill="rgb(4,11,20)" points="340 480 340 460 360 460"></polygon>
                <polygon fill="rgb(225,18,65)" points="0 500 20 500 20 480"></polygon>
                <polygon fill="rgb(221,23,65)" points="0 500 0 480 20 480"></polygon>
                <polygon fill="rgb(147,63,120)" points="20 480 40 480 40 500"></polygon>
                <polygon fill="rgb(232,33,74)" points="20 480 20 500 40 500"></polygon>
                <polygon fill="rgb(6,72,165)" points="40 500 60 500 60 480"></polygon>
                <polygon fill="rgb(8,75,166)" points="40 500 40 480 60 480"></polygon>
                <polygon fill="rgb(20,129,225)" points="60 480 80 480 80 500"></polygon>
                <polygon fill="rgb(3,70,164)" points="60 480 60 500 80 500"></polygon>
                <polygon fill="rgb(20,147,245)" points="80 500 100 500 100 480"></polygon>
                <polygon fill="rgb(21,148,245)" points="80 500 80 480 100 480"></polygon>
                <polygon fill="rgb(137,145,114)" points="100 480 120 480 120 500"></polygon>
                <polygon fill="rgb(16,141,240)" points="100 480 100 500 120 500"></polygon>
                <polygon fill="rgb(248,163,9)" points="120 500 140 500 140 480"></polygon>
                <polygon fill="rgb(248,165,9)" points="120 500 120 480 140 480"></polygon>
                <polygon fill="rgb(253,184,2)" points="140 480 160 480 160 500"></polygon>
                <polygon fill="rgb(252,172,3)" points="140 480 140 500 160 500"></polygon>
                <polygon fill="rgb(251,165,16)" points="160 500 180 500 180 480"></polygon>
                <polygon fill="rgb(252,168,13)" points="160 500 160 480 180 480"></polygon>
                <polygon fill="rgb(90,16,27)" points="180 480 200 480 200 500"></polygon>
                <polygon fill="rgb(210,76,45)" points="180 480 180 500 200 500"></polygon>
                <polygon fill="rgb(216,16,64)" points="0 500 20 500 20 520"></polygon>
                <polygon fill="rgb(205,16,61)" points="0 500 0 520 20 520"></polygon>
                <polygon fill="rgb(246,52,84)" points="20 520 40 520 40 500"></polygon>
                <polygon fill="rgb(228,32,72)" points="20 520 20 500 40 500"></polygon>
                <polygon fill="rgb(10,73,165)" points="40 500 60 500 60 520"></polygon>
                <polygon fill="rgb(159,66,118)" points="40 500 40 520 60 520"></polygon>
                <polygon fill="rgb(3,70,164)" points="60 520 80 520 80 500"></polygon>
                <polygon fill="rgb(4,70,163)" points="60 520 60 500 80 500"></polygon>
                <polygon fill="rgb(21,150,250)" points="80 500 100 500 100 520"></polygon>
                <polygon fill="rgb(15,110,206)" points="80 500 80 520 100 520"></polygon>
                <polygon fill="rgb(14,146,251)" points="100 520 120 520 120 500"></polygon>
                <polygon fill="rgb(17,146,249)" points="100 520 100 500 120 500"></polygon>
                <polygon fill="rgb(205,147,51)" points="120 500 140 500 140 520"></polygon>
                <polygon fill="rgb(17,142,238)" points="120 500 120 520 140 520"></polygon>
                <polygon fill="rgb(247,154,8)" points="140 520 160 520 160 500"></polygon>
                <polygon fill="rgb(248,159,6)" points="140 520 140 500 160 500"></polygon>
                <polygon fill="rgb(253,181,4)" points="160 500 180 500 180 520"></polygon>
                <polygon fill="rgb(251,162,3)" points="160 500 160 520 180 520"></polygon>
                <polygon fill="rgb(107,79,6)" points="180 520 200 520 200 500"></polygon>
                <polygon fill="rgb(221,161,8)" points="180 520 180 500 200 500"></polygon>
                <polygon fill="rgb(209,14,64)" points="0 540 20 540 20 520"></polygon>
                <polygon fill="rgb(207,16,62)" points="0 540 0 520 20 520"></polygon>
                <polygon fill="rgb(246,52,83)" points="20 520 40 520 40 540"></polygon>
                <polygon fill="rgb(222,30,71)" points="20 520 20 540 40 540"></polygon>
                <polygon fill="rgb(207,61,101)" points="40 540 60 540 60 520"></polygon>
                <polygon fill="rgb(226,60,95)" points="40 540 40 520 60 520"></polygon>
                <polygon fill="rgb(3,70,164)" points="60 520 80 520 80 540"></polygon>
                <polygon fill="rgb(28,70,161)" points="60 520 60 540 80 540"></polygon>
                <polygon fill="rgb(5,79,173)" points="80 540 100 540 100 520"></polygon>
                <polygon fill="rgb(5,76,172)" points="80 540 80 520 100 520"></polygon>
                <polygon fill="rgb(13,147,252)" points="100 520 120 520 120 540"></polygon>
                <polygon fill="rgb(14,127,229)" points="100 520 100 540 120 540"></polygon>
                <polygon fill="rgb(9,145,251)" points="120 540 140 540 140 520"></polygon>
                <polygon fill="rgb(11,145,252)" points="120 540 120 520 140 520"></polygon>
                <polygon fill="rgb(131,140,123)" points="140 520 160 520 160 540"></polygon>
                <polygon fill="rgb(7,145,250)" points="140 520 140 540 160 540"></polygon>
                <polygon fill="rgb(194,141,65)" points="160 540 180 540 180 520"></polygon>
                <polygon fill="rgb(222,147,33)" points="160 540 160 520 180 520"></polygon>
                <polygon fill="rgb(105,69,5)" points="180 520 200 520 200 540"></polygon>
                <polygon fill="rgb(220,129,8)" points="180 520 180 540 200 540"></polygon>
                <polygon fill="rgb(204,11,62)" points="0 540 20 540 20 560"></polygon>
                <polygon fill="rgb(197,13,60)" points="0 540 0 560 20 560"></polygon>
                <polygon fill="rgb(244,44,79)" points="20 560 40 560 40 540"></polygon>
                <polygon fill="rgb(219,27,70)" points="20 560 20 540 40 540"></polygon>
                <polygon fill="rgb(252,54,83)" points="40 540 60 540 60 560"></polygon>
                <polygon fill="rgb(253,50,82)" points="40 540 40 560 60 560"></polygon>
                <polygon fill="rgb(133,63,123)" points="60 560 80 560 80 540"></polygon>
                <polygon fill="rgb(167,60,116)" points="60 560 60 540 80 540"></polygon>
                <polygon fill="rgb(1,68,158)" points="80 540 100 540 100 560"></polygon>
                <polygon fill="rgb(3,69,159)" points="80 540 80 560 100 560"></polygon>
                <polygon fill="rgb(5,77,168)" points="100 560 120 560 120 540"></polygon>
                <polygon fill="rgb(6,76,170)" points="100 560 100 540 120 540"></polygon>
                <polygon fill="rgb(10,146,252)" points="120 540 140 540 140 560"></polygon>
                <polygon fill="rgb(11,111,208)" points="120 540 120 560 140 560"></polygon>
                <polygon fill="rgb(10,146,250)" points="140 560 160 560 160 540"></polygon>
                <polygon fill="rgb(8,146,251)" points="140 560 140 540 160 540"></polygon>
                <polygon fill="rgb(11,143,242)" points="160 540 180 540 180 560"></polygon>
                <polygon fill="rgb(9,146,249)" points="160 540 160 560 180 560"></polygon>
                <polygon fill="rgb(5,57,99)" points="180 560 200 560 200 540"></polygon>
                <polygon fill="rgb(54,119,165)" points="180 560 180 540 200 540"></polygon>
                <polygon fill="rgb(200,7,61)" points="0 580 20 580 20 560"></polygon>
                <polygon fill="rgb(198,10,59)" points="0 580 0 560 20 560"></polygon>
                <polygon fill="rgb(243,41,78)" points="20 560 40 560 40 580"></polygon>
                <polygon fill="rgb(212,19,70)" points="20 560 20 580 40 580"></polygon>
                <polygon fill="rgb(252,49,82)" points="40 580 60 580 60 560"></polygon>
                <polygon fill="rgb(253,48,81)" points="40 580 40 560 60 560"></polygon>
                <polygon fill="rgb(248,56,85)" points="60 560 80 560 80 580"></polygon>
                <polygon fill="rgb(252,57,83)" points="60 560 60 580 80 580"></polygon>
                <polygon fill="rgb(66,53,112)" points="80 580 100 580 100 560"></polygon>
                <polygon fill="rgb(90,58,124)" points="80 580 80 560 100 560"></polygon>
                <polygon fill="rgb(2,67,158)" points="100 560 120 560 120 580"></polygon>
                <polygon fill="rgb(2,70,160)" points="100 560 100 580 120 580"></polygon>
                <polygon fill="rgb(3,70,157)" points="120 580 140 580 140 560"></polygon>
                <polygon fill="rgb(4,71,159)" points="120 580 120 560 140 560"></polygon>
                <polygon fill="rgb(13,120,216)" points="140 560 160 560 160 580"></polygon>
                <polygon fill="rgb(4,70,155)" points="140 560 140 580 160 580"></polygon>
                <polygon fill="rgb(11,116,210)" points="160 580 180 580 180 560"></polygon>
                <polygon fill="rgb(14,136,237)" points="160 580 160 560 180 560"></polygon>
                <polygon fill="rgb(6,58,99)" points="180 560 200 560 200 580"></polygon>
                <polygon fill="rgb(14,115,203)" points="180 560 180 580 200 580"></polygon>
                <polygon fill="rgb(199,6,64)" points="0 580 20 580 20 600"></polygon>
                <polygon fill="rgb(175,7,55)" points="0 580 0 600 20 600"></polygon>
                <polygon fill="rgb(226,26,70)" points="20 600 40 600 40 580"></polygon>
                <polygon fill="rgb(205,13,66)" points="20 600 20 580 40 580"></polygon>
                <polygon fill="rgb(247,41,76)" points="40 580 60 580 60 600"></polygon>
                <polygon fill="rgb(248,37,75)" points="40 580 40 600 60 600"></polygon>
                <polygon fill="rgb(252,53,83)" points="60 600 80 600 80 580"></polygon>
                <polygon fill="rgb(251,52,82)" points="60 600 60 580 80 580"></polygon>
                <polygon fill="rgb(187,44,69)" points="80 580 100 580 100 600"></polygon>
                <polygon fill="rgb(251,56,79)" points="80 580 80 600 100 600"></polygon>
                <polygon fill="rgb(14,40,79)" points="100 600 120 600 120 580"></polygon>
                <polygon fill="rgb(16,43,89)" points="100 600 100 580 120 580"></polygon>
                <polygon fill="rgb(3,71,159)" points="120 580 140 580 140 600"></polygon>
                <polygon fill="rgb(7,62,131)" points="120 580 120 600 140 600"></polygon>
                <polygon fill="rgb(3,71,158)" points="140 600 160 600 160 580"></polygon>
                <polygon fill="rgb(2,70,154)" points="140 600 140 580 160 580"></polygon>
                <polygon fill="rgb(2,70,157)" points="160 580 180 580 180 600"></polygon>
                <polygon fill="rgb(2,70,159)" points="160 580 160 600 180 600"></polygon>
                <polygon fill="rgb(3,29,65)" points="180 600 200 600 200 580"></polygon>
                <polygon fill="rgb(3,62,141)" points="180 600 180 580 200 580"></polygon>
                <polygon fill="rgb(166,5,51)" points="0 620 20 620 20 600"></polygon>
                <polygon fill="rgb(128,6,40)" points="0 620 0 600 20 600"></polygon>
                <polygon fill="rgb(201,7,61)" points="20 600 40 600 40 620"></polygon>
                <polygon fill="rgb(196,3,60)" points="20 600 20 620 40 620"></polygon>
                <polygon fill="rgb(241,32,71)" points="40 620 60 620 60 600"></polygon>
                <polygon fill="rgb(242,33,72)" points="40 620 40 600 60 600"></polygon>
                <polygon fill="rgb(242,34,71)" points="60 600 80 600 80 620"></polygon>
                <polygon fill="rgb(241,28,69)" points="60 600 60 620 80 620"></polygon>
                <polygon fill="rgb(247,48,76)" points="80 620 100 620 100 600"></polygon>
                <polygon fill="rgb(250,50,78)" points="80 620 80 600 100 600"></polygon>
                <polygon fill="rgb(22,27,46)" points="100 600 120 600 120 620"></polygon>
                <polygon fill="rgb(151,46,67)" points="100 600 100 620 120 620"></polygon>
                <polygon fill="rgb(10,28,49)" points="120 620 140 620 140 600"></polygon>
                <polygon fill="rgb(9,28,50)" points="120 620 120 600 140 600"></polygon>
                <polygon fill="rgb(8,52,107)" points="140 600 160 600 160 620"></polygon>
                <polygon fill="rgb(9,27,49)" points="140 600 140 620 160 620"></polygon>
                <polygon fill="rgb(9,43,85)" points="160 620 180 620 180 600"></polygon>
                <polygon fill="rgb(6,61,132)" points="160 620 160 600 180 600"></polygon>
                <polygon fill="rgb(2,24,56)" points="180 600 200 600 200 620"></polygon>
                <polygon fill="rgb(6,33,72)" points="180 600 180 620 200 620"></polygon>
                <polygon fill="rgb(102,7,32)" points="0 620 20 620 20 640"></polygon>
                <polygon fill="rgb(199,2,59)" points="20 640 40 640 40 620"></polygon>
                <polygon fill="rgb(198,3,59)" points="20 640 20 620 40 620"></polygon>
                <polygon fill="rgb(220,17,63)" points="40 620 60 620 60 640"></polygon>
                <polygon fill="rgb(193,1,59)" points="40 620 40 640 60 640"></polygon>
                <polygon fill="rgb(235,24,67)" points="60 640 80 640 80 620"></polygon>
                <polygon fill="rgb(239,25,69)" points="60 640 60 620 80 620"></polygon>
                <polygon fill="rgb(229,22,65)" points="80 620 100 620 100 640"></polygon>
                <polygon fill="rgb(233,20,65)" points="80 620 80 640 100 640"></polygon>
                <polygon fill="rgb(72,25,51)" points="100 640 120 640 120 620"></polygon>
                <polygon fill="rgb(172,27,64)" points="100 640 100 620 120 620"></polygon>
                <polygon fill="rgb(10,26,46)" points="120 620 140 620 140 640"></polygon>
                <polygon fill="rgb(11,27,46)" points="120 620 120 640 140 640"></polygon>
                <polygon fill="rgb(10,26,49)" points="140 640 160 640 160 620"></polygon>
                <polygon fill="rgb(9,26,44)" points="140 640 140 620 160 620"></polygon>
                <polygon fill="rgb(11,27,49)" points="160 620 180 620 180 640"></polygon>
                <polygon fill="rgb(10,27,49)" points="160 620 160 640 180 640"></polygon>
                <polygon fill="rgb(5,11,20)" points="180 640 180 620 200 620"></polygon>
                <polygon fill="rgb(164,6,50)" points="20 640 40 640 40 660"></polygon>
                <polygon fill="rgb(197,2,55)" points="40 660 60 660 60 640"></polygon>
                <polygon fill="rgb(195,2,58)" points="40 660 40 640 60 640"></polygon>
                <polygon fill="rgb(205,7,59)" points="60 640 80 640 80 660"></polygon>
                <polygon fill="rgb(196,0,56)" points="60 640 60 660 80 660"></polygon>
                <polygon fill="rgb(207,8,58)" points="80 660 100 660 100 640"></polygon>
                <polygon fill="rgb(222,16,63)" points="80 660 80 640 100 640"></polygon>
                <polygon fill="rgb(79,23,52)" points="100 640 120 640 120 660"></polygon>
                <polygon fill="rgb(171,13,60)" points="100 640 100 660 120 660"></polygon>
                <polygon fill="rgb(10,26,47)" points="120 660 140 660 140 640"></polygon>
                <polygon fill="rgb(11,26,47)" points="120 660 120 640 140 640"></polygon>
                <polygon fill="rgb(11,27,50)" points="140 640 160 640 160 660"></polygon>
                <polygon fill="rgb(11,27,49)" points="140 640 140 660 160 660"></polygon>
                <polygon fill="rgb(10,27,47)" points="160 660 160 640 180 640"></polygon>
                <polygon fill="rgb(77,3,22)" points="40 660 60 660 60 680"></polygon>
                <polygon fill="rgb(109,1,31)" points="60 680 80 680 80 660"></polygon>
                <polygon fill="rgb(164,2,47)" points="60 680 60 660 80 660"></polygon>
                <polygon fill="rgb(197,1,55)" points="80 660 100 660 100 680"></polygon>
                <polygon fill="rgb(179,4,51)" points="80 660 80 680 100 680"></polygon>
                <polygon fill="rgb(40,24,45)" points="100 680 120 680 120 660"></polygon>
                <polygon fill="rgb(151,9,54)" points="100 680 100 660 120 660"></polygon>
                <polygon fill="rgb(9,23,39)" points="120 660 140 660 140 680"></polygon>
                <polygon fill="rgb(7,16,28)" points="120 660 120 680 140 680"></polygon>
                <polygon fill="rgb(7,18,31)" points="140 680 140 660 160 660"></polygon>
                <polygon fill="rgb(5,12,21)" points="0 180 20 180 20 160"></polygon>
                <polygon fill="rgb(5,16,30)" points="20 160 40 160 40 140"></polygon>
                <polygon fill="rgb(4,11,20)" points="360 480 360 460 380 460"></polygon>
            </svg>
        </div>
    );
};

export default Loading;

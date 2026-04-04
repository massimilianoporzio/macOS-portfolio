import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type JSX, useRef } from "react";

type FontWeightKey = 'subtitle' | 'title';

const FONT_WEIGHT: Record<FontWeightKey, { min: number; max: number; default: number }> = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const renderText =
    (text: string, className: string, type: FontWeightKey): JSX.Element[] => {
    const baseWeight = FONT_WEIGHT[type].default;

    return [...text].map((char, i) => (
        <span key={i} className={className} style={{
            fontVariationSettings: `'wght' ${baseWeight}`,
        }}>
        {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container: HTMLElement | null, type: FontWeightKey) => {
    if (!container) return ()=>{};
    const letters = container.querySelectorAll('span');
    const { min, max } = FONT_WEIGHT[type];

    const animateLetter = (letter: Element, weight: number, duration: number = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`
        });
    }

    interface LetterData {
        el: Element;
        centerX: number;
    }

    let letterData: LetterData[] = [];

    const updatePositions = () => {
        const { left: containerLeft } = container.getBoundingClientRect();
        letterData = Array.from(letters).map((letter) => {
            const { left, width } = letter.getBoundingClientRect();
            return {
                el: letter,
                centerX: left - containerLeft + width / 2
            };
        });
    };

    updatePositions();

    const handleMouseMove = (e: globalThis.MouseEvent) => {
        const { left: containerLeft } = container.getBoundingClientRect();
        const x = e.clientX - containerLeft;

        letterData.forEach(({ el, centerX }) => {
            const distance = Math.abs(x - centerX);
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(el, min + (max - min) * intensity);
        });
    }

    const handleMouseLeave = () => {
        letterData.forEach(({ el }) => {
            animateLetter(el, FONT_WEIGHT[type].default, 0.3);
        });
    }

    window.addEventListener('resize', updatePositions);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('resize', updatePositions);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    }
}

const Welcome = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);

    useGSAP(() => {
        const cleanupTitle = setupTextHover(titleRef.current, "title");
        const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            cleanupTitle?.();
            cleanupSubtitle?.();
        };
    }, { scope: titleRef });

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Massimiliano! Welcome to my",
                    "text-3xl font-georama", "subtitle"
                )} </p>
            <h1 ref={titleRef} className="mt-7">{
                renderText("portfolio",
                    "text-9xl italic font-georama", "title")
            }</h1>

            <div className="small-screen">
                <p>This Portfolio is designed for dektop/tablet screens only.</p>
            </div>
        </section>
    )
}
export default Welcome

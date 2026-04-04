import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type JSX, useRef } from "react";

type FontWeightKey = 'subtitle' | 'title';

const FONT_WEIGHT: Record<FontWeightKey, { min: number; max: number; default: number }> = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const renderText =
    (text: string, className: string, baseHeight: number = 400): JSX.Element[] => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{
            fontVariationSettings: `'wght' ${baseHeight}`,
        }}>
        {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container: HTMLElement | null, type: FontWeightKey) => {
    if (!container) return;
    const letters = container.querySelectorAll('span');
    const { min, max } = FONT_WEIGHT[type];

    const animateLetter = (letter: HTMLElement, weight: number, duration: number = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`
        });
    }

    const handleMouseMove = (e: globalThis.MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const x = e.clientX - left;
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(x - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    }

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            animateLetter(letter, FONT_WEIGHT[type].default,0.3);
        });
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
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
                    "text-3xl font-georama", 200
                )} </p>
            <h1 ref={titleRef} className="mt-7">{
                renderText("portfolio",
                    "text-9xl italic font-georama", 400)
            }</h1>

            <div className="small-screen">
                <p>This Portfolio is designed for dektop/tablet screens only.</p>
            </div>
        </section>
    )
}
export default Welcome

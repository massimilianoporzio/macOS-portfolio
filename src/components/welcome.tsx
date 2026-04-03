import {type JSX, useRef} from "react";
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

const Welcome = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Massimiliano! Welcome to my",
                    "text-3xl font-georama", 100
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

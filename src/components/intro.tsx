"use client"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { usePlayer } from "@/context/PlayerContext"


const Intro = () => {
    const { state, dispatch } = usePlayer()
    const [isVisible, setIsVisible] = useState(true)
    const text = "Lyrical";
    const letters = text.split("");
    const containerRef = useRef<HTMLDivElement>(null);
    const getRef = useRef<HTMLSpanElement>(null);
    const lyricalRef = useRef<HTMLSpanElement>(null);
    
    const getControls = useAnimation();
    const lyricalControls = useAnimation();
    const imgControls = useAnimation();
    
    const imgDelay = 1.25;
    const imgDuration = 0.65;
    const splitDelay = imgDelay;

    let isDesktop = true;

    useEffect(() => {
        if (typeof window !== "undefined") {
            isDesktop = window.innerWidth > 1024;
        }
    }, []);

    useEffect(() => {
        const runAnimations = async () => {
            getControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, delay: 0.8, ease: "easeOut" }
            });

            lyricalControls.start("visible");
            imgControls.start({
                clipPath: "inset(0% 0% 0% 0%)",
                rotate: 0,
                transition: { duration: imgDuration, delay: imgDelay, ease: "easeOut" }
            });

            await new Promise(resolve => setTimeout(resolve, splitDelay * 1000));

            if (containerRef.current && getRef.current && lyricalRef.current) {
                let containerWidth = containerRef.current.offsetWidth;
                let containerHeight = containerRef.current.offsetHeight;
                const getWidth = getRef.current.offsetWidth;
                const lyricalWidth = lyricalRef.current.offsetWidth;
                const gap = 8;

                let leftOffset = 0;
                let rightOffset = 0;
                
                if (isDesktop) {
                    leftOffset = -(containerWidth / 2) + (getWidth * 2) - gap;
                    rightOffset = (containerWidth / 2) + (lyricalWidth / 2) + gap;
                } else {
                    leftOffset = -(containerWidth / 6);
                    rightOffset = (containerWidth / 6);
                }

                getControls.start({
                    x: leftOffset,
                    y: containerHeight / 2 - (gap * 6),
                    transition: { duration: 0.5, ease: "easeOut" }
                });

                lyricalControls.start({
                    x: rightOffset,
                    y: -containerHeight / 2 + (gap * 6),
                    transition: { duration: 0.5, ease: "easeOut" }
                });
            }

            await new Promise(resolve => setTimeout(resolve, splitDelay * 1000));

            if (getRef.current && lyricalRef.current) {
                getControls.start({
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                });

                lyricalControls.start({
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                });

                await imgControls.start({
                    rotate: 15,
                    transition: { duration: 0.45, ease: "easeOut" }
                });
            }

            dispatch({ type: "SET_INTRO_COMPLETE" });

            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsVisible(false);
        };

        runAnimations();
    }, [getControls, lyricalControls, imgControls, dispatch]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
            },
        },
    };

    const letterVariants = {
        hidden: { 
            opacity: 0, 
        },
        visible: { 
            opacity: 1, 
            transition: {
                duration: 0.3,
                ease: "easeOut" as const,
            },
        },
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 w-screen h-screen flex justify-center items-center"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
                <div ref={containerRef} className="relative w-fit">
                    <h1 className="z-10 w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline gap-2 text-zinc-700">
                        <motion.span
                            ref={getRef}
                            className="inline-block font-maghfirea text-2xl"
                            initial={{ opacity: 0, y: 10, x: 0 }}
                            animate={getControls}
                        >
                            get
                        </motion.span>
                        
                        <motion.span
                            ref={lyricalRef}
                            className="inline-flex font-marvio font-light uppercase text-5xl"
                            variants={containerVariants}
                            initial="hidden"
                            animate={lyricalControls}
                            style={{ x: 0 }}
                        >
                            {letters.map((letter, index) => (
                                <motion.strong
                                    key={index}
                                    className="inline-block"
                                    variants={letterVariants}
                                    style={{ transformOrigin: "bottom" }}
                                >
                                    {letter}
                                </motion.strong>
                            ))}
                        </motion.span>
                    </h1>
                    <motion.img 
                        src="covers/Chappell_Roan_cover.jpg" 
                        alt="intro" 
                        className="max-w-xs lg:max-w-lg rounded-3xl object-cover"
                        initial={{ clipPath: "inset(50% 50% 50% 50%)", rotate: 0 }}
                        animate={imgControls}
                        transition={{ duration: imgDuration, delay: imgDelay, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Intro;

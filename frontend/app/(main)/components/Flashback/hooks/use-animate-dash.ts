import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export const useAnimateDash = ()=>{
    const container = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
  
    useGSAP(
      () => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const length = pathRef?.current?.getTotalLength() || 0;
          if (pathRef.current && length) pathRef.current.style.strokeDasharray = length + " " + length;
          if (pathRef.current && length) pathRef.current.style.strokeDashoffset = length.toString();
          const END_VALUE = "+=5000";
  
          const containerAnim = gsap.fromTo(
            "#test",
            { x: 0 },
            {
              x: "-6000px",
              ease: "none",
              scrollTrigger: {
                trigger: container.current,
                scrub: 1,
                end: END_VALUE,
                start: "top top",
              },
            }
          );
  
          gsap.fromTo(
            pathRef.current,
            {
              strokeDashoffset: length * 0.90,
              mask: "url(#dashedMask)",
              strokeOpacity: "0.3",
              scrollTrigger: {
                trigger: container.current,
                scrub: 1,
                end: END_VALUE,
                start: "top top",
              },
            },
            {
              strokeDashoffset: 0,
              ease: "none",
              strokeOpacity: "0.8",
              mask: "url(#dashedMask)",
              scrollTrigger: {
                trigger: container.current,
                scrub: 1,
                end: END_VALUE,
                start: "top top",
              },
            }
          );
          const cards = gsap.utils.toArray("#card");
          cards.forEach((card: any,i) => {
            gsap.fromTo(
              card,
              {
                scale: 0.2,
                opacity: 0.3,
                scrollTrigger: {
                  trigger: card,
  
                  scrub: 1,
                  containerAnimation: containerAnim,
                },
              },
              {
                scale: 0.82,
                opacity: 2,
                scrollTrigger: {
                  trigger: card,
                  scrub: 1,
                  containerAnimation: containerAnim,
                },
                onComplete:()=>{
                  if(i == cards.length -1)
                    console.log("finished the animation")
                }
              }
            );
          });
        });
      },
      { scope: container }
    );
    return {
        container, pathRef
    }
}
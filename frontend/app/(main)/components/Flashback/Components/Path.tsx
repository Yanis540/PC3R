"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DASH_ANIMATION_IMAGES } from "../config";
import { useAnimateDash } from "../hooks/use-animate-dash";

gsap.registerPlugin(ScrollTrigger);

function Pathsvg() {
  const {container,pathRef} = useAnimateDash(); 

  return (
    <div ref={container} className="h-[6400px] relative  md:mt-[-120px] overflow-x-clip w-full hidden md:flex">
      <div className=" sticky flex items-center  top-0 h-fit  ">
        <div id="test" className="w-full ml-16 bottom-32 relative">
          <svg id="dash-animation" width="6800" height="1000">
            <defs>
              <pattern id="dashedPattern" patternUnits="userSpaceOnUse" width="18" height="8" stroke="white" >
                <line x1="10" y1="0" x2="10" y2="14" stroke="white" strokeWidth="12" />
              </pattern>
              <mask id="dashedMask">
                <rect width="100%" height="100%" fill="url(#dashedPattern)" />
              </mask>
            </defs>
            <path
              ref={pathRef}
              id="Path"
              d="M385,425
              C 395,825 750,550 990,582
              T 1545,690 
              C 1700,720 1855,680 2000,480 
              T 2115,380 
              C 2140,340 2505,255 2750,710 
              C 3080,800 3155,785 3400,500 
              T 3500,375 
              C 3865,265 3865,335 4075,520 
              T 4260,690 
              C 4550,798 4685,610 4860,465 
              C 5200,230 5395,300 5560,655
              T 5750,680 
              C 5900,725 6090,380 6250,499"
              stroke="white"
              strokeWidth="8"
            />
          </svg>
          {
            DASH_ANIMATION_IMAGES.map((c,i)=>(
              <c.Component key={i} /> 
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Pathsvg;

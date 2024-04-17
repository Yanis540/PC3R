import Image from "next/image";
import one from "@/assets/Flashback/1.jpg";
import two from "@/assets/Flashback/2.jpg";
import three from "@/assets/Flashback/3.png";
import four from "@/assets/Flashback/4.jpg";
import five from "@/assets/Flashback/5.jpg";
import six from "@/assets/Flashback/6.jpeg";
import seven from "@/assets/Flashback/7.jpg";
import { Icons } from "@/components/icons";
export const DASH_ANIMATION_IMAGES = [
  {
    Component: () => <Image className="z-50 absolute left-[920px] top-[480px] (max-width: 350px) " alt="" src={one} />
  },
  {
    Component: () => <Image
      id="card"
      className="z-50 absolute sm:left-[1800px] sm:top-[215px]  left-[1850px] top-[305px] h-[417px] w-[591px]"
      alt=""
      src={two}
    />
  },
  {
    Component: () => <Image
      id="card"
      className="z-50 absolute sm:left-[3200px] sm:top-[215px] left-[3200px] top-[310px]"
      alt=""
      src={four}
    />
  },
  {
    Component: () => <Image
      id="card"
      className="z-50 absolute sm:left-[2470px] sm:top-[490px]  left-[2550px] top-[570px] h-[417px] w-[591px]"
      alt=""
      src={three}
    />
  },
  {
    Component: () => <Image id="card"
      className="z-50 absolute left-[3950px] top-[470px] h-[417px] w-[591px]" alt=""
      src={five}
    />
  },
  {
    Component: () => <Image
      id="card"
      className="z-50 absolute sm:left-[4700px] sm:top-[190px] left-[4700px] top-[290px]"
      alt=""
      src={six}
    />
  },
  {
    Component: () => <Image
      id="card"
      className="z-50 absolute left-[5360px] top-[480px]"
      alt=""
      src={seven}
    />
  },
  {
    Component: () => <Icons.sncfLogo
      id="card"
      className="w-[200px] md:w-[250px] h-auto bg-background left-[6100px] top-[420px] inset-0 absolute sm:left-[6235px] sm:top-[440px]"
    />
  },
] 
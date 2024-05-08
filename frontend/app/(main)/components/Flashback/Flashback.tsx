import Pathsvg from './Components/Path';
import { Icons } from "@/components/icons";
import LottieAnimation from '@/components/LootieAnimation';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

function Flashback() {
  return (
    <>
      <div className='flex flex-col md:ml-10 w-full z-50 gap-10  md:mt-0 bg-background relative '>
        <h2 className='text-5xl text-center md:text-[50px] md:text-left font-bold'>Embark with us in our <span className='bg-gradient-to-r from-primary via-green-500 to-green-300 inline-block text-transparent bg-clip-text'>SNCF history</span></h2>
        <div className="flex flex-col justify-between gap-y-10 ">
          <p className='flex-1 lg:text-xl md:max-w-[70%] text-lg text-gray-300 text-center  md:text-left font-medium'>
            The SNCF, Société Nationale des Chemins de Fer Français, is the primary railway operator in France. Founded in 1938, it has played a central role 
            in the development of rail transport in the country. SNCF manages an extensive network of trains, metros, and trams, providing passenger and freight 
            transport services across France and internationally. It has also been a pioneer in introducing high-speed trains with the TGV, revolutionizing national 
            and European travel. Today, SNCF remains a significant symbol of the French transportation system.
          </p>
          <div className="flex flex-col items-center justify-center">
            <LottieAnimation type='scroll' className=" hidden md:block h-10 w-10  "/> 
          </div>
        </div>
      </div>
      <Pathsvg />
      <Icons.sncfLogo className=" md:hidden w-full h-auto "  />
    </>
  )
}

export default Flashback
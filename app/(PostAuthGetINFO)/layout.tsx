"use client"
import Image from "next/image";
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation";

const progress_map: {[key:string]:number} = {
  "/upload-resume":50,
  "/education-details":75,
  "/your-skills":100
}


export default function SeekerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname()
  const progressValue = progress_map[path]

  return (

    <div className="w-full h-full relative overflow-hidden ">
      
        <Image
          className="w-full h-full"
          src={"/bg-onboard.svg"}
          width={400}
          height={400}
          alt="bg onboard"
        />
        <div className="absolute inset-0">
          <Progress value={progressValue}  className="bg-transparent text-[#E63946] h-2" />
        </div>
        <div className="flex-col absolute inset-0 flex justify-center items-center ">
            <div className="w-full h-full">{children}</div>
            <div className="z-10 w-full relative mt-5" style={{ height: '100px' }}>
                <div className="absolute left-6 -translate-y-1/2">
                    <Image src={"/gray-button.svg"} width={80} height={80} alt="left" />
                </div>
                <div className="absolute right-6  -translate-y-1/2">
                    <Image className="rotate-180" src={"/gray-button.svg"} width={80} height={80} alt="right" />
                </div>
            </div>
        </div>
      
    </div>
  );
}

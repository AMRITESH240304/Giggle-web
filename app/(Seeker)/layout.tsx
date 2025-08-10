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
        <div className="flex-col absolute inset-0 flex justify-center items-center ml-52 mr-52">
            <div className="w-full">{children}</div>
            <div className="w-full relative mt-5" style={{ height: '100px' }}>
                <div className="absolute -left-64 top-full -translate-y-1/2 ml-24">
                    <Image src={"/gray-button.svg"} width={50} height={50} alt="left" />
                </div>
                <div className="absolute -right-52 top-full -translate-y-1/2 mr-24">
                    <Image className="rotate-180" src={"/gray-button.svg"} width={50} height={50} alt="right" />
                </div>
            </div>
        </div>
      
    </div>
  );
}

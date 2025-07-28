import React from "react";
import Image from "next/image";

export default function onboarding_layout({children}:Readonly<{
    children: React.ReactNode
}>){
    return(
        <div>
            <Image src={"/bg-onboard.svg"} alt="BGImage" width={1200} height={1000} className="relative"/>
            <div className="absolute">
                {children}
            </div>
        </div>
    )
}
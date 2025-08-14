"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function UploadResume(){
    return(
        <div className="flex gap-x-32 ml-52 mr-52 mt-20">
            <div>
                <Image src={"/upload-resume-design-vec.svg"} width={20} height={20} alt="vector" className="w-full h-full"/>
            </div>
            <div className="bg-[#ffffff11] w-fit h-full p-12 flex flex-col gap-y-8 rounded-2xl">
                <div className="flex gap-x-2 text-3xl justify-center font-bold">
                    <h1 className="text-[#E63946]">Upload</h1>
                    <h1 className="text-white">Resume</h1>
                </div>
                <div>
                    <p className="text-[#CACBCE] font-bold text-center">
                        <span className="px-2 mr-1 border-2 rounded-3xl border-[#F9C74F] text-[#F9C74F]">i</span>
                        We’ll extract your name, education,
                        <br />
                        experience and other details from your resume to
                        pre-fill your profile.
                    </p>
                </div>
                <div className="flex flex-col justify-center py-20 items-center w-full h-full border-2 border-dashed border-[#FFB400] rounded-2xl space-y-6">
                    <Image src={"/upload-file-png.png"} height={200} width={200} alt="upload file"/>
                    <Button className="bg-[#E63946] hover:bg-[#ce3340]  text-[#EAEAEA] py-2 w-2/3">Upload a file</Button>
                    <p className="text-white font-bold">or upload a file</p>
                </div>
            </div>
        </div>
    )
}
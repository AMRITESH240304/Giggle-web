"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation"


export default function get_education() {
  const router = useRouter()
  return (
    <div className="flex items-center h-full ml-52 mr-52" >
      {/* <div className="w-full h-auto bg-black"> */}
      <div className="w-[50%] flex flex-col gap-y-7 text-[#fff] text-6xl font-bold z-2 mr-10 mb-40">
        <p>Your next</p>
        <p>hire is just</p>
        <p>a scroll</p>
        <p>away.</p>
      </div>
      {/* </div> */}
      {/* This relative container wraps the form and the hand */}
      <div className="relative w-full z-2 mb-16">
        {/* The form card */}
        <div className="bg-[#ffffff11] h-full text-[#fff] font-medium text-lg py-12 px-16 rounded-3xl mr-32 ">
          <div className="gap-y-2 flex flex-col">
            <p>What are you currently pursuing?</p>
            <Input className="bg-[#fff] mb-3 text-gray-500" placeholder="University Course" />
            <p>Enter your degree name:</p>
            <Input
              className="bg-[#fff] mb-3 text-gray-500"
              placeholder="Bachelor of Science"
            />
            <p>Enter your specialization:</p>
            <Input className="bg-[#fff] mb-3 text-gray-500" placeholder="Marketting" />
            <p>Completion Year:</p>
            <Input className="bg-[#fff] mb-3 text-gray-500" placeholder="2027" />
            <p>Enter your university name:</p>
            <Input className="bg-[#fff] mb-6 text-gray-500" placeholder="JNU" />
            <div className="flex w-full justify-end">
              <Button onClick={()=>{router.push("/your-skills")}} className="bg-red-500 w-fit">Next</Button>
            </div>
          </div>
        </div>

        {/* The hand image, positioned to match the prototype */}
      </div>
      <Image
        src={"/curl-hand.svg"}
        width={2000}
        height={2000}
        alt="A curled hand gesturing towards the form"
        // This class positions the hand at the bottom-center of its container,
        // with a positive z-index to appear in front.
        className="absolute w-full h-full -right-72 z-1 pointer-events-none"
      />
    </div>
  );
}

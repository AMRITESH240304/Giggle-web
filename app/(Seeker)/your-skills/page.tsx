import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function YourSkills() {
    // 1. Store your skills in an array for easy management.
    const skills = [
        "Customer Service", "Photography", "Marketing", "Coding", 
        "Hospitality", "Communication", "Sales", "Artificial Intelligence",
        "Problem Solving", "Teamwork", "Project Management", "UI/UX Design"
    ];

    return (
        <div className="bg-[#ffffff11] flex flex-col justify-center items-center rounded-lg p-16">
            <div className="flex gap-x-2 text-4xl font-bold mb-16">
                <p className="text-[#E63946]">Your</p>
                <p className="text-white">Skills</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 w-2/3">
                {skills.map((skill, index) => (
                    <Button 
                        key={index} 
                        className="bg-[#E63946] hover:bg-[#c4303c] text-white font-medium px-8 py-3 rounded-full whitespace-nowrap"
                    >
                        {skill}
                    </Button>
                ))}
                {/* You can add a "+" button separately if needed */}
                <p className="bg-gray-600 flex items-center justify-center text-white font-bold w-10 h-10 rounded-full cursor-pointer hover:bg-gray-500">
                    +
                </p>
            </div>
            <div className="pt-8 flex justify-center items-center gap-x-5">
                <Input placeholder="* Other" className="placeholder:font-bold placeholder:text-slate-300 font-bold border-none"/>
                <div className="bg-[#E63946] p-[15px] rounded-full"></div>
                <p className="text-[#fafafa] font-bold text-2xl ">+</p>
            </div>
            <div className="mt-10">
                <Button className="border-[#E63946] border-2 bg-transparent py-2 px-12  hover:bg-[#E63946]">Finish</Button>
            </div>
        </div>
    );
}
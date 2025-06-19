import Image from "next/image";

type LoadingScreenProps = {
    message: string
};

export default function LoadingScreen({message}: LoadingScreenProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-theme-bg">
            <div className="text-center">
                <Image src="/logo.png" alt="Gigapp Logo" width={300} height={200} className="mx-auto mb-8" />
                <p className="text-[#ffffff] text-lg">{message}</p>
            </div>
        </div>
    );
}
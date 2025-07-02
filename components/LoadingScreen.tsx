import Image from "next/image";

type LoadingScreenProps = {
  message: string;
};

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.svg')",
      }}
    >
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="Gigapp Logo"
          width={300}
          height={200}
          className="mx-auto mb-8"
        />
        <p className="text-[#ffffff] bottom-10 text-lg">{message}</p>
      </div>
    </div>
  );
}

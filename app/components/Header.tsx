import Image from "next/image";
import LaughLabLogo from "../../public/LaughLab.png";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
    >
      <Image
        src={LaughLabLogo}
        alt="pinecone-logo"
        width="230"
        height="50"
        className="ml-3"
      />{" "}
    </header>
  );
}
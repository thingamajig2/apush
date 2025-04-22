import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full bg-[#fff0cc] h-[120px] md:text-5xl font-bold gap-2 flex justify-center items-center font-serif text-2xl">
      <BookOpen className="text-[#4a2f27] w-10 h-10 drop-shadow-md" />
      <div className="text-[#4a2f27] drop-shadow-md">APUSH</div>
      <div className="text-[#8c6239] tracking-wide">LIBRARY</div>
    </header>
  );
};

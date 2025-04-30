import OutsideClickHandler from "react-outside-click-handler";
import { chapters } from "../chapters";

interface SideBarProps {
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>;
  selectedChapter: number;
  isOpen: boolean;
  closeSidebar: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  setSelectedChapter,
  selectedChapter,
  isOpen,
  closeSidebar,
}) => {
  return (
    <>
      {isOpen && <div className="bg-gray-500/50 w-full h-[100vh] fixed top-0"></div>}
      <OutsideClickHandler
        onOutsideClick={() => {
          isOpen && closeSidebar();
        }}
      >
        <aside
          className={`fixed top-0 left-0 h-screen w-80 bg-[#fffaeb] p-4 border-r z-40 transform transition-transform duration-300 ease-in-out overflow-auto pb-5
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:h-[150vh] md:w-96 md:block`}
        >
          {/* Close Button (mobile only) */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h2 className="text-xl font-bold">Chapters</h2>
            <button
              onClick={closeSidebar}
              className="text-2xl text-[#734E2A] font-bold"
            >
              &times;
            </button>
          </div>

          {/* Title (desktop only) */}
          <h2 className="hidden md:block text-xl font-bold mb-4">Chapters</h2>

          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedChapter(index);
                closeSidebar();
              }}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${selectedChapter === index
                ? "bg-[#fef1cc] text-[#734E2A] font-semibold"
                : "hover:bg-[#fef1cc]"
                }`}
            >
              {index + 1}. {chapter.title}
            </button>
          ))}
        </aside>
      </OutsideClickHandler>
    </>
  );
};

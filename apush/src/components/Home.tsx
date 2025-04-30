import { useEffect, useMemo, useState } from "react";
import { SideBar } from "./SideBar";
import { chapters } from "../chapters";
import { videoDataArray } from "../videoData";
import OutsideClickHandler from 'react-outside-click-handler';
import menu from "../menu.png"

// Helper to extract YouTube video ID from embed link
const getYoutubeID = (url: string) => {
  const match = url.match(/\/embed\/([^?&"]+)/);
  return match ? match[1] : null;
};

export const Home = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const currentVideos = useMemo(() => {
    if (selectedChapter === null) return [];
    return (
      videoDataArray.find((item) => item.chapter === selectedChapter + 1)
        ?.links || []
    );
  }, [selectedChapter]);
  const [mainVideo, setMainVideo] = useState<string | null>(
    currentVideos[0] || null
  );

  useEffect(() => {
    if (currentVideos.length > 0) {
      setMainVideo(currentVideos[0]);
    } else {
      setMainVideo(null);
    }
  }, [selectedChapter, currentVideos]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen md:pl-8 px-4 bg-[#fffaeb] py-12">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden h-[40px] w-[40px] fixed top-4 left-4 z-30 bg-[#bd8e63] text-white px-2 py-2 rounded"
        onClick={() => setSidebarOpen(true)}
      >
        <img src = {menu} alt = "menu"/>
      </button>

      {/* Sidebar */}

      <SideBar
        setSelectedChapter={(index) => {
          setSelectedChapter(index);
          setSidebarOpen(false); // Close on chapter click
        }}
        selectedChapter={selectedChapter}
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-8 items-center w-full">
        {/* Big Main Video Player */}
        {mainVideo && (
          <div className="flex justify-center sm:h-[300px] md:h-[400px] lg:h-[500px] sm:w-[350px] md:w-[650px] lg:w-[700px]">
            <iframe
              width="100%"
              height="100%"
              src={mainVideo}
              title="Main Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        )}
        <div className="md:w-[800px] w-[350px] overflow-x-auto whitespace-nowrap flex gap-4 py-4">
          {currentVideos.map((videoSrc, index) => (
            <img
              key={index}
              src={`https://img.youtube.com/vi/${getYoutubeID(videoSrc)}/0.jpg`}
              onClick={() => setMainVideo(videoSrc)}
              className={`w-40 h-24 object-cover rounded cursor-pointer border-2 ${mainVideo === videoSrc ? "ring-4 ring-[#624221]" : ""
                }`}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>

        {/* Section Links */}

        {selectedChapter !== null && (
          <div className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#f9d7b4] to-[#d5a778] px-6 py-4">
              <h2 className="text-xl font-bold text-black text-center">
                📖 Chapter Sections
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-blue-100 text-left">
              {chapters[selectedChapter].pages.map((page, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={`https://openstax.org/books/us-history/pages/${page.link}`}
                  rel="noreferrer"
                  className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#fff6de] underline decoration-[#fff6de]"
                >
                  <span className="w-[90%] text-[#624221] font-medium group-hover:underline">
                    {page.title}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#624221] group-hover:translate-x-1 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 6.414V17a1 1 0 11-2 0V6.414L5.707 9.707A1 1 0 014.293 8.293l6-6z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

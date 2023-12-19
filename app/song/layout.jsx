import Sidebar from "@/components/ui/sidebar";
import { ContextProvider } from "@/context/ContextProvider";

export const metadata = {
  title: "Currently Playing",
  description:
    "AI-enhanced analysis of lyrics for the song currently playing on Spotify."
};

export default function SongLayout({ children }) {
  return (
    <ContextProvider>
      <div className="flex flex-col h-full lg:flex-row">
        <div className="fixed top-0 left-0 z-20 w-full h-fit lg:p-1">
          <Sidebar />
        </div>
        <div className="relative top-[56px] lg:left-[256px] lg:w-[calc(99dvw-256px-8px)]">
          {children}
        </div>
      </div>
    </ContextProvider>
  );
}

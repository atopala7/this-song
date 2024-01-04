"use client";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import clsx from "clsx";
import SidebarTabs from "@/components/ui/sidebar-tabs";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { useEffect, useState } from "react";
import SongList from "@/components/ui/SongList";
import ConditionalModal from "@/components/ConditionalModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { rajdhani } from "@/components/ui/fonts";
import { useSession } from "next-auth/react";

// export const metadata = {
//   title: "Song Information",
//   description:
//     "AI-enhanced analysis of lyrics for the song currently playing on Spotify."
// };

export default function SongLayout({ children }) {
  const [activeItem, setActiveItem] = useState("Search");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, update } = useSession();

  console.log("session", session);

  useEffect(() => {
    console.log("Updating session...");
    if (session) update();
    let footer = document.getElementsByTagName("footer")[0];
    console.log(footer);
    let menu = document.getElementById("menu");
    let resizeMenu = () => {
      if (menu) {
        const scrollDistanceWithinFooter = Math.abs(
          document.body.scrollHeight -
            window.innerHeight -
            window.scrollY -
            footer.offsetHeight
        );

        console.log(scrollDistanceWithinFooter);
        console.log(menu.style);
        if (window.innerWidth >= 1024) {
          console.log("sticky!");
          menu.style.height = `calc(100vh - 80px - ${scrollDistanceWithinFooter}px)`;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("footer is intersecting");
          console.log(footer);

          document.addEventListener("scroll", resizeMenu);
          console.log(menu);
        } else {
          console.log("footer is not intersecting");
          menu.style.removeProperty("height");
          document.removeEventListener("scroll", resizeMenu);
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    if (footer) {
      console.log("Observing footer");
      observer.observe(footer);
    }

    return () => {
      scrollTo(0, 0);
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const items = [
    "Search",
    "Recently Played",
    "Top Songs (user)",
    "Top Songs (global)"
  ];

  return (
    <>
      <div className="relative lg:flex sm:min-h-[calc(100vh-196px-104px)] min-h-[calc(100vh-228px-104px)]">
        <div
          id="menu"
          className="lg:sticky flex-shrink-0 fixed lg:top-[72px] top-[56px] left-0 lg:w-72 w-full lg:h-[calc(100vh-80px)] lg:mx-2 lg:mb-2 lg:rounded-lg lg:bg-card bg-background z-10"
        >
          <div className={clsx("h-full justify-between p-1")}>
            <div className="flex flex-col justify-between h-full">
              {/* Sidebar on large screens */}
              {/* <div className="hidden lg:block">
                {activeItem === "Search" && <Search />}
                {activeItem === "Recently Played" && (
                  <SongList songs="recent" />
                )}
                {activeItem === "Top Songs (user)" && (
                  <SongList songs="top-user" />
                )}
                {activeItem === "Top Songs (global)" && (
                  <SongList songs="top-global" />
                )}
              </div> */}
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={clsx(
                        "w-full font-semibold text-lg",
                        rajdhani.className
                      )}
                    >
                      Menu
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={clsx(
                      "lg:w-[280px] w-[100dvw]",
                      rajdhani.className
                    )}
                  >
                    {items.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onSelect={() => {
                          setActiveItem(item);
                        }}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* Dropdown menu on small screens */}
              <div className={clsx("flex lg:hidden", rajdhani.className)}>
                <Dialog
                  open={dialogOpen === "search"}
                  onOpenChange={() =>
                    setDialogOpen((prev) =>
                      prev === "search" ? false : "search"
                    )
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-base font-semibold"
                    >
                      Search
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Search</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <Search onClick={() => setDialogOpen((prev) => !prev)} />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={dialogOpen === "recent"}
                  onOpenChange={() =>
                    setDialogOpen((prev) =>
                      prev === "recent" ? false : "recent"
                    )
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-base font-semibold"
                    >
                      Recently Played
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Recently Played</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <SongList
                      songs="recent"
                      onClick={() => setDialogOpen((prev) => !prev)}
                    />
                  </DialogContent>
                </Dialog>

                {!session && (
                  <Dialog
                    open={dialogOpen === "top-global"}
                    onOpenChange={() =>
                      setDialogOpen((prev) =>
                        prev === "top-global" ? false : "top-global"
                      )
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-base font-semibold"
                      >
                        Top Songs
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Most Popular Songs</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <SongList
                        songs="top-global"
                        onClick={() => setDialogOpen((prev) => !prev)}
                      />
                    </DialogContent>
                  </Dialog>
                )}
                {session && (
                  <DropdownMenu
                    open={dropdownOpen}
                    onOpenChange={() => {
                      console.log("dropdownOpen", dropdownOpen);
                      setDropdownOpen((prev) => !prev);
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-base font-semibold"
                      >
                        Top Songs
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Dialog
                        open={dialogOpen === "top-user"}
                        onOpenChange={() => {
                          setDialogOpen((prev) =>
                            prev === "top-user" ? false : "top-user"
                          );
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className={clsx("w-full", rajdhani.className)}
                          >
                            {session && session?.user?.name}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>
                              {session && session?.user?.name + "'s Top Songs"}
                              {!session && "Log in to see your top songs"}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <SongList
                            songs="top-user"
                            onClick={() => {
                              setDialogOpen((prev) => !prev);
                              setDropdownOpen(false);
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={dialogOpen === "top-global"}
                        onOpenChange={() =>
                          setDialogOpen((prev) =>
                            prev === "top-global" ? false : "top-global"
                          )
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className={clsx("w-full", rajdhani.className)}
                          >
                            Global
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>Most Popular Songs</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <SongList
                            songs="top-global"
                            onClick={() => {
                              setDialogOpen((prev) => !prev);
                              setDropdownOpen(false);
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
            {/* <SidebarTabs /> */}
            {/* <Link href={`${BACKEND_URI}/login`}> */}
            {/* <UserProfile /> */}
            {/* </Link> */}
          </div>
        </div>
        {/* Content */}
        <div
          id="content"
          className={clsx("px-2 mt-12 lg:mt-2 w-full bg-background")}
        >
          {children}
        </div>
      </div>
    </>
  );
}

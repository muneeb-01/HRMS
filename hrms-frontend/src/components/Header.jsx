import { Input } from "@/components/ui/input";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SplitText from "./SplitText";

export default function Header() {
  const user = {
    name: "John",
    avatarUrl: "https://github.com/shadcn.png", // Replace with actual avatar
  };

  return (
    <header className="w-full text-[#fff] rounded-sm px-4 py-3 bg-gradient-to-r from-[#2F3C34] to-[#245333] shadow-sm flex flex-wrap items-center justify-between gap-4 sm:gap-6">
      {/* Search bar (takes full width on small screens, constrained on larger) */}
      <div className="flex-1 min-w-[200px] max-w-md">
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Notification icon */}
        <Bell className="w-5 h-5 cursor-pointer" />
        <Settings />
        <SidebarTrigger />
        {/* Divider */}
        <div className="w-px h-6 bg-gray-300" />
        {/* User greeting and avatar */}
        <div className="flex items-center gap-2">
          <SplitText
            text={`Hi, ${user.name}!`}
            className=" text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

import { Input } from "@/components/ui/input";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const user = {
    name: "John",
    avatarUrl: "https://github.com/shadcn.png", // Replace with actual avatar
  };

  return (
    <header className="w-full rounded-sm px-4 py-3 bg-white shadow-sm flex flex-wrap items-center justify-between gap-4 sm:gap-6">
      {/* Search bar (takes full width on small screens, constrained on larger) */}
      <div className="flex-1 min-w-[200px] max-w-md">
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Notification icon */}
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Settings />
        <SidebarTrigger />
        {/* Divider */}
        <div className="w-px h-6 bg-gray-300" />
        {/* User greeting and avatar */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Hi, <strong>{user.name}</strong>
          </span>
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // ✅ fixed path

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"; // ✅ fixed path

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-10 h-10"> {/* ✅ added size */}
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 z-50"> {/* ✅ added z-50 */}
        <DropdownMenuLabel>Account Details</DropdownMenuLabel>
        <div className="px-4 py-1 text-sm">
          <p className="font-medium">Liya Jacob</p>
          <p className="text-gray-500 text-sm">liya2004jacob@gmail.com</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
        <DropdownMenuItem>Change Password</DropdownMenuItem>
        <DropdownMenuItem>Change Email</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

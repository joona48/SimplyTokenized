import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

  useEffect(() => {
    // Example: Read from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || "Unnamed User",
          email: parsed.email || "unknown@example.com"
        });
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
  }, []);

  const userInitial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex justify-end items-center pr-1">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full w-5 h-8 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <img
              src="/Image/icons/profile.svg"
              alt="Profile"
              className="w-6 h-6 object-cover"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-5 w-64 origin-top-right bg-white rounded-[10px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-0">
            <div className="font-poppins p-4 border-b border-gray-200">
              <p className="text-sm font-normal text-[#27383D]">Account Details</p>
              <div className="flex items-center mt-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-[#1C325B] text-white font-bold flex items-center justify-center me-3">
                  {userInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold max-w-[10rem] truncate text-[#27383D]">{user.name}</p>
                  <p className="text-sm font-normal text-[#27383D]">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1 py-2 border-b border-gray-200">
              {[
                { href: "#edit-profile", icon: "edit-profile.svg", label: "Edit Profile" },
                { href: "#change-password", icon: "change-password.svg", label: "Change Password" },
                { href: "#change-email", icon: "change-email.svg", label: "Change Email" },
              ].map(({ href, icon, label }) => (
                <Menu.Item key={label}>
                  {({ active }) => (
                    <a
                      href={href}
                      className={`flex items-center py-2 px-3 hover:bg-gray-100 rounded-md transition-all cursor-pointer text-sm font-normal ${active ? "bg-gray-100" : ""}`}
                      style={{ color: "rgb(39 56 61 / var(--tw-text-opacity, 1))" }}
                    >
                      <img src={`/Image/icons/${icon}`} alt={label} className="w-5 h-5 mr-3" />
                      {label}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>

            <div className="flex items-center justify-between py-3 px-3 hover:bg-tiara-100 rounded-md transition-all cursor-pointer text-[#27383D]">
              <div className="flex items-center">
                <img src="/Image/icons/logout.svg" alt="Logout" className="w-5 h-5 mr-3" />
                <span className="text-sm font-normal">Logout</span>
              </div>
              <img src="/Image/icons/chevron-right.svg" alt="right icon" className="w-5 h-5" />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

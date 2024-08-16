import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./assets/userPics"; // Adjust import path if needed
import { onAuthStateChanged } from "firebase/auth";
import {auth}  from "./firebase";
import { useRouter } from "next/navigation";

export default function NavbarComponent() {
  return (
    <Navbar
      style={{ width: "100%", padding: "20px" }} // Add padding to the sides for better spacing
      className="flex-1  bg-black" // Optional: Add a background color if needed
    >
      <NavbarBrand className="grow h-14 text-white">
        <AcmeLogo />
        <p className="font-bold">ACME</p>
      </NavbarBrand>

      <NavbarContent className=" flex gap-8">
        <NavbarItem>
          <Link className=" text-white" color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className="text-white" href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="grow-0 h-14 rounded-full">
  <Dropdown placement="bottom-start" className="p-2 rounded-full">
    <DropdownTrigger>
      <Avatar
        as="button"
        className="transition-transform rounded-full"
        name="Jason Hughes"
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        style={{ width: "40%", height: "40%", borderRadius:"50%" }} // Ensure the size is controlled
      />
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Profile Actions"
      variant="flat"
      className="text-white bg-slate-900 p-5 rounded-lg outline-none"
    >
      <DropdownItem
        key="profile"
        className="hover:bg-slate-800 hover:border hover:rounded-lg hover:border-gray-500 outline-none"
      >
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{auth.currentUser?.email}</p>
      </DropdownItem>
      <DropdownItem
        key="settings"
        className="hover:bg-slate-800 hover:border  hover:rounded-lg hover:border-gray-500 outline-none"
         href="/Settings"
      >
        My Settings
      </DropdownItem>
      <DropdownItem
        key="team_settings"
        className="hover:bg-slate-800 hover:border hover:rounded-lg  hover:border-gray-500 outline-none"
       
      >
        Team Settings (coming soon)
      </DropdownItem>
      <DropdownItem
        key="analytics"
        className="hover:bg-slate-800 hover:border  hover:rounded-lg hover:border-gray-500 outline-none"
      >
        Analytics (coming soon)
      </DropdownItem>
      <DropdownItem
        key="system"
        className="hover:bg-slate-800 hover:border  hover:rounded-lg hover:border-gray-500 outline-none"
      >
        System
      </DropdownItem>
      <DropdownItem
        key="configurations"
        className="hover:bg-slate-800 hover:border hover:rounded-lg hover:border-gray-500 outline-none"
      >
        Configurations
      </DropdownItem>
      <DropdownItem
        key="help_and_feedback"
        className="hover:bg-slate-800 hover:border hover:rounded-lg hover:border-gray-500 outline-none"
      >
        Help & Feedback (coming soon)
      </DropdownItem>
      <DropdownItem
        key="logout"
        className=" hover:text-red-500 hover:bg-slate-800 hover:rounded-lg outline-none" // Make the logout item red
        color="danger"
        href="/Logout"
      >
        Log Out
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</NavbarContent>


    </Navbar>
  );
}

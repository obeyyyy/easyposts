"use client"

import React, { useEffect, useState } from "react";
import FacebookPage from "../Facebook/page"
import TwitterPage from "../X/page";
export default function Settings() {
  const [selectedSection, setSelectedSection] = useState("Account");

  const renderContent = () => {
    switch (selectedSection) {
      case "Account":
        return <div>Account Settings Content</div>;
      case "Privacy":
        return <div>Privacy Settings Content</div>;
      case "Notifications":
        return <div>Notifications Settings Content</div>;
      case "X":
        return <div><TwitterPage /></div>;
      case "Facebook":
        return<div> <FacebookPage /> </div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <ul>
          <li
            className={`p-2 cursor-pointer ${selectedSection === "Account" ? "bg-gray-700" : ""}`}
            onClick={() => setSelectedSection("Account")}
          >
            Account
          </li>
          <li
            className={`p-2 cursor-pointer ${selectedSection === "Facebook" ? "bg-gray-700" : ""}`}
            onClick={() => setSelectedSection("Facebook")}
          >
            Facebook
          </li>
          <li
            className={`p-2 cursor-pointer ${selectedSection === "X" ? "bg-gray-700" : ""}`}
            onClick={() => setSelectedSection("X")}
          >
            X (twitter)
          </li>
          <li
            className={`p-2 cursor-pointer ${selectedSection === "Privacy" ? "bg-gray-700" : ""}`}
            onClick={() => setSelectedSection("Privacy")}
          >
            Privacy
          </li>
          <li
            className={`p-2 cursor-pointer ${selectedSection === "Notifications" ? "bg-gray-700" : ""}`}
            onClick={() => setSelectedSection("Notifications")}
          >
            Notifications
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">{selectedSection} Settings</h2>
        {renderContent()}
      </div>
    </div>
  );
}

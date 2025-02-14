"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, BarChart, Award, FileText } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile Menu Button */}

      <button
        className="md:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {" "}
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Side Background for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIdebar Container */}
      <aside
        className={`relative top-0  left-0 h-full w-64 bg-white border-r shadow-md p-5  transition-transform z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="space-y-2">
          <SidebarLink
            href="#"
            icon={<BarChart size={20} />}
            label="Dashboard"
          />
          <SidebarLink
            href="#"
            icon={<Award size={20} />}
            label="Skill Test" active
          />
          <SidebarLink
            href="#"
            icon={<FileText size={20} />}
            label="Internship"
          />
        </nav>
      </aside>
    </>
  );
};

const SidebarLink = ({href, icon, label, active}) => {
    return(
        <Link href={href} className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition ${active ? " bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}>{icon} <span>{label}</span></Link>
    )
}

export default Sidebar;

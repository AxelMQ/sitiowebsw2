import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, Menu, X, Sparkles } from 'lucide-react';
import contentData from '../data/content.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { companyName, navigation } = contentData;

  // Clean company name without trailing slogans for logo
  const logoText = companyName.split('|')[0].trim();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B1A30]/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(20,184,166,0.3)] group-hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0B1A30]">
                <Terminal className="h-5 w-5 text-teal-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-teal-300 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-teal-100 to-indigo-200 bg-clip-text text-transparent">
              {logoText}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-teal-400 ${
                    isActive
                      ? 'text-teal-400 border-b-2 border-teal-500 pb-1'
                      : 'text-slate-200'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/support"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-teal-400 to-indigo-600 text-white focus:ring-2 focus:outline-none focus:ring-teal-800"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#0B1A30] rounded-md group-hover:bg-opacity-0">
                Soporte Express
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-[#132A4A] hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0B1A30] px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-950/40 text-teal-400 border-l-4 border-teal-500'
                    : 'text-slate-200 hover:bg-[#132A4A] hover:text-teal-400'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2 px-3">
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="w-full text-center block rounded-md bg-gradient-to-r from-teal-500 to-indigo-600 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(20,184,166,0.2)]"
            >
              Soporte Express
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

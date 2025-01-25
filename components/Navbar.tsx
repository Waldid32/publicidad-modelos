"use client";
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-bgPrimaryGradiante fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap border-2 border-segundary p-2 rounded-lg">
          <Link href="/">ModelMatch</Link>
        </span>

        {/* Login Button */}
        <div className="flex md:order-2 space-x-3">
          <Link
            href="/login"
            className="text-black bg-white border-segundary border-2 hover:bg-segundary hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Mi Cuenta
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-segundary md:p-3">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-black bg-transparent rounded-sm md:bg-transparent md:text-white md:p-0 "
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/registerCliente"
                className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:text-white md: md:p-0 "
              >
                Registro Cliente
              </Link>
            </li>
            <li>
              <Link
                href="/registerModel"
                className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:text-white md: md:p-0 "
              >
                Registro Modelos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

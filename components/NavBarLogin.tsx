'use client';

import { logoutAction } from '@/actions/logoutAction';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface NavBarLoginProps {
  nombreCompleto?: string;
  role?: string;
}

export default function NavBarLogin({
  nombreCompleto,
  role,
}: NavBarLoginProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
      router.push('/');
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-primary border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link
          href={role === 'modelo' ? '/modelo' : '/cliente'}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap border-2 border-segundary p-2 rounded-lg">
            ModelMatch
          </span>
        </Link>

        {/* Parte derecha: avatar y hamburger */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Avatar - Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              aria-expanded={isUserDropdownOpen ? 'true' : 'false'}
              onClick={toggleUserDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
                src={
                  role === 'modelo' ? '/icon-models.png' : '/icon-cliente.png'
                }
                alt="user photo"
              />
            </button>

            {/* Dropdown menu de usuario */}
            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">
                    {nombreCompleto}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ayuda / Soporte Técnico
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {isPending ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Botón hamburguesa (mobile) */}
          {role === 'modelo' || role === 'admin' ? (
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
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
          ) : null}
        </div>

        {/* Menú principal (desktop y mobile) */}
        <div
          className={`items-center justify-around w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-user"
        >
          {role === 'modelo' ? (
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-whit md:p-3">
              <li>
                <Link
                  href={role === 'modelo' ? '/modelo' : '/cliente'}
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/modelo/planes"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Membresía
                </Link>
              </li>
              <li>
                <Link
                  href="/modelo/profile"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Editar Perfil
                </Link>
              </li>
            </ul>
          ) : role === 'cliente' ? (
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white md:p-3">
              <li>
                <Link
                  href="/cliente"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/cliente/modelosFavoritas"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favoritos
                </Link>
              </li>
            </ul>
          ) : role === 'admin' ? (
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white md:p-3">
              <li>
                <Link
                  href="/admin"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/nuevoAdmin"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nuevo Admin
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

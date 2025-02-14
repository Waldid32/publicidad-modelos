"use client"

import { CheckoutButton } from "@/components/CheckoutButton";
import { Card } from "flowbite-react";


export default function PlanesPage() {
  return (
    <section className="flex flex-col justify-center items-center gap-10">
      {/* TITLE */}
      <h1 className="font-bold text-xl">SUSCRIPCIONES / PLANES</h1>
      {/* PLANES */}
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
        <Card className="w-72">
          <h5 className="mb-4 text-xl font-medium text-gray-500">Membresía semanal</h5>
          <div className="flex items-baseline text-gray-900 ">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">60</span>
            <span className="ml-1 text-xl font-normal text-gray-500 ">/semana</span>
          </div>
          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 ">
                Publicacion perfil
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">Soporte Tecnico</span>
            </li>
            <li className="flex space-x-3 line-through decoration-gray-500">
              <svg
                className="h-5 w-5 shrink-0 text-gray-400 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">Publicación destacada</span>
            </li>
          </ul>
          <CheckoutButton subscriptionType="SEMANAL" />
        </Card>

        <Card className="w-72">
          <h5 className="mb-4 text-xl font-medium text-gray-500">Publicación Destacada</h5>
          <div className="flex items-baseline text-gray-900 ">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">80</span>
            <span className="ml-1 text-xl font-normal text-gray-500 ">/semana</span>
          </div>
          <ul className="my-7 space-y-5">
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 ">
                Publicacion perfil
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">Soporte Tecnico</span>
            </li>

            <li className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500">Publicación destacada</span>
            </li>
          </ul>
          <CheckoutButton subscriptionType="DESTACADA" />
        </Card>
      </div>
    </section>
  )
}

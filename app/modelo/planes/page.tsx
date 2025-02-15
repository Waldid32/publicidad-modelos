"use client";

import { useEffect, useState } from "react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Card, Modal } from "flowbite-react";

export default function PlanesPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Leer la URL para detectar si hay un éxito o una cancelación
    const params = new URLSearchParams(window.location.search);
    if (params.has("success")) {
      setStatus("success");
    } else if (params.has("cancel")) {
      setStatus("cancel");
    }
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-10 h-screen">
      {/* Mostrar Mensaje de Pago Exitoso o Cancelado */}
      <Modal show={status !== null} onClose={() => setStatus(null)}>
        <Modal.Header>
          {status === "success" ? "Pago Exitoso" : "Pago Cancelado"}
        </Modal.Header>
        <Modal.Body>
          <p>
            {status === "success"
              ? "✅ Tu pago fue procesado con éxito. Gracias por tu compra."
              : "❌ Has cancelado el pago. Si deseas intentarlo de nuevo, selecciona un plan."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStatus(null)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
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
          <CheckoutButton subscriptionType="SEMANAL" />
        </Card>

        <Card className="w-72">
          <h5 className="mb-4 text-xl font-medium text-gray-500">Publicación Destacada</h5>
          <div className="flex items-baseline text-gray-900 ">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">80</span>
            <span className="ml-1 text-xl font-normal text-gray-500 ">/semana</span>
          </div>
          <CheckoutButton subscriptionType="DESTACADA" />
        </Card>
      </div>
    </section>
  );
}

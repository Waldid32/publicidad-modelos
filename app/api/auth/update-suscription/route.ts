import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Aquí procesas la compra y actualizas la base de datos
  const updatedUserData = {
    suscripcionBasica: false,
    suscripcionPremiun: true, // Supongamos que se compró la premium
  };

  // Actualiza las cookies con los nuevos valores
  const cookieStore = await cookies();
  cookieStore.set(
    'suscripcionBasica',
    String(updatedUserData.suscripcionBasica),
    {
      httpOnly: true,
      path: '/',
    },
  );
  cookieStore.set(
    'suscripcionPremiun',
    String(updatedUserData.suscripcionPremiun),
    {
      httpOnly: true,
      path: '/',
    },
  );

  return NextResponse.json({ success: true });
}

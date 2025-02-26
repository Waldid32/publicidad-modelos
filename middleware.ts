import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener el token del cookie
  const token = request.cookies.get('access_token')?.value; // Accede al valor directamente

  // Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = request.cookies.get('role')?.value; // Accede al valor del rol

  const url = request.nextUrl.clone();

  // Verificar accesos según el rol
  if (url.pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (url.pathname.startsWith('/cliente') && role !== 'cliente') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (url.pathname.startsWith('/modelo') && role !== 'modelo') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Permitir acceso si pasa todas las validaciones
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/modelo/:path*'],
};

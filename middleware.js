// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Rutas que no necesitan protección
  const publicRoutes = ['/login', '/register', '/public'];

  // Verifica si la ruta actual está en la lista de rutas públicas
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute) {
    const userIsAuthenticated = false; // Cambia esto con tu lógica de autenticación

    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirige a la página de inicio de sesión si no está autenticado
    }
  }

  return NextResponse.next(); // Permite la solicitud si es una ruta pública o si el usuario está autenticado
}

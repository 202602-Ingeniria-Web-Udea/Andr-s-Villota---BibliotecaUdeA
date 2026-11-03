import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Biblioteca UdeA | Gestión",description:"Sistema de gestión de libros, préstamos y usuarios"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}

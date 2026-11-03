import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startSession } from "@/lib/auth";
import { error,fail } from "@/lib/api";
import bcrypt from "bcryptjs";
export async function POST(req:Request){try{const {email,password}=await req.json();if(typeof email!=="string"||typeof password!=="string")return error("Credenciales inválidas");const user=await prisma.user.findUnique({where:{email:email.trim().toLowerCase()}});if(!user||!await bcrypt.compare(password,user.password))return error("Correo o contraseña incorrectos",401);await startSession(user.id);return NextResponse.json({ok:true})}catch(e){return fail(e)}}

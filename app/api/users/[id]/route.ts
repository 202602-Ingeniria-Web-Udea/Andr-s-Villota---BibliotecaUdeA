import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { error,fail } from "@/lib/api";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){try{const admin=await requireUser("ADMIN");if(!admin)return error("Prohibido",403);const {id}=await params;const {role}=await req.json();if(role!=="ADMIN"&&role!=="USER")return error("Rol inválido");if(id===admin.id&&role!=="ADMIN")return error("No puedes quitarte tu propio rol de administrador");const user=await prisma.user.update({where:{id},data:{role},select:{id:true,role:true}});return NextResponse.json(user)}catch(e){return fail(e)}}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { error,fail } from "@/lib/api";
export async function GET(){try{if(!await requireUser("ADMIN"))return error("Prohibido",403);return NextResponse.json(await prisma.user.findMany({select:{id:true,name:true,email:true,role:true,createdAt:true},orderBy:{createdAt:"desc"}}))}catch(e){return fail(e)}}

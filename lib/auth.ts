import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";
const cookieName="biblioteca_session";
function key(){const secret=process.env.AUTH_SECRET;if(!secret||secret.length<32)throw new Error("Configura AUTH_SECRET con al menos 32 caracteres");return new TextEncoder().encode(secret)}
export async function startSession(id:string){const token=await new SignJWT({}).setProtectedHeader({alg:"HS256"}).setSubject(id).setIssuedAt().setExpirationTime("7d").sign(key());(await cookies()).set(cookieName,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:604800})}
export async function endSession(){(await cookies()).delete(cookieName)}
export async function currentUser(){try{const token=(await cookies()).get(cookieName)?.value;if(!token)return null;const {payload}=await jwtVerify(token,key());if(!payload.sub)return null;return await prisma.user.findUnique({where:{id:payload.sub},select:{id:true,name:true,email:true,role:true,image:true}})}catch{return null}}
export async function requireUser(role?:Role){const user=await currentUser();if(!user)return null;if(role&&user.role!==role)return null;return user}

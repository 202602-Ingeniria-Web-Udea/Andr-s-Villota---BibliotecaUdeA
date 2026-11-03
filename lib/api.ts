import { NextResponse } from "next/server";
export function error(message:string,status=400){return NextResponse.json({error:message},{status})}
export function fail(e:unknown){console.error(e);return error("No fue posible completar la operación",500)}

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default async function proxy(req : NextRequest) {


const jwt=  await  getToken({req ,secret: process.env.NEXTAUTH_SECRET})
// console.log("jwt from proxy", jwt);


if (jwt == null){
     return NextResponse.redirect(new URL("/login", req.url));
}  

  return NextResponse.next()
}


export const config ={
matcher: ["/profile"]
}
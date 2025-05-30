import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromHeader(req: NextRequest): string | null {
  const auth = req.headers.get("authorization")
  if (!auth) return null
  const [type, token] = auth.split(" ")
  if (type !== "Bearer" || !token) return null
  return token
}

export function verifyJWT(token: string): boolean {
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("JWT_SECRET not set")
    jwt.verify(token, secret)
    return true
  } catch {
    return false
  }
}

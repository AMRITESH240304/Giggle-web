"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function main_red(){
 const router = useRouter()
 useEffect(()=>{
  router.push("/Front-Page")
 }) 
}
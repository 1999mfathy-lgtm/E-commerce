import { redirect } from "next/navigation";
import React from 'react'

export default function page() {
    redirect("/profile/addresses");
  return (
  <h1>profile</h1>
  )
}

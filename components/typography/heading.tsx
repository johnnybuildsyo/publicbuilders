import React from "react"

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl sm:text-5xl tracking-wide font-black text-center mb-2 text-balance">{children}</h2>
}

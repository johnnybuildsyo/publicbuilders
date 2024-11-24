import React from "react"

export default function Subhead({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg tracking-wide mb-8 text-foreground/50 text-balance">{children}</h3>
}

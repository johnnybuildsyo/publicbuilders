import React from "react"
import type { SVGProps } from "react"

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" fillOpacity={0} d="M12 11L12 12L12 13z">
        <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"></animate>
        <set fill="freeze" attributeName="fill-opacity" begin="0.6s" to={1}></set>
      </path>
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={64}
        strokeDashoffset={64}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"
      >
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"></animate>
      </path>
    </svg>
  )
}

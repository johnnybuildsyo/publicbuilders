import { ReactNode } from "react"

export function Resources({ children }: { children: ReactNode }) {
  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="px-4 text-5xl tracking-wide font-black text-center text-fuchsia-600 pb-4 mb-4 border-b border-dashed border-foreground/30">Building In Public Resources</h2>
          <p className="w-full max-w-3xl text-foreground/70 pb-4">
            This page is sourced from the{" "}
            <a className="text-fuchsia-600 underline" href="https://github.com/johnnybuildsyo/awesome-buildinpublic">
              awesome-buildinpublic
            </a>{" "}
            repository on Github. <br />
            To add something to the list,{" "}
            <a className="text-fuchsia-600 underline" href="https://github.com/johnnybuildsyo/awesome-buildinpublic">
              leave a star and submit a PR
            </a>
            .
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

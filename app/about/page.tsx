import Link from "next/link"

const linkClass = "font-semibold border-b border-dashed border-white/50 hover:border-white/70"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <main className="flex-grow">
        <section className=" py-20 w-full h-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-12 text-balance" style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, .25)" }}>
              About Public Builders
            </h1>
            <div className="text-lg text-left w-full max-w-3xl mx-auto flex flex-col gap-4" style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, .5)" }}>
              <p>
                <Link className={linkClass} href="/">
                  PublicBuilders.org
                </Link>{" "}
                exists to provide a list of people who{" "}
                <a className={linkClass} href="https://bsky.app/hashtag/buildinpublic">
                  #buildinpublic
                </a>
                , sharing their journeys as they create projects in front of the world.
              </p>
              <p>
                This project is itself being built in public by{" "}
                <a className={linkClass} href="https://johnnybuilds.com">
                  Johnny Builds
                </a>
                . It started out as a reply in{" "}
                <a className={linkClass} href="https://bsky.app/profile/johnnybuilds.bsky.social/post/3la3lpowi5o2t">
                  a BlueSky thread
                </a>
                . The prototype was built and deployed in 20 minutes{" "}
                <a className={linkClass} href="https://v0.dev/chat/wQ2wK1qyHMB?b=b_bbroDnKtltd">
                  with v0
                </a>
                . You can read all the progress updates as they are published to the{" "}
                <a className={linkClass} href="https://github.com/johnnybuildsyo/publicbuilders/blob/main/README.md">
                  Public Build Log
                </a>
                .
              </p>
              <p>
                Source code is published{" "}
                <a className={linkClass} href="https://github.com/johnnybuildsyo/publicbuilders">
                  on Github
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

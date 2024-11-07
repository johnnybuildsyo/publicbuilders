import BuilderProfileForm from "./builder-profile-form"

export default function Join() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Join Public Builders</h1>
            <p className="text-lg mb-12 text-balance">Apply to be included in our list of indie hackers, startup starters and ambitious makers of all kinds.</p>
            <div className="text-left">
              <BuilderProfileForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

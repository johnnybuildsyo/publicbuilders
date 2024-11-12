import Home from "@/components/views/home"

export default async function HomePage(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  const pageNumber = parseInt(page)

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Home page={pageNumber} />
    </div>
  )
}

import ProjectsHome from "@/components/views/projects"

export default async function ProjectsPaginated(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  const pageNumber = parseInt(page)

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <ProjectsHome page={pageNumber} />
    </div>
  )
}

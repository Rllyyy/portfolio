import UploadForm from "./form";

export default async function UploadPage() {
  const { default: assignments } = await import("public/assignments.json");

  const moduleIds = assignments.map((assignment) => assignment.moduleId);

  return (
    <div className='p-8 mt-40'>
      <h1 className='mb-4 text-2xl'>HTML File Processor</h1>
      <UploadForm moduleIds={moduleIds} />
    </div>
  );
}

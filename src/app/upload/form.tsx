"use client";

import { TAssignment } from "@types";
import { submit } from "@actions/processHtml";
import { useActionState } from "react";

type UploadFormProps = {
  moduleIds: TAssignment["moduleId"][];
};

export default function UploadForm({ moduleIds }: UploadFormProps) {
  const [state, action, isLoading] = useActionState(submit, { error: null, data: null });

  function handleDownload() {
    if (!state.data) return;

    const blob = new Blob([state.data.content], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `processed-${state.data.fileName}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <>
      <form action={action} className='flex flex-col items-start gap-2'>
        <select
          name='moduleId'
          className='px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          required
          defaultValue={"default"}
        >
          <option value='default' disabled>
            Select a module ID
          </option>
          {moduleIds.map((moduleId) => (
            <option key={moduleId} value={moduleId}>
              {moduleId}
            </option>
          ))}
        </select>
        <input type='file' name='htmlFile' accept='.htm,.html' className='block mb-4' required />
        <button type='submit' className='px-4 py-2 text-white bg-blue-500 rounded'>
          {isLoading ? "Processing..." : "Process HTML"}
        </button>
      </form>

      {state.data && (
        <div className='mt-8'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl'>Processed HTML:</h2>
            <button onClick={handleDownload} className='px-4 py-2 text-white bg-green-500 rounded'>
              Download
            </button>
          </div>
          <pre className='bg-gray-100 p-4 rounded overflow-auto max-h-125'>{state.data.content}</pre>
        </div>
      )}
    </>
  );
}

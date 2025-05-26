"use client";

import { submit } from "@actions/processHtml";
import { useActionState } from "react";

export default function UploadPage() {
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
    <div className='p-8 mt-40'>
      <h1 className='mb-4 text-2xl'>HTML File Processor</h1>
      <form action={action} className='flex flex-col items-start gap-2'>
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
          <pre className='bg-gray-100 p-4 rounded overflow-auto max-h-[500px]'>{state.data.content}</pre>
        </div>
      )}
    </div>
  );
}

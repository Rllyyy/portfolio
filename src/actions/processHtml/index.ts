"use server";

import { processHtml } from "./processHtmlHelpers";

type DataType = {
  fileName: string;
  content: string;
};

type ActionState = {
  error?: string | null;
  data: DataType | null;
};

export async function submit(previousState: ActionState, formData: FormData) {
  "use server";

  // this is never true because of the initial state but else useActionState throws an error
  if (!previousState) {
    return {
      error: null,
      data: null,
    };
  }

  const file = formData.get("htmlFile") as File;
  if (!file) {
    return {
      error: "No file selected",
      data: null,
    };
  }

  return {
    error: null,
    data: {
      fileName: file.name,
      content: await processHtml(await file.text()),
    },
  };
}

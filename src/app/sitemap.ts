import { getFormattedDate } from "@/utils/formatDate";
import { transformURI } from "@/utils/transformURI";
import { MetadataRoute } from "next";

const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.niklasfischer.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { default: assignments } = await import("public/assignments.json");

  const routes: MetadataRoute.Sitemap = [
    {
      url: URL,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${URL}/about`,
      lastModified: "2023-06-29T11:00:21+00:00",
      priority: 0.3,
    },
    {
      url: `${URL}/privacy`,
      lastModified: "2023-06-29T11:00:21+00:00",
      priority: 0.3,
    },
  ];

  const assignmentPosts: MetadataRoute.Sitemap = assignments.map(({ moduleId, title, date }) => ({
    url: `${URL}/assignments/${moduleId}/${transformURI(title)}`,
    lastModified: new Date(
      getFormattedDate(date, "en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ).toISOString(),
    priority: 0.8,
  }));

  const assignmentPdfs: MetadataRoute.Sitemap = assignments.map(({ moduleId, title, date }) => ({
    url: `${URL}/assignments/${moduleId}/${transformURI(title)}.pdf`,
    lastModified: new Date(
      getFormattedDate(date, "en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ).toISOString(),
    priority: 0.5,
  }));

  return [...routes, ...assignmentPosts, ...assignmentPdfs];
}

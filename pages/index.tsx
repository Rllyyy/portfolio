import { LandingPage } from "components/landingPage";
import { Projects } from "components/projects";
import { Skills } from "components/skills";

export default function Home() {
  return (
    <>
      <main className='min-h-[200vh] bg-zinc-100 dark:bg-zinc-800 duration-200 [&>section]:scroll-mt-14'>
        <LandingPage />
        <Projects />
        <Skills />
      </main>
    </>
  );
}

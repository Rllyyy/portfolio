import { LandingPage } from "components/landingPage";
import { Projects } from "components/projects";
import { Skills } from "components/skills";
import { Assignments } from "components/assignments";
import { Profile } from "components/profile/profile";

export default function Home() {
  return (
    <>
      <main className='bg-zinc-100 dark:bg-zinc-800 duration-200 [&>section]:scroll-mt-12'>
        <LandingPage />
        <Profile />
        <Projects />
        <Skills />
        <Assignments />
      </main>
    </>
  );
}

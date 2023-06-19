import { LandingPage } from "components/landingPage";
import { Projects } from "components/projects";
import { Skills } from "components/skills";
import { Assignments } from "components/assignments";
import { Profile } from "components/profile";
import { EMailIcon } from "components/icons";

export default function Home() {
  return (
    <>
      <main className='bg-zinc-100 dark:bg-zinc-800 duration-200 [&>section]:scroll-mt-12'>
        <LandingPage />
        <Profile />
        <Projects />
        <section className='relative w-full h-56 overflow-hidden' style={{ backdropFilter: "blur(2px)" }}>
          <img
            alt='balc'
            className='absolute inset-0 object-contain'
            src='/images/code.png'
            style={{ backdropFilter: "blur(2px)", filter: "blur(2px)" }}
          ></img>
          <div className='relative z-20 flex flex-row items-center justify-center w-full h-full'>
            <EMailIcon classNames='inline-block h-12 w-12 border rounded-full text-white fill-white hover:fill-zinc-50 p-2 hover:bg-white hover:fill-black cursor-pointer' />
          </div>
        </section>
        <Skills />
        <Assignments />
      </main>
    </>
  );
}

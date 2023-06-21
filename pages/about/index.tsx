export default function About() {
  return (
    <main className='mt-10 md:mt-40 duration-200 bg-zinc-100 dark:bg-zinc-800 min-h-[90vh] px-4 lg:px-6 py-16'>
      <div className='max-w-5xl mx-auto space-y-12'>
        <section>
          <h1 className='text-5xl'>About</h1>
          <p className='mt-8 text-lg'>
            This website serves as a platform to showcase my personal projects and academic assignments.
          </p>
        </section>
        <section>
          <h1 className='text-4xl'>Impressum</h1>
          <h2 className='mt-6 text-lg font-medium'>Niklas Fischer</h2>
          <p>Lottbeker Weg 62</p>
          <p>22397 Hamburg</p>
          <p>Deutschland</p>
          <p>niklas[dot]fischer[at]mail.de</p>
          <h2 className='mt-6 text-xl font-medium'>Inhaltlich verantwortlich nach § 18 Abs. 2 MStV:</h2>
          <p>Niklas Fischer</p>
          <p>Lottbeker Weg 62</p>
          <p>22397 Hamburg</p>
          <p>Deutschland</p>
          <p>niklas[dot]fischer[at]mail.de</p>
        </section>
      </div>
    </main>
  );
}

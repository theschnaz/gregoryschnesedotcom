import data from './resume.json';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Impact from './components/Impact';
import About from './components/About';
import Experience from './components/Experience';
import Writing from './components/Writing';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const { main } = data;
  return (
    <>
      <Nav name={main.name} email={main.email} />
      <main>
        <Hero main={main} />
        <Impact items={data.impact} />
        <About main={main} skills={data.skills} />
        <Experience work={data.work} education={data.education} resume={main.resumedownload} />
        <Writing />
        <Projects projects={data.projects} />
        <Testimonials items={data.testimonials} />
        <Contact main={main} />
      </main>
      <Footer main={main} />
    </>
  );
}

import {Navbar} from "./layout/Navbar"
import Hero from "./sections/Hero"
import Skills from "./sections/Skills"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Experience from "./sections/Experience"
import Contact from "./sections/Contact"
import Footer from "./layout/Footer"
function App() {
  return <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <main>
      <Hero></Hero>
      <About></About>
      <Skills></Skills>
      <Experience></Experience>
      <Projects />
      <Contact></Contact>
      <Footer></Footer>
    </main>
  </div>
}

export default App

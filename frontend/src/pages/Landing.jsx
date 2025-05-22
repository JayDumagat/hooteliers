import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

export default function Landing() {
  return (
    <div className="w-full min-h-screen flex flex-col ">
        <Navbar/>
      <Hero />
    </div>
  )
}

import Certis from './Certis'
import Education from './Education';
import FloatingBalls from './Floatingballs';
import LandingSection from './Landingsection';
import Navbar from './Navbar';
import PageReveal from './Pagereveal';
import Button from './Socials'; 
import Stars from './Stars';




export default function Index() {
  return (
    <div>
      <Navbar />
      <LandingSection />
      <Stars />
      <FloatingBalls />
      <Education />
      <Certis />
      <PageReveal />
      <Button />
    </div>
  )
}

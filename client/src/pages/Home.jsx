import Header from '../components/header';
import Landing from '../components/home-landing';
import About from '../components/landing-about';
import Showcase from '../components/landing-showcase';
import Team from '../components/landing-meet-the-team';
import Property from '../components/landing-property';
import Footer from '../components/footer';

const Home = () => {
  return (
    <main>
      <Header />
      <Landing />
      <About />
      <Showcase />
      <Team />
      <Property />
      <Footer />
    </main>
  )
}

export default Home
import Header from '../components/header';
import Landing from '../components/home-landing';
import About from '../components/landing-about';
import Showcase from '../components/landing-showcase';
import Team from '../components/landing-meet-the-team';
import Property from '../components/landing-property';

const Home = () => {
  return (
    <main>
      <Header />
      <Landing />
      <About />
      <Showcase />
      <Team />
      <Property />
    </main>
  )
}

export default Home
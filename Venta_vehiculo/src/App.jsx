import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Specs from './components/sections/Specs';
import Features from './components/sections/Features';
import Gallery from './components/sections/Gallery';

const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        <Specs />
        <Features />
        <Gallery />
      </main>
      
      <Footer />

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}

export default App;

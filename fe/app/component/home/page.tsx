'use client'

import HeroSection from '../HeroSection';
import Features from '../Features';
import CTA from '../CTA';
import Footer from '../Footer';
import NavBar from '../NavBar';

export default function HomePage() {
    return (
        <main>
        <NavBar />
        <HeroSection />
        <Features />
        <CTA />
        <Footer />
        </main>
    );
}

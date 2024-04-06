import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Section from "../components/Section";
import Reviews from '../components/Reviews'; 
import Footer from '../components/Footer';
const LandingPage = () => {
  return (
    <main className='bg-white'>
        <Navbar/>
        <Hero/>
        <Section/>
        <Reviews/>
      <Footer/>
    </main>
  )
}

export default LandingPage;

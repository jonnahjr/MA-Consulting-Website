import React from 'react'

export default function Home(){
  return (
    <section id="home" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Premium Consulting for Startups & Enterprises</h1>
          <p className="mt-6 text-lg text-white/80">We help businesses transform, scale, and win in competitive markets with tailored strategies, digital transformation, and market intelligence.</p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 rounded-lg shadow-lg">Get Started</button>
            <button className="px-6 py-3 bg-white/6 rounded-lg">Learn More</button>
          </div>
        </div>
        <div className="glass-card">
          <div style={{height:300}} className="flex items-center justify-center">Hero Illustration / Animation</div>
        </div>
      </div>
    </section>
  )
}

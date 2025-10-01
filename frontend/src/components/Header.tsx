import React from 'react'

export default function Header(){
  return (
    <header className="w-full sticky top-0 backdrop-blur-md bg-white/3 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold">MA Services</div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  )
}

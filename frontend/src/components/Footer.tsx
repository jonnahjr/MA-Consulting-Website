import React from 'react'

export default function Footer(){
  return (
    <footer className="w-full mt-12 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-white/80">© {new Date().getFullYear()} MA Services. All rights reserved.</div>
    </footer>
  )
}

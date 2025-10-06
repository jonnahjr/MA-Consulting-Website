import { motion } from 'framer-motion'
// `framer-motion` types can be strict with JSX typings in some TS/React setups.
// Create a lightweight alias typed as `any` so we can use normal HTML props like `className` without type errors.
const m: any = motion

const Hero = () => {
  return (
    <section className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center text-white relative overflow-hidden animate-gradient">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="hero-particle particle-1"></div>
        <div className="hero-particle particle-2"></div>
        <div className="hero-particle particle-3"></div>
        <div className="hero-particle particle-4"></div>
        <div className="hero-particle particle-5"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 glass"></div>

      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4 max-w-4xl"
      >
        <m.h1
          className="text-4xl md:text-7xl font-bold mb-6 leading-tight text-gradient text-shadow-glow transform-preserve-3d"
          initial={{ scale: 0.8, rotateX: -15 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          Affordable Professional Services<br />
          <span className="text-white">with top quality support</span>
        </m.h1>
        <m.p
          className="text-xl md:text-2xl mb-8 text-blue-100 font-light"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Your trusted partner in consulting excellence
        </m.p>
        <m.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <m.button
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg btn-3d hover:shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </m.button>
          <m.button
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 btn-3d"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </m.button>
        </m.div>
      </m.div>

      {/* Enhanced floating elements with 3D effects */}
      <m.div
        className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full animate-float transform-translate-z transform-preserve-3d"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <m.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full animate-float animation-delay-1s"
        animate={{
          rotateY: [360, 0],
          rotateZ: [0, 180, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <m.div
        className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full animate-float animation-delay-2s"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotateY: [0, 180, 360]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  )
}

export default Hero
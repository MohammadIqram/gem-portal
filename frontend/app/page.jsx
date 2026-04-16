'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Users,
  ShoppingCart,
  ListChecks,
  TrendingUp,
  Shield,
  Briefcase,
  Target,
  Award,
  Sparkles,
  Zap,
  ChevronRight,
  Check,
  Star,
  Quote,
  Globe,
  BarChart3,
  Headphones,
  Play,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react'

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ─────────────────────────────────────────────
   PARTICLES
   ───────────────────────────────────────────── */
const Particle = ({ size, x, y, dur, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(1px)' }}
    animate={{
      y: [0, -25, 12, -18, 0],
      x: [0, 14, -8, 18, 0],
      opacity: [0.35, 0.7, 0.45, 0.65, 0.35],
    }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
)

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target.replace(/[^0-9]/g, ''))
    if (!num) return
    let start = 0
    const step = Math.ceil(num / 55)
    const id = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(id) }
      else setCount(start)
    }, 28)
    return () => clearInterval(id)
  }, [inView, target])

  const num = parseInt(target.replace(/[^0-9]/g, ''))
  if (!num) return <span ref={ref}>{target}</span>
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   GLASS CARD
   ───────────────────────────────────────────── */
const Glass = ({ children, className = '', hover = true, ...props }) => (
  <motion.div
    className={`
      relative rounded-2xl border border-white/50
      bg-white/55 backdrop-blur-xl
      shadow-[0_8px_32px_rgba(59,130,246,0.07)]
      ${hover ? 'hover:shadow-[0_20px_50px_rgba(59,130,246,0.13)] hover:border-blue-200/60 hover:-translate-y-1' : ''}
      transition-all duration-500
      ${className}
    `}
    {...props}
  >
    {children}
  </motion.div>
)

/* ─────────────────────────────────────────────
   SECTION HEADING
   ───────────────────────────────────────────── */
const SectionTag = ({ children, color = 'blue' }) => {
  const map = {
    blue: 'text-blue-600',
    sky: 'text-sky-600',
    indigo: 'text-indigo-600',
  }
  return (
    <span className={`inline-block font-semibold text-sm tracking-[0.2em] uppercase mb-4 ${map[color]}`}>
      {children}
    </span>
  )
}

/* ═══════════════════════════════════════════════
               H O M E   P A G E
   ═══════════════════════════════════════════════ */
const HomePage = () => {
  /* ─── DATA ─── */
  const stats = [
    { value: '5000', suffix: '+', label: 'Active Users', icon: Users },
    { value: '10000', suffix: '+', label: 'Projects Done', icon: BarChart3 },
    { value: '98', suffix: '%', label: 'Success Rate', icon: TrendingUp },
    { value: '24/7', suffix: '', label: 'Support', icon: Headphones },
  ]

  const features = [
    { icon: ShoppingCart, title: 'Product Listing', desc: 'Expert assistance listing products on GEM with optimized descriptions, pricing and catalog management.', gradient: 'from-blue-500 to-sky-500', span: 'md:col-span-2' },
    { icon: ListChecks, title: 'Category Management', desc: 'Professional category setup ensuring products reach the right government buyers every time.', gradient: 'from-sky-500 to-cyan-500', span: 'md:row-span-2' },
    { icon: TrendingUp, title: 'Sales Optimization', desc: 'Proven strategies to increase your win rate on bids and boost revenue through the marketplace.', gradient: 'from-indigo-500 to-blue-500', span: '' },
    { icon: Shield, title: 'Compliance Support', desc: 'Stay compliant with all GEM portal regulations, documentation and filing requirements.', gradient: 'from-blue-500 to-indigo-500', span: '' },
    { icon: Globe, title: 'Tender Discovery', desc: 'AI-powered tender matching so you never miss a relevant government opportunity again.', gradient: 'from-cyan-500 to-blue-500', span: 'md:col-span-2' },
  ]

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up as a client or freelancer in just a few clicks', icon: Users },
    { num: '02', title: 'Choose Service', desc: 'Select the GEM portal services you need or offer', icon: Briefcase },
    { num: '03', title: 'Get Connected', desc: 'Match with verified experts or clients instantly', icon: Target },
    { num: '04', title: 'Achieve Success', desc: 'Complete projects and grow your business on GEM', icon: Award },
  ]

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'CEO, TechSupply India', text: 'GEMPro transformed our government sales pipeline. We went from 2 to 15 successful bids in just 3 months.', rating: 5 },
    { name: 'Priya Sharma', role: 'Freelancer, GEM Expert', text: 'The platform connected me with amazing clients. I now manage 12 GEM accounts and doubled my income.', rating: 5 },
    { name: 'Amit Patel', role: 'Director, BuildWell Corp', text: 'Their compliance support saved us from costly mistakes. Absolutely essential for any serious GEM seller.', rating: 5 },
  ]

  const plans = [
    {
      name: 'Basic', price: 'Free', period: '', desc: 'Perfect for getting started', icon: Users, popular: false,
      features: ['Access to freelancer marketplace', 'Basic profile setup', 'Standard support', '5 project listings / month', 'Community access'],
      cta: 'Get Started',
    },
    {
      name: 'Professional', price: 'u20B9999', period: '/mo', desc: 'Best for growing businesses', icon: Briefcase, popular: true,
      features: ['Everything in Basic', 'Unlimited project listings', 'Priority support', 'Advanced analytics', 'Featured profile', 'Direct messaging', 'Project management tools'],
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise', price: 'u20B92,999', period: '/mo', desc: 'For large organizations', icon: Award, popular: false,
      features: ['Everything in Professional', 'Dedicated account manager', '24/7 priority support', 'Custom integrations', 'Team collaboration', 'Advanced security', 'API access'],
      cta: 'Contact Sales',
    },
  ]

  const [activePlan, setActivePlan] = useState(1)

  return (
    <div className="overflow-hidden bg-[#f7f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ═══════════════════════════
         1 ·  H E R O
         ═══════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-[70px] overflow-hidden">
        {/* ── background layers ── */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse 70% 55% at 25% 45%, rgba(59,130,246,0.10) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 75% 35%, rgba(56,189,248,0.08) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 55% 80%, rgba(99,102,241,0.05) 0%, transparent 70%)',
                'radial-gradient(ellipse 70% 55% at 55% 55%, rgba(56,189,248,0.10) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 25% 55%, rgba(59,130,246,0.08) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 75% 25%, rgba(99,102,241,0.05) 0%, transparent 70%)',
                'radial-gradient(ellipse 70% 55% at 25% 45%, rgba(59,130,246,0.10) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 75% 35%, rgba(56,189,248,0.08) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 55% 80%, rgba(99,102,241,0.05) 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle,#1e40af 1px,transparent 1px)', backgroundSize: '34px 34px' }} />
        </div>

        {/* particles */}
        <Particle size={6} x="8%" y="22%" dur={7} delay={0} color="rgba(59,130,246,0.45)" />
        <Particle size={4} x="88%" y="18%" dur={9} delay={1} color="rgba(56,189,248,0.45)" />
        <Particle size={8} x="78%" y="72%" dur={8} delay={0.5} color="rgba(59,130,246,0.3)" />
        <Particle size={5} x="18%" y="78%" dur={10} delay={2} color="rgba(56,189,248,0.35)" />
        <Particle size={3} x="52%" y="12%" dur={6} delay={1.5} color="rgba(99,102,241,0.35)" />
        <Particle size={7} x="35%" y="48%" dur={11} delay={0.8} color="rgba(59,130,246,0.25)" />

        {/* blurred orbs */}
        <motion.div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-blue-300/15 blur-[120px]" animate={{ scale: [1, 1.12, 1], x: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-sky-300/15 blur-[120px]" animate={{ scale: [1, 1.18, 1], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* left: text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} custom={0} className="mb-7">
                <span className="inline-flex items-center gap-2 bg-blue-100/70 text-blue-700 text-sm font-medium px-5 py-2 rounded-full border border-blue-200/50 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" />
                  Your Gateway to GEM Portal Success
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="text-[3.2rem] sm:text-[3.8rem] md:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight mb-7">
                <span className="text-gray-900">Connect with</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent">GEM Portal</span>
                <br />
                <span className="text-gray-900">Experts</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg mb-10 font-light">
                Bridge the gap between businesses and skilled freelancers who excel at managing the Government e-Marketplace portal
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-8 py-4 text-[16px] rounded-full font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2 group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 px-8 py-4 text-[16px] rounded-full font-medium backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Demo
                </button>
              </motion.div>

              {/* micro trust */}
              <motion.div variants={fadeUp} custom={4} className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-400 to-sky-400' : 'from-sky-400 to-cyan-400'} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">5,000+</span> professionals trust GEMPro
                </div>
              </motion.div>
            </motion.div>

            {/* right: image */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-3xl blur-3xl scale-90" />
                <div className="relative rounded-3xl overflow-hidden border border-white/50 shadow-2xl shadow-blue-500/10 bg-white/30 backdrop-blur-sm">
                  <img
                    src="https://static.prod-images.emergentagent.com/jobs/a3a1babc-e2b1-4b79-bdbb-f8badbb0b17f/images/b974bd44211eabe2734c10794db3d047bd36e71b0e44692081ad3a864af5e468.png"
                    alt="GEM Portal Illustration"
                    className="w-full h-auto object-cover"
                    width={768}
                    height={512}
                  />
                </div>
                {/* floating badge */}
                <motion.div
                  className="absolute -bottom-5 -left-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-100/50 shadow-xl shadow-blue-500/10 p-4 flex items-center gap-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                    <div className="text-lg font-bold text-gray-900">98.5%</div>
                  </div>
                </motion.div>
                {/* floating badge 2 */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-100/50 shadow-xl shadow-blue-500/10 p-4 flex items-center gap-3"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Projects</div>
                    <div className="text-lg font-bold text-gray-900">10K+</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#f7f9ff] to-transparent" />
      </section>

      {/* ═══════════════════════════
         2 ·  S T A T S
         ═══════════════════════════ */}
      <section className="py-20 relative">
        {/* <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}>
                <Glass className="p-7 text-center group">
                  <s.icon className="w-6 h-6 mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-700 to-sky-500 bg-clip-text text-transparent mb-1 tabular-nums">
                    {s.value === '24/7' ? '24/7' : <Counter target={s.value} suffix={s.suffix} />}
                  </div>
                  <div className="text-gray-500 font-medium text-sm tracking-wide">{s.label}</div>
                </Glass>
              </motion.div>
            ))}
          </motion.div>
        </div> */}
        <AttractiveStats />
      </section>

      {/* ═══════════════════════════
         3 ·  F E A T U R E S  (Bento)
         ═══════════════════════════ */}
      <section className="py-18 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle,#1e40af 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-20">
            <SectionTag>What We Offer</SectionTag>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-gray-900 tracking-tight leading-tight">
              Comprehensive GEM<br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Portal Services</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mt-5 font-light">Everything you need to succeed on the Government e-Marketplace</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
            {features.map((f, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} className={f.span}>
                <Glass className="h-full p-7 flex flex-col justify-between group cursor-default overflow-hidden relative">
                  <div className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.07] blur-3xl transition-opacity duration-700`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                  </div>
                  <p className="text-gray-500 text-[15px] leading-relaxed relative z-10">{f.desc}</p>
                </Glass>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════
         4 ·  H O W  I T  W O R K S
         ═══════════════════════════ */}

      <section className="py-24 relative overflow-hidden bg-white">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-100/40 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-wide uppercase mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Seamless Flow
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
              Everything you need, <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent italic">Simplified.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Animated Connector Line */}
            <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-100 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600"
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ width: '50%' }}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative flex flex-col items-center"
                >
                  {/* Step Number with Pulse */}
                  <div className="relative mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: i * 0.1 }}
                      className="w-20 h-20 rounded-[2rem] bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center relative z-20 group-hover:border-blue-400 transition-colors duration-500"
                    >
                      <span className="text-2xl font-black bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-sky-500">
                        {step.num}
                      </span>
                    </motion.div>
                    {/* Decorative "ping" effect on hover */}
                    <div className="absolute inset-0 bg-blue-400/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>

                  {/* Content Card */}
                  <div className="relative w-full p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:border-blue-100">
                    <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <step.icon size={22} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4 pt-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors">
                      {step.desc}
                    </p>

                    {/* Hidden "Check" that appears on hover */}
                    <div className="mt-6 flex items-center text-blue-600 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <Check size={14} className="mr-2" />
                      Step Complete
                    </div>
                  </div>

                  {/* Vertical Line for Mobile */}
                  {i !== steps.length - 1 && (
                    <div className="lg:hidden w-[2px] h-12 bg-gradient-to-b from-blue-200 to-transparent my-4" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════
         5 ·  T E S T I M O N I A L S
         ═══════════════════════════ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-20">
            <SectionTag color="indigo">Testimonials</SectionTag>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-gray-900 tracking-tight">
              Loved by <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Thousands</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}>
                <Glass className="p-8 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-[15px]">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${i === 0 ? 'from-blue-500 to-sky-500' : i === 1 ? 'from-sky-500 to-cyan-500' : 'from-indigo-500 to-blue-500'} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════
         6 ·  P R I C I N G
         ═══════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-20">
            <SectionTag>Pricing</SectionTag>
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-gray-900 tracking-tight mb-5">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Plan</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto font-light">Select the perfect membership for your needs</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                onHoverStart={() => setActivePlan(i)}
                className="relative"
              >
                {/* gradient border for popular */}
                <div className={`rounded-2xl p-[1.5px] ${plan.popular ? 'bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-400' : 'bg-transparent'}`}>
                  <motion.div
                    animate={{
                      scale: activePlan === i ? 1.02 : 1,
                      y: activePlan === i ? -6 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`
                      relative rounded-2xl border overflow-hidden
                      ${plan.popular
                        ? 'bg-white/90 backdrop-blur-xl border-transparent shadow-2xl shadow-blue-200/40'
                        : 'bg-white/55 backdrop-blur-xl border-white/50 shadow-[0_8px_32px_rgba(59,130,246,0.07)]'
                      }
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-bold px-5 py-1.5 rounded-bl-xl tracking-wider">POPULAR</div>
                      </div>
                    )}

                    <div className="p-8">
                      <div className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-sky-500' : 'bg-gray-100'} flex items-center justify-center mb-6`}>
                        <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-500'}`} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

                      <div className="mb-8">
                        <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                        {plan.period && <span className="text-gray-400 text-sm ml-1">{plan.period}</span>}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.05 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-500' : 'text-gray-300'}`} />
                            <span className="text-gray-600">{feat}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full rounded-full py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {plan.cta}
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════
         7 ·  C T A
         ═══════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <motion.div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[80px]" animate={{ x: [0, -35, 0], y: [0, 25, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" animate={{ x: [0, 30, 0], y: [0, -18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} custom={0}>
              <Zap className="mx-auto mb-6 w-12 h-12 text-blue-200" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-[3.5rem] font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to Transform Your GEM Portal Experience?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-blue-100/80 mb-10 font-light">
              Join thousands of businesses and freelancers already succeeding on our platform
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 text-lg rounded-full font-semibold shadow-2xl shadow-black/10 hover:shadow-black/20 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

const stats = [
  { label: 'Active Experts', value: '12', suffix: 'k+', icon: Users, color: 'from-blue-600 to-cyan-500' },
  { label: 'Projects Completed', value: '45', suffix: 'k+', icon: Briefcase, color: 'from-indigo-600 to-blue-500' },
  { label: 'Client Rating', value: '4.9', suffix: '/5', icon: Star, color: 'from-amber-500 to-orange-400' },
  { label: 'Support Response', value: '24/7', suffix: '', icon: Clock, color: 'from-emerald-500 to-teal-400' },
]

 function AttractiveStats() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }) {
  // Mouse tracking for the "Glow" effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      className="group relative rounded-[2rem] border border-slate-200 bg-white/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Interactive Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        {/* Icon with animated background */}
        <div className="relative w-12 h-12 mb-6 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 group-hover:rotate-6 transition-all duration-500`} />
          <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-blue-600 transition-transform duration-500 group-hover:scale-110`} />
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-0.5">
          <span className={`text-4xl md:text-5xl font-black tracking-tight text-slate-900`}>
            {stat.value === '24/7' ? '24/7' : <Counter target={stat.value} suffix={stat.suffix} />}
          </span>
        </div>

        {/* Label */}
        <p className="mt-2 text-slate-500 font-semibold text-sm uppercase tracking-wider">
          {stat.label}
        </p>

        {/* Mini "Performance" tag that appears on hover */}
        <motion.div 
          className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <Zap size={10} fill="currentColor" />
          LIVE DATA
        </motion.div>
      </div>
    </motion.div>
  )
}
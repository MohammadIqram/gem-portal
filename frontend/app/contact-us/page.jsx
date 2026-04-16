'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Building2,
  User,
  FileText,
  HelpCircle,
  Headphones,
  Globe,
  X,
} from 'lucide-react'

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

/* ─── particle ─── */
const Particle = ({ size, x, y, dur, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(1px)' }}
    animate={{ y: [0, -22, 10, -16, 0], x: [0, 12, -8, 16, 0], opacity: [0.3, 0.65, 0.4, 0.6, 0.3] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
)

/* ─── custom select ─── */
const Select = ({ value, onChange, options, placeholder, icon: Icon }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 bg-white border rounded-xl px-4 py-3.5 text-sm transition-all duration-200 outline-none ${
          open ? 'border-blue-300 ring-2 ring-blue-100 shadow-sm' : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className={selected ? 'text-gray-800' : 'text-gray-400'}>{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl shadow-blue-500/8 overflow-hidden"
          >
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    value === o.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── input ─── */
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />}
    <input
      {...props}
      className={`w-full bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:shadow-sm ${Icon ? 'pl-11 pr-4' : 'px-4'} py-3.5`}
    />
  </div>
)

/* ─── textarea ─── */
const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:shadow-sm resize-none"
  />
)

/* ─── glass card ─── */
const Glass = ({ children, className = '', ...props }) => (
  <motion.div
    className={`relative rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl shadow-[0_8px_32px_rgba(59,130,246,0.06)] transition-all duration-500 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
)

/* ─── data ─── */
const INQUIRY_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
  { value: 'enterprise', label: 'Enterprise Plan Inquiry' },
]

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us',
    desc: 'Drop us a line anytime and we\'ll get back within 24 hours.',
    value: 'support@gempro.in',
    link: 'mailto:support@gempro.in',
    gradient: 'from-blue-500 to-sky-500',
  },
  {
    icon: Phone,
    title: 'Call Us',
    desc: 'Mon-Sat, 9 AM to 7 PM IST. We\'re always here to help.',
    value: '+91 98765 43210',
    link: 'tel:+919876543210',
    gradient: 'from-sky-500 to-cyan-500',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    desc: 'Come say hello at our office in the heart of New Delhi.',
    value: 'Connaught Place, New Delhi',
    link: 'https://maps.google.com/?q=Connaught+Place+New+Delhi',
    gradient: 'from-indigo-500 to-blue-500',
  },
]

const faqs = [
  { q: 'How quickly will I get a response?', a: 'We typically respond within 4-6 business hours. For urgent matters, call us directly during business hours for immediate assistance.' },
  { q: 'Do you offer enterprise-level support?', a: 'Yes! Enterprise plan members get a dedicated account manager, 24/7 priority support, custom SLAs, and direct Slack/Teams integration.' },
  { q: 'Can I schedule a demo?', a: 'Absolutely. Use the contact form above with "Partnership Opportunity" selected, and our team will set up a personalized demo within 48 hours.' },
  { q: 'What if I need help with my GEM portal registration?', a: 'Our experts can guide you through the entire GEM registration process. Just reach out via the form or give us a call, and we\'ll connect you with a specialist.' },
]

/* ═══════════════════════════════════════════════
          C O N T A C T   P A G E
   ═══════════════════════════════════════════════ */
const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: typeof val === 'object' && val.target ? val.target.value : val }))

  const canSubmit = form.name && form.email && form.inquiry && form.message

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1800)
  }

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', company: '', inquiry: '', subject: '', message: '' })
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f9ff] overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50/50 to-[#f7f9ff]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle,#1e40af 1px,transparent 1px)', backgroundSize: '34px 34px' }} />

        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-200/15 blur-[120px]" animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-200/15 blur-[120px]" animate={{ scale: [1, 1.15, 1], y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

        <Particle size={5} x="12%" y="25%" dur={7} delay={0} color="rgba(59,130,246,0.4)" />
        <Particle size={4} x="85%" y="20%" dur={9} delay={1} color="rgba(56,189,248,0.4)" />
        <Particle size={6} x="70%" y="70%" dur={8} delay={0.5} color="rgba(59,130,246,0.3)" />
        <Particle size={3} x="25%" y="75%" dur={10} delay={2} color="rgba(56,189,248,0.35)" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-blue-100/70 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200/50 mb-6">
              <MessageSquare className="w-4 h-4" /> We'd love to hear from you
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-5">
              Get in <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Touch</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-500 font-light leading-relaxed">
              Have a question, need support, or want to explore a partnership?
              <br className="hidden sm:block" />
              Our team is ready to help you succeed on the GEM portal.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT CARDS ═══ */}
      <section className="relative -mt-4 mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactCards.map((c, i) => (
              <motion.a
                key={i}
                href={c.link}
                target={c.icon === MapPin ? '_blank' : undefined}
                rel={c.icon === MapPin ? 'noopener noreferrer' : undefined}
                variants={scaleIn}
                custom={i}
                className="group"
              >
                <Glass className="p-7 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-200/60 hover:-translate-y-1 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2.5 transition-all duration-300">
                    {c.value} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Glass>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM + MAP SECTION ═══ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* ── form (3 cols) ── */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} className="lg:col-span-3">
              <Glass className="p-8 md:p-10 relative overflow-hidden">
                {/* decorative glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-400/5 blur-[80px]" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── success state ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center text-center py-16 relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/25"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-500 mb-8 max-w-sm">
                        Thank you for reaching out. Our team will review your message and respond within 24 hours.
                      </p>
                      <button
                        onClick={resetForm}
                        className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* ── form ── */
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Send us a message</h2>
                        <p className="text-sm text-gray-500">Fill in the form below and we'll get back to you shortly.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* name + email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                              Full Name <span className="text-red-400">*</span>
                            </label>
                            <Input icon={User} placeholder="Your name" value={form.name} onChange={set('name')} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                              Email <span className="text-red-400">*</span>
                            </label>
                            <Input icon={Mail} type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} />
                          </div>
                        </div>

                        {/* phone + company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Phone</label>
                            <Input icon={Phone} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Company</label>
                            <Input icon={Building2} placeholder="Organization name" value={form.company} onChange={set('company')} />
                          </div>
                        </div>

                        {/* inquiry type */}
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                            Inquiry Type <span className="text-red-400">*</span>
                          </label>
                          <Select
                            value={form.inquiry}
                            onChange={set('inquiry')}
                            options={INQUIRY_OPTIONS}
                            placeholder="What can we help you with?"
                            icon={HelpCircle}
                          />
                        </div>

                        {/* subject */}
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Subject</label>
                          <Input icon={FileText} placeholder="Brief subject of your message" value={form.subject} onChange={set('subject')} />
                        </div>

                        {/* message */}
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                            Message <span className="text-red-400">*</span>
                          </label>
                          <Textarea rows={5} placeholder="Tell us more about how we can help you..." value={form.message} onChange={set('message')} />
                        </div>

                        {/* submit */}
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-xs text-gray-400 hidden sm:block">
                            <span className="text-red-400">*</span> Required fields
                          </p>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: canSubmit ? 1.03 : 1 }}
                            whileTap={{ scale: canSubmit ? 0.97 : 1 }}
                            disabled={!canSubmit || submitting}
                            className={`px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                              canSubmit
                                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {submitting ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                            ) : (
                              <><Send className="w-4 h-4" /> Send Message</>
                            )}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Glass>
            </motion.div>

            {/* ── sidebar (2 cols) ── */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="lg:col-span-2 space-y-6">

              {/* map card */}
              <motion.div variants={scaleIn}>
                <Glass className="overflow-hidden">
                  <div className="relative h-[220px] bg-gradient-to-br from-blue-100 to-sky-100">
                    <iframe
                      title="Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743959498746!2d77.21670231508!3d28.632997982416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      className="absolute inset-0 w-full h-full border-0 grayscale-[20%] opacity-90"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-semibold text-gray-900 mb-1">Our Office</h4>
                    <p className="text-sm text-gray-500">Block A, Connaught Place, New Delhi, Delhi 110001, India</p>
                  </div>
                </Glass>
              </motion.div>

              {/* business hours */}
              <motion.div variants={scaleIn} custom={1}>
                <Glass className="p-6 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-200/60 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shadow-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM', active: true },
                      { day: 'Saturday', time: '10:00 AM - 4:00 PM', active: true },
                      { day: 'Sunday', time: 'Closed', active: false },
                    ].map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{h.day}</span>
                        <span className={`font-medium ${h.active ? 'text-gray-900' : 'text-gray-400'}`}>
                          {h.active && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />}
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </Glass>
              </motion.div>

              {/* quick links */}
              <motion.div variants={scaleIn} custom={2}>
                <Glass className="p-6 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-200/60 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Need Quick Help?</h4>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Help Center & Documentation', href: '/help' },
                      { label: 'Community Forum', href: '/community' },
                      { label: 'System Status', href: '/status' },
                    ].map((l, i) => (
                      <Link
                        key={i}
                        href={l.href}
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 py-2 px-3 -mx-3 rounded-lg hover:bg-blue-50/60 transition-all group"
                      >
                        {l.label}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    ))}
                  </div>
                </Glass>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-blue-600 font-semibold text-sm tracking-[0.2em] uppercase mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Glass className="overflow-hidden hover:shadow-[0_12px_36px_rgba(59,130,246,0.08)] hover:border-blue-200/50">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900 text-[15px] pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"
                    >
                      <span className="text-blue-600 text-lg font-light leading-none">+</span>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Glass>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
        <motion.div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger} className="text-center max-w-2xl mx-auto">
            <motion.div variants={fadeUp} custom={0}>
              <Globe className="mx-auto mb-5 w-10 h-10 text-blue-200" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to start your GEM journey?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-blue-100/80 mb-8 font-light">
              Join 5,000+ businesses already succeeding with GEMPro
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-[15px] rounded-full font-semibold shadow-2xl shadow-black/10 transition-all duration-300 inline-flex items-center gap-2 group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/agents">
                <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-[15px] rounded-full font-medium transition-all duration-300">
                  Browse Experts
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
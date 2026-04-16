'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  X,
  CheckCircle2,
  Users,
  Filter,
  Sparkles,
  Clock,
  BadgeCheck,
  MessageSquare,
  CalendarDays,
  IndianRupee,
  FileText,
  Send,
  ChevronDown,
  Mail,
  Phone,
  Loader2,
} from 'lucide-react'

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* ─── sample agents data ─── */
const AGENTS = [
  { id: 1, name: 'Rajesh Kumar', location: 'Mumbai, MH', specialty: 'Product Listing', experience: '8 years', rating: 4.9, reviews: 142, projects: 340, verified: true, available: true, price: 1500, avatar: 'RK', tags: ['Product Listing', 'Catalog'] },
  { id: 2, name: 'Priya Sharma', location: 'Delhi, DL', specialty: 'Category Management', experience: '6 years', rating: 4.8, reviews: 98, projects: 215, verified: true, available: true, price: 1200, avatar: 'PS', tags: ['Category', 'Management'] },
  { id: 3, name: 'Amit Patel', location: 'Ahmedabad, GJ', specialty: 'Compliance Support', experience: '10 years', rating: 5.0, reviews: 203, projects: 520, verified: true, available: false, price: 2000, avatar: 'AP', tags: ['Compliance', 'Documentation'] },
  { id: 4, name: 'Sneha Reddy', location: 'Hyderabad, TS', specialty: 'Sales Optimization', experience: '5 years', rating: 4.7, reviews: 76, projects: 180, verified: true, available: true, price: 1800, avatar: 'SR', tags: ['Sales', 'Optimization'] },
  { id: 5, name: 'Vikram Singh', location: 'Jaipur, RJ', specialty: 'Tender Discovery', experience: '7 years', rating: 4.6, reviews: 64, projects: 150, verified: false, available: true, price: 1000, avatar: 'VS', tags: ['Tender', 'Discovery'] },
  { id: 6, name: 'Anita Desai', location: 'Pune, MH', specialty: 'Product Listing', experience: '4 years', rating: 4.5, reviews: 52, projects: 110, verified: true, available: true, price: 900, avatar: 'AD', tags: ['Product Listing', 'Pricing'] },
  { id: 7, name: 'Karan Mehta', location: 'Bangalore, KA', specialty: 'Category Management', experience: '9 years', rating: 4.9, reviews: 187, projects: 410, verified: true, available: true, price: 2200, avatar: 'KM', tags: ['Category', 'Strategy'] },
  { id: 8, name: 'Deepa Nair', location: 'Kochi, KL', specialty: 'Compliance Support', experience: '6 years', rating: 4.8, reviews: 91, projects: 200, verified: true, available: false, price: 1400, avatar: 'DN', tags: ['Compliance', 'Audit'] },
  { id: 9, name: 'Rohit Gupta', location: 'Lucknow, UP', specialty: 'Sales Optimization', experience: '3 years', rating: 4.4, reviews: 38, projects: 75, verified: false, available: true, price: 800, avatar: 'RG', tags: ['Sales', 'Analytics'] },
  { id: 10, name: 'Meera Joshi', location: 'Chennai, TN', specialty: 'Tender Discovery', experience: '7 years', rating: 4.7, reviews: 115, projects: 280, verified: true, available: true, price: 1600, avatar: 'MJ', tags: ['Tender', 'Government'] },
  { id: 11, name: 'Suresh Yadav', location: 'Bhopal, MP', specialty: 'Product Listing', experience: '5 years', rating: 4.6, reviews: 67, projects: 145, verified: true, available: true, price: 1100, avatar: 'SY', tags: ['Product Listing', 'Bulk Upload'] },
  { id: 12, name: 'Kavita Iyer', location: 'Coimbatore, TN', specialty: 'Category Management', experience: '8 years', rating: 4.8, reviews: 134, projects: 310, verified: true, available: true, price: 1700, avatar: 'KI', tags: ['Category', 'Mapping'] },
  { id: 13, name: 'Arjun Nair', location: 'Thiruvananthapuram, KL', specialty: 'Compliance Support', experience: '4 years', rating: 4.3, reviews: 29, projects: 60, verified: false, available: true, price: 750, avatar: 'AN', tags: ['Compliance', 'Filing'] },
  { id: 14, name: 'Pooja Agarwal', location: 'Kolkata, WB', specialty: 'Sales Optimization', experience: '6 years', rating: 4.9, reviews: 156, projects: 350, verified: true, available: false, price: 1900, avatar: 'PA', tags: ['Sales', 'Bidding'] },
  { id: 15, name: 'Nikhil Rao', location: 'Mysuru, KA', specialty: 'Tender Discovery', experience: '5 years', rating: 4.5, reviews: 48, projects: 95, verified: true, available: true, price: 1300, avatar: 'NR', tags: ['Tender', 'Research'] },
  { id: 16, name: 'Shalini Verma', location: 'Chandigarh, CH', specialty: 'Product Listing', experience: '7 years', rating: 4.7, reviews: 89, projects: 230, verified: true, available: true, price: 1450, avatar: 'SV', tags: ['Product Listing', 'SEO'] },
  { id: 17, name: 'Manish Tiwari', location: 'Indore, MP', specialty: 'Category Management', experience: '3 years', rating: 4.2, reviews: 22, projects: 45, verified: false, available: true, price: 650, avatar: 'MT', tags: ['Category', 'Setup'] },
  { id: 18, name: 'Ritu Kapoor', location: 'Noida, UP', specialty: 'Sales Optimization', experience: '9 years', rating: 4.9, reviews: 178, projects: 420, verified: true, available: true, price: 2500, avatar: 'RK', tags: ['Sales', 'Growth'] },
]

const SPECIALTIES = ['All', 'Product Listing', 'Category Management', 'Compliance Support', 'Sales Optimization', 'Tender Discovery']
const PER_PAGE = 6

/* ─── gradient map for avatars ─── */
const gradients = [
  'from-blue-500 to-sky-400',
  'from-sky-500 to-cyan-400',
  'from-indigo-500 to-blue-400',
  'from-blue-600 to-indigo-500',
  'from-cyan-500 to-blue-400',
]

/* ─── custom select component ─── */
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
        className={`w-full flex items-center justify-between gap-2 bg-white border rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none ${
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

/* ─── text input component ─── */
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />}
    <input
      {...props}
      className={`w-full bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:shadow-sm ${Icon ? 'pl-11 pr-4' : 'px-4'} py-3`}
    />
  </div>
)

/* ─── textarea component ─── */
const Textarea = ({ ...props }) => (
  <textarea
    {...props}
    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:shadow-sm resize-none"
  />
)

/* ─────────────────────────────────────────────
   CONNECT MODAL
   ───────────────────────────────────────────── */
const ENGAGEMENT_OPTIONS = [
  { value: 'one_time', label: 'One Time Project' },
  { value: 'need_basis', label: 'Need Basis (On-call)' },
  { value: 'full_time', label: 'Hire Full Time' },
]

const SERVICE_OPTIONS = [
  { value: 'product_listing', label: 'Product Listing' },
  { value: 'category_management', label: 'Category Management' },
  { value: 'compliance_support', label: 'Compliance Support' },
  { value: 'sales_optimization', label: 'Sales Optimization' },
  { value: 'tender_discovery', label: 'Tender Discovery' },
  { value: 'full_account', label: 'Full Account Management' },
]

const BUDGET_OPTIONS = [
  { value: 'under_5k', label: 'Under \u20B95,000' },
  { value: '5k_15k', label: '\u20B95,000 - \u20B915,000' },
  { value: '15k_50k', label: '\u20B915,000 - \u20B950,000' },
  { value: '50k_1l', label: '\u20B950,000 - \u20B91,00,000' },
  { value: 'above_1l', label: 'Above \u20B91,00,000' },
  { value: 'discuss', label: 'Open to Discussion' },
]

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent (Within a week)' },
  { value: '2_weeks', label: 'Within 2 Weeks' },
  { value: '1_month', label: 'Within 1 Month' },
  { value: '3_months', label: '1 - 3 Months' },
  { value: 'flexible', label: 'Flexible / Ongoing' },
]

const ConnectModal = ({ agent, onClose }) => {
  const [form, setForm] = useState({
    engagement: '',
    service: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: typeof val === 'object' && val.target ? val.target.value : val }))

  const canSubmit = form.engagement && form.service && form.name && form.email && form.description

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm" />

      {/* modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col"
      >
        {/* ── success state ── */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/25"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Your connection request has been sent to <span className="font-semibold text-gray-700">{agent.name}</span>. They will respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── header ── */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[agent.id % gradients.length]} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
              {agent.avatar}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                Connect with {agent.name}
                {agent.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
              </h2>
              <p className="text-sm text-gray-400">{agent.specialty} &middot; {agent.location}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── form body ── */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
          {/* engagement type */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Engagement Type <span className="text-red-400">*</span>
            </label>
            <Select
              value={form.engagement}
              onChange={set('engagement')}
              options={ENGAGEMENT_OPTIONS}
              placeholder="Select engagement type"
              icon={Briefcase}
            />
          </div>

          {/* service + budget in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Service Required <span className="text-red-400">*</span>
              </label>
              <Select
                value={form.service}
                onChange={set('service')}
                options={SERVICE_OPTIONS}
                placeholder="Select service"
                icon={FileText}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Budget Range
              </label>
              <Select
                value={form.budget}
                onChange={set('budget')}
                options={BUDGET_OPTIONS}
                placeholder="Select budget"
                icon={IndianRupee}
              />
            </div>
          </div>

          {/* timeline */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Expected Timeline
            </label>
            <Select
              value={form.timeline}
              onChange={set('timeline')}
              options={TIMELINE_OPTIONS}
              placeholder="Select timeline"
              icon={CalendarDays}
            />
          </div>

          {/* divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-widest">Your Details</span></div>
          </div>

          {/* name + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input icon={Users} placeholder="Your name" value={form.name} onChange={set('name')} />
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Phone
              </label>
              <Input icon={Phone} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Company / Organization
              </label>
              <Input icon={Briefcase} placeholder="Company name" value={form.company} onChange={set('company')} />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Project Description <span className="text-red-400">*</span>
            </label>
            <Textarea rows={3} placeholder="Briefly describe what you need help with on the GEM portal..." value={form.description} onChange={set('description')} />
          </div>
        </form>

        {/* ── footer ── */}
        <div className="px-7 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-400 hidden sm:block">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: canSubmit ? 1.03 : 1 }}
              whileTap={{ scale: canSubmit ? 0.97 : 1 }}
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                canSubmit
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Request</>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
            A G E N T S   P A G E
   ═══════════════════════════════════════════════ */
const AgentsPage = () => {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState('rating')
  const [page, setPage] = useState(1)
  const [connectAgent, setConnectAgent] = useState(null)

  /* ─── filter + sort ─── */
  const filtered = useMemo(() => {
    let list = [...AGENTS]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.specialty.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (specialty !== 'All') {
      list = list.filter((a) => a.specialty === specialty)
    }
    if (verifiedOnly) list = list.filter((a) => a.verified)
    if (availableOnly) list = list.filter((a) => a.available)

    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.reviews - a.reviews
      if (sortBy === 'price_low') return a.price - b.price
      if (sortBy === 'price_high') return b.price - a.price
      if (sortBy === 'projects') return b.projects - a.projects
      return 0
    })

    return list
  }, [search, specialty, verifiedOnly, availableOnly, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  /* reset page on filter change */
  useEffect(() => { setPage(1) }, [search, specialty, verifiedOnly, availableOnly, sortBy])

  const activeFilterCount = [verifiedOnly, availableOnly, specialty !== 'All'].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#f7f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ═══ HEADER ═══ */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        {/* bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50/50 to-[#f7f9ff]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle,#1e40af 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <motion.div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-blue-200/20 blur-[100px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-sky-200/20 blur-[100px]" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-blue-100/70 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200/50 mb-6">
              <Users className="w-4 h-4" /> {AGENTS.length} Experts Available
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Find Your <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">GEM Expert</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-gray-500 text-lg font-light">
              Connect with verified freelancers who specialize in Government e-Marketplace services
            </motion.p>
          </motion.div>

          {/* ── search bar ── */}
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-10 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-cyan-400/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(59,130,246,0.08)] group-focus-within:shadow-[0_12px_40px_rgba(59,130,246,0.14)] group-focus-within:border-blue-200/60 transition-all duration-300 overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-4.5 text-[15px] text-gray-800 placeholder:text-gray-400"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="mr-2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className={`mr-3 p-2.5 rounded-xl transition-all duration-200 relative ${showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFilterCount}</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* ── filters panel ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(59,130,246,0.06)] p-6">
                <div className="flex flex-wrap gap-6 items-end">
                  {/* sort */}
                  <div className="flex-1 min-w-[180px]">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-300 transition-colors"
                    >
                      <option value="rating">Highest Rating</option>
                      <option value="reviews">Most Reviews</option>
                      <option value="projects">Most Projects</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                  {/* toggles */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setVerifiedOnly((v) => !v)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${verifiedOnly ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      <BadgeCheck className="w-4 h-4" /> Verified
                    </button>
                    <button
                      onClick={() => setAvailableOnly((v) => !v)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${availableOnly ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      <Clock className="w-4 h-4" /> Available Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── specialty tabs ── */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  specialty === s
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/60 backdrop-blur-sm border border-white/50 text-gray-600 hover:bg-white hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── results info ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)}</span> of <span className="font-semibold text-gray-700">{filtered.length}</span> agents
          </p>
        </div>

        {/* ── agents grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${page}-${specialty}-${search}-${sortBy}-${verifiedOnly}-${availableOnly}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {paginated.length > 0 ? (
              paginated.map((agent, i) => (
                <motion.div key={agent.id} variants={scaleIn} custom={i}>
                  <div className="group relative rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl shadow-[0_8px_32px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    {/* hover glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 opacity-0 group-hover:opacity-[0.06] blur-3xl transition-opacity duration-700" />

                    <div className="p-6 relative z-10">
                      {/* top row: avatar + status */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[agent.id % gradients.length]} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                              {agent.avatar}
                            </div>
                            {agent.available && (
                              <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-400 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-[16px] font-semibold text-gray-900 flex items-center gap-1.5">
                              {agent.name}
                              {agent.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                            </h3>
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {agent.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-amber-700">{agent.rating}</span>
                        </div>
                      </div>

                      {/* specialty + experience */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50/80 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg">
                          <Briefcase className="w-3 h-3" /> {agent.specialty}
                        </span>
                        <span className="text-xs text-gray-400">{agent.experience}</span>
                      </div>

                      {/* stats row */}
                      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-gray-900">{agent.projects}</div>
                          <div className="text-[11px] text-gray-400 uppercase tracking-wide">Projects</div>
                        </div>
                        <div className="w-px h-8 bg-gray-100" />
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-gray-900">{agent.reviews}</div>
                          <div className="text-[11px] text-gray-400 uppercase tracking-wide">Reviews</div>
                        </div>
                        <div className="w-px h-8 bg-gray-100" />
                        <div className="text-center flex-1">
                          <div className="text-lg font-bold text-gray-900">{'\u20B9'}{agent.price}</div>
                          <div className="text-[11px] text-gray-400 uppercase tracking-wide">Per Project</div>
                        </div>
                      </div>

                      {/* tags */}
                      <div className="flex gap-1.5 mb-5">
                        {agent.tags.map((t) => (
                          <span key={t} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* actions */}
                      <div className="flex gap-2.5">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setConnectAgent(agent)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/15 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-1.5"
                        >
                          Connect <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                        >
                          <MessageSquare className="w-4.5 h-4.5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div variants={fadeUp} className="col-span-full text-center py-20">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No agents found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── pagination ── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                  page === p
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* ── connect modal ── */}
      <AnimatePresence>
        {connectAgent && (
          <ConnectModal agent={connectAgent} onClose={() => setConnectAgent(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AgentsPage


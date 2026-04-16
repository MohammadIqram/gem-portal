'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, 
  ArrowRight, Chrome, Briefcase, CheckCircle2,
  Sparkles, ShieldCheck 
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import { Checkbox } from '@/app/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
    terms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signup submitted:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#fcfdff] py-20 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
            <Sparkles size={16} />
            <span>The Premier GEM Freelance Network</span>
          </div>
          
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1]">
            Unlock the power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expertise.</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-md">
            Whether you're hiring top-tier talent or scaling your freelance business, we provide the tools to succeed on the GEM portal.
          </p>

          <div className="space-y-6 pt-4">
            {[
              { icon: <ShieldCheck className="text-green-500" />, title: "Verified Profiles", desc: "Every member is manually vetted for GEM compliance." },
              { icon: <CheckCircle2 className="text-blue-500" />, title: "Secure Workflow", desc: "Milestone-based payments and encrypted chat." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-800">{feature.title}</h4>
                  <p className="text-slate-500 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/90 backdrop-blur-md rounded-[2.5rem] p-2">
            <CardHeader className="pt-8 pb-4">
              <CardTitle className="text-3xl font-bold text-center text-slate-900">Get Started</CardTitle>
              <CardDescription className="text-center text-slate-500">
                Create your account in less than a minute.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Visual Role Selector */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-bold ml-1">Account Purpose</Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={(v) => setFormData(p => ({ ...p, userType: v }))}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label htmlFor="client-v2" className="cursor-pointer group">
                      <RadioGroupItem value="client" id="client-v2" className="sr-only" />
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 border-slate-100 group-has-[:checked]:border-blue-600 group-has-[:checked]:bg-blue-50/50 transition-all">
                        <Briefcase className="mb-2 text-slate-400 group-has-[:checked]:text-blue-600" />
                        <span className="font-bold text-slate-800">I'm a Client</span>
                      </div>
                    </Label>
                    <Label htmlFor="freelancer-v2" className="cursor-pointer group">
                      <RadioGroupItem value="freelancer" id="freelancer-v2" className="sr-only" />
                      <div className="flex flex-col items-center p-4 rounded-2xl border-2 border-slate-100 group-has-[:checked]:border-blue-600 group-has-[:checked]:bg-blue-50/50 transition-all">
                        <User className="mb-2 text-slate-400 group-has-[:checked]:text-blue-600" />
                        <span className="font-bold text-slate-800">I'm an Expert</span>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <Input id="name" name="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl bg-slate-50/50 border-slate-200" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <Input id="email" name="email" type="email" placeholder="john@company.com" className="pl-10 h-12 rounded-xl bg-slate-50/50 border-slate-200" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <Input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" className="pl-10 h-12 rounded-xl bg-slate-50/50 border-slate-200" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative group">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10" 
                      required 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-3 text-slate-400">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="space-y-2 relative group">
                    <Label htmlFor="confirmPassword">Confirm</Label>
                    <Input 
                      id="confirmPassword" 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      className="h-12 rounded-xl bg-slate-50/50 border-slate-200 pr-10" 
                      required 
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 bottom-3 text-slate-400">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="terms" className="rounded-md data-[state=checked]:bg-blue-600" required />
                  <label htmlFor="terms" className="text-xs text-slate-500 leading-tight cursor-pointer">
                    I agree to the <Link href="#" className="text-blue-600 font-bold">Terms of Service</Link> and <Link href="#" className="text-blue-600 font-bold">Privacy Policy</Link>.
                  </label>
                </div>

                <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-200 rounded-xl text-lg font-bold transition-all active:scale-95">
                  Create Account <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><Separator /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  <span className="bg-white px-4">Instant Access</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4">
                <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold"><Chrome className="mr-2" size={18} /> Google</Button>
                <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  GitHub
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50/50 border-t border-slate-100 py-6 rounded-b-[2.5rem]">
              <p className="w-full text-center text-slate-600">
                Already part of the network? {' '}
                <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage
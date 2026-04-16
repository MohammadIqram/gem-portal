'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import { Checkbox } from '@/app/components/ui/checkbox'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Login submitted:', formData)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#f8fafc] overflow-hidden py-12 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mt-24">
        
        {/* Left Side - Branding & Social Proof */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
                Pulse<span className="text-blue-600">Portal.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-md leading-relaxed">
                The unified gateway for GEM portal experts and high-growth enterprises.
              </p>
            </div>
            
            <div className="grid gap-6 pt-4">
              {[
                { title: "Centralized Hub", desc: "Every project, one dashboard." },
                { title: "Smart Matching", desc: "AI-driven expert connections." }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  key={i} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white/20 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden">
            <CardHeader className="pt-4 pb-4 space-y-2">
              <CardTitle className="text-4xl font-black text-center text-slate-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-slate-500 text-lg">
                Ready to continue your journey?
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-2 lg:px-8 pb-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      className="pl-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" title='password' className="text-slate-700 font-semibold">Password</Label>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot Password?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-14 bg-white/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-1">
                  <Checkbox id="remember" className="rounded-md border-slate-300 data-[state=checked]:bg-blue-600" />
                  <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer font-medium select-none">
                    Keep me logged in for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="flex items-center text-lg font-bold tracking-tight">
                      Sign In to Account
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><Separator /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/80 backdrop-blur-sm px-4 text-slate-400 font-bold tracking-widest">OR CONNECT WITH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-white hover:border-slate-300 transition-all font-semibold">
                  <Chrome className="mr-2 text-red-500" size={18} /> Google
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-white hover:border-slate-300 transition-all font-semibold">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg> GitHub
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50/80 border-t border-slate-100 p-6">
              <p className="w-full text-center text-slate-600 font-medium">
                New to the platform?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4">
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
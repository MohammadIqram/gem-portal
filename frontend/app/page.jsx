'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Users, ShoppingCart, ListChecks, TrendingUp, Shield, Clock, Briefcase, Target, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import MembershipCard from '@/app/components/MembershipCard'
import { Badge } from '@/app/components/ui/badge'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const HomePage = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Product Listing',
      description: 'Expert assistance in listing your products on the GEM portal with optimized descriptions and pricing.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ListChecks,
      title: 'Category Management',
      description: 'Professional category setup and management to ensure your products reach the right buyers.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Sales Optimization',
      description: 'Increase your sales with proven strategies and optimization techniques for the GEM marketplace.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: 'Compliance Support',
      description: 'Stay compliant with all GEM portal regulations and requirements with expert guidance.',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up as a client or freelancer in just a few clicks',
      icon: Users,
    },
    {
      number: '02',
      title: 'Choose Service',
      description: 'Select the GEM portal services you need or offer',
      icon: Briefcase,
    },
    {
      number: '03',
      title: 'Get Connected',
      description: 'Match with verified experts or clients instantly',
      icon: Target,
    },
    {
      number: '04',
      title: 'Achieve Success',
      description: 'Complete projects and grow your business on GEM',
      icon: Award,
    },
  ]

  const stats = [
    { value: '5000+', label: 'Active Users' },
    { value: '10,000+', label: 'Projects Completed' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'Support Available' },
  ]

  const membershipPlans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      icon: Users,
      popular: false,
      features: [
        'Access to freelancer marketplace',
        'Basic profile setup',
        'Standard support',
        '5 project listings per month',
        'Community access',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '₹999',
      description: 'Best for growing businesses',
      icon: Briefcase,
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited project listings',
        'Priority support',
        'Advanced analytics',
        'Featured profile',
        'Direct messaging',
        'Project management tools',
      ],
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      price: '₹2,999',
      description: 'For large organizations',
      icon: Award,
      popular: false,
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom integrations',
        'Team collaboration tools',
        'Advanced security features',
        'API access',
      ],
      cta: 'Contact Sales',
    },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm px-4 py-2">
                🚀 Your Gateway to GEM Portal Success
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight"
            >
              Connect with GEM Portal Experts
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Bridge the gap between businesses and skilled freelancers who excel at managing the Government e-Marketplace portal
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Background Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-3xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive GEM Portal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed on the Government e-Marketplace
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="text-white" size={28} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in four simple steps
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -translate-y-1/2" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <Card className="h-full bg-white hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: 'spring' }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl"
                      >
                        {step.number}
                      </motion.div>
                      <step.icon className="mx-auto mb-2 text-blue-600" size={32} />
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Preview Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect membership plan for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <MembershipCard key={index} plan={plan} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/membership">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                View All Plans
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your GEM Portal Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses and freelancers already succeeding on our platform
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg group"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
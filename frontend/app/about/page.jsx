'use client'

import { motion } from 'framer-motion'
import { Users, Target, Heart, Award, Zap, Shield, TrendingUp, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
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
      staggerChildren: 0.15,
    },
  },
}

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'We prioritize our clients and freelancers, ensuring their success is our success.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with enterprise-grade security.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Quick matching, rapid project completion, and seamless communication.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every freelancer is vetted to ensure top-notch service delivery.',
      color: 'from-purple-500 to-indigo-500',
    },
  ]

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    },
    {
      name: 'Amit Patel',
      role: 'Technical Lead',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Success',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    },
  ]

  const stats = [
    { icon: Users, value: '5,000+', label: 'Active Users' },
    { icon: TrendingUp, value: '10,000+', label: 'Projects Completed' },
    { icon: Globe, value: '28', label: 'States Covered' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-white/20 text-white hover:bg-white/30 text-sm px-4 py-2 backdrop-blur-sm">
                About GEM Connect
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Empowering Businesses with GEM Portal Expertise
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
            >
              We bridge the gap between businesses and skilled freelancers, making government e-marketplace success accessible to everyone.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="text-center">
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/50 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-3xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    To simplify and democratize access to the Government e-Marketplace by connecting businesses with verified, skilled freelancers who can navigate the GEM portal efficiently. We aim to empower small and medium enterprises to participate actively in government procurement.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-3xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 leading-relaxed">
                    To become India's leading platform for GEM portal services, creating a thriving ecosystem where businesses can effortlessly manage their government marketplace operations and freelancers can build successful careers helping them succeed.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                    >
                      <stat.icon className="text-white" size={28} />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}
                    >
                      <value.icon className="text-white" size={32} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to your success
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center border-0 shadow-lg overflow-hidden group">
                  <CardContent className="pt-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 group-hover:border-blue-400 transition-colors"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <Card className="border-0 shadow-lg p-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  GEM Connect was born from a simple observation: many businesses struggled to navigate the complexities of the Government e-Marketplace portal, while skilled freelancers with GEM expertise found it difficult to connect with clients who needed their services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Founded in 2023, we set out to create a platform that would bridge this gap, making it easy for businesses to find trusted GEM portal experts and for freelancers to build thriving careers in this niche.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we're proud to serve thousands of businesses and freelancers across India, facilitating successful GEM portal operations and contributing to the growth of government e-procurement in the country.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
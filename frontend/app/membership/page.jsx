'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Users, Briefcase, Award, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import MembershipCard from '@/app/components/MembershipCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const MembershipPage = () => {
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
        'Email notifications',
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
        'Custom branding',
        'API access',
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
        'White-label solution',
        'Custom contract terms',
        'Training & onboarding',
      ],
      cta: 'Contact Sales',
    },
  ]

  const comparisonFeatures = [
    { name: 'Project Listings', basic: '5/month', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Profile Views', basic: 'Basic', pro: 'Featured', enterprise: 'Premium' },
    { name: 'Support', basic: 'Email', pro: 'Priority', enterprise: '24/7 Dedicated' },
    { name: 'Analytics', basic: false, pro: true, enterprise: true },
    { name: 'Direct Messaging', basic: false, pro: true, enterprise: true },
    { name: 'API Access', basic: false, pro: true, enterprise: true },
    { name: 'Custom Branding', basic: false, pro: false, enterprise: true },
    { name: 'Team Collaboration', basic: false, pro: false, enterprise: true },
    { name: 'Account Manager', basic: false, pro: false, enterprise: true },
  ]

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for the Professional plan. No credit card required to start.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use enterprise-grade security measures and encryption to protect your data.',
    },
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
                <Sparkles className="inline mr-2" size={16} />
                Flexible Pricing Plans
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Choose the Perfect Plan for Your Needs
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 leading-relaxed"
            >
              Start free, scale as you grow. All plans include our core features.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <MembershipCard key={index} plan={plan} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-gray-600"
          >
            <p>All plans include a 30-day money-back guarantee</p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparePlansSection comparisonFeatures={comparisonFeatures} />

      {/* FAQ Section */}
      {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-white border-0 shadow-md rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section> */}
      <EnhancedFAQ faqs={faqs} />

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
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our team is here to help you choose the right plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-6 text-lg cursor-pointer"
              >
                Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-6 text-lg cursor-pointer"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MembershipPage

const ComparePlansSection = ({ comparisonFeatures }) => {
  return (
    <section className="py-24 relative bg-slate-50 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Compare our plans
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Find the perfect tier for your workflow. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          <Card className="overflow-hidden border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/5 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-6 font-semibold text-slate-900 w-1/3">
                      Features Overview
                    </th>
                    <th className="text-center p-6 font-semibold text-slate-600 w-1/5">
                      Basic
                    </th>
                    <th className="text-center p-0 font-semibold text-slate-900 w-1/5 relative">
                      {/* Highlighted Pro Header */}
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent border-x border-t border-blue-200 rounded-t-xl" />
                      <div className="relative pt-8 pb-6 px-4 flex flex-col items-center justify-center gap-2">
                        <span className="absolute -top-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                        <div className="flex items-center gap-1.5 text-blue-700">
                          Professional
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <Star size={16} className="text-amber-400 drop-shadow-sm" fill="currentColor" />
                          </motion.div>
                        </div>
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold text-slate-600 w-1/5">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group border-t border-slate-100 hover:bg-slate-50/80 transition-colors relative"
                    >
                      {/* Interactive hover border line */}
                      <td className="p-5 font-medium text-slate-700 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {feature.name}
                      </td>
                      
                      {/* Basic Column */}
                      <td className="text-center p-5">
                        <FeatureValue value={feature.basic} />
                      </td>

                      {/* Pro Column (Highlighted) */}
                      <td className="text-center p-5 relative bg-blue-50/30 group-hover:bg-blue-50/60 border-x border-blue-100/50 transition-colors">
                        <FeatureValue value={feature.pro} isHighlighted={true} />
                      </td>

                      {/* Enterprise Column */}
                      <td className="text-center p-5">
                        <FeatureValue value={feature.enterprise} />
                      </td>
                    </motion.tr>
                  ))}
                  
                  {/* Bottom rounded cap for the Pro column highlight */}
                  <tr>
                    <td className="p-0 border-0"></td>
                    <td className="p-0 border-0"></td>
                    <td className="p-0 border-0 h-4 bg-gradient-to-t from-blue-50 to-transparent border-x border-b border-blue-200 rounded-b-xl"></td>
                    <td className="p-0 border-0"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Helper component to cleanly render and animate the values
const FeatureValue = ({ value, isHighlighted = false }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
          isHighlighted ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
        }`}
      >
        <Check size={18} strokeWidth={2.5} />
      </motion.div>
    ) : (
      <div className="inline-flex items-center justify-center w-8 h-8">
        <X size={18} className="text-slate-300" strokeWidth={2} />
      </div>
    );
  }

  return (
    <span className={`font-medium ${isHighlighted ? 'text-blue-700 font-semibold' : 'text-slate-600'}`}>
      {value}
    </span>
  );
};

const EnhancedFAQ = ({ faqs }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
        <div className="aspect-square w-[500px] rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-100/50 rounded-full">
            Help Center
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Commonly Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about the platform. Can't find the answer? 
            <span className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">Contact our team.</span>
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="group bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm hover:shadow-md hover:border-blue-200 rounded-2xl px-2 transition-all duration-300"
                >
                  <AccordionTrigger className="flex flex-1 items-center justify-between py-6 px-4 font-semibold text-slate-800 hover:no-underline [&[data-state=open]>div>svg]:rotate-45">
                    <div className="flex items-center text-left gap-4">
                      <span className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white transition-colors duration-300">
                        {index + 1}
                      </span>
                      <span className="text-base md:text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0 transition-transform duration-300">
                      <Plus className="h-5 w-5 text-slate-400 group-data-[state=open]:text-blue-600" />
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-4 pb-6 sm:pl-16 text-slate-600 text-base leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
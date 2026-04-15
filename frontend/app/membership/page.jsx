'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Users, Briefcase, Award, Sparkles } from 'lucide-react'
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
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what's included in each plan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Feature</th>
                      <th className="text-center p-4 font-semibold text-gray-700">Basic</th>
                      <th className="text-center p-4 font-semibold text-gray-700">
                        <div className="flex items-center justify-center gap-2">
                          Professional
                          <Star size={16} className="text-yellow-500" fill="currentColor" />
                        </div>
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-700">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-700">{feature.name}</td>
                        <td className="text-center p-4">
                          {typeof feature.basic === 'boolean' ? (
                            feature.basic ? (
                              <Check className="inline text-green-600" size={20} />
                            ) : (
                              <X className="inline text-gray-300" size={20} />
                            )
                          ) : (
                            <span className="text-gray-600">{feature.basic}</span>
                          )}
                        </td>
                        <td className="text-center p-4 bg-blue-50/50">
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? (
                              <Check className="inline text-green-600" size={20} />
                            ) : (
                              <X className="inline text-gray-300" size={20} />
                            )
                          ) : (
                            <span className="text-gray-600 font-medium">{feature.pro}</span>
                          )}
                        </td>
                        <td className="text-center p-4">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <Check className="inline text-green-600" size={20} />
                            ) : (
                              <X className="inline text-gray-300" size={20} />
                            )
                          ) : (
                            <span className="text-gray-600">{feature.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our team is here to help you choose the right plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Contact Sales
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
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
'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'

const MembershipCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card className={`h-full relative overflow-hidden ${
        plan.popular ? 'border-blue-600 border-2 shadow-xl' : 'border-gray-200'
      }`}>
        {plan.popular && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
            <div className="flex items-center gap-1">
              <Star size={14} fill="currentColor" />
              Most Popular
            </div>
          </div>
        )}
        
        <CardHeader className="text-center pb-8 pt-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              plan.popular
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600'
                : 'bg-gradient-to-br from-gray-600 to-gray-700'
            }`}
          >
            <plan.icon className="text-white" size={32} />
          </motion.div>
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <CardDescription className="mt-2">{plan.description}</CardDescription>
          <div className="mt-6">
            <span className="text-4xl font-bold">{plan.price}</span>
            {plan.price !== 'Free' && <span className="text-gray-500">/month</span>}
          </div>
        </CardHeader>
        
        <CardContent>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-2"
              >
                <Check className={`flex-shrink-0 mt-0.5 ${
                  plan.popular ? 'text-blue-600' : 'text-green-600'
                }`} size={20} />
                <span className="text-sm text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="pt-6">
          <Button
            className={`w-full ${
              plan.popular
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gray-800 hover:bg-gray-900'
            }`}
          >
            {plan.cta}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MembershipCard
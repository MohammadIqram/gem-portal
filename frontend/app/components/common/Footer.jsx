'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Membership', href: '/membership' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'GEM Portal Management', href: '#' },
        { name: 'Product Listing', href: '#' },
        { name: 'Category Management', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                GEM Connect
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting businesses with expert GEM portal freelancers. Simplifying government e-marketplace operations for everyone.
              </p>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>contact@gemconnect.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} GEM Connect. All rights reserved.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
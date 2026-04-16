'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Sparkles } from 'lucide-react'

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
      <footer className="bg-gray-950 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">GEM<span className="text-sky-400">Pro</span></span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">Connecting businesses with GEM portal experts since 2023.</p>
            </div>
            {[
              { heading: 'Platform', items: ['Features', 'Pricing', 'About', 'Contact'] },
              { heading: 'Resources', items: ['Blog', 'Documentation', 'Help Center', 'API'] },
              { heading: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Compliance'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link href="#" className="text-sm hover:text-blue-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} GEMPro. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-blue-400 transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
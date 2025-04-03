"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { tabHoverVariant } from '../utils/animations';

const Header: FC = () => {
  const navItems = [
    { href: '#about', label: 'Sobre' },
    { href: '#news', label: 'Notícias' },
    { href: '#curriculum', label: 'Grade' },
    { href: '#resources', label: 'Recursos' },
    { href: '#services', label: 'Serviços' },
    { href: '#opportunities', label: 'Oportunidades' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contato' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            className="text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CACC
          </motion.a>

          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm text-white/80 hover:text-white rounded-md 
                          transition-all duration-300 ease-out"
                whileHover="hover"
                whileTap="tap"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
// src/components/sections/Programs.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Users, ArrowRight } from 'lucide-react'
import { getAllPrograms } from '@/lib/programs'

export default function Programs() {
  const allPrograms = getAllPrograms()
  // 메인 페이지에서는 최근 2개의 프로그램만 표시
  const programs = allPrograms.slice(0, 2)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              프로그램 소개
            </h2>
            <p className="text-lg text-gray-600">
              내면의 성장을 위한 다양한 프로그램을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {program.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program.participants}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    {program.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/programs/${program.id}`}
                  className="w-full group flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  자세히 알아보기
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              모든 프로그램 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
// src/components/sections/About.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award } from 'lucide-react'

const achievements = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "베스트셀러",
    description: "마음챙김의 시작 등 다수"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "명상 클래스",
    description: "1,000명 이상의 수강생"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "전문 경력",
    description: "15년 이상의 명상 지도"
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              마음의 평화를 찾는 여정
            </h2>
            <p className="text-lg text-gray-600">
              글쓰기와 명상을 통해 내면의 성장을 돕습니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 이미지 섹션 */}
            
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-100"
            >
                <Image
                    src="/images/author.jpg"
                    alt="작가 프로필"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </motion.div>

            {/* 텍스트 섹션 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                안녕하세요, <br />
                작가 이름입니다
              </h3>
              <p className="text-gray-600 leading-relaxed">
                20년간의 명상과 글쓰기 경험을 바탕으로, 많은 분들과 함께 내면의 성장을 이어가고 있습니다. 
                일상에서 실천할 수 있는 마음챙김과 글쓰기를 통해 자신을 이해하고 성장하는 방법을 나누고 있습니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                저서 『마음챙김의 시작』, 『일상의 명상』 등을 통해 더 많은 분들과 
                소통하고 있으며, 정기적인 명상 클래스와 글쓰기 워크샵을 진행하고 있습니다.
              </p>
            </motion.div>
          </div>

          {/* 성과 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {achievements.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
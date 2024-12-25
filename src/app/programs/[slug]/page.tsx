// src/app/programs/[slug]/page.tsx
import { getProgram } from '@/lib/programs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, CheckCircle } from 'lucide-react'

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = getProgram(params.slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            프로그램 목록으로
          </Link>

          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
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

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {program.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {program.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">프로그램 특징</h2>
                <div className="space-y-4">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">진행 정보</h2>
                <div className="space-y-4 text-gray-600">
                  <p>시작: {program.startDate}</p>
                  <p>기간: {program.duration}</p>
                  <p>정원: {program.participants}</p>
                  <p>수강료: {program.price}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">커리큘럼</h2>
              <div className="space-y-6">
                {program.curriculum.map((week) => (
                  <div key={week.week} className="border-l-4 border-gray-200 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {week.week}주차: {week.title}
                    </h3>
                    <p className="text-gray-600">{week.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
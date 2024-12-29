// src/app/programs/[slug]/ProgramDetailView.tsx
import { Clock, Users, Calendar, CreditCard } from 'lucide-react'
import { Program } from '@/types/program'

interface ProgramDetailViewProps {
  program: Program
}

export default function ProgramDetailView({ program }: ProgramDetailViewProps) {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Program Header */}
          <div className="mb-12">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm mb-4">
              {program.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{program.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{program.description}</p>

            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{program.participants}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{program.startDate} 시작</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>{program.price}</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <ProgramFeatures features={program.features} />

          {/* Curriculum Section */}
          <ProgramCurriculum curriculum={program.curriculum} />
        </div>
      </div>
    </div>
  )
}

function ProgramFeatures({ features }: { features: string[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">프로그램 특징</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-gray-900 mt-1">•</span>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgramCurriculum({ 
  curriculum 
}: { 
  curriculum: Array<{ week: number; title: string; description: string }> 
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">커리큘럼</h2>
      <div className="space-y-6">
        {curriculum.map((week) => (
          <div key={week.week} className="border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {week.week}주차: {week.title}
            </h3>
            <p className="text-gray-600">{week.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
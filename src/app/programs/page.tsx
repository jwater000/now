// src/app/programs/page.tsx
import { getAllPrograms } from '@/lib/programs'
import Link from 'next/link'
import { Clock, Users } from 'lucide-react'

export default function ProgramsPage() {
  const programs = getAllPrograms()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">프로그램</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {program.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/programs/${program.id}`}
                    className="inline-block w-full text-center py-3 px-6 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
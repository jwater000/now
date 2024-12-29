// src/app/programs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProgram } from '@/lib/programs'
import ProgramDetailView from './ProgramDetailView'

interface PageProps {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  const program = getProgram(params.slug)

  if (!program) {
    notFound()
  }

  return <ProgramDetailView program={program} />
}
// src/types/program.ts
export interface Program {
    slug: string;
    title: string;
    description: string;
    duration: string;
    participants: string;
    price: string;
    curriculum: Array<{
      week: number;
      title: string;
      description: string;
    }>;
    features: string[];
  }
  
  // src/lib/programs.ts
  import { Program } from '@/types/program'
  
  export const programs: Program[] = [
    {
      slug: 'mindfulness-meditation',
      title: '마음챙김 명상',
      description: '일상에서 실천하는 마음챙김 명상 프로그램',
      duration: '8주 과정',
      participants: '소규모 그룹 (최대 10명)',
      price: '480,000원',
      curriculum: [
        {
          week: 1,
          title: '마음챙김의 기초',
          description: '호흡 명상과 바디스캔을 통한 기초 다지기'
        },
        {
          week: 2,
          title: '일상 속 마음챙김',
          description: '걷기 명상과 일상 활동에서의 마음챙김'
        }
      ],
      features: [
        '주 1회 오프라인 모임',
        '데일리 명상 가이드',
        '개별 피드백 제공',
        '수료증 발급'
      ]
    }
  ]
  
  export function getProgram(slug: string): Program | undefined {
    return programs.find(program => program.slug === slug)
  }
  
  export function getAllPrograms(): Program[] {
    return programs
  }
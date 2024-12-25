// src/lib/programs.ts
export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  category: string;
  startDate: string;
  price: string;
  features: string[];
  curriculum: Array<{
    week: number;
    title: string;
    description: string;
  }>;
}

export const programs: Program[] = [
  {
    id: 'mindful-meditation',
    title: '마음챙김 명상',
    description: '일상에서 실천하는 마음챙김 명상 프로그램',
    duration: '8주 과정',
    participants: '소규모 그룹 (최대 10명)',
    category: '명상',
    startDate: '2024-02',
    price: '480,000원',
    features: [
      '주 1회 오프라인 모임',
      '데일리 명상 가이드',
      '개별 피드백 제공',
      '수료증 발급'
    ],
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
    ]
  },
  {
    id: 'writing-therapy',
    title: '치유의 글쓰기',
    description: '글쓰기를 통한 자아 탐색과 치유',
    duration: '6주 과정',
    participants: '10명 내외',
    category: '글쓰기',
    startDate: '2024-03',
    price: '360,000원',
    features: [
      '주간 글쓰기 과제',
      '그룹 피드백',
      '글쓰기 워크북 제공',
      '작품집 발간 기회'
    ],
    curriculum: [
      {
        week: 1,
        title: '나를 만나는 글쓰기',
        description: '자유로운 글쓰기를 통한 자아 탐색'
      },
      {
        week: 2,
        title: '감정 일기',
        description: '감정을 글로 담아내는 방법'
      }
    ]
  }
]

export function getProgram(id: string): Program | undefined {
  return programs.find(program => program.id === id)
}

export function getAllPrograms(): Program[] {
  return programs
}
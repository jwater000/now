// src/types/book.ts
export interface Book {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    publishDate: string;
    publisher: string;
    isbn: string;
    pages: number;
    price: string;
    coverImage: string;
    tableOfContents: string[];
    reviews: Array<{
      name: string;
      role: string;
      content: string;
    }>;
  }
  
  // src/lib/books.ts
  import { Book } from '@/types/book'
  
  export const books: Book[] = [
    {
      id: 'mindful-living',
      title: '마음챙김의 시작',
      subtitle: '일상에서 실천하는 마음챙김 명상',
      description: '바쁜 현대인들을 위한 실용적인 마음챙김 가이드. 일상의 순간에서 마음챙김을 실천하는 방법을 소개합니다.',
      publishDate: '2024-01',
      publisher: '마음출판사',
      isbn: '979-11-xxxxx-xx-x',
      pages: 248,
      price: '16,800원',
      coverImage: '/images/book-1.jpg',
      tableOfContents: [
        '제1장. 마음챙김이란 무엇인가',
        '제2장. 호흡 알아차리기',
        '제3장. 일상에서의 마음챙김',
        '제4장. 스트레스 다루기',
        '제5장. 관계 속의 마음챙김'
      ],
      reviews: [
        {
          name: '김철수',
          role: '심리학과 교수',
          content: '현대인의 삶에 꼭 필요한 마음챙김을 쉽고 실용적으로 풀어냈다.'
        }
      ]
    },
    {
      id: 'writing-therapy',
      title: '글쓰기로 치유하기',
      subtitle: '나를 만나는 글쓰기',
      description: '글쓰기를 통해 자신을 이해하고 치유하는 방법을 안내합니다.',
      publishDate: '2023-09',
      publisher: '마음출판사',
      isbn: '979-11-xxxxx-xx-x',
      pages: 232,
      price: '15,800원',
      coverImage: '/images/book-2.jpg',
      tableOfContents: [
        '제1장. 글쓰기와 치유',
        '제2장. 자유롭게 쓰기',
        '제3장. 감정 일기',
        '제4장. 편지 쓰기',
        '제5장. 시로 표현하기'
      ],
      reviews: [
        {
          name: '이영희',
          role: '작가',
          content: '글쓰기의 치유적 효과를 체계적으로 설명한 훌륭한 안내서'
        }
      ]
    }
  ]
  
  export function getBook(id: string): Book | undefined {
    return books.find(book => book.id === id)
  }
  
  export function getAllBooks(): Book[] {
    return books
  }
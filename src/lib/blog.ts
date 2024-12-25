// src/lib/blog.ts
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
    thumbnail: string;
    author: {
      name: string;
      image: string;
    };
  }
  
  export const blogPosts: BlogPost[] = [
    {
      slug: 'mindful-breathing',
      title: '마음챙김의 시작, 호흡에 집중하기',
      excerpt: '일상 속에서 쉽게 실천할 수 있는 호흡 명상법을 소개합니다. 바쁜 일상 속에서도 잠시 멈추어 자신의 호흡에 집중하는 것만으로도...',
      content: `
        # 마음챙김의 시작, 호흡에 집중하기
  
        일상 속에서 쉽게 실천할 수 있는 호흡 명상법을 소개합니다.
  
        ## 호흡 명상의 효과
        - 스트레스 감소
        - 집중력 향상
        - 불안감 해소
        - 수면의 질 개선
  
        ## 실천 방법
        1. 편안한 자세로 앉습니다
        2. 자연스러운 호흡에 집중합니다
        3. 들숨과 날숨을 관찰합니다
        4. 마음이 wandering하면 다시 호흡으로 돌아옵니다
      `,
      date: '2024-01-15',
      readTime: '5분',
      category: '명상',
      thumbnail: '/images/meditation-1.jpg',
      author: {
        name: '작가명',
        image: '/images/author.jpg'
      }
    }
  ]
  
  export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
  }
  
  export function getAllBlogPosts(): BlogPost[] {
    return blogPosts
  }
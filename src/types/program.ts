// src/types/program.ts
export interface Program {
  id: string;
  slug: string;
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

export interface ProgramListItem extends Pick<Program, 
  'id' | 
  'slug' | 
  'title' | 
  'description' | 
  'duration' | 
  'participants' | 
  'category' | 
  'features'
> {}

export interface ProgramDetail extends Program {
  nextStartDate?: string;
  availableSeats?: number;
  location?: string;
  prerequisites?: string[];
}
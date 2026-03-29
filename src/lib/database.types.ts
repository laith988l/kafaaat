export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          level: string;
          category: string;
          title: string;
          short_description: string;
          full_description: string;
          duration: string;
          hours: number;
          price: number;
          featured_image: string;
          outcomes: string[];
          syllabus: { title: string; desc: string }[];
          created_at: string;
        };
        Insert: {
          id: string;
          level: string;
          category: string;
          title: string;
          short_description: string;
          full_description: string;
          duration: string;
          hours: number;
          price: number;
          featured_image: string;
          outcomes: string[];
          syllabus: { title: string; desc: string }[];
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      feedback: {
        Row: {
          id: string;
          name: string | null;
          rating: number;
          category: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          rating: number;
          category?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['feedback']['Insert']>;
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          course_id: string | null;
          inquiry_type: string;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          course_id?: string | null;
          inquiry_type: string;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['inquiries']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

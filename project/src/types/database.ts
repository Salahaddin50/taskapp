export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          created_at: string;
          profile: {
            photo?: string;
            age?: number;
            country?: string;
            degree?: string;
            profession?: string;
            linkedIn?: string;
          } | null;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          created_at?: string;
          profile?: {
            photo?: string;
            age?: number;
            country?: string;
            degree?: string;
            profession?: string;
            linkedIn?: string;
          } | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          password_hash?: string;
          created_at?: string;
          profile?: {
            photo?: string;
            age?: number;
            country?: string;
            degree?: string;
            profession?: string;
            linkedIn?: string;
          } | null;
        };
      };
      targets: {
        Row: {
          id: string;
          title: string;
          description: string;
          category_id: string;
          subcategory_id: string;
          progress: number;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          category_id: string;
          subcategory_id: string;
          progress?: number;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category_id?: string;
          subcategory_id?: string;
          progress?: number;
          created_at?: string;
          user_id?: string;
        };
      };
      actions: {
        Row: {
          id: string;
          title: string;
          urgency: 'low' | 'medium' | 'high';
          impact: 'low' | 'medium' | 'high';
          progress: number;
          target_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          urgency: 'low' | 'medium' | 'high';
          impact: 'low' | 'medium' | 'high';
          progress?: number;
          target_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          urgency?: 'low' | 'medium' | 'high';
          impact?: 'low' | 'medium' | 'high';
          progress?: number;
          target_id?: string;
          created_at?: string;
        };
      };
      steps: {
        Row: {
          id: string;
          description: string;
          completed: boolean;
          progress: number;
          action_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          description: string;
          completed?: boolean;
          progress?: number;
          action_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          description?: string;
          completed?: boolean;
          progress?: number;
          action_id?: string;
          created_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          description: string;
          completed: boolean;
          deadline: string | null;
          step_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          description: string;
          completed?: boolean;
          deadline?: string | null;
          step_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          description?: string;
          completed?: boolean;
          deadline?: string | null;
          step_id?: string;
          created_at?: string;
        };
      };
      obstacles: {
        Row: {
          id: string;
          description: string;
          resolved: boolean;
          resolution: string | null;
          resolution_date: string | null;
          suggested_resolutions: string[] | null;
          action_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          description: string;
          resolved?: boolean;
          resolution?: string | null;
          resolution_date?: string | null;
          suggested_resolutions?: string[] | null;
          action_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          description?: string;
          resolved?: boolean;
          resolution?: string | null;
          resolution_date?: string | null;
          suggested_resolutions?: string[] | null;
          action_id?: string;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          target_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          target_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          target_id?: string;
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user1_id: string;
          user2_id: string;
          target_id: string | null;
          created_at: string;
          last_message_at: string;
        };
        Insert: {
          id: string;
          user1_id: string;
          user2_id: string;
          target_id?: string | null;
          created_at?: string;
          last_message_at?: string;
        };
        Update: {
          id?: string;
          user1_id?: string;
          user2_id?: string;
          target_id?: string | null;
          created_at?: string;
          last_message_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string;
          read_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_photos: {
        Row: {
          agent_id: string
          created_at: string
          credit_cost: number
          id: string
          photo_url: string
          thumbnail_url: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string
          credit_cost?: number
          id?: string
          photo_url: string
          thumbnail_url?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string
          credit_cost?: number
          id?: string
          photo_url?: string
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_photos_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agents: {
        Row: {
          avatar_url: string
          bio: string | null
          created_at: string
          description: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          kwai_url: string | null
          name: string
          tiktok_url: string | null
          updated_at: string
        }
        Insert: {
          avatar_url: string
          bio?: string | null
          created_at?: string
          description: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          kwai_url?: string | null
          name: string
          tiktok_url?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string
          bio?: string | null
          created_at?: string
          description?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          kwai_url?: string | null
          name?: string
          tiktok_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      audio_credit_products: {
        Row: {
          created_at: string
          credits: number
          id: string
          name: string
          paypal_plan_id: string | null
          price: number
        }
        Insert: {
          created_at?: string
          credits: number
          id?: string
          name: string
          paypal_plan_id?: string | null
          price: number
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          name?: string
          paypal_plan_id?: string | null
          price?: number
        }
        Relationships: []
      }
      audio_credit_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          paypal_session_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          paypal_session_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          paypal_session_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          audio_input_url: string | null
          chat_id: string
          created_at: string
          error_message: string | null
          id: string
          llm_response_text: string | null
          message_type: string
          response_audio_url: string | null
          status: Database["public"]["Enums"]["message_status"]
          text_content: string | null
          transcription: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_input_url?: string | null
          chat_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          llm_response_text?: string | null
          message_type: string
          response_audio_url?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          text_content?: string | null
          transcription?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_input_url?: string | null
          chat_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          llm_response_text?: string | null
          message_type?: string
          response_audio_url?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          text_content?: string | null
          transcription?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_packages: {
        Row: {
          created_at: string
          credits_amount: number
          description: string | null
          id: string
          price_in_cents: number
        }
        Insert: {
          created_at?: string
          credits_amount: number
          description?: string | null
          id?: string
          price_in_cents: number
        }
        Update: {
          created_at?: string
          credits_amount?: number
          description?: string | null
          id?: string
          price_in_cents?: number
        }
        Relationships: []
      }
      gifts: {
        Row: {
          credit_cost: number
          description: string
          id: string
          image_url: string
          name: string
          paypal_plan_id: string | null
        }
        Insert: {
          credit_cost?: number
          description: string
          id?: string
          image_url: string
          name: string
          paypal_plan_id?: string | null
        }
        Update: {
          credit_cost?: number
          description?: string
          id?: string
          image_url?: string
          name?: string
          paypal_plan_id?: string | null
        }
        Relationships: []
      }
      picpay_payments: {
        Row: {
          created_at: string
          id: number
          picpay_authorization_id: string | null
          plan_id: string | null
          reference_id: string
          status: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          picpay_authorization_id?: string | null
          plan_id?: string | null
          reference_id: string
          status?: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          picpay_authorization_id?: string | null
          plan_id?: string | null
          reference_id?: string
          status?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "picpay_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_credits_config: {
        Row: {
          created_at: string
          id: string
          initial_audio_credits: number
          initial_voice_credits: number
          plan_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          initial_audio_credits?: number
          initial_voice_credits?: number
          plan_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          initial_audio_credits?: number
          initial_voice_credits?: number
          plan_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          description: string
          features: Json
          id: string
          name: string
          paypal_plan_id: string | null
          price: number
          trial_days: number | null
        }
        Insert: {
          description: string
          features: Json
          id?: string
          name: string
          paypal_plan_id?: string | null
          price: number
          trial_days?: number | null
        }
        Update: {
          description?: string
          features?: Json
          id?: string
          name?: string
          paypal_plan_id?: string | null
          price?: number
          trial_days?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          asaas_customer_id: string | null
          avatar_url: string | null
          cpf: string | null
          created_at: string
          credits: number
          full_name: string | null
          id: string
          phone: string | null
          plan_active: boolean | null
          plan_name: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          text_access_expires_at: string | null
          updated_at: string
        }
        Insert: {
          asaas_customer_id?: string | null
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          credits?: number
          full_name?: string | null
          id: string
          phone?: string | null
          plan_active?: boolean | null
          plan_name?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          text_access_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          asaas_customer_id?: string | null
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          credits?: number
          full_name?: string | null
          id?: string
          phone?: string | null
          plan_active?: boolean | null
          plan_name?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          text_access_expires_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          plan_id: string
          plan_name: string | null
          start_date: string
          status: string
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: string
          plan_name?: string | null
          start_date?: string
          status: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          plan_name?: string | null
          start_date?: string
          status?: string
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          picpay_reference_id: string
          product_details: Json | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          picpay_reference_id: string
          product_details?: Json | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          picpay_reference_id?: string
          product_details?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_audio_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_purchased_gifts: {
        Row: {
          asaas_payment_id: string | null
          credit_cost: number
          gift_id: string
          id: string
          purchase_date: string
          user_id: string
        }
        Insert: {
          asaas_payment_id?: string | null
          credit_cost: number
          gift_id: string
          id?: string
          purchase_date?: string
          user_id: string
        }
        Update: {
          asaas_payment_id?: string | null
          credit_cost?: number
          gift_id?: string
          id?: string
          purchase_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_purchased_gifts_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_selected_agent: {
        Row: {
          agent_id: string
          created_at: string
          id: string
          nickname: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          id?: string
          nickname: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          id?: string
          nickname?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_selected_agent_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      user_trials: {
        Row: {
          created_at: string
          id: string
          trial_active: boolean
          trial_end: string
          trial_start: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          trial_active?: boolean
          trial_end?: string
          trial_start?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          trial_active?: boolean
          trial_end?: string
          trial_start?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_voice_credits: {
        Row: {
          created_at: string
          credits: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      voice_credit_products: {
        Row: {
          created_at: string
          credits: number
          id: string
          name: string
          paypal_plan_id: string | null
          price: number
        }
        Insert: {
          created_at?: string
          credits: number
          id?: string
          name: string
          paypal_plan_id?: string | null
          price: number
        }
        Update: {
          created_at?: string
          credits?: number
          id?: string
          name?: string
          paypal_plan_id?: string | null
          price?: number
        }
        Relationships: []
      }
      voice_credit_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          paypal_session_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          paypal_session_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          paypal_session_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_audio_credits: {
        Args: { credit_amount: number; session_id?: string; user_uuid: string }
        Returns: boolean
      }
      add_voice_credits: {
        Args: { credit_amount: number; session_id?: string; user_uuid: string }
        Returns: boolean
      }
      check_subscription_trial_status: {
        Args: { p_user_id: string }
        Returns: {
          hours_remaining: number
          is_active: boolean
          trial_ends_at: string
        }[]
      }
      consume_audio_credit: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      consume_voice_credit: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      decrement_user_credits: {
        Args: { credits_to_deduct: number; user_id_param: string }
        Returns: boolean
      }
      get_agent_photos: {
        Args: { p_agent_id: string }
        Returns: {
          credit_cost: number
          id: string
          photo_url: string
          thumbnail_url: string
        }[]
      }
      give_plan_credits: {
        Args: { plan_name_param: string; user_uuid: string }
        Returns: boolean
      }
      increment_user_credits: {
        Args: { credits_to_add: number; user_id_param: string }
        Returns: boolean
      }
      is_trial_active: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      start_trial: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      upgrade_plan_with_credits: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      upgrade_to_text_audio_with_subscription: {
        Args: { p_plan_id: number; p_user_id: string } | { p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      message_status:
        | "processing"
        | "transcribed"
        | "generating_response"
        | "completed"
        | "error"
      message_type:
        | "text_input"
        | "audio_input"
        | "text_output"
        | "audio_output"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      message_status: [
        "processing",
        "transcribed",
        "generating_response",
        "completed",
        "error",
      ],
      message_type: [
        "text_input",
        "audio_input",
        "text_output",
        "audio_output",
      ],
    },
  },
} as const

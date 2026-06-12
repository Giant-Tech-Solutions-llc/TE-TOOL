// ============================================================================
// types/supabase.ts  —  GENERATED from the live taper-empire-production schema.
// Regenerate after any migration:
//   npx supabase gen types typescript --project-id huxryszbzyprmfykumsf > types/supabase.ts
// Convenience aliases used by the API routes are appended at the bottom.
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      email_sends: {
        Row: {
          created_at: string
          delivered_at: string | null
          email: string
          error: string | null
          first_clicked_at: string | null
          id: string
          lead_id: string | null
          opened_at: string | null
          provider: string | null
          provider_id: string | null
          scheduled_for: string | null
          sent_at: string | null
          status: string
          subject: string | null
          template_key: string
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          email: string
          error?: string | null
          first_clicked_at?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          provider?: string | null
          provider_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_key: string
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          email?: string
          error?: string | null
          first_clicked_at?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          provider?: string | null
          provider_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_events: {
        Row: {
          created_at: string
          email: string
          event_type: string
          id: string
          lead_id: string | null
          payload: Json | null
        }
        Insert: {
          created_at?: string
          email: string
          event_type: string
          id?: string
          lead_id?: string | null
          payload?: Json | null
        }
        Update: {
          created_at?: string
          email?: string
          event_type?: string
          id?: string
          lead_id?: string | null
          payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          consent_at: string | null
          consent_ip: unknown
          consent_marketing: boolean
          consent_terms: boolean
          consent_user_agent: string | null
          created_at: string
          day1_sent_at: string | null
          day10_sent_at: string | null
          day14_sent_at: string | null
          day2_sent_at: string | null
          day21_sent_at: string | null
          day5_sent_at: string | null
          email: string
          flow: string | null
          id: string
          landing_path: string | null
          last_sent_at: string | null
          lifecycle_stage: string | null
          metadata: Json | null
          name: string | null
          quiz_complete: boolean | null
          referrer_id: string | null
          self_id: string | null
          share_token: string | null
          status: string
          top_score: number | null
          top_style: string | null
          unsubscribe_token: string
          unsubscribed_at: string | null
          updated_at: string
          upload_method: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          consent_at?: string | null
          consent_ip?: unknown
          consent_marketing?: boolean
          consent_terms?: boolean
          consent_user_agent?: string | null
          created_at?: string
          day1_sent_at?: string | null
          day10_sent_at?: string | null
          day14_sent_at?: string | null
          day2_sent_at?: string | null
          day21_sent_at?: string | null
          day5_sent_at?: string | null
          email: string
          flow?: string | null
          id?: string
          landing_path?: string | null
          last_sent_at?: string | null
          lifecycle_stage?: string | null
          metadata?: Json | null
          name?: string | null
          quiz_complete?: boolean | null
          referrer_id?: string | null
          self_id?: string | null
          share_token?: string | null
          status?: string
          top_score?: number | null
          top_style?: string | null
          unsubscribe_token?: string
          unsubscribed_at?: string | null
          updated_at?: string
          upload_method?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          consent_at?: string | null
          consent_ip?: unknown
          consent_marketing?: boolean
          consent_terms?: boolean
          consent_user_agent?: string | null
          created_at?: string
          day1_sent_at?: string | null
          day10_sent_at?: string | null
          day14_sent_at?: string | null
          day2_sent_at?: string | null
          day21_sent_at?: string | null
          day5_sent_at?: string | null
          email?: string
          flow?: string | null
          id?: string
          landing_path?: string | null
          last_sent_at?: string | null
          lifecycle_stage?: string | null
          metadata?: Json | null
          name?: string | null
          quiz_complete?: boolean | null
          referrer_id?: string | null
          self_id?: string | null
          share_token?: string | null
          status?: string
          top_score?: number | null
          top_style?: string | null
          unsubscribe_token?: string
          unsubscribed_at?: string | null
          updated_at?: string
          upload_method?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Row"]

export type TablesInsert<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Insert"]

export type TablesUpdate<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Update"]

// ---- Convenience aliases consumed by the API routes ----
export type Lead = Tables<'leads'>
export type LeadInsert = TablesInsert<'leads'>
export type LeadEventInsert = TablesInsert<'lead_events'>
export type EmailSendInsert = TablesInsert<'email_sends'>

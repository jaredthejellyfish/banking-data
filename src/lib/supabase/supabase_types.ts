export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number | null
          created_at: string
          id: string
          institution: string | null
          mask: string
          name: string
          subtype: string
          type: string
          updated_at: string
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string
          id: string
          institution?: string | null
          mask: string
          name: string
          subtype: string
          type: string
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string
          id?: string
          institution?: string | null
          mask?: string
          name?: string
          subtype?: string
          type?: string
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string | null
          amount: number
          authorized_date: string | null
          authorized_datetime: string | null
          check_number: string | null
          counterparties: string[] | null
          created_at: string
          date: string
          datetime: string | null
          id: string
          iso_currency_code: string | null
          location: Json | null
          logo_url: string | null
          merchant_entity_id: string | null
          merchant_name: string | null
          name: string
          payment_channel: string | null
          payment_meta: Json | null
          pending: boolean | null
          pending_transaction_id: string | null
          personal_finance_category: Json | null
          personal_finance_category_icon_url: string | null
          transaction_code: string | null
          unofficial_currency_code: string | null
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          authorized_date?: string | null
          authorized_datetime?: string | null
          check_number?: string | null
          counterparties?: string[] | null
          created_at?: string
          date: string
          datetime?: string | null
          id?: string
          iso_currency_code?: string | null
          location?: Json | null
          logo_url?: string | null
          merchant_entity_id?: string | null
          merchant_name?: string | null
          name: string
          payment_channel?: string | null
          payment_meta?: Json | null
          pending?: boolean | null
          pending_transaction_id?: string | null
          personal_finance_category?: Json | null
          personal_finance_category_icon_url?: string | null
          transaction_code?: string | null
          unofficial_currency_code?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          authorized_date?: string | null
          authorized_datetime?: string | null
          check_number?: string | null
          counterparties?: string[] | null
          created_at?: string
          date?: string
          datetime?: string | null
          id?: string
          iso_currency_code?: string | null
          location?: Json | null
          logo_url?: string | null
          merchant_entity_id?: string | null
          merchant_name?: string | null
          name?: string
          payment_channel?: string | null
          payment_meta?: Json | null
          pending?: boolean | null
          pending_transaction_id?: string | null
          personal_finance_category?: Json | null
          personal_finance_category_icon_url?: string | null
          transaction_code?: string | null
          unofficial_currency_code?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          created_at: string
          expires: string | null
          id: string
          token: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires?: string | null
          id?: string
          token: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires?: string | null
          id?: string
          token?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

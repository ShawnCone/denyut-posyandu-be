export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      AccountInfo: {
        Row: {
          address: string | null
          birthCity: string | null
          birthProvince: string | null
          createdAt: string
          dateOfBirth: string | null
          education: string | null
          id: string
          name: string
          photoURL: string | null
          religion: string | null
          sex: Database["public"]["Enums"]["sex_enum"]
        }
        Insert: {
          address?: string | null
          birthCity?: string | null
          birthProvince?: string | null
          createdAt?: string
          dateOfBirth?: string | null
          education?: string | null
          id: string
          name?: string
          photoURL?: string | null
          religion?: string | null
          sex: Database["public"]["Enums"]["sex_enum"]
        }
        Update: {
          address?: string | null
          birthCity?: string | null
          birthProvince?: string | null
          createdAt?: string
          dateOfBirth?: string | null
          education?: string | null
          id?: string
          name?: string
          photoURL?: string | null
          religion?: string | null
          sex?: Database["public"]["Enums"]["sex_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "AccountInfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "AccountInfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "usersphone"
            referencedColumns: ["id"]
          }
        ]
      }
      KidBodilyGrowth: {
        Row: {
          armCirc: number | null
          createdAt: string
          createdBy: string | null
          headCirc: number | null
          height: number
          kidId: string
          measurementDate: string
          outpostRecordMonthIdx: number
          outpostRecordYear: number
          recordId: string
          weight: number
        }
        Insert: {
          armCirc?: number | null
          createdAt?: string
          createdBy?: string | null
          headCirc?: number | null
          height: number
          kidId: string
          measurementDate: string
          outpostRecordMonthIdx: number
          outpostRecordYear: number
          recordId?: string
          weight: number
        }
        Update: {
          armCirc?: number | null
          createdAt?: string
          createdBy?: string | null
          headCirc?: number | null
          height?: number
          kidId?: string
          measurementDate?: string
          outpostRecordMonthIdx?: number
          outpostRecordYear?: number
          recordId?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "KidBodilyGrowth_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "AccountInfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "KidBodilyGrowth_kidId_fkey"
            columns: ["kidId"]
            isOneToOne: false
            referencedRelation: "KidInfo"
            referencedColumns: ["id"]
          }
        ]
      }
      KidImmunization: {
        Row: {
          createdAt: string | null
          createdBy: string | null
          kidId: string | null
          recordId: string
          siteName: string
          siteType: string
          vaccineDate: string | null
          vaccineName: string | null
        }
        Insert: {
          createdAt?: string | null
          createdBy?: string | null
          kidId?: string | null
          recordId?: string
          siteName?: string
          siteType?: string
          vaccineDate?: string | null
          vaccineName?: string | null
        }
        Update: {
          createdAt?: string | null
          createdBy?: string | null
          kidId?: string | null
          recordId?: string
          siteName?: string
          siteType?: string
          vaccineDate?: string | null
          vaccineName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "KidImmunization_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "AccountInfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "KidImmunization_kidId_fkey"
            columns: ["kidId"]
            isOneToOne: false
            referencedRelation: "KidInfo"
            referencedColumns: ["id"]
          }
        ]
      }
      KidInfo: {
        Row: {
          birthCity: string
          birthHeight: number | null
          birthProvince: string
          birthWeight: number | null
          createdAt: string
          dateOfBirth: string
          fatherName: string | null
          hasKMSBook: boolean
          id: string
          motherName: string | null
          name: string
          photoURL: string | null
          sex: Database["public"]["Enums"]["sex_enum"]
        }
        Insert: {
          birthCity: string
          birthHeight?: number | null
          birthProvince: string
          birthWeight?: number | null
          createdAt?: string
          dateOfBirth: string
          fatherName?: string | null
          hasKMSBook?: boolean
          id?: string
          motherName?: string | null
          name: string
          photoURL?: string | null
          sex: Database["public"]["Enums"]["sex_enum"]
        }
        Update: {
          birthCity?: string
          birthHeight?: number | null
          birthProvince?: string
          birthWeight?: number | null
          createdAt?: string
          dateOfBirth?: string
          fatherName?: string | null
          hasKMSBook?: boolean
          id?: string
          motherName?: string | null
          name?: string
          photoURL?: string | null
          sex?: Database["public"]["Enums"]["sex_enum"]
        }
        Relationships: []
      }
      OutpostInfo: {
        Row: {
          city: string
          createdAt: string | null
          id: string
          kecamatan: string | null
          kelurahan: string | null
          name: string
          province: string
          rw: string | null
        }
        Insert: {
          city: string
          createdAt?: string | null
          id?: string
          kecamatan?: string | null
          kelurahan?: string | null
          name: string
          province: string
          rw?: string | null
        }
        Update: {
          city?: string
          createdAt?: string | null
          id?: string
          kecamatan?: string | null
          kelurahan?: string | null
          name?: string
          province?: string
          rw?: string | null
        }
        Relationships: []
      }
      OutpostKids: {
        Row: {
          createdAt: string | null
          kidId: string
          outpostId: string
          submittedById: string | null
        }
        Insert: {
          createdAt?: string | null
          kidId: string
          outpostId: string
          submittedById?: string | null
        }
        Update: {
          createdAt?: string | null
          kidId?: string
          outpostId?: string
          submittedById?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "OutpostKids_kidId_fkey"
            columns: ["kidId"]
            isOneToOne: false
            referencedRelation: "KidInfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OutpostKids_outpostId_fkey"
            columns: ["outpostId"]
            isOneToOne: false
            referencedRelation: "OutpostInfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OutpostKids_submittedById_fkey"
            columns: ["submittedById"]
            isOneToOne: false
            referencedRelation: "AccountInfo"
            referencedColumns: ["id"]
          }
        ]
      }
      OutpostMembership: {
        Row: {
          accountId: string
          createdAt: string | null
          outpostId: string
          role: Database["public"]["Enums"]["membership_role_enum"]
          role_old: string | null
          status: Database["public"]["Enums"]["membership_status_enum"]
        }
        Insert: {
          accountId: string
          createdAt?: string | null
          outpostId: string
          role?: Database["public"]["Enums"]["membership_role_enum"]
          role_old?: string | null
          status?: Database["public"]["Enums"]["membership_status_enum"]
        }
        Update: {
          accountId?: string
          createdAt?: string | null
          outpostId?: string
          role?: Database["public"]["Enums"]["membership_role_enum"]
          role_old?: string | null
          status?: Database["public"]["Enums"]["membership_status_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "OutpostMembership_accountId_fkey"
            columns: ["accountId"]
            isOneToOne: false
            referencedRelation: "AccountInfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OutpostMembership_outpostId_fkey"
            columns: ["outpostId"]
            isOneToOne: false
            referencedRelation: "OutpostInfo"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      usersphone: {
        Row: {
          id: string | null
          phone: string | null
        }
        Insert: {
          id?: string | null
          phone?: string | null
        }
        Update: {
          id?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      getoutpostmemberslist: {
        Args: {
          inoutpostid: string
        }
        Returns: Record<string, unknown>[]
      }
      is_outpost_member_for_kid_id_bodily_growth_security_definer: {
        Args: {
          kid_id: string
          user_id: string
        }
        Returns: boolean
      }
      is_outpost_member_for_kid_id_security_definer: {
        Args: {
          kid_id: string
          user_id: string
        }
        Returns: boolean
      }
      is_outpost_member_security_definer: {
        Args: {
          outpost_id: string
          user_id: string
        }
        Returns: boolean
      }
      is_outpost_owner_security_definer: {
        Args: {
          outpost_id: string
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      membership_role_enum: "owner" | "member"
      membership_status_enum: "pending" | "approved"
      sex_enum: "male" | "female"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

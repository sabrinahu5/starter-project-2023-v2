export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          biography: string | null;
          display_name: string | null;
          email: string | null;
          id: string;
        };
        Insert: {
          biography?: string | null;
          display_name?: string | null;
          email?: string | null;
          id: string;
        };
        Update: {
          biography?: string | null;
          display_name?: string | null;
          email?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      species: {
        Row: {
          author: string;
          common_name: string | null;
          continents: Database["public"]["Enums"]["continent"][] | null;
          description: string | null;
          id: number;
          kingdom: Database["public"]["Enums"]["kingdom"];
          oceans: Database["public"]["Enums"]["ocean"][] | null;
          scientific_name: string;
          total_population: number | null;
        };
        Insert: {
          author: string;
          common_name?: string | null;
          continents?: Database["public"]["Enums"]["continent"][] | null;
          description?: string | null;
          id?: number;
          kingdom: Database["public"]["Enums"]["kingdom"];
          oceans?: Database["public"]["Enums"]["ocean"][] | null;
          scientific_name: string;
          total_population?: number | null;
        };
        Update: {
          author?: string;
          common_name?: string | null;
          continents?: Database["public"]["Enums"]["continent"][] | null;
          description?: string | null;
          id?: number;
          kingdom?: Database["public"]["Enums"]["kingdom"];
          oceans?: Database["public"]["Enums"]["ocean"][] | null;
          scientific_name?: string;
          total_population?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "species_author_fkey";
            columns: ["author"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      continent: "North America" | "South America" | "Europe" | "Africa" | "Asia" | "Australia" | "Antarctica";
      kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
      ocean: "Pacific" | "Atlantic" | "Indian" | "Arctic" | "Southern";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

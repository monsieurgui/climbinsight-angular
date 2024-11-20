export interface League {
  id?: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description?: string;
  categories: string[];
  ranking_system: Record<string, any>;
  qualification_criteria: Record<string, any>;
  athletes: number[];
  officials: number[];
  technical_delegates: number[];
  governing_body?: string;
  sanctioning_body?: string;
  seasonal_statistics: Record<string, any>;
  historical_records: Record<string, any>;
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at?: Date;
  updated_at?: Date;
  is_active: boolean;
}

export interface LeagueSummary {
  total_competitions: number;
  active_competitions: number;
  total_participants: number;
  categories_distribution: Record<string, number>;
}

export interface BulkLeagueIds {
  ids: number[];
} 
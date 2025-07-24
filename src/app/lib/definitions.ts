// Domain Types - Shared across components
export interface AnimeData {
  id: number;
  title: {
    english: string | null;
    romaji: string | null;
  };
  description: string | null;
  coverImage: {
    large: string | null;
  };
  bannerImage: string | null;
  averageScore: number | null;
  episodes: number | null;
  duration: number | null;
  genres: string[] | null;
  startDate: {
    month: number | null;
    year: number | null;
  } | null;
  endDate: {
    month: number | null;
    year: number | null;
  } | null;
  status: string | null;
}

// API Response Types
export interface AnimePageResponse {
  data: {
    Page: {
      media: AnimeData[];
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
    };
  };
}

// User Profile Types
export interface UserProfile {
  username: string;
  jobTitle: string;
}

// Pagination Types
export interface PaginationInfo {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
  total: number;
}
  
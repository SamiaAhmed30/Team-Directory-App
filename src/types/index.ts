export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'role-asc' | 'role-desc';

export interface SortDropdownOption {
  value: SortOption;
  label: string;
}
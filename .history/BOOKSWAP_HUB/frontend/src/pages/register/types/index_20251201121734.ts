export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  favoriteGenres?: string;
  readingInterests?: string;
  agreeToTerms?: string;
  agreeToPrivacy?: string;
}

export interface GenreOption {
  value: string;
  label: string;
}

export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}
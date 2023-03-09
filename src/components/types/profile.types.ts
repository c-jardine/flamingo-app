export type Profile = {
  id?: string;
  avatar_url: string;
  birthday: Date;
  first_name: string;
  last_name: string;
  profile_is_valid: boolean;
  updated_at?: Date;
  website: string;
};

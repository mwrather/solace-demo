export enum QUERY_KEYS {
  ADVOCATES_LIST = 'advocates-list',
}

export type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

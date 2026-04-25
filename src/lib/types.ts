export interface FamilyInputs {
  childAge: 'Infant' | 'Toddler' | 'Preschool' | 'School Age' | '';
  date: string;
  time: string;
  endTime: string;
  safetyRequirements: string;
  languages: string;
  dietaryHabits: string;
  caregivingStyle: string;
  coreValuesSkills: string;
}

export interface NannyProfile {
  name: string;
  experience: string;
  alignment: string;
  competencies: string;
  whyMatch: string;
  bio: string;
}

export interface CarePlanItem {
  time: string;
  activity: string;
  culturalNote: string;
}

export interface NannyAdvice {
  profiles: NannyProfile[];
  carePlan: CarePlanItem[];
}

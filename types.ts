
export enum SectorCategory {
  EMERGENCY_SOVEREIGN = 'الأمن القومي والجهات السيادية',
  EMERGENCY_LIFE = 'طوارئ الإنقاذ السريع',
  HEALTH_SPECIALIZED = 'حماية الفئات والصحة النفسية',
  UTILITIES = 'طوارئ المرافق والمواصلات',
  COMPLAINTS = 'الرقابة وحماية حقوق المواطن',
  SERVICES = 'خدمات عامة'
}

export interface AppLinks {
  android?: string;
  ios?: string;
}

export interface SectorEntry {
  id: string;
  name: string;
  category: SectorCategory;
  number: string;
  workingHours: string;
  steps?: string[];
  links: AppLinks;
  color: string;
  description?: string;
}

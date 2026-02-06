
import { SectorEntry, SectorCategory } from './types';

export const SECTORS: SectorEntry[] = [
  // Sovereign / Security
  {
    id: 'gen_intel',
    name: 'المخابرات العامة المصرية',
    category: SectorCategory.EMERGENCY_SOVEREIGN,
    number: '0224445000',
    description: 'للأمن القومي وبلاغات التجسس والتهديدات الخارجية والسيادية',
    workingHours: '24 ساعة / طوال أيام الأسبوع',
    links: {},
    color: 'bg-slate-900'
  },
  {
    id: 'nat_security',
    name: 'قطاع الأمن الوطني',
    category: SectorCategory.EMERGENCY_SOVEREIGN,
    number: '135',
    description: 'بلاغات الإرهاب والتهديدات الأمنية الداخلية المباشرة',
    workingHours: '24 ساعة / طوال أيام الأسبوع',
    links: {},
    color: 'bg-slate-800'
  },
  {
    id: 'army_grievances',
    name: 'منظومة مظالم القوات المسلحة',
    category: SectorCategory.EMERGENCY_SOVEREIGN,
    number: '16039',
    description: 'للشكاوى والمظالم المتعلقة بالجيش والقوات المسلحة المصرية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-slate-700'
  },
  
  // Life Saving
  {
    id: 'ambulance',
    name: 'الإسعاف المصري',
    category: SectorCategory.EMERGENCY_LIFE,
    number: '123',
    description: 'للحالات الطبية الطارئة، الحوادث، والإنقاذ الطبي الفوري',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-red-600'
  },
  {
    id: 'police',
    name: 'شرطة النجدة',
    category: SectorCategory.EMERGENCY_LIFE,
    number: '122',
    description: 'لطلب الاستغاثة الأمنية الفورية في الحالات الجنائية والطارئة',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-slate-900'
  },
  {
    id: 'fire',
    name: 'الحماية المدنية (المطافئ)',
    category: SectorCategory.EMERGENCY_LIFE,
    number: '180',
    description: 'بلاغات الحرائق، الانفجارات، الكوارث الطبيعية والإنقاذ البري',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-orange-700'
  },
  {
    id: 'road_emergency',
    name: 'طوارئ الطرق (المرور المركزي)',
    category: SectorCategory.EMERGENCY_LIFE,
    number: '112',
    description: 'للحوادث والأعطال وحالات الطوارئ على الطرق السريعة والصحراوية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-red-500'
  },

  // Health and Specialized Support
  {
    id: 'child_help',
    name: 'خط نجدة الطفل',
    category: SectorCategory.HEALTH_SPECIALIZED,
    number: '16000',
    description: 'بلاغات الخطف، العنف المنزلي، استغلال الأطفال والتنمر',
    workingHours: '24 ساعة',
    links: { android: 'CPA Mobile' },
    color: 'bg-blue-600'
  },
  {
    id: 'women_help',
    name: 'مكتب شكاوى المرأة',
    category: SectorCategory.HEALTH_SPECIALIZED,
    number: '15115',
    description: 'المجلس القومي للمرأة - لدعم وحماية المرأة من كافة أشكال العنف',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-indigo-600'
  },
  {
    id: 'addiction',
    name: 'مكافحة وعلاج الإدمان',
    category: SectorCategory.HEALTH_SPECIALIZED,
    number: '16023',
    description: 'علاج الإدمان والتعاطي في سرية تامة ومجانية واحترافية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-emerald-600'
  },
  {
    id: 'mental_health',
    name: 'الصحة النفسية والطوارئ',
    category: SectorCategory.HEALTH_SPECIALIZED,
    number: '08008880700',
    description: 'للدعم النفسي الفوري، منع الانتحار والتعامل مع الأزمات النفسية الحادة',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-rose-600'
  },

  // Utilities and Transport
  {
    id: 'gas',
    name: 'طوارئ الغاز الطبيعي',
    category: SectorCategory.UTILITIES,
    number: '129',
    description: 'بلاغات تسريب الغاز، الحرائق الناتجة عن الغاز والأعطال الطارئة',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-orange-600'
  },
  {
    id: 'electricity',
    name: 'أعطال الكهرباء',
    category: SectorCategory.UTILITIES,
    number: '121',
    description: 'بلاغات انقطاع التيار الكهربائي، مخاطر الكابلات والأعطال الفنية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-yellow-600'
  },
  {
    id: 'water',
    name: 'طوارئ مياه الشرب',
    category: SectorCategory.UTILITIES,
    number: '125',
    description: 'بلاغات انقطاع المياه، كسر المواسير الرئيسية ومشاكل الصرف',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-cyan-600'
  },
  {
    id: 'tourism',
    name: 'شرطة السياحة والآثار',
    category: SectorCategory.UTILITIES,
    number: '126',
    description: 'لخدمة وحماية السائحين والزوار في المناطق الأثرية والسياحية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-teal-600'
  },
  {
    id: 'railways',
    name: 'طوارئ السكك الحديدية',
    category: SectorCategory.UTILITIES,
    number: '150',
    description: 'بلاغات أعطال القطارات، مشاكل المزلقانات وحوادث السكك الحديدية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-slate-600'
  },

  // Regulatory and Civil Rights
  {
    id: 'cyber_crime',
    name: 'مباحث الإنترنت',
    category: SectorCategory.COMPLAINTS,
    number: '108',
    description: 'بلاغات الابتزاز الإلكتروني، الاختراق، التنمر والجرائم المعلوماتية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-slate-800'
  },
  {
    id: 'consumer',
    name: 'جهاز حماية المستهلك',
    category: SectorCategory.COMPLAINTS,
    number: '19588',
    description: 'بلاغات غلاء الأسعار، عيوب الصناعة، الغش التجاري والأسواق',
    workingHours: 'يومياً 9 ص - 10 م',
    links: { android: 'CPA Mobile' },
    color: 'bg-emerald-700'
  },
  {
    id: 'cabinet_complaints',
    name: 'منظومة الشكاوى الحكومية',
    category: SectorCategory.COMPLAINTS,
    number: '16528',
    description: 'مجلس الوزراء - لاستقبال كافة الشكاوى المتعلقة بالخدمات الحكومية',
    workingHours: '24 ساعة',
    links: {},
    color: 'bg-slate-600'
  },
  {
    id: 'ntra',
    name: 'جهاز تنظيم الاتصالات',
    category: SectorCategory.COMPLAINTS,
    number: '155',
    description: 'شكاوى المحمول، الإنترنت، وسوء خدمة شركات الاتصالات العاملة بمصر',
    workingHours: '8 ص - 10 م',
    links: { android: 'My NTRA' },
    color: 'bg-blue-700'
  }
];

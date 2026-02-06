
import React, { useState, useMemo } from 'react';
import { SECTORS } from './data';
import { SectorCategory, SectorEntry } from './types';

/**
 * Highly Optimized SVG Components
 */
interface IconProps {
  className?: string;
}

const IconWarning = ({ className = "w-7 h-7" }: IconProps) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    role="img"
    shapeRendering="geometricPrecision"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
    />
  </svg>
);

const IconCopy = ({ className = "w-4 h-4" }: IconProps) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    role="img"
    shapeRendering="geometricPrecision"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
    />
  </svg>
);

const IconSearch = ({ className = "w-4 h-4" }: IconProps) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    role="img"
    shapeRendering="geometricPrecision"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);

const IconDownload = ({ className = "w-10 h-10" }: IconProps) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    role="img"
    shapeRendering="geometricPrecision"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
    />
  </svg>
);

const IconShield = ({ className = "w-6 h-6" }: IconProps) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20" 
    aria-hidden="true" 
    role="img"
    shapeRendering="geometricPrecision"
  >
    <path 
      fillRule="evenodd" 
      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
      clipRule="evenodd" 
    />
  </svg>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const categories = useMemo(() => {
    const groups: Record<string, SectorEntry[]> = {};
    const order = [
      SectorCategory.EMERGENCY_SOVEREIGN,
      SectorCategory.EMERGENCY_LIFE,
      SectorCategory.HEALTH_SPECIALIZED,
      SectorCategory.UTILITIES,
      SectorCategory.COMPLAINTS,
      SectorCategory.SERVICES
    ];
    
    order.forEach(cat => groups[cat] = []);
    SECTORS.forEach(s => {
      if (groups[s.category]) groups[s.category].push(s);
    });
    return groups;
  }, []);

  const filteredGroups = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;
    const filtered: Record<string, SectorEntry[]> = {};
    Object.keys(categories).forEach(cat => {
      const matches = categories[cat].filter(s => 
        s.name.toLowerCase().includes(term) || s.number.includes(term)
      );
      if (matches.length > 0) filtered[cat] = matches;
    });
    return filtered;
  }, [searchTerm, categories]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const downloadVCF = () => {
    let vcfContent = "";
    SECTORS.forEach(c => {
      vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:Emg - ${c.name}\nTEL;TYPE=CELL:${c.number}\nCATEGORIES:Emergency\nEND:VCARD\n`;
    });

    const blob = new Blob([vcfContent], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SafeEgypt_Emergency_Encyclopaedia.vcf";
    a.click();
    
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
    showToast("جاري تحميل أرقام المبادرة للهاتف...");
    setShowConfirmModal(false);
  };

  const copyAndNotify = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`تم النسخ: ${text}`);
    });
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-[#f8fafc] shadow-2xl shadow-slate-200 relative">
      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white text-xs px-8 py-3 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
        {toast}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl animate-modal text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <IconDownload className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">تأكيد تحميل الأرقام</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed px-2">
              سيقوم هذا الإجراء بتحميل ملف يحتوي على كافة أرقام الطوارئ والجهات السيادية والخدمية (20+ رقم) لتتمكن من حفظها في هاتفك دفعة واحدة كجهات اتصال.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={downloadVCF} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-colors active:scale-95 text-sm shadow-lg shadow-red-200">تأكيد وبدء التحميل</button>
              <button onClick={() => setShowConfirmModal(false)} className="w-full bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-100 transition-colors active:scale-95 text-sm">إلغاء الأمر</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-slate-900 py-6 px-6 sticky top-0 z-40 shadow-xl border-b border-slate-800">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-white">
              <IconShield className="w-6 h-6 text-red-500" />
              <span className="font-bold text-xl tracking-tight">دليلي الشامل</span>
            </div>
            <span className="text-[10px] text-slate-400 mr-8">مبادرة توعوية مواطن لمواطن 🇪🇬</span>
          </div>
          <button 
            onClick={() => setShowConfirmModal(true)} 
            className="text-[10px] bg-red-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-red-700 transition-all active:scale-95 whitespace-nowrap"
          >
            حفظ الأرقام للهاتف
          </button>
        </div>
      </nav>

      {/* Search Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 sticky top-[84px] z-30">
        <div className="relative group">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
            <IconSearch />
          </div>
          <input
            type="text"
            placeholder="ابحث عن جهة، رقم، أو نوع بلاغ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-5 focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 transition-all text-sm placeholder:text-slate-400 shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow p-5 space-y-10">
        {/* Safety Initiative Banner */}
        {!searchTerm && (
          <section className="bg-indigo-600 text-white p-7 rounded-[2.5rem] shadow-xl border border-indigo-500/50 space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <span>🛡️</span> أخي المواطن / أختي المواطنة 🇪🇬
            </h2>
            <p className="text-xs leading-relaxed text-justify opacity-90">
              أنا مواطن مصري مثلكم، طورت هذا التطبيق بهدف واحد وهو **التوعية**. خاصة لبناتنا وشبابنا وأطفالنا لمواجهة حالات الابتزاز الإلكتروني أو أي خطر قد يواجههم. قمت بجمع هذه الأرقام المعلنة رسمياً ليسهل عليك الوصول لمن يحميك. أنا لست وسيطاً ولا أتبع أي جهة، أنا فقط أقدم لك المعلومة ليسود القانون ونبتعد عن العنف.
            </p>
          </section>
        )}

        {/* Cyber-Extortion Awareness - High Priority Section */}
        {!searchTerm && (
          <section className="bg-rose-50 rounded-[2.5rem] border border-rose-200 p-7 space-y-5 shadow-sm border-r-[10px] border-r-rose-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-600 rounded-xl text-white">
                <IconWarning className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-rose-900">حماية من الابتزاز الإلكتروني</h3>
            </div>
            
            <div className="space-y-3">
              <p className="text-[11px] text-rose-800 leading-relaxed font-bold">
                إلى كل بنت أو شاب يتعرض للتهديد أو الابتزاز:
              </p>
              <ul className="text-[10px] text-rose-700 space-y-2 list-disc list-inside px-1">
                <li><span className="font-bold">لا تنهَر:</span> المبتز شخص ضعيف يستغل خوفك، لا تظهر له ذعرك.</li>
                <li><span className="font-bold">لا تدفع:</span> الرضوخ للمبتز هو بداية سلسلة لا تنتهي من الطلبات.</li>
                <li><span className="font-bold">احتفظ بالأدلة:</span> لا تمسح المحادثات أو الصور، فهي دليلك القانوني.</li>
                <li><span className="font-bold">سرية تامة:</span> الجهات الأمنية تتعامل بمنتهى السرية لحماية سمعة المواطنين.</li>
              </ul>
              <div className="pt-2">
                <a 
                  href="tel:108"
                  className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
                >
                  اتصل فوراً بمباحث الإنترنت (108)
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Disclaimer & Dev Info */}
        {!searchTerm && (
          <section className="bg-white rounded-[2rem] border border-slate-200 p-7 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>📄</span> إقرار وإخلاء مسؤولية قانوني
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed text-justify">
              بصفتي مبرمج هذا التطبيق، أقر بأنني أخضع تماماً لجميع القوانين المصرية. هذا العمل هو تجميع لأرقام الخدمات المتاحة للجمهور. في حال رأت أي جهة حكومية ضرورة إيقاف التطبيق أو طلب الكود البرمجي، فأنا مستعد تماماً للتنفيذ فوراً وبدون أي اعتراض، هدفنا هو مصلحة الوطن أولاً وأخيراً.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 gap-3">
              <span className="text-[10px] font-bold text-slate-500">للتواصل المباشر مع المبرمج (مبادرة فردية):</span>
              <button 
                onClick={() => copyAndNotify('01124148723')}
                className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors bg-white px-3 py-2 rounded-lg border border-indigo-100 shadow-sm flex items-center gap-2"
              >
                <IconCopy className="w-3.5 h-3.5" />
                01124148723
              </button>
            </div>
          </section>
        )}

        {/* Communication Protocol */}
        {!searchTerm && (
          <section className="space-y-4">
             <div className="flex items-center gap-3 px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  بروتوكول التواصل الرسمي (كيف تبلغ؟)
                </h3>
                <div className="h-px bg-slate-100 flex-grow"></div>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-sm border-t-8 border-t-indigo-600">
                <ProtocolStep number={1} title="الهدوء والتعريف بنفسك" desc="عند رد مأمور العمليات، ابدأ بذكر اسمك ونوع الحالة فوراً (إصابة، حريق، تهديد أمني)." />
                <ProtocolStep number={2} title="تحديد الموقع بدقة" desc="اذكر المحافظة، الحي، الشارع، وأقرب علامة مميزة (مدرسة، مسجد، محل شهير)." />
                <ProtocolStep number={3} title="وصف الموقف بدقة" desc="أجب بوضوح عن عدد المصابين أو طبيعة الخطر؛ مأمور العمليات مدرب لمساعدتك هاتفياً." />
                <ProtocolStep number={4} title="لا تغلق الخط أولاً" desc="انتظر حتى يخبرك مأمور الطوارئ أن البلاغ سُجل رسمياً وأن الدعم في الطريق إليك." />
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] text-red-500 font-bold leading-relaxed text-center">
                    ⚠️ تنبيه: العبث بهذه الأرقام قد يعرضك للمساءلة القانونية ويؤخر إنقاذ الأرواح.
                  </p>
                </div>
            </div>
          </section>
        )}

        {Object.keys(filteredGroups).map((category) => (
          filteredGroups[category].length > 0 && (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  {category}
                </h3>
                <div className="h-px bg-slate-100 flex-grow"></div>
              </div>
              
              <div className={category === SectorCategory.UTILITIES || category === SectorCategory.EMERGENCY_LIFE ? "grid grid-cols-2 gap-4 items-stretch" : "space-y-4"}>
                {filteredGroups[category].map((sector) => (
                  <SectorCard 
                    key={sector.id} 
                    sector={sector} 
                    compact={category === SectorCategory.UTILITIES || category === SectorCategory.EMERGENCY_LIFE}
                    onCopy={copyAndNotify}
                  />
                ))}
              </div>
            </div>
          )
        ))}

        {Object.keys(filteredGroups).length === 0 && (
          <div className="text-center py-24 text-slate-400 bg-white/50 rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="text-6xl mb-6 grayscale opacity-20">🔎</div>
            <p className="text-base font-semibold text-slate-500">لم نجد نتائج مطابقة لبحثك</p>
            <p className="text-xs mt-2 text-slate-400">تأكد من كتابة اسم الجهة أو الرقم بشكل صحيح</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-8">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-px bg-slate-800 flex-grow"></div>
              <p className="text-[10px] font-bold text-white bg-white/5 px-6 py-3 rounded-full border border-white/10 shadow-sm italic">
                تم التطوير بواسطة مبرمج مصري 🇪🇬 بدافع وطني خالص
              </p>
              <div className="h-px bg-slate-800 flex-grow"></div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] text-slate-500 leading-relaxed text-justify md:text-center italic px-2">
              هذا الموقع هو مجرد "واجهة اتصال" مبسطة تجمع الأرقام العامة المعلنة رسمياً ولا يقوم بأي عمليات معالجة بيانات أو وساطة. المبرمج غير مسؤول عن سوء استخدام الأرقام أو البلاغات الكاذبة. الخصوصية مضمونة 100% حيث يعمل التطبيق محلياً بالكامل.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-[9px] font-black border border-slate-800 px-4 py-2 rounded-xl text-slate-500 tracking-wider">ZERO-LOGS</span>
            <span className="text-[9px] font-black border border-slate-800 px-4 py-2 rounded-xl text-slate-500 tracking-wider">OFFLINE-READY</span>
            <span className="text-[9px] font-black border border-slate-800 px-4 py-2 rounded-xl text-slate-500 tracking-wider uppercase">Egyptian National Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProtocolStep: React.FC<{ number: number; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-5 items-start">
    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0 shadow-sm">
      {number}
    </div>
    <div className="space-y-1 pt-0.5">
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

interface SectorCardProps {
  sector: SectorEntry;
  compact: boolean;
  onCopy: (text: string) => void;
}

const SectorCard: React.FC<SectorCardProps> = ({ sector, compact, onCopy }) => {
  if (compact) {
    return (
      <a 
        href={`tel:${sector.number}`}
        className="bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-red-100 active:scale-[0.97] transition-all text-center group h-full"
      >
        <span className="text-slate-400 font-bold text-[10px] group-hover:text-slate-600 transition-colors uppercase tracking-wider">
          {sector.name}
        </span>
        <span className="text-3xl font-black text-slate-800 tracking-tighter tabular-nums group-hover:text-red-600 transition-colors">
          {sector.number}
        </span>
      </a>
    );
  }

  const isSovereign = sector.category === SectorCategory.EMERGENCY_SOVEREIGN;
  const isCyber = sector.id === 'cyber_crime';
  const hasApp = sector.links.android;

  return (
    <div className={`bg-white rounded-[2rem] border border-slate-200 p-7 space-y-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all ${isSovereign ? 'border-r-[12px] border-r-slate-800 shadow-slate-200 shadow-xl' : ''} ${isCyber ? 'border-r-[12px] border-r-rose-600 shadow-rose-100 shadow-xl' : ''}`}>
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-2 flex-grow">
          <h2 className={`font-bold text-slate-900 flex items-center gap-2.5 ${isSovereign || isCyber ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
            <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isCyber ? 'bg-rose-600' : sector.color} shadow-sm shadow-current/20`}></span>
            {sector.name}
          </h2>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {sector.description || sector.workingHours}
          </p>
        </div>
        <a 
          href={`tel:${sector.number}`} 
          className={`bg-slate-50 text-slate-900 px-6 py-3 rounded-2xl font-black hover:bg-slate-100 hover:text-red-600 transition-all border border-slate-200 shadow-sm tabular-nums whitespace-nowrap ${isSovereign || isCyber ? 'text-2xl' : 'text-xl'}`}
        >
          {sector.number}
        </a>
      </div>

      {hasApp && (
        <button 
          onClick={() => onCopy(sector.links.android!)}
          className="w-full text-[10px] font-bold text-slate-500 border border-slate-100 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:text-slate-700 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] shadow-inner"
        >
          <IconCopy className="w-4 h-4 opacity-60" />
          <span className="pt-0.5">نسخ اسم التطبيق للبحث ({sector.links.android})</span>
        </button>
      )}
    </div>
  );
};

export default App;

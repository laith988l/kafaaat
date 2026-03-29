'use client';

import { useState } from 'react';
import { updateSaleBanner } from '@/app/actions';
import { toast } from 'sonner';

export default function BannerToggle({ initialConfig }: { initialConfig: any }) {
  const [isActive, setIsActive] = useState(initialConfig.isActive);
  const [message, setMessage] = useState(initialConfig.message || '');
  const [description, setDescription] = useState(initialConfig.description || '');
  const [discountPercentage, setDiscountPercentage] = useState(initialConfig.discountPercentage || '');
  const [buttonLink, setButtonLink] = useState(initialConfig.buttonLink || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSaleBanner(isActive, message, description, discountPercentage, buttonLink);
    if (res?.success) {
      toast.success('تم حفظ إعدادات الإعلان بنجاح');
    } else {
      toast.error(res?.error || 'حدث خطأ أثناء الحفظ');
    }
    setLoading(false);
  };

  return (
    <div className="bg-surface-container p-6 rounded-2xl border border-white/5 text-right flex flex-col gap-6">
      <div className="flex items-center justify-between flex-row-reverse border-b border-white/5 pb-6">
        <div className="text-right flex-1 select-none pr-4">
          <h4 className="font-headline font-bold text-on-surface mb-1 text-lg">شريط العروض (أعلى الموقع)</h4>
          <p className="text-sm text-on-surface-variant">تفعيل أو إخفاء شريط الإعلانات الترويجي الذي يظهر أعلى كل صفحات الأكاديمية.</p>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          type="button"
          dir="ltr"
          className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors ${isActive ? 'bg-primary' : 'bg-surface-container-highest'} disabled:opacity-50 border-2 border-transparent`}
        >
          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'} shadow-md`} />
        </button>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant">الرسالة الرئيسية (مثال: خصم لفترة محدودة)</label>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface text-right transition-all focus:ring-1 focus:ring-primary/50" 
                    placeholder="أدخل رسالة الإعلان"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant">نسبة الخصم (مثال: %50)</label>
                <input 
                    type="text" 
                    value={discountPercentage} 
                    onChange={(e) => setDiscountPercentage(e.target.value)} 
                    className="bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface text-right transition-all focus:ring-1 focus:ring-primary/50" 
                    placeholder="%50"
                />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-on-surface-variant">الوصف الفرعي (اختياري)</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface text-right transition-all focus:ring-1 focus:ring-primary/50" 
                    placeholder="سجل الآن في دورتنا المميزة"
                />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-on-surface-variant">رابط الزر (الى أين يأخذ العميل؟)</label>
                <input 
                    type="text" 
                    value={buttonLink} 
                    onChange={(e) => setButtonLink(e.target.value)} 
                    dir="ltr"
                    className="bg-surface-container-highest border-transparent rounded-xl py-3 px-4 text-on-surface transition-all focus:ring-1 focus:ring-primary/50" 
                    placeholder="/courses/bundle"
                />
            </div>
        </div>

        <div className="pt-2">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl transition-all disabled:opacity-50"
            >
                {loading ? 'جاري الحفظ...' : 'حفظ إعدادات الإعلان'}
            </button>
        </div>
      </form>
    </div>
  );
}

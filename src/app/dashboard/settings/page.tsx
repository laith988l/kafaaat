import { getSettings } from "@/app/actions/settings"
import { SettingsForm } from "./components/SettingsForm"

export default async function SettingsPage() {
    const settingsObj = await getSettings()

    const sections = [
        {
            title: "الصفحة الرئيسية",
            iconName: "LayoutDashboard",
            keys: ["hero_title", "hero_subtitle"],
            labels: {
                hero_title: "العنوان الرئيسي (Hero Title)",
                hero_subtitle: "الوصف أسفل العنوان (Hero Subtitle)"
            },
            type: {
                hero_title: "input",
                hero_subtitle: "textarea"
            }
        },
        {
            title: "معلومات التواصل",
            iconName: "Phone",
            keys: ["contact_phone", "contact_email", "contact_address"],
            labels: {
                contact_phone: "رقم هاتف الأكاديمية",
                contact_email: "البريد الإلكتروني",
                contact_address: "عنوان المقر"
            },
            type: {
                contact_phone: "input",
                contact_email: "input",
                contact_address: "input"
            },
            dir: {
                contact_phone: "ltr",
                contact_email: "ltr"
            }
        },
        {
            title: "صفحة من نحن",
            iconName: "Info",
            keys: ["about_mission", "about_vision", "about_values"],
            labels: {
                about_mission: "رسالتنا (Mission)",
                about_vision: "رؤيتنا (Vision)",
                about_values: "قيمنا (Values)"
            },
            type: {
                about_mission: "textarea",
                about_vision: "textarea",
                about_values: "textarea"
            }
        }
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="mb-8 border-b border-white/5 pb-6">
                <h1 className="font-headline font-black text-4xl mb-3 text-on-surface">إدارة المحتوى (CMS)</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed">تعديل النصوص الأساسية على الموقع المباشر في الصفحة الرئيسية والفرعية.</p>
            </header>

            <SettingsForm settingsObj={settingsObj} sections={sections} />
        </div>
    )
}

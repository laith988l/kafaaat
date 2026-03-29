"use client"

import { useState } from "react"
import { MotionCard } from "@/components/MotionCard"
import { Loader2, Save, LayoutDashboard, Phone, Info } from "lucide-react"
import { updateSetting } from "@/app/actions/settings"

const iconMap: Record<string, any> = {
    LayoutDashboard,
    Phone,
    Info,
}

export function SettingsForm({ settingsObj, sections }: any) {
    const [saving, setSaving] = useState<string | null>(null)
    const [values, setValues] = useState<Record<string, string>>(settingsObj)

    const handleChange = (key: string, value: string) => {
        setValues(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async (key: string) => {
        setSaving(key)
        await updateSetting(key, values[key])
        setTimeout(() => setSaving(null), 500) // slight UI delay for feedback
    }

    return (
        <div className="space-y-12">
            {sections.map((section: any, idx: number) => (
                <section key={idx} className="space-y-6">
                    <h2 className="font-headline font-bold text-2xl text-on-surface flex items-center gap-3">
                        {(() => { const Icon = iconMap[section.iconName]; return Icon ? <Icon className="w-6 h-6 text-primary" /> : null; })()}
                        {section.title}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.keys.map((sKey: string, i: number) => (
                            <MotionCard key={sKey} delay={i * 0.1} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 relative group focus-within:border-primary/50 transition-colors col-span-1 md:col-span-1 flex flex-col h-full">
                                <label className="block text-sm font-medium text-on-surface-variant mb-3">{section.labels[sKey]}</label>
                                
                                {section.type[sKey] === 'textarea' ? (
                                    <textarea 
                                        rows={4}
                                        value={values[sKey] || ''}
                                        onChange={(e) => handleChange(sKey, e.target.value)}
                                        className="w-full bg-surface-container-highest border border-transparent focus:border-primary/50 rounded-xl p-4 text-on-surface resize-none transition-colors text-right"
                                    />
                                ) : (
                                    <input 
                                        type="text"
                                        value={values[sKey] || ''}
                                        onChange={(e) => handleChange(sKey, e.target.value)}
                                        className={`w-full bg-surface-container-highest border border-transparent focus:border-primary/50 rounded-xl p-4 text-on-surface transition-colors ${section.dir?.[sKey] === 'ltr' ? 'text-left' : 'text-right'}`}
                                        dir={section.dir?.[sKey] || 'rtl'}
                                    />
                                )}
                                
                                <button 
                                    onClick={() => handleSave(sKey)}
                                    disabled={saving === sKey || values[sKey] === settingsObj[sKey]}
                                    className="mt-4 mr-auto flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving === sKey ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    حفظ التعديل
                                </button>
                            </MotionCard>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

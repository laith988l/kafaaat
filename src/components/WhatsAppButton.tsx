"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function WhatsAppButton() {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            className="fixed bottom-6 md:bottom-10 left-6 md:left-10 z-[100]"
        >
            <Link 
                href="https://wa.me/4917643446439" 
                target="_blank"
                className="relative group flex items-center justify-center"
            >
                {/* Ping animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 group-hover:animate-ping"></span>
                
                {/* Main Button */}
                <div className="relative bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-9 md:h-9">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 13.82 2.49 15.53 3.34 17.02L2 22L7.14 20.69C8.61 21.52 10.27 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.65 16.32C17.43 16.94 16.53 17.46 15.86 17.6C15.39 17.7 14.62 17.84 11.83 16.68C8.25 15.2 5.92 11.53 5.74 11.3C5.57 11.07 4.29 9.38 4.29 7.62C4.29 5.86 5.2 5.01 5.56 4.63C5.86 4.31 6.36 4.16 6.84 4.16C7 4.16 7.14 4.17 7.27 4.17C7.58 4.19 7.74 4.21 7.95 4.7C8.21 5.33 8.84 6.87 8.92 7.03C8.99 7.19 9.07 7.4 8.97 7.61C8.87 7.82 8.76 7.95 8.61 8.13C8.45 8.3 8.3 8.42 8.14 8.6C7.96 8.8 7.75 9.02 7.98 9.42C8.2 9.81 8.83 10.84 9.77 11.67C10.97 12.75 11.94 13.09 12.37 13.27C12.74 13.43 13.17 13.4 13.45 13.09C13.81 12.7 14.25 12.04 14.71 11.37C15.06 10.85 15.48 10.92 15.91 11.08C16.35 11.23 18.67 12.38 19.13 12.61C19.59 12.84 19.9 12.95 20.01 13.15C20.13 13.35 20.13 14.34 19.66 15.27C19.26 16.03 18.23 16.48 17.65 16.32Z"/>
                    </svg>
                </div>
 
                {/* Tooltip */}
                <div className="absolute left-16 md:left-20 top-1/2 -translate-y-1/2 bg-surface text-on-surface px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-outline-variant/10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    تواصل معنا
                </div>
            </Link>
        </motion.div>
    );
}

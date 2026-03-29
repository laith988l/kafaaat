export interface CourseData {
    id: string;
    level: string;
    category: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    duration: string;
    hours: number;
    price: string;
    featuredImage: string;
    outcomes: string[];
    syllabus: { title: string; desc: string }[];
}

export const coursesData: Record<string, CourseData> = {
    a1: {
        id: 'a1',
        level: 'A1',
        category: 'مبتدئ',
        title: 'أساسيات الألمانية',
        shortDescription: 'ابنِ أساساً متيناً في قواعد اللغة الألمانية ومفردات الحياة اليومية.',
        fullDescription: 'هذه الدورة مصممة للمبتدئين الذين ليس لديهم معرفة سابقة باللغة الألمانية. ستركز على أساسيات التحدث، الاستماع، القراءة، والكتابة لتتمكن من التواصل في المواقف اليومية البسيطة فوراً. نعتمد منهجاً تفاعلياً يعتمد على المحادثة لبناء ثقتك منذ اليوم الأول.',
        duration: '6 أسابيع',
        hours: 60,
        price: '€300.00',
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC2fQAatSSY23zzCf_0ZEeTABLM5HW1qERAcA1ZhAYSc0_iqnF0MTHIgb9aDsO2alp1aRzBXVB8_VQWHQMNYRu6x6UV6cxYMAbgkEf8goLquKBwHN89ZU0c5Mkc2bfXY6GIouN2AsucXRZqU6yl_YKbIGf0rCpVKRoyR0jzbLLnRDeaPI0312N0LdBk8HHDFdErYjvBAgJHoz3gb8FtJTbZly4j22kBFKX7OeE8Bxkwh3zvmzPo6tTJLeI-Vq1zGcLrPeGAwT0dCUS',
        outcomes: [
            'التعريف بنفسك وبالآخرين بثقة',
            'طلب الطعام والشراب في المطاعم',
            'السؤال عن الاتجاهات والأماكن في المدينة',
            'التسوق والمساومة على الأسعار',
            'فهم العبارات اليومية الشائعة الروتينية'
        ],
        syllabus: [
            { title: 'الوحدة 1: التعارف والتواصل الأول', desc: 'الأبجدية الألمانية، الأرقام، إلقاء التحية، والتعريف الشخصي.' },
            { title: 'الوحدة 2: في المطعم والمقهى', desc: 'طلب الوجبات، المشروبات، ودفع الحساب، وفهم قوائم الطعام.' },
            { title: 'الوحدة 3: المدينة والاتجاهات', desc: 'استخدام وسائل النقل العام، السؤال عن الاتجاهات، والتعرف على المعالم.' },
            { title: 'الوحدة 4: الروتين اليومي', desc: 'الأفعال المنفصلة، التعبير عن الوقت، والروتين اليومي في المنزل والعمل.' }
        ]
    },
    a2: {
        id: 'a2',
        level: 'A2',
        category: 'متوسط',
        title: 'دورة تأسيسية في الألمانية',
        shortDescription: 'وسع آفاقك. تواصل في مواضيع مألوفة بفروق دقيقة أكبر.',
        fullDescription: 'بعد إتقان الأساسيات في A1، تأخذك دورة A2 نحو تواصل أكثر تفصيلاً ودقة. ستتمكن من التحدث عن تجاربك السابقة، التعبير عن آرائك، والتواصل في بيئة العمل بطلاقة أكبر من خلال إتقان التراكيب النحوية المتوسطة كالزمن الماضي والجمل الموصولة.',
        duration: '6 أسابيع',
        hours: 60,
        price: '€300.00',
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVkAPYRJihmUV_QU16FDmkHXG57K5P0iiGrEA45b0vmntR1jb50DSj_USFZbjnBOxnlEuriKtpqpIHKAZS3qhUtwOWw3DNcQQuuQV0yYGdh7aOdYlNTEJvHHmqOO6-ucRVTiyPI-clOo0yvuoGCVZTAo2u-BB4CDEWDNyO3-0R4KqWXDlKrAS41qFQeOazK7tOl_OJj5MNp-xV3gnb-alp3vSzd4IveL_xFTpXwPODX447NHfyTkPiZx_-XOaylsvcCbeIFfz4OLIK',
        outcomes: [
            'سرد القصص والتجارب في الزمن الماضي',
            'التواصل في بيئة العمل (مقابلات، كتابة إيميلات بسيطة)',
            'التعبير عن الرأي الشخصي والإقناع',
            'التحدث عن العطلات والسفر بالتفصيل',
            'فهم الإعلانات والمعلومات العامة بوضوح'
        ],
        syllabus: [
            { title: 'الوحدة 1: السفر والذكريات', desc: 'إتقان الزمن الماضي (Perfekt و Präteritum).' },
            { title: 'الوحدة 2: عالم العمل', desc: 'التقديم للوظائف، المقابلات الأولية، وكتابة السيرة الذاتية المبسطة.' },
            { title: 'الوحدة 3: الصحة والجسد', desc: 'زيارة الطبيب، وصف الأعراض، وفهم التعليمات الطبية.' },
            { title: 'الوحدة 4: التعبير عن الرأي', desc: 'الجمل الجانبية (Nebensätze) والتعبير عن الأسباب (weil/da).' }
        ]
    },
    b1: {
        id: 'b1',
        level: 'B1',
        category: 'متقدم',
        title: 'الاستقلالية في الألمانية',
        shortDescription: 'جسر نحو الاستقلال. تعامل بحياتك في ألمانيا بثقة وشارك في نقاشات مفصلة.',
        fullDescription: 'دورة B1 هي البوابة الرئيسية للحياة المهنية والأكاديمية في ألمانيا. في هذا المستوى، ستنتقل من التحدث عن المواضيع اليومية المألوفة إلى مناقشة الأحداث الجارية، الخطط المستقبلية، والأمور المجردة والمعقدة. هذا المستوى يكسبك الثقة لتعيش وتعمل في ألمانيا بحرية تامة.',
        duration: '8 أسابيع',
        hours: 80,
        price: '€350.00',
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYDYULzNac1nRBeGF2vTha2tVyGX9YdIeGq8gQYRr6gngxCdjZgQ8ZeBEfKA5SgF0fKFR4lB4i2-jCIG7uaHSouRVSwWUaSYaaY984aQjrk9D5BExui-LgRAhVoruQluRv3RLRFk_tS2kVVfYpFnIqWm7IDIbrd8T-yjh9U9hS3TOK_FGuJNDFGiyQ4rw7YoCLKne-5-CbpLmYM6AooeUd3Ync7uzHTpBTl7LjYNzcpdhz1kRI6LgWNTe9lYO5LGc74uwZVrXAPrFw',
        outcomes: [
            'المشاركة في نقاشات معقدة حول مواضيع متنوعة',
            'فهم الأخبار والصحف والبرامج التلفزيونية الألمانية',
            'التعبير بطلاقة عن التمنيات والافتراضات',
            'التعامل مع المشكلات اليومية والبيروقراطية الألمانية باستقلالية',
            'الاستعداد لامتحان B1 (Goethe/Telc) للتدريب أو العمل'
        ],
        syllabus: [
            { title: 'الوحدة 1: السياسة والمجتمع', desc: 'الحديث عن القضايا المجتمعية، والأخبار الحديثة بمرونة.' },
            { title: 'الوحدة 2: الافتراضات والتمني', desc: 'استخدام صيغة Konjunktiv II باحتراف.' },
            { title: 'الوحدة 3: البيروقراطية والنظام', desc: 'التواصل مع الدوائر الحكومية، العقود، والوثائق الرسمية.' },
            { title: 'الوحدة 4: العلاقات الشخصية العميقة', desc: 'وصف المشاعر، حل النزاعات، والمناقشات التفصيلية.' }
        ]
    },
    bundle: {
        id: 'bundle',
        level: 'A1-B1',
        category: 'الباقة الكاملة',
        title: 'باقة كفاءات الشاملة',
        shortDescription: 'رحلة متكاملة من الصفر وحتى إتقان اللغة الألمانية (مستوى B1) بسعر استثنائي.',
        fullDescription: 'هذه الباقة مصممة خصيصاً للطلاب الطموحين الذين يخططون للدراسة أو العمل في ألمانيا. تتضمن مساراً تعليمياً متسلسلاً ومكثفاً يبدأ معك من الحروف والأبجديات ويمتد حتى تصل إلى مستوى B1، لتكون جاهزاً تماماً للامتحانات الرسمية والحياة اليومية. تمنحك هذه الباقة خصماً كبيراً مقارنة بالتسجيل في كل مستوى على حدة.',
        duration: '20 أسبوعاً',
        hours: 200,
        price: '€800.00',
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqR8l97s7L6YvZyO-P9K1KxT3X3Z-SHT5R9O0c1JXZR_yH9mQwK3J-PzX3Yq9P2L-H9I5s9J5zX6N2G8r7QxJwA2h9o9aE1k6T7Y6O5aZ8JwB2O6XkRwT4R1h1I5J6R7z_t4GZz1nDwR9o-mD1V8gK9S9Kxw-pZ-0G5g3Z1qP6m9cZ6vR8aC5S6H8G9',
        outcomes: [
            'إتقان شامل لمستويات A1, A2, و B1',
            'التحضير الكامل لاجتياز امتحانات Goethe، Telc، و OSD',
            'القدرة على التواصل باللغة الألمانية بطلاقة في الحياة اليومية ومكان العمل',
            'التأسيس القوي قواعدياً ولغوياً من الصفر وحتى الاستقلالية',
            'توفير كبير في التكلفة مقارنة بتسجيل الدورات بشكل منفصل'
        ],
        syllabus: [
            { title: 'المرحلة الأولى: الأساسيات (A1)', desc: 'بناء اللبنة الأولى وفهم القواعد والمحادثات اليومية (60 ساعة).' },
            { title: 'المرحلة الثانية: التأسيس (A2)', desc: 'توسيع المفردات والتعبير عن الماضي والمستقبل بوضوح (60 ساعة).' },
            { title: 'المرحلة الثالثة: الكفاءة (B1)', desc: 'التدريب المكثف على النقاشات المتقدمة وفهم النصوص المركبة (80 ساعة).' },
            { title: 'المرحلة الرابعة: التحضير للامتحان', desc: 'مراجعة شاملة وحل نماذج امتحانات رسمية لضمان التفوق.' }
        ]
    }
};

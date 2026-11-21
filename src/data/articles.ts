// Bilingual editorial content — 5 Arabic + 5 English articles (distinct topics).
// Images: Pexels (free license), architecture/interiors only — no people or animals.

export interface Article {
  slug: string;
  locale: "ar" | "en";
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  content: string[];
}

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export const articles: Article[] = [
  // ─── Arabic articles ───────────────────────────────────────────────
  {
    slug: "daleel-shira-awwal-manzil-libya",
    locale: "ar",
    title: "دليلك الشامل لشراء أول منزل في ليبيا",
    excerpt:
      "من تحديد الميزانية إلى إتمام الإجراءات القانونية، خطوة بخطوة نحو ملكية منزل أحلامك دون مفاجآت.",
    image: pexels(106399),
    category: "دليل المشتري",
    date: "15 نوفمبر 2026",
    readTime: 6,
    content: [
      "شراء أول منزل هو أكبر قرار مالي يتخذه معظم الناس في حياتهم، وفي السوق الليبي تحديداً تزداد أهمية التخطيط المسبق بسبب تنوع أساليب البيع واختلاف أسعار المناطق. قبل أي خطوة، حدد ميزانية واقعية تشمل سعر العقار والرسوم القانونية وتكاليف الصيانة المستقبلية، ولا تنسَ تخصيص احتياطي طوارئ لا يقل عن 10% من قيمة الشراء.",
      "الموقع هو العامل الأهم الذي يحدد قيمة العقار على المدى الطويل. قارن بين أحياء طرابلس وبنغازي ومصراتة من حيث قرب الخدمات والمدارس وشبكة الطرق، وزر المنطقة في أوقات مختلفة من اليوم لتقييم الازدحام ومستوى الأمان. تذكّر أن الحي الجيد قد يكلّف أكثر اليوم لكنه يحافظ على قيمته ويبيع أسرع غداً.",
      "الوثائق هي حجر الأساس في أي عملية شراء ناجحة. تأكد من وجود شهادة عقارية سليمة، وتحقّق من عدم وجود رهونات أو نزاعات على الملكية، والأفضل دائماً الاستعانة بمحامٍ متخصص يراجع الأوراق قبل توقيع أي عقد. لا تدفع أي مبلغ كبير قبل التحقق الكامل من سلامة الوضع القانوني للعقار.",
      "وأخيراً، لا تتسرع. خذ وقتك في مقارنة ثلاثة عقارات على الأقل قبل اتخاذ القرار، وفاوض بثقة على السعر بناءً على أسعار العقارات المماثلة في المنطقة نفسها. الشراء المدروس اليوم يعني راحة بال لعقود قادمة.",
    ],
  },
  {
    slug: "istithmar-aqari-2026",
    locale: "ar",
    title: "الاستثمار العقاري في الشرق الأوسط: أفضل 5 مدن لعام 2026",
    excerpt:
      "نظرة تحليلية على المدن التي تقدم أعلى عوائد إيجارية وأفضل فرص نمو رأس المال في المنطقة.",
    image: pexels(439391),
    category: "استثمار",
    date: "12 نوفمبر 2026",
    readTime: 7,
    content: [
      "يشهد سوق العقارات في الشرق الأوسط تحولاً ملحوظاً مع تسارع مشاريع البنية التحتية ونمو الطلب السكاني. تتصدر دبي القائمة بفضل بيئتها التنظيمية المتطورة وعوائدها الإيجارية المستقرة التي تتراوح بين 5% و7%، إضافة إلى سهولة البيع والشراء للمستثمرين الأجانب.",
      "الرياض تشهد طفرة غير مسبوقة مدفوعة برؤية 2030، مع طلب متزايد على الوحدات السكنية الحديثة ونمو متوقع في أسعار الأراضي داخل المشاريع الكبرى. المستثمر الذي يدخل اليوم في المناطق الجديدة يضع نفسه في موقع ممتاز لتحقيق نمو رأس مالي كبير خلال السنوات الخمس القادمة.",
      "في مصر، تظل القاهرة الجديدة والتجمع الخامس خيارين مفضلين بفضل الأسعار التنافسية مقارنة بالخليج، مع عائد إيجاري جيد وعملة تجعل التكلفة الأولية مناسبة للمستثمر المتوسط. أما في ليبيا، فتمثل طرابلس وبنغازي فرصة ناشئة للمستثمرين الجريئين الراغبين في الاستفادة من انخفاض الأسعار النسبي وضخامة الطلب على السكن.",
      "الخلاصة: التنويع الجغرافي هو مفتاح النجاح. وزّع محفظتك بين سوق ناضج مثل دبي وسوق صاعد مثل الرياض، وأضف حصة صغيرة لسوق ناشئ كالسوق الليبي لتحقيق توازن مثالي بين العائد والمخاطرة.",
    ],
  },
  {
    slug: "ejar-am-shira",
    locale: "ar",
    title: "الإيجار أم الشراء؟ كيف تختار الأنسب لميزانيتك",
    excerpt:
      "حاسبة منطقية بسيطة تقارن بين التكلفة الشهرية للقرض والإيجار، ومتى يكون الشراء هو القرار الأذكى.",
    image: pexels(1571460),
    category: "نصائح مالية",
    date: "9 نوفمبر 2026",
    readTime: 5,
    content: [
      "السؤال الأبدي الذي يواجه كل أسرة: هل نستمر في دفع الإيجار أم نتحمل عبء الشراء؟ الإجابة ليست واحدة للجميع، فهي تعتمد على مدة الإقامة المتوقعة، والاستقرار الوظيفي، ومعدل نمو أسعار العقارات في مدينتك.",
      "القاعدة الذهبية البسيطة: إذا كنت تخطط للبقاء في المدينة نفسها أكثر من سبع سنوات، فالشراء غالباً هو الخيار الأفضل، لأن أقساط القرض تتحول تدريجياً إلى ملكية حقيقية بينما يظل الإيجار مصروفاً لا يعود. أما إذا كان عملك يتطلب التنقل كل سنتين أو ثلاث، فالإيجار يمنحك مرونة لا تقدر بثمن.",
      "احسب الأمور بالأرقام: قارن بين الإيجار السنوي وقيمة قسط القرض مضافاً إليه رسوم الصيانة والضرائب، ثم أضف إلى معادلة الشراء ارتفاع قيمة العقار المتوقع سنوياً. في طرابلس مثلاً، ارتفاع أسعار الأراضي في الأحياء المركزية يجعل الشراء استثماراً مضاعفاً حتى لو كان القسط أعلى من الإيجار بفارق بسيط.",
      "وفي جميع الأحوال، لا تجعل قرار السكن يستهلك أكثر من 35% من دخلك الشهري. المنزل يجب أن يكون مصدر استقرار، لا عبئاً يمنعك من العيش.",
    ],
  },
  {
    slug: "nasaeh-aqd-ejar",
    locale: "ar",
    title: "أهم 7 نصائح قبل توقيع عقد الإيجار",
    excerpt:
      "بنود يجب فحصها بعناية، وحقوق لا تتنازل عنها، ومفاجآت شائعة يمكنك تجنبها بسهولة.",
    image: pexels(271624),
    category: "نصائح عملية",
    date: "5 نوفمبر 2026",
    readTime: 4,
    content: [
      "عقد الإيجار وثيقة ملزمة تحكم علاقتك بالمالك لسنوات، ومع ذلك يوقّعها كثيرون دون قراءة متأنية. ابدأ بفحص مدة العقد وشروط التجديد: هل التجديد تلقائي أم يتطلب إخطاراً مسبقاً؟ وما هي نسبة الزيادة المسموحة عند التجديد؟ هذه البنود تحدد استقرارك المستقبلي.",
      "افحص بند الصيانة بدقة. حدد من يتحمل الأعطال الكبيرة كالسباكة والكهرباء ومن يدفع تكاليف الاستهلاك الدوري. الأفضل توثيق حالة العقار بصور موقعة من الطرفين قبل الاستلام، حتى لا تُحمّل مسؤولية أضرار سابقة عند نهاية العقد.",
      "انتبه لشروط الإخلاء وفسخ العقد، وأي غرامات مرتبطة بالخروج المبكر. واطلب إضافة بند يسمح لك بالإخلاء مع إشعار 60 يوماً دون غرامة إذا تغيرت ظروفك. أما عن مبلغ التأمين، فحدد في العقد متى يُعاد وبأي شروط تُخصم منه أي مبالغ.",
      "وأخيراً، لا تدفع إيجاراً مسبقاً لعدة أشهر دون توثيق رسمي للاستلام، واحتفظ بنسخة موقعة من العقد في مكان آمن. العقد الواضح اليوم يمنع الخلافات المريرة غداً.",
    ],
  },
  {
    slug: "taqyim-sir-aqar",
    locale: "ar",
    title: "كيف تقيّم سعر العقار قبل الشراء في دقائق",
    excerpt:
      "منهجية عملية بثلاث خطوات لمقارنة الأسعار واكتشاف التسعير المبالغ فيه قبل أن تدفع.",
    image: pexels(323780),
    category: "دليل المشتري",
    date: "2 نوفمبر 2026",
    readTime: 5,
    content: [
      "قبل أن تدفع في أي عقار، اعرف قيمته الحقيقية. الطريقة الأبسط والأدق هي المقارنة المباشرة: اجمع أسعار ثلاثة عقارات مماثلة على الأقل في الحي نفسه — نفس المساحة، نفس عدد الغرف، ونفس مستوى التشطيب — ثم احسب متوسط سعر المتر المربع.",
      "قارن بين الأحياء بحذر. الفارق بين حي وآخر في المدينة نفسها قد يصل إلى 30%، لذلك لا تقارن عقاراً في حي راقٍ بآخر في منطقة ناشئة. استخدم متوسط السعر داخل الحي الواحد فقط كمعيار.",
      "لا تنسَ عوامل تعديل السعر: عمر المبنى، وجود مصعد وموقف سيارات، الواجهة والإطلالة، وقرب الخدمات كلها ترفع أو تخفض القيمة بنسب ملحوظة. العقار الأقل سعراً ليس دائماً الأفضل — فتشطيب رديء قد يكلفك لاحقاً أكثر من فرق السعر.",
      "جرّب طريقة العائد لمن يشتري للاستثمار: قسّم الإيجار السنوي المتوقع على سعر الشراء. نسبة تتراوح بين 6% و8% تعتبر ممتازة في الأسواق الليبية، وأقل من 4% تعني أن السعر مبالغ فيه غالباً.",
    ],
  },

  // ─── English articles ──────────────────────────────────────────────
  {
    slug: "smart-home-features-value",
    locale: "en",
    title: "Smart Home Features That Actually Raise Property Value",
    excerpt:
      "Not every gadget pays off. Here are the smart upgrades buyers truly pay extra for — and the ones to skip.",
    image: pexels(276724),
    category: "Investment",
    date: "Nov 14, 2026",
    readTime: 6,
    content: [
      "Smart home technology is no longer a gimmick — it is a legitimate value driver in real estate markets around the world. But not all smart features are created equal. Security systems with remote monitoring, smart thermostats, and energy-efficient lighting consistently top buyers' wish lists because they save money every month, not just impress during a viewing.",
      "The sweet spot is integration without complexity. A single app that controls climate, lighting, and door locks adds perceived value, while a house full of disconnected proprietary gadgets can actually scare buyers away — they worry about maintenance and obsolescence. Keep the system simple, documented, and easy to hand over.",
      "Energy efficiency is where smart homes genuinely pay for themselves. Smart thermostats alone can cut heating and cooling bills by 10–15%, and smart water-leak sensors prevent the kind of damage that ruins valuations. In sunny markets, app-monitored solar systems are becoming a premium feature buyers actively search for.",
      "Before investing in any upgrade, ask one question: does this reduce the next owner's monthly costs or daily friction? If the answer is yes, it will likely translate into a higher resale price. If it is only about novelty, spend your budget on timeless improvements instead — kitchens, bathrooms, and storage space still win every time.",
    ],
  },
  {
    slug: "stage-your-home-faster-sale",
    locale: "en",
    title: "How to Stage Your Home for a Faster, Higher Sale",
    excerpt:
      "Professional stagers charge a fortune, but these five rooms-level techniques achieve the same effect on any budget.",
    image: pexels(1643383),
    category: "Selling tips",
    date: "Nov 11, 2026",
    readTime: 5,
    content: [
      "Buyers decide within the first few minutes of a viewing whether a property feels like home. Staging is not about expensive furniture — it is about helping buyers picture their own life in the space. Start by removing half of what you own: decluttered rooms look up to 15% larger in photographs, and photos are where modern buyers form their first impression.",
      "Light is the cheapest luxury in real estate. Open every curtain, clean the windows, and replace weak bulbs with brighter, warmer lighting. In darker corners, a strategically placed mirror doubles the light and adds depth. Never show a property in the evening with dim lamps — it reads as an attempt to hide flaws.",
      "Neutrality sells. A fresh coat of warm white paint costs little but transforms dated rooms instantly. Store personal photographs, bold artwork, and niche decor during viewings — buyers should see a canvas for their own story, not a museum of yours.",
      "Finish with the details that signal care: freshly made beds, a styled dining table, plants at the entrance, and a spotless bathroom. These micro-signals suggest a well-maintained property, and buyers routinely pay more for a home that feels move-in ready.",
    ],
  },
  {
    slug: "real-estate-market-cycles",
    locale: "en",
    title: "Understanding Real Estate Market Cycles: Where Are We Now?",
    excerpt:
      "Every market moves through four predictable phases. Learn to spot them — and what each phase means for buyers, sellers, and investors.",
    image: pexels(280222),
    category: "Market insights",
    date: "Nov 8, 2026",
    readTime: 7,
    content: [
      "Real estate never moves in a straight line. Markets cycle through four phases — recovery, expansion, hyper-supply, and recession — each with its own signals and opportunities. Understanding where your local market sits in this cycle is often more important than any single headline or price index.",
      "Recovery follows a downturn: vacancies fall slowly, rents stabilise, and construction stays minimal. This is the phase where patient investors find the best long-term deals, because prices are still soft while the underlying fundamentals are already improving.",
      "Expansion is the phase most people recognise: prices climb, new projects break ground, and everyone wants in. It is a good time to sell, but buyers must be disciplined — competition inflates prices, and overpaying during expansion is the most common mistake in real estate.",
      "Hyper-supply is the warning sign: too many cranes, rising vacancy, and incentives like free rent or waived fees to attract tenants. Smart money starts exiting or building cash reserves here. The recession phase that follows rewards those with liquidity — motivated sellers, distressed assets, and renegotiation opportunities appear. The golden rule across all phases: buy on fundamentals, not on emotion.",
    ],
  },
  {
    slug: "off-plan-vs-ready-properties",
    locale: "en",
    title: "Off-Plan vs Ready Properties: Which One Is Right for You?",
    excerpt:
      "Lower entry prices versus instant certainty — a balanced comparison of the two main ways to buy new property.",
    image: pexels(259588),
    category: "Buyer's guide",
    date: "Nov 4, 2026",
    readTime: 5,
    content: [
      "Every buyer of new property faces the same fork in the road: buy off-plan and lock in today's price, or wait for completion and pay a premium for certainty. Off-plan purchases typically come in 15–30% below the price of an equivalent ready unit, with flexible payment plans spread over the construction period — a structure that makes ownership accessible to first-time buyers.",
      "The trade-off is risk. Construction delays are common across the region, and in the worst case, projects stall entirely. Protecting yourself starts with the developer: check their completed projects, their escrow or guarantee arrangements, and their reputation with previous buyers. A discount from an unproven developer is not a bargain — it is a bet.",
      "Ready properties cost more, but you buy exactly what you see. You can inspect finishes, test the plumbing, hear the neighbours, and move in within weeks. For buyers on a timeline — families relocating for work or school — the premium is usually worth paying.",
      "The balanced approach: if your horizon is flexible and the developer is credible, off-plan offers genuine value. If certainty matters more than price, buy ready. Either way, visit the site, read the contract line by line, and never let a showroom render replace an actual site inspection.",
    ],
  },
  {
    slug: "international-property-buyers-checklist",
    locale: "en",
    title: "The Complete Checklist for International Property Buyers",
    excerpt:
      "Buying across borders adds layers of complexity. This ten-point checklist keeps your purchase safe from currency risk to title deeds.",
    image: pexels(1396122),
    category: "Buyer's guide",
    date: "Nov 1, 2026",
    readTime: 8,
    content: [
      "Cross-border property purchases are booming across the Middle East, and for good reason — they offer diversification, rental income in stronger currencies, and lifestyle options. But distance multiplies every risk, from legal pitfalls to maintenance headaches. A disciplined checklist is your best insurance.",
      "Start with the legal framework: verify that foreign ownership is permitted in the target market, understand the title deed process, and always work with a licensed lawyer who is independent from the seller and the developer. Never accept a verbal assurance where a document should exist.",
      "Currency is the silent risk most buyers ignore. If your income is in one currency and the property, mortgage, and rent are in another, exchange movements can erase your returns. Plan your transfers in advance, consider hedging large payments, and keep a buffer for rate swings between signing and completion.",
      "Finally, plan the operational side before you sign: who manages the property when you are away, how rental income is repatriated, and what the annual costs really are — service charges, taxes, and management fees. A property that looks profitable on paper can turn negative after fees. The buyers who succeed internationally are the ones who treat the purchase like a business, not a holiday impulse.",
    ],
  },
];

export function getArticlesByLocale(locale: string): Article[] {
  return articles.filter((a) => a.locale === locale);
}

export function getArticleBySlug(
  locale: string,
  slug: string
): Article | undefined {
  return articles.find((a) => a.locale === locale && a.slug === slug);
}

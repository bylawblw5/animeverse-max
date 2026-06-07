// قاعدة بيانات ضخمة من أسئلة الأنمي - AnimeVerse MAX
export type Question = {
  id: number;
  category: 'characters' | 'events' | 'fights' | 'quotes' | 'authors' | 'studios' | 'music' | 'general';
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: string[];
  correct: number;
  xp: number;
};

export const QUESTIONS: Question[] = [
  // === الشخصيات (difficulty 1-5) ===
  { id: 1, category: 'characters', difficulty: 1, question: 'من هو بطل أنمي Naruto؟', options: ['ساسكي أوتشيها', 'ناروتو أوزوماكي', 'كاكاشي هاتاكي', 'إيتاشي أوتشيها'], correct: 1, xp: 10 },
  { id: 2, category: 'characters', difficulty: 1, question: 'ما اسم قبعة لوفي في One Piece؟', options: ['القبعة الحمراء', 'القبعة الذهبية', 'قبعة القش', 'القبعة السوداء'], correct: 2, xp: 10 },
  { id: 3, category: 'characters', difficulty: 2, question: 'من هو قائد فرقة الاستطلاع في Attack on Titan؟', options: ['إروين سميث', 'ليفاي أكرمان', 'هانجي زوي', 'هانشي'], correct: 0, xp: 20 },
  { id: 4, category: 'characters', difficulty: 2, question: 'ما اسم شقيقة تانجيرو في Demon Slayer؟', options: ['نيزوكو كامادو', 'شينوبو', 'ميتسوري', 'كاناو'], correct: 0, xp: 20 },
  { id: 5, category: 'characters', difficulty: 3, question: 'كم عدد ذيل كوراما داخل ناروتو؟', options: ['7', '8', '9', '10'], correct: 2, xp: 30 },
  { id: 6, category: 'characters', difficulty: 3, question: 'من هو "ملك القراصنة" في One Piece؟', options: ['شاغس روجر', 'اللحية البيضاء', 'شينوكس', 'كايدو'], correct: 0, xp: 30 },
  { id: 7, category: 'characters', difficulty: 4, question: 'ما اسم تقنية غوكو الأقوى في Dragon Ball؟', options: ['كاميهاميها', 'كينشاين', 'سبيريت بومب', 'غاليك غان'], correct: 2, xp: 40 },
  { id: 8, category: 'characters', difficulty: 4, question: 'من هو والد إدوارد إلريك في Fullmetal Alchemist؟', options: ['هوينهايم', 'موستانغ', 'أرمسترونغ', 'هيوز'], correct: 0, xp: 40 },
  { id: 9, category: 'characters', difficulty: 5, question: 'من هو مؤسس قرية كونوها الأول؟', options: ['مادارا أوتشيها', 'هاشيراما سينجو', 'توبيراما سينجو', 'ميناتو ناميكازي'], correct: 1, xp: 50 },
  { id: 10, category: 'characters', difficulty: 5, question: 'ما اسم السيف الأسطوري لـ زورو؟', options: ['وادو إيتشيمونجي', 'شوسوي', 'إينما', 'سANDAي كيتيتسو'], correct: 0, xp: 50 },

  // === الأحداث ===
  { id: 11, category: 'events', difficulty: 2, question: 'في أي عام بدأ بث أنمي Naruto الأصلي؟', options: ['2000', '2002', '2005', '2007'], correct: 1, xp: 20 },
  { id: 12, category: 'events', difficulty: 3, question: 'في أي حادثة فقد غوكو ذيله؟', options: ['مواجهة الإمبراطور بيلا', 'معركة تينشينهان', 'قتال جده غوهان', 'تحويل أوزارو'], correct: 2, xp: 30 },
  { id: 13, category: 'events', difficulty: 3, question: 'ما اسم الحرب الكبرى في Attack on Titan؟', options: ['حرب مارلي', 'حرب العمالقة', 'حرب شينغانزينا', 'حرب الراغون'], correct: 0, xp: 30 },
  { id: 14, category: 'events', difficulty: 4, question: 'من قتل إيتاشي والديه في Naruto؟', options: ['مادارا', 'أوبيتو', 'إيتاشي نفسه', 'دانزو'], correct: 2, xp: 40 },
  { id: 15, category: 'events', difficulty: 5, question: 'ما اسم اليوم الذي قُتل فيه والدا إرين في AOT؟', options: ['يوم السقوط', 'يوم الدمار', 'يوم الـ 845', 'يوم الجدار'], correct: 2, xp: 50 },

  // === القتالات ===
  { id: 16, category: 'fights', difficulty: 3, question: 'من فاز في قتال ناروتو ضد ساسكي في وادي النهاية الأول؟', options: ['ناروتو', 'ساسكي', 'تعادل', 'لم ينتهِ'], correct: 1, xp: 30 },
  { id: 17, category: 'fights', difficulty: 3, question: 'أين دار قتال لوفي وكاتاكري؟', options: ['جزيرة الكعكة', 'عالم المرآة', 'دريسلروزا', 'وانو'], correct: 1, xp: 30 },
  { id: 18, category: 'fights', difficulty: 4, question: 'من قتل اللحية البيضاء في One Piece؟', options: ['كايدو', 'أكاينو', 'مارشال دي تيتش', 'شانكس'], correct: 1, xp: 40 },
  { id: 19, category: 'fights', difficulty: 4, question: 'ما التقنية التي استخدمها إرين ضد آني في Stohess؟', options: ['العملاق المسلح', 'تقنية التصلب', 'العملاق المهاجم', 'قبضة التصلب'], correct: 3, xp: 40 },
  { id: 20, category: 'fights', difficulty: 5, question: 'من هو خصم غوكو الأول في بطولة القوة؟', options: ['جيسن', 'توبو', 'كفل', 'لافايندر'], correct: 0, xp: 50 },

  // === الاقتباسات ===
  { id: 21, category: 'quotes', difficulty: 2, question: 'من قال: "سأصبح ملك القراصنة"؟', options: ['زورو', 'لوفي', 'سانجي', 'أوسوب'], correct: 1, xp: 20 },
  { id: 22, category: 'quotes', difficulty: 3, question: 'من قال: "التخلي عن الأحلام أسوأ من الموت"؟', options: ['إيروين سميث', 'ليفاي', 'آرمين', 'هانشي'], correct: 0, xp: 30 },
  { id: 23, category: 'quotes', difficulty: 3, question: '"أنا لست بطلاً... أنا فقط أكره أن أخسر" - من القائل؟', options: ['غوكو', 'فيجيتا', 'إيتشيغو', 'ساسكي'], correct: 1, xp: 30 },
  { id: 24, category: 'quotes', difficulty: 4, question: 'من قال: "الضعفاء لا يختارون كيف يموتون" في One Piece؟', options: ['دوفلامنجو', 'كروكودايل', 'كايدو', 'لوتشي'], correct: 0, xp: 40 },
  { id: 25, category: 'quotes', difficulty: 5, question: 'من قال لناروتو: "الألم يعلمك أكثر من السعادة"؟', options: ['كاكاشي', 'جيرايا', 'إيتاشي', 'إيروكا'], correct: 2, xp: 50 },

  // === المؤلفون ===
  { id: 26, category: 'authors', difficulty: 1, question: 'من هو مؤلف Naruto؟', options: ['أكيرا تورياما', 'ماساشي كيشيموتو', 'إيتشيرو أودا', 'تايت كوبو'], correct: 1, xp: 10 },
  { id: 27, category: 'authors', difficulty: 1, question: 'من هو مؤلف One Piece؟', options: ['ماساشي كيشيموتو', 'إيتشيرو أودا', 'يوشيهيرو توغاشي', 'هيرو ماشيما'], correct: 1, xp: 10 },
  { id: 28, category: 'authors', difficulty: 2, question: 'من مؤلف Death Note؟', options: ['تسوجومي أوبا', 'إيتشيرو أودا', 'ناوكي أوراساوا', 'جونجي إيتو'], correct: 0, xp: 20 },
  { id: 29, category: 'authors', difficulty: 3, question: 'من مؤلف Fullmetal Alchemist؟', options: ['روميكو تاكاهاشي', 'هيرومو أراكاوا', 'ناوكي أوراساوا', 'كايو أسانو'], correct: 1, xp: 30 },
  { id: 30, category: 'authors', difficulty: 4, question: 'من مؤلف Attack on Titan؟', options: ['هاجيمي إيساياما', 'تاتسوكي فوجيموتو', 'جيج أكوتامي', 'كويوهارو جوتوجي'], correct: 0, xp: 40 },
  { id: 31, category: 'authors', difficulty: 4, question: 'من مؤلف Hunter x Hunter؟', options: ['يوشيهيرو توغاشي', 'ماساشي كيشيموتو', 'تيت كوبو', 'توغاشي'], correct: 0, xp: 40 },
  { id: 32, category: 'authors', difficulty: 5, question: 'من مؤلف Berserk؟', options: ['كينتارو ميورا', 'إيشيرو أودا', 'ناوكي أوراساوا', 'جوجي موريكاوا'], correct: 0, xp: 50 },

  // === الاستوديوهات ===
  { id: 33, category: 'studios', difficulty: 2, question: 'أي استوديو أنتج Naruto؟', options: ['Pierrot', 'MAPPA', 'Toei', 'Bones'], correct: 0, xp: 20 },
  { id: 34, category: 'studios', difficulty: 2, question: 'أي استوديو أنتج One Piece؟', options: ['Madhouse', 'Toei Animation', 'Wit Studio', 'Sunrise'], correct: 1, xp: 20 },
  { id: 35, category: 'studios', difficulty: 3, question: 'أي استوديو أنتج Attack on Titan (المواسم 1-3)؟', options: ['MAPPA', 'Wit Studio', 'Bones', 'A-1 Pictures'], correct: 1, xp: 30 },
  { id: 36, category: 'studios', difficulty: 3, question: 'أي استوديو أنتج Demon Slayer؟', options: ['ufotable', 'MAPPA', 'Bones', 'CloverWorks'], correct: 0, xp: 30 },
  { id: 37, category: 'studios', difficulty: 4, question: 'أي استوديو أنتج Jujutsu Kaisen؟', options: ['MAPPA', 'Wit Studio', 'Madhouse', 'Pierrot'], correct: 0, xp: 40 },
  { id: 38, category: 'studios', difficulty: 4, question: 'أي استوديو أنتج Fullmetal Alchemist: Brotherhood؟', options: ['Bones', 'J.C.Staff', 'Sunrise', 'Kyoto Animation'], correct: 0, xp: 40 },
  { id: 39, category: 'studios', difficulty: 5, question: 'أي استوديو أنتج Death Note؟', options: ['Madhouse', 'Production I.G', 'Gainax', 'Gonzo'], correct: 0, xp: 50 },

  // === الموسيقى ===
  { id: 40, category: 'music', difficulty: 3, question: 'من غنى أغنية "Gurenge" افتتاحية Demon Slayer؟', options: ['LiSA', 'Aimer', 'Yonezu', 'Ado'], correct: 0, xp: 30 },
  { id: 41, category: 'music', difficulty: 3, question: 'من غنى "Unravel" افتتاحية Tokyo Ghoul؟', options: ['TK from Ling Tosite Sigure', 'Aimer', 'Eve', 'Vaundy'], correct: 0, xp: 30 },
  { id: 42, category: 'music', difficulty: 4, question: 'من غنى "Kaikai Kitan" افتتاحية Jujutsu Kaisen؟', options: ['Eve', 'King Gnu', 'Spyair', 'UVERworld'], correct: 0, xp: 40 },
  { id: 43, category: 'music', difficulty: 4, question: 'ما اسم افتتاحية Attack on Titan الأولى؟', options: ['Shinzou wo Sasageyo', 'Guren no Yumiya', 'Jiyuu no Tsubasa', 'Sasageyo'], correct: 1, xp: 40 },
  { id: 44, category: 'music', difficulty: 5, question: 'من الفرقة التي غنت معظم افتتاحيات Naruto؟', options: ['Asian Kung-Fu Generation', 'Flow', 'Long Shot Party', 'كلهم'], correct: 3, xp: 50 },

  // === معلومات عامة ===
  { id: 45, category: 'general', difficulty: 1, question: 'كم عدد حلقات Naruto الأصلي؟', options: ['200', '220', '250', '300'], correct: 1, xp: 10 },
  { id: 46, category: 'general', difficulty: 2, question: 'في أي عام بدأت مانجا One Piece؟', options: ['1995', '1997', '2000', '2002'], correct: 1, xp: 20 },
  { id: 47, category: 'general', difficulty: 3, question: 'ما اسم كوكب غوكو الأصلي؟', options: ['الأرض', 'فيجيتا', 'ناميك', 'سايان'], correct: 1, xp: 30 },
  { id: 48, category: 'general', difficulty: 3, question: 'كم عدد أعضاء فرقة قبعة القش في Wano؟', options: ['9', '10', '11', '12'], correct: 1, xp: 30 },
  { id: 49, category: 'general', difficulty: 4, question: 'ما هو تصنيف أنمي Death Note؟', options: ['شونين', 'سينين', 'شوجو', 'جوسيه'], correct: 0, xp: 40 },
  { id: 50, category: 'general', difficulty: 5, question: 'في أي عام صدر أول أنمي في تاريخ اليابان؟', options: ['1907', '1917', '1930', '1945'], correct: 1, xp: 50 },

  // === أسئلة إضافية ===
  { id: 51, category: 'characters', difficulty: 2, question: 'من هو معلم ناروتو الأول؟', options: ['كاكاشي', 'إيروكا', 'جيرايا', 'تسونادي'], correct: 1, xp: 20 },
  { id: 52, category: 'characters', difficulty: 3, question: 'ما اسم شقيقة هيوري في Bleach؟', options: ['يوزو', 'كارين', 'رينجي', 'روكيا'], correct: 0, xp: 30 },
  { id: 53, category: 'characters', difficulty: 4, question: 'من هو الزعيم الرابع لكونوها؟', options: ['توبيراما', 'هيروزين', 'ميناتو', 'تسونادي'], correct: 2, xp: 40 },
  { id: 54, category: 'fights', difficulty: 3, question: 'من فاز في قتال إيتشيغو ضد أولكويورا؟', options: ['أولكويورا', 'إيتشيغو (Hollow)', 'تعادل', 'لم ينتهِ'], correct: 1, xp: 30 },
  { id: 55, category: 'events', difficulty: 4, question: 'في أي جزيرة وجد لوفي طاقمه الأول؟', options: ['إيست بلو', 'ساوث بلو', 'نورث بلو', 'ويست بلو'], correct: 0, xp: 40 },
  { id: 56, category: 'quotes', difficulty: 2, question: '"Believe it!" - من قائلها؟', options: ['لوفي', 'ناروتو', 'غوكو', 'إيتشيغو'], correct: 1, xp: 20 },
  { id: 57, category: 'studios', difficulty: 5, question: 'أي استوديو أنتج Cowboy Bebop؟', options: ['Sunrise', 'Gainax', 'Gonzo', 'Madhouse'], correct: 0, xp: 50 },
  { id: 58, category: 'general', difficulty: 2, question: 'كم عدد تنانين غوكو في Dragon Ball؟', options: ['5', '6', '7', '8'], correct: 2, xp: 20 },
  { id: 59, category: 'characters', difficulty: 3, question: 'من هو "ملك الوميض" في Naruto؟', options: ['ميناتو', 'كاكاشي', 'إيتاشي', 'جيرايا'], correct: 0, xp: 30 },
  { id: 60, category: 'fights', difficulty: 4, question: 'من هزم مادارا في الحرب الرابعة؟', options: ['ناروتو وساسكي', 'هاشيراما', 'كاغويا', 'أوبتو'], correct: 2, xp: 40 },
  { id: 61, category: 'characters', difficulty: 1, question: 'ما لون شعر ناروتو؟', options: ['أسود', 'أصفر', 'أحمر', 'أبيض'], correct: 1, xp: 10 },
  { id: 62, category: 'characters', difficulty: 1, question: 'ما اسم سيف إيتشيغو؟', options: ['زانغيتسو', 'سينبونزاكورا', 'هيورينمارو', 'كيوغا'], correct: 0, xp: 10 },
  { id: 63, category: 'events', difficulty: 2, question: 'في أي قرية يعيش ناروتو؟', options: ['ساند', 'ليف', 'ميست', 'كلاود'], correct: 1, xp: 20 },
  { id: 64, category: 'quotes', difficulty: 4, question: '"الألم يجعلك أقوى" - من القائل؟', options: ['بان', 'إسكانور', 'ميلودياس', 'كينغ'], correct: 0, xp: 40 },
  { id: 65, category: 'music', difficulty: 2, question: 'من غنى افتتاحية Naruto الأولى "Rocks"؟', options: ['Hound Dog', 'Flow', 'Asian Kung-Fu Generation', 'Long Shot Party'], correct: 0, xp: 20 },
  { id: 66, category: 'general', difficulty: 1, question: 'ما اسم البطل في One Punch Man؟', options: ['سايتاما', 'موب', 'جينوس', 'سونيك'], correct: 0, xp: 10 },
  { id: 67, category: 'authors', difficulty: 2, question: 'من مؤلف One Punch Man؟', options: ['ONE', 'يوسوكي موراتا', 'كلاهما', 'لا أحد'], correct: 2, xp: 20 },
  { id: 68, category: 'studios', difficulty: 3, question: 'أي استوديو أنتج Sword Art Online؟', options: ['A-1 Pictures', 'J.C.Staff', 'Sunrise', 'Pierrot'], correct: 0, xp: 30 },
  { id: 69, category: 'fights', difficulty: 2, question: 'من فاز في قتال لوفي ضد كروكودايل؟', options: ['كروكودايل', 'لوفي', 'تعادل', 'لم يحدث'], correct: 1, xp: 20 },
  { id: 70, category: 'characters', difficulty: 5, question: 'من هو أول عملاق مهاجم في Attack on Titan؟', options: ['إرين كروغر', 'جرايشا ييغر', 'إرين ييغر', 'فريدا ريس'], correct: 0, xp: 50 },
  { id: 71, category: 'events', difficulty: 3, question: 'ما اسم أول سفينة لطاقم لوفي؟', options: ['ثاوزاند صني', 'جوينج ميري', 'أوروفيل جاكسون', 'بيلي'], correct: 1, xp: 30 },
  { id: 72, category: 'characters', difficulty: 2, question: 'من هي خطيبة سانجي في WCI؟', options: ['بودنج', 'نايمي', 'فيفي', 'هانكوك'], correct: 0, xp: 20 },
  { id: 73, category: 'general', difficulty: 4, question: 'كم عدد قباطنة اليونكو الحاليين في One Piece؟', options: ['3', '4', '5', '6'], correct: 1, xp: 40 },
  { id: 74, category: 'quotes', difficulty: 5, question: '"في هذا العالم، الضعفاء يُسحقون" - من قالها؟', options: ['كروكودايل', 'دوفلامنجو', 'كايدو', 'تيتش'], correct: 1, xp: 50 },
  { id: 75, category: 'music', difficulty: 3, question: 'من الفرقة التي غنت "Shinzou wo Sasageyo"؟', options: ['Linked Horizon', 'UVERworld', 'Spyair', 'Flow'], correct: 0, xp: 30 },
  { id: 76, category: 'characters', difficulty: 3, question: 'من هو والد لوفي؟', options: ['غاروب', 'دراغون', 'شاغس', 'رايلي'], correct: 1, xp: 30 },
  { id: 77, category: 'fights', difficulty: 5, question: 'في أي حلقة قاتل إرين ضد آني لأول مرة؟', options: ['الحلقة 23', 'الحلقة 25', 'الحلقة 26', 'الحلقة 28'], correct: 2, xp: 50 },
  { id: 78, category: 'studios', difficulty: 4, question: 'أي استوديو أنتج Vinland Saga الموسم الثاني؟', options: ['Wit Studio', 'MAPPA', 'Bones', 'Pierrot'], correct: 1, xp: 40 },
  { id: 79, category: 'general', difficulty: 2, question: 'ما اسم اللعبة الافتراضية في SAO؟', options: ['ALO', 'GGO', 'Sword Art Online', 'UW'], correct: 2, xp: 20 },
  { id: 80, category: 'authors', difficulty: 3, question: 'من مؤلف Tokyo Ghoul؟', options: ['سوي إيشيدا', 'ناوكي أوراساوا', 'تاتسوكي فوجيموتو', 'كوجي إيناغاك'], correct: 0, xp: 30 },
  { id: 81, category: 'characters', difficulty: 2, question: 'من هو رفيق غوكو الأول في رحلته؟', options: ['كريلين', 'بولما', 'يامشا', 'تشي تشي'], correct: 1, xp: 20 },
  { id: 82, category: 'events', difficulty: 4, question: 'في أي عام صدر فيلم Dragon Ball Super: Broly؟', options: ['2017', '2018', '2019', '2020'], correct: 1, xp: 40 },
  { id: 83, category: 'fights', difficulty: 3, question: 'من فاز في معركة تانجيرو ضد روي؟', options: ['روي', 'تانجيرو', 'تعادل', 'لم تنتهِ'], correct: 1, xp: 30 },
  { id: 84, category: 'quotes', difficulty: 3, question: '"أنا لن أموت" - من قالها في SAO؟', options: ['أسونا', 'كيريتو', 'كليين', 'إغيل'], correct: 1, xp: 30 },
  { id: 85, category: 'music', difficulty: 4, question: 'من غنى "Idol" افتتاحية Oshi no Ko؟', options: ['YOASOBI', 'Aimer', 'Ado', 'Vaundy'], correct: 0, xp: 40 },
  { id: 86, category: 'general', difficulty: 1, question: 'ما اسم البطل في My Hero Academia؟', options: ['ديكو', 'باكوغو', 'تودوروكي', 'أول مايت'], correct: 0, xp: 10 },
  { id: 87, category: 'characters', difficulty: 4, question: 'من هو والد ديكو؟', options: ['أول مايت', 'هيساشي ميدوريا', 'إندايفر', 'غير معروف'], correct: 1, xp: 40 },
  { id: 88, category: 'studios', difficulty: 2, question: 'أي استوديو أنتج My Hero Academia؟', options: ['Bones', 'J.C.Staff', 'Toei', 'MAPPA'], correct: 0, xp: 20 },
  { id: 89, category: 'events', difficulty: 5, question: 'ما اسم اليوم الذي هُزم فيه كايدو؟', options: ['يوم أونيجاشيما', 'يوم الاحتفال بالنار', 'يوم وانو', 'يوم الموكامي'], correct: 1, xp: 50 },
  { id: 90, category: 'characters', difficulty: 3, question: 'من هو أفضل صديق لإيتشيغو؟', options: ['أوريهيمي', 'تشاد', 'إيشيدا', 'روكيا'], correct: 1, xp: 30 },
  { id: 91, category: 'fights', difficulty: 2, question: 'من فاز في قتال سايتاما الأول في المسلسل؟', options: ['جينوس', 'فاسيناس', 'كراستمان', 'كائن بحري'], correct: 0, xp: 20 },
  { id: 92, category: 'quotes', difficulty: 2, question: '"العدو الحقيقي هو الخوف" - في أي أنمي؟', options: ['Attack on Titan', 'Naruto', 'One Piece', 'Bleach'], correct: 2, xp: 20 },
  { id: 93, category: 'authors', difficulty: 4, question: 'من مؤلف Chainsaw Man؟', options: ['تاتسوكي فوجيموتو', 'جيج أكوتامي', 'كوجي إيناغاك', 'يوسوكي موراتا'], correct: 0, xp: 40 },
  { id: 94, category: 'studios', difficulty: 3, question: 'أي استوديو أنتج Chainsaw Man؟', options: ['MAPPA', 'Bones', 'Wit Studio', 'CloverWorks'], correct: 0, xp: 30 },
  { id: 95, category: 'general', difficulty: 2, question: 'كم عدد مواسم Demon Slayer حتى الآن؟', options: ['2', '3', '4', '5'], correct: 2, xp: 20 },
  { id: 96, category: 'characters', difficulty: 4, question: 'من هو شقيق إيتاشي الأصغر؟', options: ['ناروتو', 'ساسكي', 'كيسامي', 'مادارا'], correct: 1, xp: 40 },
  { id: 97, category: 'events', difficulty: 3, question: 'ما اسم أول مهمة لـ Team 7؟', options: ['مهمة الحراسة', 'مهمة جسر', 'مهمة القطة', 'مهمة شلال'], correct: 2, xp: 30 },
  { id: 98, category: 'music', difficulty: 5, question: 'من ملحن موسيقى Attack on Titan؟', options: ['هيرويوكي ساوانو', 'يوكي كاجيورا', 'شيرو ساغيسو', 'كينجي كاواي'], correct: 0, xp: 50 },
  { id: 99, category: 'fights', difficulty: 4, question: 'من قتل آيس في One Piece؟', options: ['كايدو', 'أكاينو', 'كيزارو', 'أوكيجي'], correct: 1, xp: 40 },
  { id: 100, category: 'quotes', difficulty: 4, question: '"أنا لا أستسلم أبداً، هذا هو طريقي النينجا" - من؟', options: ['ناروتو', 'روك لي', 'غاي', 'كاكاشي'], correct: 0, xp: 40 },
];

// مصفوفة للتوسع المستقبلي - يمكن إضافة آلاف الأسئلة لاحقاً
export const CATEGORIES_INFO = {
  characters: { name: 'الشخصيات', icon: '👤', color: 'from-pink-500 to-rose-600' },
  events: { name: 'الأحداث', icon: '📖', color: 'from-amber-500 to-orange-600' },
  fights: { name: 'القتالات', icon: '⚔️', color: 'from-red-500 to-red-700' },
  quotes: { name: 'الاقتباسات', icon: '💬', color: 'from-cyan-500 to-blue-600' },
  authors: { name: 'المؤلفون', icon: '✍️', color: 'from-purple-500 to-purple-700' },
  studios: { name: 'الاستوديوهات', icon: '🏢', color: 'from-indigo-500 to-indigo-700' },
  music: { name: 'الموسيقى', icon: '🎵', color: 'from-fuchsia-500 to-pink-600' },
  general: { name: 'معلومات عامة', icon: '📅', color: 'from-emerald-500 to-teal-600' },
};

export const RANKS = [
  { name: 'Bronze', min: 0, color: 'from-amber-700 to-orange-800', icon: '🥉' },
  { name: 'Silver', min: 500, color: 'from-slate-300 to-slate-500', icon: '🥈' },
  { name: 'Gold', min: 1500, color: 'from-yellow-400 to-yellow-600', icon: '🥇' },
  { name: 'Platinum', min: 3000, color: 'from-cyan-300 to-cyan-500', icon: '💎' },
  { name: 'Diamond', min: 6000, color: 'from-blue-300 to-blue-500', icon: '💠' },
  { name: 'Master', min: 10000, color: 'from-purple-400 to-fuchsia-600', icon: '👑' },
  { name: 'Legend', min: 20000, color: 'from-red-500 via-yellow-500 to-purple-600', icon: '🔥' },
];

export const getRank = (xp: number) => {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.min) rank = r;
  }
  return rank;
};

export const getNextRank = (xp: number) => {
  const current = getRank(xp);
  const idx = RANKS.findIndex(r => r.name === current.name);
  return RANKS[idx + 1] || null;
};

export const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;
export const xpForNextLevel = (xp: number) => 100 - (xp % 100);

export const ACHIEVEMENTS = [
  { id: 'first_answer', name: 'البداية', desc: 'أجب عن أول سؤال', icon: '🌱', condition: (p: any) => p.totalAnswered >= 1 },
  { id: 'ten_answers', name: 'المستكشف', desc: 'أجب عن 10 أسئلة', icon: '🎯', condition: (p: any) => p.totalAnswered >= 10 },
  { id: 'hundred_answers', name: 'المتمرس', desc: 'أجب عن 100 سؤال', icon: '⚡', condition: (p: any) => p.totalAnswered >= 100 },
  { id: 'thousand_answers', name: 'الأسطورة', desc: 'أجب عن 1000 سؤال', icon: '🔥', condition: (p: any) => p.totalAnswered >= 1000 },
  { id: 'first_win', name: 'المنتصر', desc: 'حقق أول فوز', icon: '🏆', condition: (p: any) => p.wins >= 1 },
  { id: 'ten_wins', name: 'البطل', desc: 'حقق 10 انتصارات', icon: '🏅', condition: (p: any) => p.wins >= 10 },
  { id: 'streak_5', name: 'المتسلسل', desc: 'حقق سلسلة 5', icon: '🔗', condition: (p: any) => p.bestStreak >= 5 },
  { id: 'streak_10', name: 'الجحيم', desc: 'حقق سلسلة 10', icon: '💀', condition: (p: any) => p.bestStreak >= 10 },
  { id: 'level_5', name: 'الصاعد', desc: 'الوصول للمستوى 5', icon: '⬆️', condition: (p: any) => calculateLevel(p.xp) >= 5 },
  { id: 'level_10', name: 'المحترف', desc: 'الوصول للمستوى 10', icon: '⭐', condition: (p: any) => calculateLevel(p.xp) >= 10 },
  { id: 'level_25', name: 'السيد', desc: 'الوصول للمستوى 25', icon: '👑', condition: (p: any) => calculateLevel(p.xp) >= 25 },
  { id: 'perfect_game', name: 'الإتقان', desc: 'اكمل جولة بدون أخطاء', icon: '💯', condition: (p: any) => p.perfectGames >= 1 },
];

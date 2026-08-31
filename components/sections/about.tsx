export default function About() {
  return (
    <section id="about" className="py-20 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/10572741/pexels-photo-10572741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="شاورما دمشقية"
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 to-transparent" />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-gold rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-gold rounded-bl-3xl" />
          </div>

          {/* Content */}
          <div className="text-right">
            <div className="inline-block w-16 h-1 bg-gold rounded-full mb-4" />
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-burgundy mb-6">
              حكاية دلعين الدمشقي
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                في قلب العبور، حيث يجتمع الناس على حب الطعام الأصيل، وُلد <span className="text-burgundy font-bold">دلعين الدمشقي</span> ليقدّم نكهة الشام الحقيقية لكل من يبحث عن طعم البيت.
              </p>
              <p>
                نؤمن أن الطعام ليس مجرد وجبة، بل تجربة كاملة تبدأ من اختيار المكونات الطازجة، وتنتهي بطبق غني بالنكهة يرضي كل الأذواق. شاورما على الطريقة الدمشقية، فتة شهية، مشويات طريّة، ومقبلات وسلطات طازجة — كلها محضّرة بعناية وحب.
              </p>
              <p>
                سواء جئت مع العائلة، أو مع الأصدقاء، أو حتى لطلب سريع في طريقك، دلعين الدمشقي هو مكانك المفضل في العبور لتستمتع بطعم الشام الأصيل.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center bg-white rounded-2xl p-4 shadow-md border border-cream-dark">
                <p className="font-heading font-black text-3xl text-burgundy">4.1</p>
                <p className="text-muted-foreground text-sm mt-1">التقييم</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-4 shadow-md border border-cream-dark">
                <p className="font-heading font-black text-3xl text-burgundy">+4500</p>
                <p className="text-muted-foreground text-sm mt-1">تقييم عميل</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-4 shadow-md border border-cream-dark">
                <p className="font-heading font-black text-3xl text-burgundy">+20</p>
                <p className="text-muted-foreground text-sm mt-1">صنف على المنيو</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دلعين الدمشقي | مطعم شاورما سوري أصيل في العبور',
  description:
    'دلعين الدمشقي - أشهى الشاورما والمأكولات السورية في قلب العبور. محضّرة بحب وبنكهة أصيلة ترجعك لأجواء الشام. اطلب الآن أو زورنا في سنتر مكة مول.',
  keywords: 'شاورما, مطعم سوري, دلعين الدمشقي, العبور, شاورما فراخ, فتة شاورما, مطعم شاورما القليوبية',
  openGraph: {
    title: 'دلعين الدمشقي | مطعم شاورما سوري أصيل',
    description: 'طعم الشام... في قلب العبور. أشهى الشاورما والمأكولات السورية.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

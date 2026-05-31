import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
});

export const metadata = {
  title: 'CA JS Success Suite',
  description: 'Production-ready CA JS Exam preparation workspace with automated study scheduler, mistake tracker, AI doubt decoder, leaderboards, Pomodoro, and handwritten OCR evaluators.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class={plusJakarta.variable}>
      <body className="font-sans antialiased text-slate-800 min-h-screen bg-gradient-to-tr from-[#f3f6fc] via-[#faeef6] to-[#eaeefc]">
        {children}
      </body>
    </html>
  );
}

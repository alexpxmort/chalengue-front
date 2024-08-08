import { Inter } from 'next/font/google';


import '../app/styles/globals.css';

export const metadata = {
  title: 'Shopex',
  description: 'A simple shopping cart',
};

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-Br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

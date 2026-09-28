import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Al Pazzo | Banquetería Boutique de Pizzas Artesanales',
  description: 'Banquetería boutique de pizzas artesanales para celebraciones y eventos privados en Santiago. Una experiencia cálida, sabrosa e inolvidable.',
  openGraph: {
    title: 'Al Pazzo | Banquetería Boutique de Pizzas Artesanales',
    description: 'Pizzas artesanales hechas para compartir y celebrar en Santiago.',
    images: ['/logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

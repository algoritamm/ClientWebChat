import '../wwwroot/css/styles.css';

export const metadata = {
  title: 'Chat Application',
  description: 'Client chat application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

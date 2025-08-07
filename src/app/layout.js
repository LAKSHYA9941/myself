import Navbar from "./components/Navbar";
import PageReveal from "./components/Pagereveal";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageReveal>{children}</PageReveal> 
      </body>
    </html>
  );
}

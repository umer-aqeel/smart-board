import { Inter } from "next/font/google";
import '../styles/global/globals.scss';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Board - SSUET",
  description: "SSUET - Smart Board",
};

export default function RootLayout({ children })
{
  


  return (
    <html lang="en">
      <body className={'inter.className'}>
   
        {children}
     
        </body>
    </html>
  );
}

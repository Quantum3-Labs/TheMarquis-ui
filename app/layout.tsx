/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client'
import "./globals.css";
import Header from "./components/Header/Header";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { DojoProvider } from "./DojoContext"
import { setup } from './dojo/setup';
import { useEffect, useState } from "react";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({children}: {children: React.ReactNode;}){
  const [setupResult, setSetupResult] = useState<any>(null);

  useEffect(() => {
    async function setupDojo() {
      const result = await setup();
      setSetupResult(result);
    }
    setupDojo();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Calistoga&family=Roboto&display=swap&family=Rozha+One&display=swap"
          rel="stylesheet"
        />
        <title>The Marquis</title>
        <meta name="The Marquis" content="The Maquis" />
      </head>
      <body className={`${inter.className} font-roboto`}>
      {setupResult && (
          <DojoProvider value={setupResult}>
            <Header pageTitle="The Marquis"></Header>
            {children}
          </DojoProvider>
        )}
      </body>
    </html>
  );
}

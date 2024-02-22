import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import type { Metadata } from "next";
import classes from "./layout.module.css";
import { HeaderMenu } from "@/components/header-menu/header-menu";
import { FooterSection } from "@/components/footer-section/footer-section";

export const metadata: Metadata = {
  title: "Cek Sandi",
  description: "Website untuk mengecek kekuatan kata sandi dengan lengkap.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <HeaderMenu />
          {children}
          <FooterSection />
        </MantineProvider>
      </body>
    </html>
  );
}

const theme = createTheme({
  primaryColor: "brand",
  black: "#212529",
  activeClassName: classes.active,
  colors: {
    brand: [
      "#eef3ff",
      "#dee2f2",
      "#bdc2de",
      "#98a0ca",
      "#7a84ba",
      "#6672b0",
      "#5c68ac",
      "#4c5897",
      "#424e88",
      "#364379",
    ],
  },
});

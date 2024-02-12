import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import type { Metadata } from "next";
import themeClasses from "./theme.module.css";

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
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}

const theme = createTheme({
  primaryColor: "brand",
  black: "#212529",
  activeClassName: themeClasses.active,
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
      "#364379"
    ],
  },
});

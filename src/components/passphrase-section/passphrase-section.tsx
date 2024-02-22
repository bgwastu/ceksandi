"use client";

import {
  Anchor,
  Box,
  Container,
  Highlight,
  List,
  Mark,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { IconAsterisk, IconCheck, IconX } from "@tabler/icons-react";

export default function PassphraseSection() {
  return (
    <Box bg="brand.1" py={rem(40)}>
      <Container>
        <Stack maw={700}>
          <Box>
            <ThemeIcon size="xl" mb="sm" color="brand.8" variant="filled">
              <IconAsterisk style={{ width: "60%", height: "60%" }} />
            </ThemeIcon>
            <Title c="brand.8">
              Membuat kata sandi yang aman (dengan frasa sandi)
            </Title>
          </Box>
          <Highlight
            lh={1.6}
            highlight={"minimal total lebih dari 14 karakter"}
          >{`
          Frasa sandi adalah jenis kata sandi yang aman dan mudah untuk diingat.
          Untuk membuat frasa sandi, pikirkan kalimat dari campuran empat kata
          atau lebih dengan minimal total lebih dari 14 karakter. Semakin "unik"
          dan "kreatif" semakin bagus.
        `}</Highlight>
          <Text fw={600} fz="xl" c="brand.9">
            Contoh:
          </Text>
          <List
            withPadding
            spacing="xs"
            icon={
              <ThemeIcon color="brand" size={24} radius="xl">
                <IconCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            <List.Item>{`"perpustakaan penuh buku di malam hari" (37 karakter)`}</List.Item>
            <List.Item>{`"ywdh-sih-kalau-lo-ga-suka" (25 karakter)`}</List.Item>
            <List.Item>{`"Mie ayam di gondangdia enak banget!!!" (37 karakter)`}</List.Item>
            <List.Item>
              {`"Selama ini kamu sudah ada yang punya huhu" (41 katakter)`}
            </List.Item>
          </List>
          <Title order={2} c="brand.9">
            Kata sandi yang tidak aman
          </Title>
          <Text lh={1.6}>
            Sebenarnya{" "}
            <Anchor
              href="https://en.m.wikipedia.org/wiki/Password_strength#Examples_of_weak_passwords"
              underline="always"
              target="_blank"
            >
              ada banyak hal yang membuat kata sandi menjadi tidak aman
            </Anchor>
            , tetapi intinya jangan memasukkan data personal seperti{" "}
            <Mark>tahun lahir</Mark>, <Mark>nama panggilan</Mark> atau{" "}
            <Mark>hobi</Mark> pada kata sandi. Hacker dapat dengan mudah
            memasukkan informasi tersebut pada bot komputer untuk menebak kata
            sandi kamu.
          </Text>
          <Text fw={600} fz="xl" c="brand.9">
            Contoh kata sandi yang tidak aman:
          </Text>
          <List
            withPadding
            spacing="xs"
            icon={
              <ThemeIcon color="brand.4" size={24} radius="xl">
                <IconX style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            <List.Item>dinda2002</List.Item>
            <List.Item>082148539759dinda</List.Item>
            <List.Item>dindagolf</List.Item>
          </List>
        </Stack>
      </Container>
    </Box>
  );
}

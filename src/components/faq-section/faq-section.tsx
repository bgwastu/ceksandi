"use client";

import {
  Accordion,
  Anchor,
  Box,
  Container,
  Stack,
  Text,
  Title
} from "@mantine/core";
import classes from "./faq-section.module.css";

const faq = [
  {
    value: "cara-pengecekan",
    question: "Bagaimana cara pengecekan dilakukan?",
    answer: (
      <Stack gap="xs">
        <Text lh={1.6}>
          Website ini{" "}
          <Anchor
            href="https://dropbox.tech/security/zxcvbn-realistic-password-strength-estimation"
            target="_blank"
            underline="always"
          >
            menggunakan algoritma khusus
          </Anchor>{" "}
          untuk mengetahui seberapa rumit kata sandi untuk ditebak.
        </Text>
        <Text>Kata sandi akan dinilai berdasarkan:</Text>
        <ul>
          <li>
            <Text fw={600} span>
              Waktu untuk dipecahkan:
            </Text>{" "}
            Berapa lama waktu yang dibutuhkan bagi hacker untuk memecahkan kata
            sandi menggunakan bot komputer.
          </li>
          <li>
            <Text fw={600} span>
              Kekuatan kata sandi:
            </Text>
            {
              " kekuatan kata sandi berdasarkan kerumitan dan kemungkinan ditebak. Dianalisis dari 40 ribu kata sandi umum dan menggunakan pencocokan pola berdasarkan kata-kata umum, nama populer, pengulangan (mis. 'aaa'), urutan (mis. 'abcd'), dan "
            }
            <Anchor
              href="https://id.wikipedia.org/wiki/Leet
            "
              target="_blank"
              underline="always"
            >
              ejaan l33t
            </Anchor>
            .
          </li>
          <li>
            <Text fw={600} span>
              Paparan terhadap kebocoran data:
            </Text>{" "}
            Kata sandi akan diperiksa pada kasus kebocoran data yang terekam di{" "}
            <Anchor
              href="https://haveibeenpwned.com/"
              target="_blank"
              underline="always"
            >
              HIBP
            </Anchor>
            .
          </li>
        </ul>
      </Stack>
    ),
  },
  {
    value: "apakah-aman",
    question: "Apakah website ini aman?",
    answer: (
      <Stack gap="xs">
        <Text lh={1.6}>
          Cek Sandi bersifat anonim. Website ini tidak pernah mengumpulkan,
          melacak atau menyimpan kata sandi. Semua pengecekan dilakukan pada
          sisi klien, bukan pada server.
        </Text>
        <Text>
          <Anchor
            href="https://github.com/bgwastu/ceksandi"
            target="_blank"
            underline="always"
          >
            Kode sumber Cek Sandi tersedia untuk umum
          </Anchor>
          . Jika ragu, kamu bisa mengaudit dan menjalankannya sendiri.
        </Text>
      </Stack>
    ),
  },
  {
    value: "implementasi",
    question: "Bagaimana cara implementasi algoritma ini di aplikasi saya?",
    answer: (
      <Stack gap="xs">
        <Text lh={1.6}>
          Kamu bisa menggunakan{" "}
          <Anchor
            href="https://github.com/dropbox/zxcvbn"
            target="_blank"
            underline="always"
          >
            zxcvbn
          </Anchor>{" "}
          untuk mengimplementasikan algoritma ini di aplikasi yang sedang kamu
          kembangkan. zxcvbn tersedia dalam berbagai bahasa pemrograman.
        </Text>
        <Text>
          Jika kamu menggunakan TypeScript, kamu bisa menggunakan{" "}
          <Anchor
            href="https://zxcvbn-ts.github.io/zxcvbn/"
            target="_blank"
            underline="always"
          >
            zxcvbn-ts
          </Anchor>{" "}
          untuk mengecek kekuatan kata sandi. Jangan lupa untuk{" "}
          <Anchor
            href="https://zxcvbn-ts.github.io/zxcvbn/guide/languages/#add-a-new-language-package"
            target="_blank"
            underline="always"
          >
            mengintegrasikan paket bahasa Indonesia
          </Anchor>
        </Text>
      </Stack>
    ),
  },
];

export default function FaqSection() {
  return (
    <Box id="faq">
      <Container py={40} size="sm" className={classes.wrapper}>
        <Stack gap="xl">
          <Title ta="center">Pertanyaan Umum</Title>
          <Accordion variant="separated">
            {faq.map((item, index) => {
              return (
                <Accordion.Item
                  key={index}
                  className={classes.item}
                  value={item.value}
                >
                  <Accordion.Control fw={600}>
                    <Text fw={600} c="brand.9">
                      {item.question}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Stack>
      </Container>
    </Box>
  );
}

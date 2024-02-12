"use client";

import {
  Accordion,
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  List,
  ListItem,
  Paper,
  PasswordInput,
  Popover,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconQuestionMark } from "@tabler/icons-react";
import { ZxcvbnResult, zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import Logo from "../components/logo/logo";
import { GITHUB_URL } from "./constant";
import classes from "./page.module.css";
dayjs.locale("id");
dayjs.extend(relativeTime);

const faqItems = [
  {
    question: "Apakah aman menulis kata sandi saya di sini?",
    answer: (
      <Text>
        Ya, aman. Karena kata sandi yang kamu tulis tidak akan disimpan di
        server kami. Semua proses pengecekan dilakukan di sisi klien. Jika kamu
        ragu, kamu bisa memeriksa kode sumber website ini di{" "}
        <Anchor href={GITHUB_URL}>GitHub</Anchor>.
      </Text>
    ),
  },
  {
    question: "Kenapa kata sandi yang kuat itu penting?",
    answer: (
      <Text>
        Kata sandi yang kuat sangat penting untuk melindungi akun kamu dari
        akses yang tidak sah. Dengan kata sandi yang kuat, hacker akan kesulitan
        untuk menebak kata sandi kamu.
      </Text>
    ),
  },

  {
    question: "Bagaimana cara membuat kata sandi yang kuat?",
    answer: (
      <Text>
        Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol. Semakin
        panjang kata sandi, semakin kuat kata sandi tersebut.
      </Text>
    ),
  },
];

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

const loadOptions = async () => {
  const zxcvbnCommonPackage = await import("@zxcvbn-ts/language-common");
  const zxcvbnEnPackage = await import("@zxcvbn-ts/language-en");
  const zxcvbnIdPackage = await import("@zxcvbn-ts/language-id");

  return {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      ...zxcvbnIdPackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    translations: {
      warnings: {
        straightRow: "Baris lurus dari tombol di keyboard mudah ditebak.",
        keyPattern: "Pola keyboard yang pendek mudah ditebak.",
        simpleRepeat: 'Karakter yang berulang seperti "aaa" mudah ditebak.',
        extendedRepeat:
          'Pola karakter yang berulang seperti "abcabcabc" mudah ditebak.',
        sequences: 'Urutan karakter yang umum seperti "abc" mudah ditebak.',
        recentYears: "Tahun-tahun terkini mudah ditebak.",
        dates: "Tanggal mudah ditebak.",
        topTen: "Ini adalah kata sandi yang sangat sering digunakan.",
        topHundred: "Ini adalah kata sandi yang sering digunakan.",
        common: "Ini adalah kata sandi yang umum digunakan.",
        similarToCommon: "Ini mirip dengan kata sandi yang umum digunakan.",
        wordByItself: "Kata tunggal mudah ditebak.",
        namesByThemselves: "Nama atau nama belakang tunggal mudah ditebak.",
        commonNames: "Nama atau nama belakang yang umum mudah ditebak.",
        userInputs: "Mengandung data personal.",
        pwned: "Kata sandi pernah terekspos pada kebocoran data di Internet.",
      },
      suggestions: {
        l33t: "Hindari penggantian huruf yang dapat diprediksi seperti '@' untuk 'a'.",
        reverseWords: "Hindari ejaan terbalik dari kata-kata umum.",
        allUppercase:
          "Gunakan huruf kapital untuk beberapa, tapi tidak semua huruf.",
        capitalization: "Gunakan huruf kapital lebih dari huruf pertama.",
        dates:
          "Hindari tanggal dan tahun yang berhubungan dengan diri sendiri.",
        recentYears: "Hindari tahun-tahun terkini.",
        associatedYears:
          "Hindari tahun-tahun yang berhubungan dengan diri sendiri.",
        sequences: "Hindari urutan karakter yang umum.",
        repeated: "Hindari kata dan karakter yang berulang.",
        longerKeyboardPattern:
          "Gunakan pola keyboard yang lebih panjang dan ubah arah ketik beberapa kali.",
        anotherWord: "Tambahkan lebih banyak kata yang kurang umum.",
        useWords: "Gunakan beberapa kata, tapi hindari frasa umum.",
        noNeed:
          "Simbol, angka, atau huruf besar tidak wajib untuk membuat kata sandi yang kuat.",
        pwned: "Kata sandi ini sebaiknya tidak digunakan lagi.",
      },
      timeEstimation: {
        ltSecond: "Kurang dari satu detik",
        second: "{base} detik",
        seconds: "{base} detik",
        minute: "{base} menit",
        minutes: "{base} menit",
        hour: "{base} jam",
        hours: "{base} jam",
        day: "{base} hari",
        days: "{base} hari",
        month: "{base} bulan",
        months: "{base} bulan",
        year: "{base} tahun",
        years: "{base} tahun",
        centuries: "Berabad-abad",
      },
    },
  };
};

export default function Home() {
  const [password, setPassword] = useDebouncedState("", 300, { leading: true });
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadOptions().then((options) => {
      zxcvbnOptions.setOptions(options);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (password === "") {
      setResult(null);
      return;
    }

    zxcvbnAsync(password).then((res) => {
      setResult(res);
    });
  }, [password]);

  return (
    <Container my="xl" size="sm" mt={52}>
      <Stack align="stretch">
        <Stack gap="xs" align="center" ta="center">
          <Logo />
          <Text>Merasa kata sandi kamu sudah kuat? Yuk Buktikan!</Text>
        </Stack>
        <PasswordInput
          placeholder={
            ready ? "Masukkan kata sandi kamu" : "Mohon tunggu sebentar..."
          }
          type="password"
          defaultValue={password}
          disabled={!ready}
          onChange={(event) => setPassword(event.currentTarget.value)}
          size="xl"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEyeOff /> : <IconEye />
          }
        />
        <Transition
          mounted={!!result}
          transition="fade"
          duration={200}
          timingFunction="ease"
          keepMounted
        >
          {(styles) => (
            <Paper
              withBorder
              p="md"
              style={styles}
              className={classes.resultWrapper}
              mod={{
                score: result?.score,
              }}
            >
              <Stack gap="md" align="start">
                <Box>
                  <Text fz={18} fw="600">
                    Skor:
                  </Text>
                  <Text className={classes.label} fw={600}>{`${
                    result?.score ?? 0 + 1
                  } dari 5 ${
                    result?.score === 0
                      ? "(Sangat Buruk)"
                      : result?.score === 1
                      ? "(Buruk)"
                      : result?.score === 2
                      ? "(Lemah)"
                      : result?.score === 3
                      ? "(Bagus)"
                      : result?.score === 4
                      ? "(Sangat Bagus)"
                      : ""
                  }`}</Text>
                </Box>
                <Box>
                  <Text fz={18} fw="600">
                    Waktu perkiraan untuk membobol:
                  </Text>
                  <Flex gap="xs" align="center">
                    <Text>{`${result?.crackTimesDisplay.offlineSlowHashing1e4PerSecond}`}</Text>
                    <Popover
                      width={200}
                      position="bottom"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <ActionIcon
                          variant="outline"
                          aria-label="Help"
                          size="sm"
                          radius="xl"
                          color="dark"
                        >
                          <IconQuestionMark
                            style={{ width: "80%", height: "80%" }}
                          />
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Text size="xs">
                          Waktu yang diperlukan untuk membobol kata sandi dengan
                          komputasi <b>10 ribu percobaan per detik</b>.
                        </Text>
                      </Popover.Dropdown>
                    </Popover>
                  </Flex>
                </Box>
                <Box hidden={result?.feedback.suggestions.length === 0}>
                  <Text fz={18} fw="600">
                    Detail:
                  </Text>
                  <List withPadding>
                    {result?.feedback.suggestions.map((s) => {
                      return <ListItem key={s}>{s}</ListItem>;
                    })}
                    {result?.feedback.warning ? (
                      <ListItem>{result?.feedback.warning}</ListItem>
                    ) : null}
                  </List>
                </Box>
              </Stack>
            </Paper>
          )}
        </Transition>
        {/* FAQ */}
        <Divider />
        <Stack align="stretch" ta="center">
          <Title>Pertanyaan Umum</Title>
          <Accordion variant="contained" ta="start" multiple>
            {faqItems.map((item) => (
              <Accordion.Item key={item.question} value={item.question}>
                <Accordion.Control>{item.question}</Accordion.Control>
                <Accordion.Panel>{item.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </Stack>
    </Container>
  );
}

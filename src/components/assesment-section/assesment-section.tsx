"use client";

import { TRANSLATIONS as ZXCVBN_TRANSLATIONS } from "@/constant";
import {
  Anchor,
  Box,
  BoxProps,
  Container,
  Flex,
  List,
  ListItem,
  Loader,
  Mark,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  IconAlertTriangle,
  IconCalendarTime,
  IconCheck,
  IconDatabaseLeak,
  IconEye,
  IconEyeOff,
  IconInfoCircle,
  IconLock,
} from "@tabler/icons-react";
import { ZxcvbnResult, zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useEffect, useState } from "react";
import classes from "./assesment-section.module.css";

dayjs.locale("id");
dayjs.extend(relativeTime);

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
    translations: ZXCVBN_TRANSLATIONS,
  };
};

type PasswordStrengthLevel = {
  level: number;
  label: string;
  color: string;
  explanation: React.ReactNode;
};

const passwordStrengthLevels: PasswordStrengthLevel[] = [
  {
    level: 0,
    label: "Sangat Lemah",
    color: "red",
    explanation: (
      <Text>
        Kata sandi ini sangat mudah ditebak dan tidak aman.
        <br />
        <br />
        <Anchor inherit component={Link} underline="always" href="#passphrase">
          Lihat cara membuat kata sandi yang kuat
        </Anchor>
      </Text>
    ),
  },
  {
    level: 1,
    label: "Lemah",
    color: "orange",
    explanation: (
      <Text>
        Kata sandi ini masih mudah ditebak.
        <br />
        <br />
        <Anchor inherit component={Link} underline="always" href="#passphrase">
          Lihat cara membuat kata sandi yang kuat
        </Anchor>
      </Text>
    ),
  },
  {
    level: 2,
    label: "Sedang",
    color: "yellow",
    explanation: (
      <Text>
        Kata sandi ini sudah cukup kuat, tapi masih bisa diperkuat.
        <br />
        <br />
        <Anchor inherit component={Link} underline="always" href="#passphrase">
          Lihat cara membuat kata sandi yang kuat
        </Anchor>
      </Text>
    ),
  },
  {
    level: 3,
    label: "Kuat",
    color: "green",
    explanation: (
      <Text>
        Kata sandi ini sudah kuat, tapi selalu review dan perbarui kata sandi
        secara berkala.
      </Text>
    ),
  },
  {
    level: 4,
    label: "Sangat Kuat",
    color: "brand",
    explanation: (
      <Text>
        Kata sandi ini sangat kuat! Selalu review dan perbarui kata sandi secara
        berkala.
      </Text>
    ),
  },
];

export default function AssesmentSection({ ...props }: BoxProps) {
  const [password, setPassword] = useDebouncedState("", 300, { leading: true });
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  const [ready, setReady] = useState(false);
  const [currentPasswordStrength, setCurrentPasswordStrength] =
    useState<PasswordStrengthLevel | null>(null);
  const isLoading = password !== (result?.password ?? "");

  useEffect(() => {
    loadOptions().then((options) => {
      zxcvbnOptions.setOptions(options);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (password === "") {
      setResult(null);
      setCurrentPasswordStrength(null);
      return;
    }

    zxcvbnAsync(password).then((res) => {
      setResult(res);
      setCurrentPasswordStrength(
        passwordStrengthLevels.find((level) => level.level === res.score)!
      );
    });
  }, [password]);

  return (
    <Box
      component="section"
      {...props}
      className={classes.wrapper}
      bg={
        currentPasswordStrength
          ? currentPasswordStrength.color + ".1"
          : "brand.1"
      }
      style={{
        transition: "background-color 0.3s ease",
      }}
    >
      <Container className={classes.column}>
        <Stack
          gap={2}
          style={{
            transition: "color 0.3s ease",
          }}
        >
          <Title
            c={
              currentPasswordStrength
                ? currentPasswordStrength.color + ".8"
                : "brand.8"
            }
          >
            Cek Kata Sandi
          </Title>
          <Text>Merasa kata sandi kamu sudah kuat? Yuk Buktikan!</Text>
        </Stack>
        <PasswordInput
          size="lg"
          placeholder={
            ready ? "Masukkan kata sandi kamu" : "Mohon tunggu sebentar..."
          }
          disabled={!ready}
          onChange={(event) => setPassword(event.currentTarget.value)}
          classNames={{
            input: classes.passwordInput,
          }}
          style={{
            "--focus-color": `var(--mantine-color-${
              currentPasswordStrength?.color ?? "brand"
            }-7)`,
          }}
          visibilityToggleIcon={({ reveal }) =>
            isLoading ? (
              <Loader size="xs" />
            ) : reveal ? (
              <IconEyeOff />
            ) : (
              <IconEye />
            )
          }
        />
        <Stack gap="md">
          {currentPasswordStrength ? (
            <>
              <Flex gap={4}>
                <Text fz="xl">Kekuatan:</Text>
                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <Flex
                      gap={2}
                      align="center"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        fz="xl"
                        fw="bold"
                        c={currentPasswordStrength.color + ".7"}
                        td="underline"
                      >
                        {currentPasswordStrength.label}
                      </Text>
                      <ThemeIcon
                        size={22}
                        variant="transparent"
                        c={currentPasswordStrength.color + ".7"}
                      >
                        <IconInfoCircle
                          style={{ width: "100%", height: "100%" }}
                          fill="var(--mantine-color-white)"
                        />
                      </ThemeIcon>
                    </Flex>
                  </Popover.Target>
                  <Popover.Dropdown>
                    {currentPasswordStrength.explanation}
                  </Popover.Dropdown>
                </Popover>
              </Flex>
              <Progress
                w="250px"
                bg="white"
                radius="xs"
                value={(currentPasswordStrength.level + 1) * 20}
                color={currentPasswordStrength.color + ".7"}
              />
              <List spacing="xs">
                <List.Item
                  icon={
                    <ThemeIcon
                      color={currentPasswordStrength.color + ".7"}
                      size={28}
                    >
                      <IconCalendarTime
                        style={{ width: "70%", height: "70%" }}
                      />
                    </ThemeIcon>
                  }
                >
                  Perlu waktu{" "}
                  <Tooltip
                    inline
                    label="Dengan komputasi 10 ribu percobaan per detik. (Offline Hash)"
                    multiline
                    w={220}
                    withArrow
                  >
                    <Mark
                      style={{
                        textDecoration: `underline var(--mantine-color-${
                          currentPasswordStrength?.color ?? "brand"
                        }-7)`,
                        fontWeight: "600",
                      }}
                      color="transparent"
                    >
                      {result?.crackTimesDisplay.onlineNoThrottling10PerSecond}
                    </Mark>
                  </Tooltip>{" "}
                  untuk membobol kata sandi ini
                </List.Item>
                {result?.feedback.warning === "similarToCommon" ||
                result?.feedback.warning === "common" ? (
                  <ListItem
                    icon={
                      <ThemeIcon
                        color={currentPasswordStrength.color + ".7"}
                        size={28}
                      >
                        <IconAlertTriangle
                          style={{ width: "70%", height: "70%" }}
                        />
                      </ThemeIcon>
                    }
                  >
                    Kata sandi mirip dengan kata biasa digunakan oleh banyak
                    orang
                  </ListItem>
                ) : null}
                <List.Item
                  icon={
                    <ThemeIcon
                      size={28}
                      color={currentPasswordStrength.color + ".7"}
                    >
                      {result?.feedback.warning === "pwned" ? (
                        <IconDatabaseLeak
                          style={{ width: "70%", height: "70%" }}
                        />
                      ) : (
                        <IconCheck style={{ width: "70%", height: "70%" }} />
                      )}
                    </ThemeIcon>
                  }
                >
                  {result?.feedback.warning === "pwned" ? (
                    <Text>
                      Kata sandi ini{" "}
                      <Tooltip
                        inline
                        label="Berdasarkan data dari haveibeenpwned.com, kata sandi ini pernah terpapar dalam kebocoran data."
                        multiline
                        w={220}
                        withArrow
                      >
                        <Mark
                          style={{
                            textDecoration: `underline var(--mantine-color-${
                              currentPasswordStrength?.color ?? "brand"
                            }-7)`,
                            fontWeight: "600",
                          }}
                          color="transparent"
                        >
                          pernah terpapar
                        </Mark>
                      </Tooltip>{" "}
                      dalam kebocoran data
                    </Text>
                  ) : (
                    <Text>Kata sandi tidak terekspos dalam kebocoran data</Text>
                  )}
                </List.Item>
              </List>
            </>
          ) : (
            <Flex gap={8} align="center">
              <ThemeIcon size={22} radius="xl">
                <IconLock style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text size="sm">
                Kata sandi yang dimasukkan{" "}
                <Text inherit span fw="bold">
                  tidak akan disimpan
                </Text>
                .{" "}
                <Anchor
                  href="#:~:text=Bagaimana cara pengecekan dilakukan?"
                  underline="always"
                  inherit
                >
                  Lihat cara kerja web ini
                </Anchor>
              </Text>
            </Flex>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

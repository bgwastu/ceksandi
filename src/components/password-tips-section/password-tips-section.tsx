import {
  Anchor,
  Box,
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import { IconLock, IconSpy, IconUserCheck } from "@tabler/icons-react";

const passwordTips = [
  {
    title: "Makin panjang, makin kuat",
    description: (
      <Text>
        Kata sandi yang kuat memiliki lebih dari 13 kata (semakin banyak semakin
        bagus).
      </Text>
    ),
    icon: <IconLock />,
  },
  {
    title: "Personal dan Rahasia",
    description: (
      <Text>Hanya kamu yang boleh mengetahui kata sandimu sendiri.</Text>
    ),
    icon: <IconSpy />,
  },
  {
    title: "Sekali Pakai",
    description: (
      <Text>
        Setiap akun online harus memiliki kata sandi yang berbeda-beda. Gunakan{" "}
        <Anchor href="#" underline="always" inherit>
          password manager
        </Anchor>{" "}
        agar tidak lupa.
      </Text>
    ),
    icon: <IconUserCheck />,
  },
];

export default function PasswordTipsSection() {
  return (
    <Box my={rem(40)} size="md">
      <Container>
        <Stack>
          <Title ta="center" c="brand.9">
            3 Sifat Kata Sandi Kuat
          </Title>
          <SimpleGrid
            cols={{
              xs: 1,
              md: 3,
            }}
          >
            {passwordTips.map((tip, index) => (
              <Paper
                key={index}
                p="lg"
                bg="brand.1"
                mih={200}
                style={{
                  border: "2px solid var(--mantine-color-brand-9)",
                }}
              >
                <ThemeIcon size="xl" mb="sm" variant="filled">
                  {tip.icon}
                </ThemeIcon>
                <Title order={3}>{tip.title}</Title>
                {tip.description}
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

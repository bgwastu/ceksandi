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
    color: "brand",
  },
  {
    title: "Personal dan Rahasia",
    description: (
      <Text>Hanya kamu yang boleh mengetahui kata sandimu sendiri.</Text>
    ),
    icon: <IconSpy />,
    color: "brand"
  },
  {
    title: "Sekali Pakai",
    description: (
      <Text>
        Setiap akun online harus memiliki kata sandi yang berbeda-beda. Gunakan{" "}
        <Anchor href="#" underline="always">
          password manager
        </Anchor>{" "}
        agar tidak lupa.
      </Text>
    ),
    icon: <IconUserCheck />,
    color: "brand"
  },
];

export default function PasswordTipsSection() {
  return (
    <Box my={rem(40)} size="md">
      <Container>
        <Stack gap="xl">
          <Title ta="center" c="">
            Sifat Kata Sandi Kuat
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
                bg={`${tip.color}.0`}
                mih={200}
                style={{
                  border: `1.2px solid var(--mantine-color-${tip.color}-9)`,
                }}
              >
                <ThemeIcon size="xl" mb="sm" color={`${tip.color}.5`} variant="outline">
                  {tip.icon}
                </ThemeIcon>
                <Title order={3} c={`${tip.color}.8`}>{tip.title}</Title>
                {tip.description}
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

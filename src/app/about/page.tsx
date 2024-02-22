import Logo from "@/components/logo/logo";
import { Anchor, Box, Container, Stack, Text, Title } from "@mantine/core";

export default function Page() {
  return (
    <Box bg="brand.0" py={40}>
      <Container mih={500}>
        <Stack gap="lg">
          <Stack gap="sm">
            <Title
              c="brand.8"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Tentang
              <Logo size={30} style={{ marginLeft: 10 }} />
            </Title>
            <Text lh={1.6} maw={700} ta="justify">
              Cek Sandi hadir untuk meningkatkan kesadaran masyarakat Indonesia
              tentang pentingnya untuk membuat kata sandi yang kuat. Diharapkan
              dengan adanya Cek Sandi, kasus pencurian akun dan penyalahgunaan
              data pribadi akibat kata sandi yang lemah dapat berkurang secara
              signifikan.
            </Text>
          </Stack>
          <Stack gap="sm">
            <Title order={2} c="brand.9">
              Berkontribusi
            </Title>
            <Text lh={1.6} maw={700} ta="justify">
              Menemukan masalah atau ingin menyarankan fitur baru? Hubungi{" "}
              <Anchor
                href="https://twitter.com/bgwastu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bagas lewat Twitter
              </Anchor>{" "}
              atau langsung{" "}
              <Anchor
                href="https://github.com/bgwastu/ceksandi/issues/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                buat <i>issue</i> baru di GitHub
              </Anchor>
              .
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

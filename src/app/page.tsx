import AssesmentSection from "@/components/assesment-section/assesment-section";
import FaqSection from "@/components/faq-section/faq-section";
import PassphraseSection from "@/components/passphrase-section/passphrase-section";
import PasswordTipsSection from "@/components/password-tips-section/password-tips-section";
import { Stack } from "@mantine/core";

export default function Home() {
  return (
    <Stack>
      <AssesmentSection />
      <PasswordTipsSection />
      <PassphraseSection />
      <FaqSection />
    </Stack>
  );
}

import { Flex, FlexProps, Text } from "@mantine/core";
import { IconSquareAsterisk } from "@tabler/icons-react";
import classes from "./logo.module.css";

export default function Logo({ ...props }: FlexProps) {
  return (
    <Flex align="center" gap="xs" {...props} className={classes.wrapper}>
      <IconSquareAsterisk size="3rem" color="var(--mantine-color-brand-9)" fill="var(--mantine-color-brand-1)" />
      <Text fz={32} fw="700" c="brand.9">
        Cek Sandi
      </Text>
    </Flex>
  );
}

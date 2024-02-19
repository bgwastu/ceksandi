import { Flex, FlexProps, Text } from "@mantine/core";
import { IconPassword } from "@tabler/icons-react";
import classes from "./logo.module.css";

export default function Logo({ size, ...props }: FlexProps & { size: number }) {
  const iconSize = size * 1.7; // Adjust the scale factor as needed
  return (
    <Flex align="center" gap={2} {...props} className={classes.wrapper}>
      <Text fz={size} fw="700">
        Cek Sandi
      </Text>
      <IconPassword size={iconSize} color="var(--mantine-color-brand-6)" fill="var(--mantine-color-brand-1)" />
    </Flex>
  );
}

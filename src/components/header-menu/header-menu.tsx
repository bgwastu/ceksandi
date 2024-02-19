"use client";

import {
  ActionIcon,
  Container,
  Divider,
  Drawer,
  Group,
  Stack
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronRight,
  IconExternalLink,
  IconMenu2
} from "@tabler/icons-react";
import Link from "next/link";
import Logo from "../logo/logo";
import classes from "./header-menu.module.css";

const links = [
  { link: "#faq", label: "FAQ" },
  { link: "#tentang", label: "Tentang" },
  { link: "https://github.com/bgwastu/ceksandi", label: "Kode Sumber" },
];

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => {
    const isExternalLink = link.link.startsWith("http");
    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noreferrer noopener" : undefined}
      >
        {link.label}
        {isExternalLink ? (
          <IconExternalLink size={12} className={classes.iconExternal} />
        ) : null}
      </Link>
    );
  });

  const drawerItems = links.map((link) => {
    const isExternalLink = link.link.startsWith("http");
    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.drawerLink}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noreferrer noopener" : undefined}
        onClick={close}
      >
        {link.label}
        {isExternalLink ? (
          <IconExternalLink size={12} className={classes.iconExternal} />
        ) : (
          <IconChevronRight size={12} className={classes.iconExternal} />
        )}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Drawer
        opened={opened}
        onClose={close}
        title={<Logo size={20} />}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Stack gap="xs">
          <Divider />
          {drawerItems}
        </Stack>
      </Drawer>
      <Container size="md">
        <div className={classes.inner}>
          <Link href="/" className={classes.linkLogo}>
            <Logo size={20} />
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>

          <ActionIcon
            variant="default"
            aria-label="Settings"
            size="lg"
            onClick={toggle}
            hiddenFrom="sm"
          >
            <IconMenu2 style={{ width: "80%", height: "80%" }} />
          </ActionIcon>
        </div>
      </Container>
    </header>
  );
}

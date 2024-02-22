"use client";

import { ActionIcon, Anchor, Container, Group, Text, rem } from "@mantine/core";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import Logo from "../logo/logo";
import classes from "./footer-section.module.css";

export function FooterSection() {
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.logo}>
          <Logo size={20} />
          <Text size="xs" c="dimmed" className={classes.description}>
            Membangun kata sandi yang aman untuk masa depan digital Indonesia
            yang lebih aman dan terlindungi.
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          Dibuat oleh{" "}
          <Anchor
            href="https://twitter.com/bgwastu"
            c="dimmed"
            underline="always"
            target="_blank"
          >
            Bagas Wastu
          </Anchor>
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component={Link}
            href="https://github.com/bgwastu/ceksandi"
            target="_blank"
          >
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component={Link}
            href="mailto:bagas@wastu.net?subject=Pertanyaan%20Tentang%20Cek%20Sandi"
            target="_blank"
          >
            <IconMail
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

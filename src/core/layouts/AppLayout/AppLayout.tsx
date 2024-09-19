import { AppShell, Box, Burger, Flex, Group, List, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { categories } from "@/shared/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function AppLayout({ children }:{ children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const path = usePathname()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding='md'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
                  Lincode Skills
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <List>
                    {
                        categories.map(x => (
                            <Link href={x.link} key={x.id}>
                                <List.Item py='sm' mb='sm' className={path === x.link ? "active" : "sidebar"}>
                                    <Flex gap='md' align='center'>
                                        <Box>
                                            <x.icon/>
                                        </Box>
                                        <Text size='md' fw={500}>
                                            {x.label}
                                        </Text>
                                    </Flex>
                                </List.Item>
                            </Link>
                        ))}
                </List>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}

import React from 'react'

import { userQueries } from '@/entities/user'
import {
    AppShell,
    Avatar,
    Box,
    Burger,
    Flex,
    Group,
    List,
    Loader,
    Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { categories } from '@/shared/constants'

export function AppLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

    const path = usePathname()

    const { data: user } = userQueries.useGetUserQuery()

    // if (!user) return <Loader />

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
                <Flex justify='space-between' align='center' h='100%'>
                    <Group h='100%' px='md'>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom='sm'
                            size='sm'
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom='sm'
                            size='sm'
                        />
                        Lincode Skills
                    </Group>
                    <Link href={`/${user?.data.id}/profile`}>
                        <Flex px='md' align='center' gap='md'>
                            <Avatar />

                            <Text>{user?.data.name}</Text>
                        </Flex>
                    </Link>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <List>
                    {categories.map(x => (
                        <Link href={x.link} key={x.id}>
                            <List.Item
                                py='sm'
                                mb='sm'
                                className={
                                    path === x.link ? 'active' : 'sidebar'
                                }
                            >
                                <Flex gap='md' align='center'>
                                    <Box>
                                        <x.icon />
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
    )
}

'use client'

import {
    Avatar,
    Box,
    Flex,
    Title,
    Text,
    Stack,
    Divider,
    Group,
    Button,
} from '@mantine/core'

export function ProfileViews() {
    return (
        <Box style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <Flex direction='column' align='center' gap='md'>
                <Avatar
                    src='https://via.placeholder.com/150'
                    size={120}
                    radius={60}
                />
                <Title order={2}>John</Title>
                <Text c='dimmed'>Software Developer</Text>

                <Stack gap='xs' style={{ width: '100%' }}>
                    <Divider my='sm' />
                    <Group justify='apart'>
                        <Text fw={500}>Email:</Text>
                        <Text c='dimmed'>ggjhkjhkh@gmail.com</Text>
                    </Group>
                    <Group justify='apart'>
                        <Text fw={500}>Location:</Text>
                        <Text c='dimmed'>argun</Text>
                    </Group>{' '}
                    <Group justify='apart'>
                        <Text fw={500}>Member since</Text>
                        <Text c='dimmed'>jun 2023</Text>
                    </Group>
                    <Divider my='sm' />
                </Stack>

                <Group justify='center' gap='md'>
                    <Button variant='outline'>Edit Profile</Button>
                    <Button color='red'>Logout</Button>
                </Group>
            </Flex>
        </Box>
    )
}

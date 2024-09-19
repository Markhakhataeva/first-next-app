'use client'

import React from 'react'

import { PageLayout } from '@/core/layouts/PageLayout/PageLayout'
import { Button, Flex, Group, Stack, Text } from '@mantine/core'

export function HtmlViews() {
    const [selectedAnswer, setSelectedAnswer] = React.useState<null | string>(
        null
    )
    const [isAnswered, setIsAnswered] = React.useState<boolean>(false)

    const question = 'Какой тег используется для ссылки?'
    const options = ['<a>', '<p>', '<div>', '<span>']
    const correctAnswer = '<a>'

    const handleAnswerClick = (option: string) => {
        setSelectedAnswer(option)
        setIsAnswered(true)
    }

    return (
        <PageLayout pageTitle='HTML теория'>
            <Flex direction='column' gap='md'>
                <Flex justify='end'>
                    <Flex justify='space-between' w='60%'>
                        <Flex justify='center'>
                            <Text size='xl' fw={600}>
                                {question}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text>Timer</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Stack gap='md'>
                    {options.map((option, i) => (
                        <Button
                            key={i}
                            onClick={() => handleAnswerClick(option)}
                            variant={
                                selectedAnswer === option ? 'filled' : 'outline'
                            }
                            color={
                                isAnswered && option === correctAnswer
                                    ? 'green'
                                    : 'blue'
                            }
                            disabled={isAnswered}
                        >
                            {option}
                        </Button>
                    ))}
                </Stack>

                {isAnswered && (
                    <Group justify='center' mt='md'>
                        <Text
                            size='lg'
                            c={
                                selectedAnswer === correctAnswer
                                    ? 'green'
                                    : 'red'
                            }
                        >
                            {selectedAnswer === correctAnswer
                                ? 'Правильный ответ'
                                : 'Неправильный ответ'}
                        </Text>
                    </Group>
                )}
            </Flex>
        </PageLayout>
    )
}

'use client'

import React, { useEffect, useState } from 'react'

import { PageLayout } from '@/core/layouts/PageLayout/PageLayout'
import { htmlQueries } from '@/entities/html'
import {
    Button,
    Flex,
    Group,
    Loader,
    Notification,
    Stack,
    Text,
} from '@mantine/core'

export function HtmlViews() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
    const [selectedAnswer, setSelectedAnswer] = React.useState<null | string>(
        null
    )
    const [isAnswered, setIsAnswered] = React.useState(false)
    const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
    const [serverMessage, setServerMessage] = useState<string>('')
    const [question, setQuestion] = useState('')
    const [timer, setTimer] = React.useState<number>(30)

    const { data: questions } = htmlQueries.useGetQuestionsQuery()
    const { mutateAsync: checkAnswer } = htmlQueries.useCheckAnswerMutation()

    useEffect(() => {
        if (timer > 0 && !isAnswered) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(countdown)
        } else if (timer === 0 && !isAnswered) {
            setIsAnswered(true)
            setServerMessage('Время вышло!')
        }
    }, [timer, isAnswered])

    if (!questions) return <Loader />

    const handleAnswerClick = (option: string, question: string) => {
        setSelectedAnswer(option)
        setQuestion(question)
    }

    const handleSubmit = async () => {
        if (!selectedAnswer || !questions) return

        try {
            await checkAnswer({
                question: question,
                selectedAnswer: selectedAnswer,
            }).then(x => {
                setIsCorrect(x.data.isCorrect)
                setServerMessage(x.data.message)
                setIsAnswered(true)
            })
        } catch (error) {
            console.error('Error', error)
        }
    }

    const handleNextQuestion = () => {
        setIsAnswered(false)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setServerMessage('')
        setTimer(30)
        if (currentQuestionIndex < questions.data.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            alert('Вы прошли все запросы')
        }
    }

    const currentQuestion = questions.data[currentQuestionIndex]

    return (
        <PageLayout pageTitle='HTML теория'>
            <Flex direction='column' gap='md'>
                <Flex justify='end'>
                    <Flex justify='space-between' w='60%'>
                        <Flex justify='center'>
                            <Text size='xl' fw={600}>
                                {currentQuestion.question}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text>Оставшееся время: {timer} секунд</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Stack gap='md'>
                    {currentQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() =>
                                handleAnswerClick(
                                    option,
                                    currentQuestion.question
                                )
                            }
                            variant={
                                selectedAnswer === option ? 'filled' : 'outline'
                            }
                            disabled={isAnswered}
                        >
                            {option}
                        </Button>
                    ))}
                </Stack>

                <Group justify='center' mt='md'>
                    {!isAnswered && (
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                        >
                            Отправить
                        </Button>
                    )}
                    {isAnswered && (
                        <>
                            {isCorrect ? (
                                <>
                                    <Notification
                                        color='green'
                                        onClose={() => {}}
                                    >
                                        {serverMessage}
                                    </Notification>
                                    <Button onClick={handleNextQuestion}>
                                        Next Question!
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Notification
                                        color='red'
                                        onClose={() => {}}
                                    >
                                        {serverMessage}
                                    </Notification>
                                    <Button
                                        onClick={() => {
                                            setIsAnswered(false)
                                            setSelectedAnswer(null)
                                            setIsCorrect(null)
                                            setTimer(30)
                                        }}
                                    >
                                        again!
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Group>
            </Flex>
        </PageLayout>
    )
}

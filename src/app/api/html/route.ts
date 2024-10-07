import { htmlQuestions } from '@/app/api/html/data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    return NextResponse.json(htmlQuestions)
}
export async function POST(req: NextRequest) {
    try {
        const { question, selectedAnswer } = await req.json()
        const foundQuestion = htmlQuestions.find(q => q.question === question)

        if (!foundQuestion) {
            return NextResponse.json(
                { message: 'Вопрос не найден' },
                { status: 404 }
            )
        }

        const isCorrect = foundQuestion.correctAnswer === selectedAnswer

        return NextResponse.json({
            message: isCorrect ? 'Правильно' : 'Неправильно',
            isCorrect: isCorrect,
        })
    } catch (error: any) {
        return NextResponse.json(
            { message: 'error', error: error.error },
            { status: 500 }
        )
    }
}

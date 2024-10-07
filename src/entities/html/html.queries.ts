import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type htmlDataQuery = {
    question: string
    options: string[]
    correctAnswer: string
}
type HtmlDataMutation = {
    message: string
    isCorrect: boolean
    status?: number
}
export function useGetQuestionsQuery() {
    return useQuery({
        queryKey: ['questions'],
        queryFn: () =>
            axios.get<htmlDataQuery[]>('http://localhost:3000/api/html'),
    })
}

export function useCheckAnswerMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { question: string; selectedAnswer: string }) =>
            axios.post<HtmlDataMutation>(
                'http://localhost:3000/api/html',
                data
            ),
        onSuccess: async data => {
            console.log('Запрос отправлен:', data)
            await queryClient.invalidateQueries({ queryKey: ['questions'] })
        },
        onError: error => {
            console.error('Error', error)
        },
    })
}

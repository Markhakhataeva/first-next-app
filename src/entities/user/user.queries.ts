import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type UserGetData = {
    id: number
    name: string
    email: string
}

export function useGetUserQuery() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get<UserGetData>('http://localhost:3000/api/user'),
    })
}

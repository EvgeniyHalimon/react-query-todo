import { useMutation, useQueryClient } from "react-query"

const useCustomMutation = (action, key) => {

    const queryClient = useQueryClient()

    const mutation = useMutation(action, {
        onSuccess: () => {
            queryClient.invalidateQueries(key)
        }
    })

    return mutation
}

export {useCustomMutation}
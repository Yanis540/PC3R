import {z} from "zod"

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(1)
})

export type SignInSchema = z.infer<typeof signInSchema>
import {z} from "zod"

export const signUpSchema = z.object({
    name : z.string().min(4),
    email : z.string().email(),
    password : z.string().min(1),
    confirmPassword : z.string().min(1)
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
})

export type SignUpSchema = z.infer<typeof signUpSchema>
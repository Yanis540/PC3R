import {z} from "zod"

export const updateProfileSchema = z.object({
    name : z.string().min(4).optional().or(z.literal('')).transform(e => e === "" ? undefined : e),
    password : z.string().min(1).optional().or(z.literal('')).transform(e => e === "" ? undefined : e),
    confirmPassword : z.string().min(1).optional().or(z.literal('')).transform(e => e === "" ? undefined : e),
    photo : z.string().url().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
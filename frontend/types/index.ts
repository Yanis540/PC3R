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

export enum HTTPErrorCode {
    BAD_REQUEST="BAD_REQUEST",
    UNAUTHORIZED="UNAUTHORIZED",
    NOT_FOUND="NOT_FOUND",
    INPUT_ERROR="INPUT_ERROR",
    INTERNAL_SERVER_ERROR="INTERNAL_SERVER_ERROR",
    CHAT_ALREADY_EXISTS="CHAT_ALREADY_EXISTS",
}

export enum ChatType {
    trip = "trip",
    duo = "duo",
    group = "group"
    
}
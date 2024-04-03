import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSocketStore } from "@/context/store";
import { sendMessageSchema, SendMessageSchema } from "../types";

export const useSendMessage = (chat_id : string)=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<SendMessageSchema>({
        resolver: zodResolver(sendMessageSchema),
    });
    const {socket} = useSocketStore();
  
    const onSubmit = handleSubmit((data)=>{
        // use mutate 
        socket?.emit('send_message',{
            chat_id : chat_id,
            content:data.content
        })
        reset();
    })



    return {
        register,onSubmit,
        errors,
    }
}
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const requiredString = (message = 'Required.') => {
  return z.string({ required_error: message }).trim().min(1, { message });
}

const PlayerNameSchema = z.object({
  playerOne: requiredString("Player 1 name is required"),
  playerTwo: requiredString("Player 2 name is required"),
}) 

type PlayerNameFormData = z.infer<typeof PlayerNameSchema>;

export const useValidation = () => {
  return useForm<PlayerNameFormData>({
    mode: 'all',
    resolver: zodResolver(PlayerNameSchema),
    defaultValues: {
      playerOne: "",
      playerTwo: ""
    }
  });  
}
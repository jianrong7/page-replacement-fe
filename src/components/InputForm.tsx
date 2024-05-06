import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSchema from "./formSchema";

interface InputFormProps {
  onSubmit: (
    values: z.infer<typeof formSchema>
  ) => Promise<{ message: string } | undefined>;
  form: UseFormReturn<
    {
      incomingFrames: string;
      numberOfFrames: number;
    },
    any,
    undefined
  >;
}

export default function InputForm({ onSubmit, form }: InputFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
      >
        <FormField
          control={form.control}
          name="incomingFrames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incoming Frames (Comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                These are the frames that are coming in this order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfFrames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Frames</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                These are the number of frames held by your OS.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

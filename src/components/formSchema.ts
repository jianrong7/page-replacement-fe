import { z } from "zod";

const formSchema = z.object({
  incomingFrames: z.string({ required_error: "Incoming frames are required" }),
  numberOfFrames: z.coerce
    .number({
      required_error: "Number of frames is required",
      invalid_type_error: "Number of frames must be a number",
    })
    .positive({
      message: "Number of frames must be a positive number",
    }),
});

export default formSchema;

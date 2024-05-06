"use client";

import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputForm from "@/components/InputForm";
import useTableStore from "@/stores/useTableStore";
import OutputTable from "@/components/OutputTable";
import formSchema from "@/components/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TABS = ["opt", "fifo", "lru", "clock"];

export default function Home() {
  const { algorithm, setAlgorithm, setResult } = useTableStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incomingFrames: "2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2",
      numberOfFrames: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const schema = z.object({
      incomingFrames: z
        .string({ required_error: "Incoming frames are required" })
        .transform((value) => value.split(",").map(Number))
        .pipe(z.number().array()),
      numberOfFrames: z.coerce
        .number({
          required_error: "Number of frames is required",
          invalid_type_error: "Number of frames must be a number",
        })
        .positive({
          message: "Number of frames must be a positive number",
        }),
    });
    const parse = schema.safeParse(values);
    if (parse?.success) {
      const data = parse.data;
      try {
        const res = await fetch(`${process.env.REACT_API}${algorithm}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const d = await res.json();
        setResult(d);
        return { message: `Updated calculation ${data}` };
      } catch (e) {
        return { message: "Failed to update calculation" };
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-4 md:py-8 md:px-16">
      <InputForm onSubmit={onSubmit} form={form} />
      <Tabs defaultValue={algorithm} className="w-full">
        <TabsList className="w-full flex justify-evenly h-16">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              onClick={() => {
                setAlgorithm(tab);
                onSubmit({
                  incomingFrames: form.getValues("incomingFrames"),
                  numberOfFrames: form.getValues("numberOfFrames"),
                });
              }}
              className="w-48 h-12"
            >
              {tab.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <OutputTable form={form} />
    </main>
  );
}

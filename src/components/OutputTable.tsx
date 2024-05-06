import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTableStore from "@/stores/useTableStore";
import { UseFormReturn } from "react-hook-form";

interface OutputTableProps {
  form: UseFormReturn<
    {
      incomingFrames: string;
      numberOfFrames: number;
    },
    any,
    undefined
  >;
}
export default function OutputTable({ form }: OutputTableProps) {
  const { algorithm, result } = useTableStore();
  const incomingFrames = form
    .getValues("incomingFrames")
    ?.split(",")
    ?.map(Number);

  if (!result || (!result.clockFrames && !result.frames) || !incomingFrames)
    return null;

  return (
    <Table>
      <TableCaption>Visualising the frames.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Time</TableHead>
          <TableHead>Memory Reference</TableHead>
          {algorithm === "clock" &&
            result.clockFrames &&
            Object.keys(result.clockFrames).map((kv) => (
              <TableHead key={kv}>{kv}</TableHead>
            ))}
          {algorithm !== "clock" &&
            result.frames &&
            Object.keys(result.frames).map((kv) => (
              <TableHead key={kv}>{kv}</TableHead>
            ))}
          <TableHead className="text-right">Page Fault?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.pageFaults.map((pf, i) => (
          <TableRow key={`${pf}_${i}`}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{incomingFrames[i]}</TableCell>
            {algorithm === "clock" &&
              result.clockFrames &&
              Object.keys(result.clockFrames).map((kv) => {
                const k = parseInt(kv);
                if (!result.clockFrames || !result.clockFrames[k]) return null;
                return (
                  <TableCell key={kv}>
                    {result.clockFrames[k][i][0]}
                    {` (${result.clockFrames[k][i][1]})`}
                  </TableCell>
                );
              })}
            {algorithm !== "clock" &&
              result.frames &&
              Object.keys(result.frames).map((kv) => {
                const k = parseInt(kv);
                if (!result.frames || !result.frames[k]) return null;
                return <TableCell key={kv}>{result.frames[k][i]}</TableCell>;
              })}
            <TableCell className="text-right">{pf ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

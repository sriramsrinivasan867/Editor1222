import { Progress } from "../ui/progress";

interface ProgressHandlerProps {
  isProcessing: boolean;
  progress: number;
}

export const ProgressHandler = ({ isProcessing, progress }: ProgressHandlerProps) => {
  if (!isProcessing) return null;

  return (
    <div className="w-full space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground text-center">
        Processing... {Math.round(progress)}%
      </p>
    </div>
  );
};
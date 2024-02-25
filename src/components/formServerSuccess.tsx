import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  success?: string;
}

function FormServerSuccess(props: FormSuccessProps) {
  if (!props.success) return null;

  return (
    <div
      className="flex items-center gap-x-2 rounded-md bg-emerald-700/15
    p-3 text-sm text-emerald-700 dark:bg-emerald-400 dark:text-emerald-900"
    >
      <CheckCircle className="h-4 w-4" />
      {props.success}
    </div>
  );
}

export default FormServerSuccess;

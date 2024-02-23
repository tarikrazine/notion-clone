import { XCircle } from "lucide-react";

interface FormServerErrorsProps {
  error: string;
}

function FormServerErrors(props: FormServerErrorsProps) {
  if (!props.error) {
    return null;
  }

  return (
    <div aria-live="polite" className={"mt-2 text-xs text-rose-500"}>
      <div className="flex items-center rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium">
        <XCircle className="mr-2 h-4 w-4" />
        {props.error}
      </div>
    </div>
  );
}

export default FormServerErrors;

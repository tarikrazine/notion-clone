import { XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormValidationErrorsProps {
  id: string[];
  errors?: Record<string, string[] | undefined>;
}

function FormValidationErrors(props: FormValidationErrorsProps) {
  if (!props.errors) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-2 text-xs text-rose-500",
        props.id?.length > 1 ? "space-y-4" : null,
      )}
    >
      {props.id.map((id: string) => (
        <div key={id} id={`${id}-error`} aria-live="polite">
          {props.errors?.[id]?.map((error: string) => (
            <div
              key={error}
              className="flex items-center rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium"
            >
              <XCircle className="mr-2 h-4 w-4" />
              {error}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FormValidationErrors;

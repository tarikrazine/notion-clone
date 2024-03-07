import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface CustomDialogTriggerProps {
  children: React.ReactNode;
  header?: string;
  content?: React.ReactNode;
  description?: string;
  className?: string;
}

function CustomDialogTrigger(props: CustomDialogTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger className={cn("", props.className)}>
        {props.children}
      </DialogTrigger>
      <DialogContent className="block h-screen w-full overflow-scroll sm:h-[440px]">
        <DialogHeader>
          <DialogTitle>{props.header}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.content}
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialogTrigger;

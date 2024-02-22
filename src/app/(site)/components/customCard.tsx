import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
  card_header?: React.ReactNode;
  card_content?: React.ReactNode;
  card_footer?: React.ReactNode;
};

function CustomCard(props: CustomCardProps) {
  return (
    <Card className={cn("w-[380px]", props.className)} {...props}>
      <CardHeader>{props.card_header}</CardHeader>
      <CardContent
        className="grid
            gap-4
          "
      >
        {props.card_content}
      </CardContent>
      <CardFooter>{props.card_footer}</CardFooter>
    </Card>
  );
}

export default CustomCard;

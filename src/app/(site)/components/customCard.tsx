import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
  cardHeader?: React.ReactNode;
  cardContent?: React.ReactNode;
  cardFooter?: React.ReactNode;
};

function CustomCard(props: CustomCardProps) {
  return (
    <Card className={cn("w-[380px]", props.className)} {...props}>
      <CardHeader>{props.cardHeader}</CardHeader>
      <CardContent
        className="grid
            gap-4
          "
      >
        {props.cardContent}
      </CardContent>
      <CardFooter>{props.cardFooter}</CardFooter>
    </Card>
  );
}

export default CustomCard;

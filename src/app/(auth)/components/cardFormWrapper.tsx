import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Cypress from "../../../../public/cypresslogo.svg";
import BackButton from "./backButton";

interface CardFormWrapperProps {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
}

function CardFormWrapper(props: CardFormWrapperProps) {
  return (
    <Card className="relative w-[400px] shadow-md backdrop-blur-3xl dark:bg-black/25 sm:w-[450px]">
      <div className="top-22 absolute -z-10 h-32 w-[30%] rounded-full bg-purple-600/60 blur-[120px] " />
      <Link href="/" className="flex items-center justify-center p-6">
        <Image src={Cypress} alt="Cypress Logo" width={50} height={50} />
        <span className="ml-2 text-4xl font-semibold first-letter:uppercase dark:text-white">
          cypress.
        </span>
      </Link>
      <CardDescription className="text-center text-foreground/60">
        An all-In-One Collaboration and Productivity Platform
      </CardDescription>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-purple-200">
          {props.headerLabel}
        </CardTitle>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>
        <BackButton label={props.backButtonLabel} href={props.backButtonHref} />
      </CardFooter>
    </Card>
  );
}

export default CardFormWrapper;

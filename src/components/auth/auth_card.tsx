import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {
  title: string;
  alternateText: string;
  alternateLink: string;
  showSocial?: boolean;
};
export const AuthCard: React.FCC<Props> = ({
  children,
  title,
  alternateLink,
  alternateText,
  showSocial,
}) => {
  return (
    <Card className="w-[480px] flex flex-col gap-y-1">
      <CardHeader className="flex flex-col gap-y-2.5 items-center">
        <Image
          width={64}
          height={64}
          alt="Logo of Camper"
          src="/logo.svg"
          priority
        />
        <h2 className="text-3xl font-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Button variant="outline" className="w-full flex gap-x-2.5 text-md">
            <FcGoogle />
            Sign in with Google
          </Button>
        </CardFooter>
      )}
      <CardFooter>
        <Link href={alternateLink} className="text-center w-full">
          <Button variant="link">{alternateText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

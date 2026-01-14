import { Button } from "@/components/ui/button";
import Image from "next/image";
import prisma from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  // const user = await prisma.user.findFirst();
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Button>
        Test
      </Button>
      <UserButton/>
    </div>
  );
}

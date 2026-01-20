import Image from "next/image";
import ProjectForm from "@/modules/home/components/projectForm";

export default async function Home() {
  return (

    <div className="flex flex-col items-center h-screen justify-center px-4 py-8 mt-[20px]">
      <div className="max-w-5xl w-full h-full">
        <section className="flex flex-col items-center gap-4 md:gap-4">
          <div className="flex flex-col items-center">
            <Image src={'/v0.png'} alt="logo"
              height={100} width={100} className="hidden md:block invert dark:invert-0" />
          </div>
            <h1 className="text-2xl md:text-5xl font-bold text-center"> Build someting with ❤️</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center">
            Create apps and website by chatting with AI
          </p>

          <div className="max-w-3xl w-full h-full">
            <ProjectForm />
          </div>
        </section>
      </div>
    </div>
  );
}

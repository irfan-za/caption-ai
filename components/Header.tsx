import Link from "next/link";
import Github from "./GitHub";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="text-2xl text-green-600 font-bold tracking-tight">
          caption-ai
        </h1>
      </Link>
      <a
        className="flex max-w-fit items-center justify-center font-medium space-x-2 rounded-md border border-green-600 bg-green-100 px-4 py-2 text-sm text-green-600 shadow-md transition-colors hover:bg-green-600 hover:text-white"
        href="https://github.com/irfan-za/caption-ai"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>GitHub</p>
      </a>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@components/Button/Button";

interface NavigationProps {
  links: Array<{ route: string; title: string }>;
  logoSrc: string;
}

const Navigation = ({ links, logoSrc }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-solid border-b border-black flex justify-between p-2">
      <a href="/">
        <Image src={logoSrc} alt="Logo" width="100" height="100" />
      </a>
      <ul className="flex items-center gap-3">
        {links.map((el) => {
          return (
            <li key={el.route}>
              <Link
                href={el.route}
                className={`${
                  pathname === el.route ? "text-critical" : "text-black"
                } transition-colors duration-300`}
              >
                {el.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        variant="outline"
        size="md"
        status="normal"
        onClick={() => console.log("Clicked!")}
        isLoading={true}
      >
        Signin
      </Button>
    </nav>
  );
};

export default Navigation;

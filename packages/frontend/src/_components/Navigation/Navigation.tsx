"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@components/Button/Button";
import Logo from "./Logo";

interface NavigationProps {
  links: Array<{ route: string; title: string }>;
  logoSrc: string;
}

const Navigation = ({ links, logoSrc }: NavigationProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="border-solid border-b border-black flex justify-between p-2">
      <div className="flex align-middle gap-5">
        <Logo imageSrc={logoSrc} size={100} />
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
      </div>

      <Button
        variant="outline"
        size="md"
        status="normal"
        onClick={() => router.push("/signin")}
      >
        Signin
      </Button>
    </nav>
  );
};

export default Navigation;

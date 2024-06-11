"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  links: Array<{ route: string; title: string }>;
}

export default function Navigation({ links }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {links.map((el) => {
          return (
            <li key={el.route}>
              <Link
                href={el.route}
                style={{ color: pathname === el.route ? "blue" : "white" }}
              >
                {el.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

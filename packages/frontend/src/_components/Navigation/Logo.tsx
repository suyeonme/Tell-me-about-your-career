import React from "react";
import Image from "next/image";

interface LogoProps {
  imageSrc: string;
  size: number;
}

const Logo = ({ imageSrc, size }: LogoProps) => {
  return (
    <a href="/">
      <Image src={imageSrc} alt="Logo" width={size} height={size} />
    </a>
  );
};

export default Logo;

import Image from "next/image";

import logo from "@/public/logo.svg";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-2">
      <Image src={logo} alt="logo" />
      <h2 className="font-medium text-xl text-gray-800">Testify</h2>
    </div>
  );
};

export default Navbar;

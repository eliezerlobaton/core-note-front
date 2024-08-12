import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav className="h-16 flex justify-between items-center bg-white  px-2 gap-7">
      <Logo />
      <Search />
    </nav>
  );
}

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
       <Link href="/" className="hover:text-blue-300"> <h1 className="text-2xl font-bold">Health Insurance </h1></Link>
        <ul className="flex space-x-6">
          <li><Link href="/hospitals" className="hover:text-blue-300">Hospitals</Link></li>
          <li><Link href="/insurance-providers" className="hover:text-blue-300">Insurance Providers</Link></li>
          <li><Link href="/clients" className="hover:text-blue-300">Clients</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

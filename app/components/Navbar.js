import Link from 'next/link';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">New Life</Link>
      </div>
      <ul className="navbar-links">
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/about">Infos tabac</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-buttons">
        <Link href="/login">Se connecter</Link>
        <Link href="/register">S'inscrire</Link>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import mooviLogo from "@/assets/moovi-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="text-center border-t border-gray-700 pt-8">
        <img
          src={mooviLogo}
          alt="Moovi.chat"
          className="h-20 mx-auto mb-4 opacity-80 brightness-0 invert"
        />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm">
          <Link
            to="/privacidade"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Política de Privacidade
          </Link>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link
            to="/termos"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Termos de Uso
          </Link>
        </nav>

        <p className="text-sm text-gray-400 mt-8">
          © 2025 Moovi.chat. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

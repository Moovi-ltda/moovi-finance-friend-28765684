import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#05150C] text-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 relative group cursor-pointer">
            <div className="absolute inset-0 bg-moovi-mint/20 blur-xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500" />
            <img
              src="/Porquinho.png"
              alt="Moovi"
              className="h-24 md:h-28 mx-auto relative z-10 transition-transform duration-300 hover:scale-105 drop-shadow-2xl"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10 text-sm font-medium">
            <Link
              to="/privacidade"
              className="text-gray-400 hover:text-moovi-mint transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-moovi-mint hover:after:w-full after:transition-all after:duration-300"
            >
              Política de Privacidade
            </Link>
            <span className="text-white/10 hidden sm:inline">|</span>
            <Link
              to="/termos"
              className="text-gray-400 hover:text-moovi-mint transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-moovi-mint hover:after:w-full after:transition-all after:duration-300"
            >
              Termos de Uso
            </Link>
          </nav>

          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-1 bg-white/10 rounded-full mb-6" />
            <p className="text-sm text-gray-500 tracking-wide">
              © {new Date().getFullYear()} Moovi. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


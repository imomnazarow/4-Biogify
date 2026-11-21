import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import twitter from "../assets/images/Link-Twitter.svg";
import github from "../assets/images/Link-GitHub.svg";
import linkedin from "../assets/images/Link-LinkedIn.svg";

function Footer() {
  const socials = [
    { src: twitter, alt: "Twitter", href: "#" },
    { src: github, alt: "GitHub", href: "#" },
    { src: linkedin, alt: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-24">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Blogify" className="h-7 w-25.25" />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Create, read, and inspire. Discover amazing stories written by
              talented creators from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-500">
              <li>
                <Link to="/" className="hover:text-indigo-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/posts" className="hover:text-indigo-600">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Connect</h3>
            <div className="mt-3 flex gap-3">
              {socials.map((s) => (
                <a key={s.alt} href={s.href} aria-label={s.alt}>
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-9 w-9 opacity-70 hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

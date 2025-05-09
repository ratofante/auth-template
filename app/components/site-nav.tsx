//Libs
import { Link } from "react-router";

//Components
import { Button } from "@components/ui/button";

// Assets
import logo from "@/assets/logo__small.svg";
import logoFull from "@/assets/logo__full.svg";

export function SiteNav() {
  return (
    <header className="fixed left-0 w-full top-0 z-50">
      <div className="px-2 py-3 md:px-4 md:py-4  transition-padding duration-300 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-9 h-9 md:hidden" />
          <img src={logoFull} alt="logo" className="hidden md:block h-9" />
        </Link>
        <div className="ml-auto">
          <Button variant="link" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

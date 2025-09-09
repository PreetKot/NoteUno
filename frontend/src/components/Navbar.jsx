import { Link } from "react-router";
import { PlusIcon, LogOutIcon, UserIcon, SettingsIcon, PaperclipIcon, FolderIcon, SearchIcon, StarIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-4xl md:text-5xl font-bold text-primary font-mono tracking-tight hover:scale-105 transition-transform">
            NoteUno
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/starred" className="btn btn-ghost hover:btn-primary/10">
              <StarIcon className="size-4" />
              <span className="hidden sm:inline">Starred</span>
            </Link>
            
            <Link to={"/create"} className="btn btn-primary hover:btn-primary-focus group">
              <PlusIcon className="size-5" />
              <PaperclipIcon className="size-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
            
            {/* User Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar hover:bg-primary/10 transition-colors"
                title={`Signed in as ${user?.name}`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-lg shadow-lg p-1">
                  {getUserInitials(user?.name)}
                </div>
              </div>
              
              <ul 
                tabIndex={0} 
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 profile-menu rounded-box w-64"
              >
                {/* User Info Header */}
                <li className="menu-title px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-sm">
                      {getUserInitials(user?.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base-content font-medium text-sm">
                        {user?.name || "User"}
                      </span>
                      <span className="text-base-content/60 text-xs">
                        {user?.email || "user@example.com"}
                      </span>
                    </div>
                  </div>
                </li>
                
                <div className="divider my-1"></div>
                
                {/* Menu Items */}
                <li>
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 menu-item-hover rounded-lg">
                    <UserIcon className="size-4" />
                    <span>Profile</span>
                  </Link>
                </li>
              
                
                <div className="divider my-1"></div>
                
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 px-3 py-2 text-error hover:bg-error/10 rounded-lg font-medium"
                  >
                    <LogOutIcon className="size-4" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

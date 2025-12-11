interface NavbarLinkProps {
  children: string;
  onClick: () => void;
}

function NavbarLink({ children, onClick }: NavbarLinkProps) {
  return (
    <button 
      className="relative cursor-pointer group hover:scale-110 active:scale-95 transition-transform"
      onClick={onClick}
      style={{
        textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
      }}
    >
      <span className="relative">
        {children}
      </span>
    </button>
  );
}

export default NavbarLink;

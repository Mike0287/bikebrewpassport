import { FaMotorcycle } from "react-icons/fa";

interface SidebarProps {
  search: string;
  setSearch: (value: string) => void;
  onOpenAllVenues: () => void;
}

export default function Sidebar({
  search,
  setSearch,
  onOpenAllVenues,
}: SidebarProps) {

  return (
    <aside className="sidebar">

      <h1>
        <FaMotorcycle className="title-icon" /> Bike + Brew
      </h1>

      <h2>
        Passport Companion
      </h2>

      <input
        type="text"
        placeholder="Search venues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="button"
        onClick={onOpenAllVenues}
      >
        📖 All Venues
      </button>

    </aside>
  );
}
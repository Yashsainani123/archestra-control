import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Radar,
  ShieldAlert,
  DollarSign,
  ScrollText,
  Zap,
  Search,
} from "lucide-react";

const navCommands = [
  { label: "Executive Overview", icon: LayoutDashboard, path: "/" },
  { label: "Discovery & Governance", icon: Radar, path: "/discovery" },
  { label: "Security Command", icon: ShieldAlert, path: "/security" },
  { label: "Cost Intelligence", icon: DollarSign, path: "/cost" },
  { label: "Audit Log", icon: ScrollText, path: "/audit" },
];

const actionCommands = [
  { label: "Kill Rogue Agent", icon: Zap, action: "kill-rogue" },
  { label: "Search Agents", icon: Search, action: "search-agents" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to dashboard, agent, or action..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {navCommands.map((cmd) => (
            <CommandItem
              key={cmd.path}
              onSelect={() => {
                navigate(cmd.path);
                setOpen(false);
              }}
            >
              <cmd.icon className="mr-2 h-4 w-4" />
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          {actionCommands.map((cmd) => (
            <CommandItem
              key={cmd.action}
              onSelect={() => setOpen(false)}
            >
              <cmd.icon className="mr-2 h-4 w-4" />
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

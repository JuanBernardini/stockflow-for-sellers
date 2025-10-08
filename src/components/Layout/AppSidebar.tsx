import { NavLink } from "react-router-dom";
import { Package, ShoppingCart, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";

const menuItems = [
  { title: "Meus Produtos", url: "/produtos", icon: Package },
  { title: "Registrar Venda", url: "/vendas", icon: ShoppingCart },
];

export function AppSidebar() {
  const handleLogout = () => {
    // TODO: Implement logout logic
    window.location.href = "/";
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

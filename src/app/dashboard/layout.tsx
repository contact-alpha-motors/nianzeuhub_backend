'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Briefcase,
  Edit,
  LayoutGrid,
  BarChart2,
  Settings,
  LogOut,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Statistiques', icon: BarChart2 },
    { href: '/dashboard/edit', label: 'Modifier le profil', icon: Edit },
    { href: '/dashboard/portfolio', label: 'Portfolio', icon: LayoutGrid },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-8rem)]">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="font-bold text-lg">NianzeuHub</span>
                <span className="text-xs text-muted-foreground">Tableau de bord</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
             <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/profile/1">
                    <SidebarMenuButton tooltip={{ children: 'Voir le profil' }}>
                      <UserCircle/>
                      <span>Voir le profil</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/">
                    <SidebarMenuButton tooltip={{ children: 'Se déconnecter' }}>
                      <LogOut/>
                      <span>Se déconnecter</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-secondary/30">
          <header className="p-4 flex items-center gap-4">
             <SidebarTrigger className="md:hidden"/>
             <h1 className="font-semibold text-lg">{menuItems.find(item => item.href === pathname)?.label || "Tableau de bord"}</h1>
          </header>
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

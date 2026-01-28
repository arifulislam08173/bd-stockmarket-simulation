"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TrendingUp,
  LayoutDashboard,
  Briefcase,
  History,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/trades", label: "Trade History", icon: History },
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full gradient-header border-b border-primary/20 shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-display font-bold text-primary-foreground leading-tight">
                BD Stock Sim
              </h1>
              <p className="text-[10px] text-primary-foreground/70 leading-none">
                Trading Simulator
              </p>
            </div>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                        isActive && "bg-primary-foreground/20 text-primary-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user && (
            <>
              <div className="hidden sm:block text-right mr-2">
                <p className="text-xs text-primary-foreground/70">Balance</p>
                <p className="text-sm font-bold font-mono text-primary-foreground">
                  ৳
                  {user.balance.toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="px-2 py-1.5 sm:hidden">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-sm font-bold font-mono">
                      ৳
                      {user.balance.toLocaleString("en-BD", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <DropdownMenuSeparator className="sm:hidden" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setMobileMenuOpen((v) => !v)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <Link href="/auth">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-primary/95 backdrop-blur">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                      isActive && "bg-primary-foreground/20 text-primary-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

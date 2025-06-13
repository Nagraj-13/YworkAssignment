'use client';

import { useEffect } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import { ModeToggle } from './toggleTheme';
import { Button } from './ui/button';


interface NavbarProps {
  onMenuClick: () => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export default function Navbar({ onMenuClick, isMobile, setIsMobile }: NavbarProps) {
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return (
    <nav className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button
            onClick={onMenuClick}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </Button>
        )}
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">ChatApp</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <ModeToggle/>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-semibold">CL</span>
        </div>
      </div>
    </nav>
  );
}
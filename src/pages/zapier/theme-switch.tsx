'use client';

// import { useTheme } from 'next-themes';
// import { Icons } from '@/components/icons';
// import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Laptop2, Moon, Sun } from 'lucide-react';

interface ThemeButtonProps {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function ThemeButton({ icon, isActive, onClick }: ThemeButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="icon"
      onClick={handleClick}
      className='rounded-full h-6 w-6'
    >
      {icon}
    </Button>
  );
}


function useTheme(){
    return{
        theme:'light', setTheme:(theme:string)=>theme
    }
}

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();


  return (
    <div
      className="flex border border-muted-foreground/50 border-muted-foreground rounded-full p-0.5 gap-2"
      role="group"
    >
      <ThemeButton
        icon={<Sun className="h-4 w-4" />}
        isActive={theme === 'light'}
        onClick={() => setTheme('light')}
      />
      <ThemeButton
        icon={<Moon className="h-4 w-4" />}
        isActive={theme === 'dark'}
        onClick={() => setTheme('dark')}
      />
      <ThemeButton
        icon={<Laptop2 className="h-4 w-4" />}
        isActive={theme === 'system'}
        onClick={() => setTheme('system')}
      />
    </div>
  );
}
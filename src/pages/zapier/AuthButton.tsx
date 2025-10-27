import { useEffect, useState } from 'react';
// import clsx from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { ThemeSwitch } from './theme-switch';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Key, LogOut,Palette, User } from 'lucide-react';
import { ThemeSwitch } from './theme-switch';

const UserAvatar = ({ user, className }: any) => {
  // State to handle image load error
  const [imgUrl, setImgUrl] = useState<string>('');
  useEffect(() => {
    // getAvatarUrl().then(setImgUrl);
  }, [user]);

  return (
    <Avatar className={cn(className)}>
      <AvatarImage alt="avatar" src={imgUrl} />
      <AvatarFallback>
        {user.email?.match(/^([^@]+)/)?.[1] ?? '(No Name)'}
      </AvatarFallback>
    </Avatar>
  );
};

// const apiEndpoint =
//   process.env.NEXT_PUBLIC_BACKEND_URL || 'https://localhost:5004';

export const AuthButton = () => {
//   const { user } = useUser();
//   const router = useRouter();

  const signOut = async () => {
    console.log('....')
    // await supabase.auth.signOut();
    // useUserStore.getState().setUser(null);
    // useUserStore.persist.clearStorage();
    // router.push('/auth/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user='https://github.com/shadcn.png'
          className="w-8 h-8 bg-muted-foreground/20 text-primary"
        />

      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex ml-4  flex-col gap-1 w-54 text-sm"
      >
        <div className="flex items-center p-2 gap-2">
          <UserAvatar
            user='https://avatars.githubusercontent.com/u/124599?v=4'
            className="w-10 h-10 bg-muted-foreground/20 text-primary"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold">
             Bienfait Ijambo
            </span>
            <span className="flex items-center gap-2 text-xs">
              ijamboizuba20@gmail.com
              {/* {user.confirmed_at && (
                <Icons.badgeCheck className="text-green-600 w-3 h-3" />
              )} */}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to="/settings/account"
        
          >
            <User className="h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>
          <DropdownMenuItem asChild>
          <Link
            to="/settings/account"
        
          >
            <Key className="h-4 w-4" />
            API Keys
          </Link>
        </DropdownMenuItem>
     
       
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between gap-2 p-2 py-1 rounded-md hover:bg-muted">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-medium">Theme</span>
          </div>
          <ThemeSwitch />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className={cn('flex items-center justify-start px-2 py-1 gap-2')}
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
import { Button } from "@/components/ui/button";
import { Grid, Play, Save } from "lucide-react";
import { AuthButton } from "../zapier/AuthButton";

import Logo from '@/assets/logo.png'
const TopNav = () => {
    return (  <nav className="flex items-center justify-between px-4 py-2 bg-white border-b">
  <div className="flex items-center gap-2">
    {/* Logo */}
    <img 
      src={Logo} 
      className="absolute h-13 w-auto" 
      alt="logo" 
    />
  </div>

  <div className="flex items-center gap-3">
    <div className="hidden sm:flex gap-2">
      <Button className="bg-[#4a86e8]">
        <Save /> Save
      </Button>
    </div>
    <Button variant="outline">Publish</Button>

    
  </div>
</nav>
);
}
 
export default TopNav;
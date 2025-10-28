import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, ExternalLink } from "lucide-react";

export function SearchToolConfig() {
  return (
    <Card className="shadow-none border-none rounded-md bg-transparent">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-muted">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-base font-semibold text-foreground">Search Tool</CardTitle>
          </div>
        
        </div>
        <p className="text-sm text-muted-foreground pl-1">Configure how your search node behaves.</p>
      </CardHeader>

      <CardContent className="space-y-4 mt-2">
        {/* Search Query */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Search Query</Label>
          <Input placeholder="Enter search terms..." className="bg-background" />
        </div>

        {/* Search Provider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Search Provider</Label>
          <Select defaultValue="google">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="bing">Bing</SelectItem>
              <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
              <SelectItem value="custom">Custom API</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* API Key (optional) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">API Key</Label>
          <Input type="password" placeholder="Enter API key (optional)" className="bg-background" />
        </div>

     
     
      </CardContent>

      <CardFooter className="flex justify-end pt-2">
        <Button size="sm">Save </Button>
      </CardFooter>
    </Card>
  );
}

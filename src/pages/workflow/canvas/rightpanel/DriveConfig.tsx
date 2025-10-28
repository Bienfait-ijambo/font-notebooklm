
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Globe, Folder, UploadCloud, Link } from "lucide-react";

export function DriveConfig({ drive }) {
  return (
    <Card className="shadow-none border-none rounded-md bg-transparent">
      {/* Header */}
      <CardHeader
        className="flex flex-col gap-1 pb-3"
        style={{ borderLeft: `4px solid ${drive?.ui?.color}` }}
      >
        <div className="flex items-center gap-3">
          <img src={drive.icon} alt={drive.name} className="w-8 h-8 rounded-sm" />
          <div>
            <CardTitle className="text-base font-semibold">{drive.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{drive.description}</p>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        {/* Connected Account */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Connected Account</Label>
          <Button variant="outline" size="sm">
            {drive.auth?.connectedAccountId ? "Reconnect" : "Connect"}
          </Button>
        </div>

        <Separator />

        {/* Trigger Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Trigger</Label>
          <Select defaultValue={drive.triggers[0].id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              {drive.triggers.map((trigger) => (
                <SelectItem key={trigger.id} value={trigger.id}>
                  {trigger.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {drive.triggers[0].description}
          </p>
        </div>

        {/* Trigger Input Fields */}
        {drive.triggers[0].inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              placeholder={field.required ? "Required" : "Optional"}
              className="bg-background"
            />
          </div>
        ))}

        <Separator />

        {/* Action Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Action</Label>
          <Select defaultValue={drive.actions[0].id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              {drive.actions.map((action) => (
                <SelectItem key={action.id} value={action.id}>
                  {action.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {drive.actions[0].description}
          </p>
        </div>

        {/* Action Input Fields */}
        {drive.actions[0].inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              type={field.type === "file" ? "file" : "text"}
              placeholder={field.required ? "Required" : "Optional"}
              className="bg-background"
            />
          </div>
        ))}

        <Separator />

        {/* Options */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Overwrite if file exists</Label>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Share after upload</Label>
          <Switch />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center text-sm pt-2">
        <Button variant="ghost" size="sm" className="text-xs">
          Test Action
        </Button>
        <Button size="sm">Save Configuration</Button>
      </CardFooter>
    </Card>
  );
}

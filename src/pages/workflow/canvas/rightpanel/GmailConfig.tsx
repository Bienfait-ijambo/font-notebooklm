import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import GmailIcon from '@/assets/gmail.png'
import { Trash } from "lucide-react";
import type { NodeObjType } from "@/store/workflow/workflowSlice";
// import { Switch } from "@/components/ui/switch";

export function GmailConfig({ gmail ,selectedNode}:{gmail:any,selectedNode:NodeObjType}) {
  return (
    <Card className="shadow-none border-none rounded-md bg-transparent">
      {/* Header */}
      <CardHeader
        className="flex flex-col gap-1 pb-3"
        style={{ borderLeft: `4px solid ${gmail.ui.color}` }}
      >
       <div className="flex justify-between">
      
      
        <div className="flex items-center gap-3">
          <img src={selectedNode?.data?.icon} alt={gmail.name} className="w-8 h-8 rounded-sm" />
          <div>
            <CardTitle className="text-base font-semibold"> </CardTitle>
          </div>
        </div>
        <Button  variant="outline" size="sm" className="ml-60">
            <Trash></Trash>
        </Button> 
       </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connected Account */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Connected Account</Label>
          <Button variant="outline" size="sm">
            {gmail.auth?.connectedAccountId ? "Reconnect" : "Connect"}
          </Button>
        </div>

        <Separator />


<div className="space-y-2">
          <Label className="text-sm font-medium">Name</Label>
          <Input value={selectedNode?.data?.label}></Input>
        </div>

        {/* Trigger Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Trigger</Label>
          <Select defaultValue={gmail.triggers[0].id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              {gmail.triggers.map((trigger) => (
                <SelectItem key={trigger.id} value={trigger.id}>
                  {trigger.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{gmail.triggers[0].description}</p>
        </div>

        {/* Trigger Input Fields */}
        {gmail.triggers[0].inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              placeholder={field.optional ? "Optional" : "Required"}
              className="bg-background"
            />
          </div>
        ))}

        <Separator />

        {/* Action Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Action</Label>
          <Select defaultValue={gmail.actions[0].id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              {gmail.actions.map((action) => (
                <SelectItem key={action.id} value={action.id}>
                  {action.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">{gmail.actions[0].description}</p>
        </div>

        {/* Action Input Fields */}
        {gmail.actions[0].inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            {field.type === "text" ? (
              <Textarea placeholder={field.required ? "Required" : "Optional"} />
            ) : field.type.includes("file") ? (
              <Input type="file" multiple={field.type.endsWith("[]")} />
            ) : (
              <Input
                type="text"
                placeholder={field.required ? "Required" : "Optional"}
              />
            )}
          </div>
        ))}

        
      </CardContent>

      <CardFooter className="flex justify-between items-center text-sm pt-2">
        <Button variant="ghost" size="sm" className="text-xs">
          Test Action
        </Button>
        <Button size="sm" style={{ backgroundColor: gmail.ui.color }}>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}

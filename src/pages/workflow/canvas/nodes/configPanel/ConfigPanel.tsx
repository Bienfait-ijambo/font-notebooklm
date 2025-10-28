import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

const ConfigPanel = () => {
    return (  <div className="absolute top-6 right-6 z-50 w-96 bg-white shadow-2xl rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">{selectedNode.data?.label || `Node ${selectedNode.id}`}</div>
                      <div className="text-xs text-muted-foreground">Node ID: {selectedNode.id}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                        <X />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex flex-col gap-3">
                    <label className="text-xs text-muted-foreground">Label</label>
                    <Input
                      value={selectedNode.data?.label || ""}
                      onChange={(e) => updateSelectedNodeLabel(e.target.value)}
                    />

                    <label className="text-xs text-muted-foreground">Description</label>
                    <Input placeholder="Short description (optional)" />

                    <div className="flex gap-2 mt-2">
                      <Button onClick={removeSelectedNode}>Delete node</Button>
                      <Button variant="outline">Duplicate</Button>
                    </div>
                  </div>
                </div> );
}
 
export default ConfigPanel;
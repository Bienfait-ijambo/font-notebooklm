 function ModelConfigurationPanel() {
  return (
    <Card className=" shadow-none border-none rounded-md bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Agent</CardTitle>
        <p className="text-sm text-muted-foreground">Call the model with your instructions and tools</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input placeholder="Agent" defaultValue="Agent" />
        </div>

        <div className="space-y-2">
          <Label>Instructions</Label>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            className="w-full h-24 rounded-md border border-input bg-muted/20 px-3 py-2 text-sm text-foreground resize-none"
            placeholder="Describe desired model behavior (tone, tool usage, response style)"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Model</Label>
          <Select defaultValue="gpt-5">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-5">GPT-5</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Reasoning effort</Label>
          <Select defaultValue="low">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select effort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

       
        <div className="space-y-2">
          <Label>Output format</Label>
          <Select defaultValue="text">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <Button variant="ghost" className="text-xs px-2 py-1">More</Button>
        <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
          Evaluate <ExternalLink className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}

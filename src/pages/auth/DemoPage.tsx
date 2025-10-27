import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/base/ThemeToggle"

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground transition-colors">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">Shadcn Theming Demo</h1>
        <ThemeToggle />
      </div>

      <Card className="w-[300px] shadow-md">
        <CardHeader>
          <CardTitle>Demo Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a card example using shadcn/ui. It adapts to the current theme.
          </p>
        </CardContent>
      </Card>

      <Button variant="default">Click Me</Button>

      <div className="mt-4 text-sm text-muted-foreground">
        <strong>Param:</strong> The theme is dynamic.
      </div>
    </div>
  )
}

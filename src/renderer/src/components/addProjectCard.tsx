import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import React from 'react'
import { Card } from './ui/card'

// Add this component inside your Dashboard component
export default function AddProjectCard() {
  const [projectTitle, setProjectTitle] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle project creation logic here
    console.log('New project:', projectTitle)
    setOpen(false)
    setProjectTitle('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="w-full cursor-pointer transition-all hover:border-primary hover:shadow-md group">
          <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-2 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
              <Plus className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <span className="font-medium text-muted-foreground transition-colors group-hover:text-primary">
              New Project
            </span>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Title
            </Label>
            <Input
              id="name"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter project name"
              autoFocus
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

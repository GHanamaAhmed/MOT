import { Loader2, Plus } from 'lucide-react'
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
import React, { useContext } from 'react'
import { Card } from './ui/card'

import { toast } from '@renderer/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { projectContext } from '@renderer/contexts/project'

export default function AddProjectCard({ onProjectCreated }: { onProjectCreated?: () => void }) {
  const [projectTitle, setProjectTitle] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { project, setProject } = useContext(projectContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title: projectTitle })
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }
      const data = await response.json()
      setProject(data)
      toast({
        title: 'Project created successfully!',
        description: `${projectTitle} is now ready for collaboration.`
      })
      console.log("1");
      setTimeout(() => {
        navigate('/editor')
      }, 1000)
      setOpen(false)
      setProjectTitle('')
      if (onProjectCreated) onProjectCreated()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Project creation failed',
        description: err instanceof Error ? err.message : 'Please try again later'
      })
    } finally {
      setIsLoading(false)
    }
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
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

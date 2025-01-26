import { AppSidebar } from '@renderer/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@renderer/components/ui/breadcrumb'
import { Separator } from '@renderer/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@renderer/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import ImageCard from '@renderer/components/image-card'
import AddProjectCard from '@renderer/components/addProjectCard'
import { useEffect, useState } from 'react'
import { Project } from '@renderer/contexts/project'
import { toast } from '@renderer/hooks/use-toast'
import { useAuth, useClerk, useUser } from '@clerk/clerk-react'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'

function formatDateToYYYYMMDD(isoDateString) {
  // Parse the ISO date string into a Date object
  const date = new Date(isoDateString)

  // Convert the Date object back to an ISO string and extract the date part
  const formattedDate = date.toISOString().split('T')[0]

  return formattedDate
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  // Fetch user projects
  const fetchUserProjects = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/projects/all', {
        method: 'GET',
        credentials: 'include'
      })
      if (!res.ok) {
        throw new Error('Failed to create project')
      }
      const data = await res.json()
      console.log('User projects:', data)
      setProjects(data) // Update the projects state with the fetched data
      return data
    } catch (error) {
      console.error('Failed to fetch user projects:', error)
      throw error
    }
  }

  // Fetch projects on component mount
  useEffect(() => {
    fetchUserProjects()
  }, [])

  // Handle delete project
  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/projects`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({ id: projectId }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        console.error('Error Delete project')
        toast({
          title: 'Error Delete project',
          description: 'Failed to delete project data. Please try again.',
          variant: 'destructive'
        })
        return
      }
      // Remove the deleted project from the state
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId))
      console.log('Project deleted successfully')
    } catch (error) {
      toast({
        title: 'Error Delete project',
        description: 'Failed to delete project data. Please try again.',
        variant: 'destructive'
      })
      console.error('Failed to delete project:', error)
    }
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <AvatarDropdownMenu />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-4">
            {/* New Project Card - Full width */}
            <AddProjectCard />

            {/* Existing Projects Grid */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <ImageCard
                  key={project._id}
                  id={project._id}
                  imageUrl={project.metadata.thumbnail || 'https://picsum.photos/400/300?random=1'} // Use project thumbnail or a fallback image
                  title={project.title}
                  description={formatDateToYYYYMMDD(project.updatedAt)} // Customize the description
                  onDelete={() => handleDeleteProject(project._id)} // Pass the delete handler
                />
              ))}
            </div>

            {/* Bottom Card */}
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Sparkles,
  User,
  UserPlus,
  Users
} from 'lucide-react'

import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'

function AvatarDropdownMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
            <AvatarFallback className="rounded-lg">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.fullName}</span>
            <span className="truncate text-xs">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback className="rounded-lg">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.fullName}</span>
              <span className="truncate text-xs">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate('/user-profile')
            }}
          >
            <User className="mr-2 size-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            signOut()
            window.electron.ipcRenderer.send('signOut')
            console.log('Signed out')
          }}
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

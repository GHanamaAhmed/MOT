import { createContext, useState, ReactNode } from 'react'

// Define the Metadata interface
interface Metadata {
  lastModified: Date // Use Date instead of string for Mongoose Date type
  exportSettings?: Record<string, any> // Optional, as it has a default value
  thumbnail?: string // Optional, as it's not required
}

// Define the Project interface
export interface Project {
  _id: string // MongoDB ObjectId as a string
  title: string // Required string
  owner: string // Required string (refers to User)
  tldrawData?: string // Optional, as it's not required
  metadata: Metadata // Nested Metadata object
  collaborators: string[] // Array of strings (ObjectId references to User)
  createdAt: Date // Automatically added by Mongoose timestamps
  updatedAt: Date // Automatically added by Mongoose timestamps
  version: number // Version key for optimistic concurrency control
}

// Define the shape of the context value
interface ProjectContextValue {
  project: Project | undefined // Allow project to be undefined initially
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
}

// Create the context with an initial value
// @ts-ignore
export const projectContext = createContext<ProjectContextValue>({})

// Define the props for the provider component
interface ProjectContextProviderProps {
  children: ReactNode
}

// Create the provider component
export default function ProjectContextProvider({ children }: ProjectContextProviderProps) {
  const [project, setProject] = useState<Project | undefined>(undefined)

  // Provide the context value
  const contextValue: ProjectContextValue = {
    project,
    setProject
  }

  return <projectContext.Provider value={contextValue}>{children}</projectContext.Provider>
}

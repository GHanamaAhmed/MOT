import { Card } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { Trash2 } from 'lucide-react'
import { memo, useContext, useEffect, useState } from 'react'
import { projectContext } from '@renderer/contexts/project'
import { toast } from '@renderer/hooks/use-toast'
import { useNavigate } from 'react-router-dom'

// Define the props interface
interface ImageCardProps {
  id: string
  imageUrl: string // URL of the image
  title: string // Title of the card
  description: string // Description of the card
  onDelete?: () => void // Optional delete handler
}

function ImageCard({ id, imageUrl, title, description, onDelete }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { setProject } = useContext(projectContext)
  const [image, setImage] = useState('')
  const navigate = useNavigate()

  // Fetch project by ID when the card is clicked
  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }
      const project = await response.json()
      console.log('Fetched project:', project)
      setProject(project)
      navigate('/editor')
    } catch (error) {
      toast({
        title: 'Error fetching project',
        description: 'Failed to fetch project data. Please try again.',
        variant: 'destructive'
      })
      console.error('Error fetching project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch the image and handle errors
  const handleImageLoad = async () => {
    if (image.startsWith('https')) {
      setImageError(false)
      setImage(imageUrl)
      return
    }
    try {
      const response = await fetch(imageUrl, { credentials: 'include' })
      if (!response.ok) {
        throw new Error('Failed to load image')
      }
      const blob = await response.blob()
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(blob)
      setImageError(false)
    } catch (error) {
      setImageError(true)
      console.error('Error loading image:', error)
    }
  }
  useEffect(() => {
    handleImageLoad()
  }, [])
  return (
    <Card onClick={handleClick} className="w-full max-w-xs hover:cursor-pointer">
      <div className="grid gap-4 p-4">
        {/* Image */}
        {imageError ? (
          <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">There no image</p>
          </div>
        ) : (
          <img
            src={image || imageUrl}
            alt={title}
            className="aspect-video overflow-hidden rounded-lg object-cover w-full h-full"
          />
        )}

        {/* Title and Description */}
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="font-semibold text-sm">{description}</p>
        </div>

        {/* Delete Button (optional) */}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}
      </div>
    </Card>
  )
}
export default memo(ImageCard)

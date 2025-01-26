import { Card, CardContent, CardFooter } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { Trash2 } from 'lucide-react'

export function ImageCard() {
  return (
    <Card className="w-full max-w-xs hover:cursor-pointer">
      <div className="grid gap-4 p-4">
        <img
          src="https://picsum.photos/400/300?random=1"
          alt="Product image"
          className="aspect-video overflow-hidden rounded-lg object-cover w-full h-full"
        />
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-base">Classic Leather Messenger Bag</h3>
          <p className="font-semibold text-sm">Sleek and stylish</p>
        </div>
      </div>
    </Card>
  )
}

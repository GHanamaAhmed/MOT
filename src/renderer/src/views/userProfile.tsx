import { UserProfile } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function CustomUserProfile() {
  return (
    <UserProfile
      appearance={{
        elements: {
          card: {
            boxShadow: 'none',
            width: '100%',
            maxWidth: '100%'
          },
          rootBox: {
            width: '100%'
          },
          navbar: {
            borderRight: 'none'
          }
        }
      }}
    >
      <UserProfile.Link
        label="Return to App"
        url="/"
        labelIcon={
          <div className="h-full flex justify-center items-center">
            <ArrowLeft className="size-4" />
          </div>
        }
      />
    </UserProfile>
  )
}

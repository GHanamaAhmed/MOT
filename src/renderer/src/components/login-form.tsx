import { Button, buttonVariants } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icons } from '@renderer/components/icons'
import { cn } from '@renderer/lib/utils'
import img from './image1.jpg'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false)
  const navigate = useNavigate()
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      const username = (document.getElementById('username') as HTMLInputElement)?.value
      const password = (document.getElementById('password') as HTMLInputElement)?.value

      // Fetch users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Check if user exists
      const userExists = users.some(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      )

      if (userExists) {
        alert('Login successful! Redirecting to Editor...')
        localStorage.setItem('activeUser', JSON.stringify(users))
        navigate('/editor') // Redirect to Editor page
      } else {
        alert('Invalid username or password. Please try again.')
      }

      setIsLoading(false)
    }, 3000)
  }

  function handleSignUp(event: React.SyntheticEvent) {
    event.preventDefault()
    const username = (document.getElementById('sign-up-username') as HTMLInputElement)?.value
    const password = (document.getElementById('sign-up-password') as HTMLInputElement)?.value
    const password2 = (document.getElementById('sign-up-password2') as HTMLInputElement)?.value

    if (password !== password2) {
      alert('Passwords do not match!')
      return
    }

    // Retrieve the existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // Check if the username already exists
    if (users.some((user: { username: string }) => user.username === username)) {
      alert('Username already exists! Please choose a different username.')
      return
    }

    // Add the new user to the array
    const newUser = { username, password }
    users.push(newUser)

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users))

    alert('Sign-up successful!')
    setIsSignUp(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {isSignUp ? (
        <form onSubmit={handleSignUp}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="sign-up-username">
                Username
              </Label>
              <Input
                id="sign-up-username"
                placeholder="Username"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="sign-up-password">
                Password
              </Label>
              <Input
                id="sign-up-password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="sign-up-password2">
                Confirm Password
              </Label>
              <Input
                id="sign-up-password2"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Username"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </div>
        </form>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {isSignUp ? (
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsSignUp(false)}
          disabled={isLoading}
        >
          Back to Sign In
        </Button>
      ) : (
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsSignUp(true)}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      )}
    </div>
  )
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative  h-full w-full flex-col bg-muted text-white dark:border-r lg:flex">
          <img src={img} alt="Authentication" className="w-full h-full object-cover" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

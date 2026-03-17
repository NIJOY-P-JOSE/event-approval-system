"use client"

import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



// const roles = [
//   { value: "student-coordinator", label: "Student Coordinator" },
//   { value: "vice-coordinator", label: "Vice Coordinator" },
//   { value: "volunteer", label: "Volunteer" },
//   { value: "event-coordinator", label: "Event Coordinator (Faculty)" },
//   { value: "department-coordinator", label: "Department Coordinator (Faculty)" },
//   { value: "department-techfest-head", label: "Department Techfest Head" },
//   { value: "overall-techfest-head", label: "Overall Techfest Head" },
//   { value: "hod", label: "HOD" },
// ]


const roles = [
  { value: "faculty", label: "Faculty Coordinator" },
  { value: "student_coord", label: "Student Coordinator" },
  { value: "sub_coord", label: "Sub Coordinator" },
  { value: "volunteer", label: "Volunteer" },
  { value: "lab_staff", label: "Lab Staff" },
  { value: "electric_staff", label: "Electric Staff" },
  { value: "treasurer", label: "Treasurer" },
  { value: "dept_head", label: "Department Techfest Head" },
  { value: "hod", label: "HOD" },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   // Simulate loading
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     window.location.href = "/dashboard"
  //   }, 1500)
  // }


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const res = await fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
      }),
    })

    const text = await res.text()   // 🔥 read as text first
    console.log("RAW RESPONSE:", text)

    let data
    try {
      data = JSON.parse(text)
    } catch {
      console.error("Not JSON response")
      alert("Server error (not JSON)")
      setIsLoading(false)
      return
    }

    if (res.ok) {
      localStorage.setItem("token", data.access)
      localStorage.setItem("role", data.role)

      window.location.href = "/dashboard"
    } else {
      alert(data.error || "Login failed")
    }

  } catch (error) {
    console.error(error)
    alert("Server error")
  }

  setIsLoading(false)
}

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1E3A8A08_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-bold tracking-tight text-balance">
                Techfest Event Approval System
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to access your dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  className="h-11"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select onValueChange={(value) => setRole(value)} required>
                  <SelectTrigger id="role" className="h-11">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input accent-primary"
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2 transition-all hover:gap-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Need help accessing your account?{" "}
                <Link
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Contact Admin
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          University Techfest Management Portal
        </p>
      </div>
    </div>
  )
}

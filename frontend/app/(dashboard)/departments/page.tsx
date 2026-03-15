"use client"

import Link from "next/link"
import { Building2, Calendar, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const departments = [
  {
    id: 1,
    name: "Computer Science",
    shortName: "CS",
    events: 24,
    coordinators: 5,
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Electronics & Communication",
    shortName: "ECE",
    events: 18,
    coordinators: 4,
    color: "bg-secondary",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    shortName: "Mech",
    events: 15,
    coordinators: 3,
    color: "bg-accent",
  },
  {
    id: 4,
    name: "Civil Engineering",
    shortName: "Civil",
    events: 12,
    coordinators: 3,
    color: "bg-chart-4",
  },
  {
    id: 5,
    name: "Electrical Engineering",
    shortName: "EE",
    events: 10,
    coordinators: 2,
    color: "bg-chart-5",
  },
  {
    id: 6,
    name: "Information Technology",
    shortName: "IT",
    events: 8,
    coordinators: 2,
    color: "bg-chart-1",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Browse and manage department events
          </p>
        </div>
        <div className="w-full sm:w-72">
          <Input placeholder="Search departments..." />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="group transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${dept.color} text-white font-bold text-lg shadow-lg`}
                >
                  {dept.shortName}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  asChild
                >
                  <Link href={`/events?department=${dept.id}`}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">View events</span>
                  </Link>
                </Button>
              </div>
              <CardTitle className="mt-3">{dept.name}</CardTitle>
              <CardDescription>
                Department of {dept.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{dept.events} Events</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{dept.coordinators} Coordinators</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                asChild
              >
                <Link href={`/events?department=${dept.id}`}>
                  <Building2 className="h-4 w-4" />
                  View Events
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

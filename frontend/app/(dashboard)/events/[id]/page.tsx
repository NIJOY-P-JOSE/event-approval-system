"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  User,
  Building2,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"

// const eventData = {
//   id: 1,
//   name: "Hackathon 2026",
//   department: "Computer Science",
//   date: "March 20, 2026",
//   time: "9:00 AM - 9:00 PM",
//   venue: "Main Auditorium",
//   status: "approved" as const,
//   description:
//     "Annual 24-hour hackathon event featuring innovation challenges, workshops, and networking opportunities. Teams of 2-4 members will compete to build innovative solutions to real-world problems. Prizes worth $10,000 for top 3 teams.",
//   team: {
//     facultyCoordinator: {
//       name: "Dr. Smith",
//       email: "smith@university.edu",
//       initials: "DS",
//     },
//     studentCoordinator: {
//       name: "John Doe",
//       email: "john.doe@student.edu",
//       initials: "JD",
//     },
//     viceCoordinator: {
//       name: "Jane Smith",
//       email: "jane.smith@student.edu",
//       initials: "JS",
//     },
//     volunteers: [
//       { name: "Mike Johnson", initials: "MJ" },
//       { name: "Sarah Wilson", initials: "SW" },
//       { name: "Tom Brown", initials: "TB" },
//       { name: "Emily Davis", initials: "ED" },
//     ],
//   },
//   approvalSteps: [
//     {
//       step: 1,
//       title: "Event Created",
//       description: "Event request submitted",
//       status: "completed",
//       date: "Mar 10, 2026",
//     },
//     {
//       step: 2,
//       title: "Department Approval",
//       description: "Approved by Department Coordinator",
//       status: "completed",
//       date: "Mar 12, 2026",
//     },
//     {
//       step: 3,
//       title: "Techfest Head Approval",
//       description: "Approved by Overall Techfest Head",
//       status: "completed",
//       date: "Mar 14, 2026",
//     },
//     {
//       step: 4,
//       title: "Final Approval",
//       description: "Approved by HOD",
//       status: "completed",
//       date: "Mar 15, 2026",
//     },
//   ],
// }

export default function EventDetailsPage({ params }: { params: { id: string } }){

  const [eventData, setEventData] = useState<any>(null)

  useEffect(() => {

  const fetchEvent = async () => {

    const response = await fetch(
      `http://127.0.0.1:8000/api/events/${params.id}/`
    )

    const data = await response.json()

    setEventData(data)

  }

  fetchEvent()

}, [params.id])

if (!eventData) {
  return <div>Loading event...</div>
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/events">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to events</span>
              </Link>
            </Button>
            <Badge variant="outline" className="text-muted-foreground">
              <Building2 className="mr-1 h-3 w-3" />
              {eventData.department}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{eventData.name}</h1>
          <div className="flex items-center gap-2">
            <StatusBadge status={eventData.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Event</Button>
          <Button>Request Resource</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{eventData.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{eventData.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{eventData.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{eventData.department}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {eventData.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assigned Members
              </CardTitle>
              <CardDescription>Team responsible for this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Faculty Coordinator
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {eventData.team.facultyCoordinator.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {eventData.team.facultyCoordinator.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {eventData.team.facultyCoordinator.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Student Coordinator
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {eventData.team.studentCoordinator.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {eventData.team.studentCoordinator.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {eventData.team.studentCoordinator.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Vice Coordinator
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {eventData.team.viceCoordinator.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {eventData.team.viceCoordinator.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {eventData.team.viceCoordinator.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-3">Volunteers ({eventData.team.volunteers.length})</p>
                <div className="flex flex-wrap gap-2">
                  {eventData.team.volunteers.map((volunteer, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {volunteer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{volunteer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Approval Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Workflow</CardTitle>
              <CardDescription>Event approval progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {eventData.approvalSteps.map((step, index) => (
                  <div key={step.step} className="relative pb-8 last:pb-0">
                    {index < eventData.approvalSteps.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 -ml-px h-full w-0.5 ${
                          step.status === "completed"
                            ? "bg-accent"
                            : "bg-border"
                        }`}
                      />
                    )}
                    <div className="relative flex items-start gap-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          step.status === "completed"
                            ? "bg-accent text-accent-foreground"
                            : step.status === "current"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{step.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.description}
                        </p>
                        {step.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Request Volunteers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Request Duty Leave
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building2 className="h-4 w-4" />
                Request Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"


// import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, User, Plus, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/status-badge"

// const events = [
//   {
//     id: 1,
//     name: "Hackathon 2026",
//     department: "Computer Science",
//     date: "Mar 20, 2026",
//     venue: "Main Auditorium",
//     coordinator: "Dr. Smith",
//     status: "approved" as const,
//   },
//   {
//     id: 2,
//     name: "Robotics Workshop",
//     department: "Mechanical",
//     date: "Mar 22, 2026",
//     venue: "Lab Complex A",
//     coordinator: "Prof. Johnson",
//     status: "pending" as const,
//   },
//   {
//     id: 3,
//     name: "Tech Quiz Competition",
//     department: "Electronics",
//     date: "Mar 25, 2026",
//     venue: "Seminar Hall 1",
//     coordinator: "Dr. Williams",
//     status: "pending" as const,
//   },
//   {
//     id: 4,
//     name: "AI Symposium",
//     department: "Computer Science",
//     date: "Mar 28, 2026",
//     venue: "Conference Center",
//     coordinator: "Prof. Davis",
//     status: "rejected" as const,
//   },
//   {
//     id: 5,
//     name: "Circuit Design Contest",
//     department: "Electronics",
//     date: "Apr 01, 2026",
//     venue: "ECE Lab 2",
//     coordinator: "Dr. Brown",
//     status: "approved" as const,
//   },
//   {
//     id: 6,
//     name: "Bridge Building Challenge",
//     department: "Civil",
//     date: "Apr 03, 2026",
//     venue: "Open Ground",
//     coordinator: "Prof. Miller",
//     status: "pending" as const,
//   },
//   {
//     id: 7,
//     name: "Coding Marathon",
//     department: "Information Technology",
//     date: "Apr 05, 2026",
//     venue: "IT Lab Complex",
//     coordinator: "Dr. Wilson",
//     status: "approved" as const,
//   },
//   {
//     id: 8,
//     name: "Power Systems Workshop",
//     department: "Electrical",
//     date: "Apr 08, 2026",
//     venue: "EE Block",
//     coordinator: "Prof. Taylor",
//     status: "in-progress" as const,
//   },
// ]



export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {

  const token = localStorage.getItem("token")

  fetch("http://127.0.0.1:8000/api/events/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setEvents(data)
      } else {
        console.error("API error:", data)
        setEvents([])
      }
    })
    .catch((err) => console.error(err))

}, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage and track all techfest events
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/events/create">
            <Plus className="h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="ee">Electrical</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setViewMode("table")}>
                  Table View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("cards")}>
                  Card View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {viewMode === "table" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Venue</TableHead>
                  <TableHead className="hidden lg:table-cell">Coordinator</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <Link
                        href={`/events/${event.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {event.name}
                      </Link>
                      <p className="text-sm text-muted-foreground md:hidden">
                        {event.department}
                      </p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {event.department}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {event.date}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {event.venue}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {event.coordinator}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={event.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* Card View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      <Link
                        href={`/events/${event.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {event.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>{event.department}</CardDescription>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{event.coordinator}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  asChild
                >
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-8 of 24 events
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

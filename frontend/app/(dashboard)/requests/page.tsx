"use client"

import { useState } from "react"
import {
  FileCheck,
  Users,
  Calendar,
  Monitor,
  Building2,
  Mic2,
  Computer,
  Wind,
  Plus,
  Search,
} from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusBadge } from "@/components/status-badge"

const requestTypes = [
  {
    id: "event-approval",
    title: "Event Approval",
    description: "Submit a new event for approval",
    icon: FileCheck,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "volunteer",
    title: "Volunteer Request",
    description: "Request volunteers for your event",
    icon: Users,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: "duty-leave",
    title: "Duty Leave",
    description: "Apply for duty leave for event work",
    icon: Calendar,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "resource",
    title: "Resource Request",
    description: "Request resources for your event",
    icon: Monitor,
    color: "bg-chart-4/10 text-chart-4",
  },
]

const resourceTypes = [
  { id: "classroom", name: "Classroom", icon: Building2 },
  { id: "stage", name: "Stage", icon: Monitor },
  { id: "speakers", name: "Speakers", icon: Mic2 },
  { id: "computers", name: "Computers", icon: Computer },
  { id: "ac-coolers", name: "AC / Coolers", icon: Wind },
]

const submittedRequests = [
  {
    id: 1,
    type: "Event Approval",
    event: "Hackathon 2026",
    date: "Mar 15, 2026",
    status: "approved" as const,
  },
  {
    id: 2,
    type: "Resource Request",
    event: "Tech Quiz",
    date: "Mar 14, 2026",
    status: "pending" as const,
  },
  {
    id: 3,
    type: "Volunteer Request",
    event: "Robotics Workshop",
    date: "Mar 13, 2026",
    status: "pending" as const,
  },
  {
    id: 4,
    type: "Duty Leave",
    event: "AI Symposium",
    date: "Mar 12, 2026",
    status: "rejected" as const,
  },
  {
    id: 5,
    type: "Event Approval",
    event: "Circuit Design Contest",
    date: "Mar 11, 2026",
    status: "approved" as const,
  },
  {
    id: 6,
    type: "Resource Request",
    event: "Coding Marathon",
    date: "Mar 10, 2026",
    status: "in-progress" as const,
  },
]

export default function RequestsPage() {
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Requests</h1>
        <p className="text-muted-foreground">
          Create and manage your requests
        </p>
      </div>

      {/* Request Type Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Create New Request</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {requestTypes.map((type) => (
            <Dialog key={type.id} open={dialogOpen && selectedRequestType === type.id} onOpenChange={(open) => {
              setDialogOpen(open)
              if (!open) setSelectedRequestType(null)
            }}>
              <DialogTrigger asChild>
                <Card
                  className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 group"
                  onClick={() => setSelectedRequestType(type.id)}
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${type.color} transition-transform group-hover:scale-110`}
                    >
                      <type.icon className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base">{type.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{type.title}</DialogTitle>
                  <DialogDescription>
                    {type.id === "resource"
                      ? "Select the type of resource you need"
                      : `Fill in the details for your ${type.title.toLowerCase()}`}
                  </DialogDescription>
                </DialogHeader>
                {type.id === "resource" ? (
                  <div className="grid grid-cols-2 gap-3 py-4">
                    {resourceTypes.map((resource) => (
                      <Button
                        key={resource.id}
                        variant="outline"
                        className="h-auto flex-col gap-2 py-4"
                        onClick={() => setDialogOpen(false)}
                      >
                        <resource.icon className="h-6 w-6" />
                        <span>{resource.name}</span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Event</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon 2026</SelectItem>
                          <SelectItem value="quiz">Tech Quiz</SelectItem>
                          <SelectItem value="workshop">Robotics Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {type.id === "volunteer" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Number of Volunteers
                        </label>
                        <Input type="number" placeholder="Enter number" />
                      </div>
                    )}
                    {type.id === "duty-leave" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">From Date</label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">To Date</label>
                          <Input type="date" />
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Remarks</label>
                      <Input placeholder="Add any additional notes" />
                    </div>
                    <Button className="w-full" onClick={() => setDialogOpen(false)}>
                      Submit Request
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      {/* Submitted Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Submitted Requests</CardTitle>
              <CardDescription>View and track your requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-8 w-full sm:w-[200px]"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Type</TableHead>
                <TableHead className="hidden sm:table-cell">Event</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <span className="font-medium">{request.type}</span>
                    <p className="text-sm text-muted-foreground sm:hidden">
                      {request.event}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {request.event}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {request.date}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

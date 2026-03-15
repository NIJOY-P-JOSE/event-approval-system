"use client"

import { useState } from "react"
import {
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  ChevronDown,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/status-badge"

const pendingRequests = [
  {
    id: 1,
    event: "Robotics Workshop",
    requestedBy: "John Doe",
    department: "Mechanical",
    type: "Event Approval",
    date: "Mar 15, 2026",
    status: "pending" as const,
    description: "Annual robotics workshop featuring hands-on sessions with Arduino and Raspberry Pi.",
  },
  {
    id: 2,
    event: "Tech Quiz",
    requestedBy: "Jane Smith",
    department: "Electronics",
    type: "Resource Request",
    date: "Mar 14, 2026",
    status: "pending" as const,
    description: "Request for 20 computers and projector for tech quiz competition.",
  },
  {
    id: 3,
    event: "AI Symposium",
    requestedBy: "Mike Johnson",
    department: "Computer Science",
    type: "Volunteer Request",
    date: "Mar 13, 2026",
    status: "pending" as const,
    description: "Request for 15 volunteers to help with registration and logistics.",
  },
  {
    id: 4,
    event: "Bridge Building Challenge",
    requestedBy: "Sarah Wilson",
    department: "Civil",
    type: "Event Approval",
    date: "Mar 12, 2026",
    status: "pending" as const,
    description: "Competition for designing and building model bridges using limited materials.",
  },
  {
    id: 5,
    event: "Coding Marathon",
    requestedBy: "Tom Brown",
    department: "IT",
    type: "Duty Leave",
    date: "Mar 11, 2026",
    status: "pending" as const,
    description: "Duty leave request for organizing committee members during the event.",
  },
  {
    id: 6,
    event: "Power Systems Workshop",
    requestedBy: "Emily Davis",
    department: "Electrical",
    type: "Resource Request",
    date: "Mar 10, 2026",
    status: "pending" as const,
    description: "Request for lab equipment and safety gear for practical demonstrations.",
  },
]

export default function ApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingRequests[0] | null>(null)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)

  const handleAction = (request: typeof pendingRequests[0], action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
    setActionDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Approval Dashboard</h1>
        <p className="text-muted-foreground">
          Review and process incoming requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold">{pendingRequests.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Filter className="h-6 w-6 text-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected Today</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-8" />
            </div>
            <Select defaultValue="all-dept">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-dept">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="ee">Electrical</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-type">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-type">All Types</SelectItem>
                <SelectItem value="event">Event Approval</SelectItem>
                <SelectItem value="resource">Resource Request</SelectItem>
                <SelectItem value="volunteer">Volunteer Request</SelectItem>
                <SelectItem value="duty">Duty Leave</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Incoming Requests</CardTitle>
          <CardDescription>
            Review and take action on pending requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="hidden sm:table-cell">Requested By</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Request Type</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.event}</p>
                      <p className="text-sm text-muted-foreground sm:hidden">
                        {request.requestedBy}
                      </p>
                      <Badge variant="outline" className="mt-1 lg:hidden">
                        {request.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {request.requestedBy}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {request.department}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {request.type}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {request.date}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{request.event}</DialogTitle>
                            <DialogDescription>
                              {request.type} - {request.department}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Requested By</p>
                                <p className="font-medium">{request.requestedBy}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium">{request.date}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Description</p>
                              <p className="text-sm">{request.description}</p>
                            </div>
                          </div>
                          <DialogFooter className="gap-2">
                            <Button
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleAction(request, "reject")}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              className="bg-accent hover:bg-accent/90 text-accent-foreground"
                              onClick={() => handleAction(request, "approve")}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-accent"
                            onClick={() => handleAction(request, "approve")}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleAction(request, "reject")}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Request" : "Reject Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "Are you sure you want to approve this request?"
                : "Please provide a reason for rejection."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedRequest && (
              <div className="rounded-lg border p-4 mb-4">
                <p className="font-medium">{selectedRequest.event}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.type} by {selectedRequest.requestedBy}
                </p>
              </div>
            )}
            {actionType === "reject" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Rejection</label>
                <Textarea placeholder="Enter reason..." />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === "approve" ? "default" : "destructive"}
              onClick={() => setActionDialogOpen(false)}
            >
              {actionType === "approve" ? "Confirm Approval" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

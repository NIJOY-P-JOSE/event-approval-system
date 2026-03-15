"use client"

import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/stat-card"
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
import { StatusBadge } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

const departments = [
  { name: "Computer Science", events: 24, approved: 20, pending: 3, rejected: 1 },
  { name: "Electronics", events: 18, approved: 15, pending: 2, rejected: 1 },
  { name: "Mechanical", events: 15, approved: 12, pending: 2, rejected: 1 },
  { name: "Civil", events: 12, approved: 10, pending: 1, rejected: 1 },
  { name: "Electrical", events: 10, approved: 8, pending: 1, rejected: 1 },
  { name: "Information Technology", events: 8, approved: 7, pending: 1, rejected: 0 },
]

const allEvents = [
  {
    id: 1,
    name: "Hackathon 2026",
    department: "Computer Science",
    date: "Mar 20, 2026",
    status: "approved" as const,
  },
  {
    id: 2,
    name: "Robotics Workshop",
    department: "Mechanical",
    date: "Mar 22, 2026",
    status: "pending" as const,
  },
  {
    id: 3,
    name: "Tech Quiz",
    department: "Electronics",
    date: "Mar 25, 2026",
    status: "approved" as const,
  },
  {
    id: 4,
    name: "AI Symposium",
    department: "Computer Science",
    date: "Mar 28, 2026",
    status: "rejected" as const,
  },
  {
    id: 5,
    name: "Circuit Design Contest",
    department: "Electronics",
    date: "Apr 01, 2026",
    status: "approved" as const,
  },
  {
    id: 6,
    name: "Bridge Building",
    department: "Civil",
    date: "Apr 03, 2026",
    status: "pending" as const,
  },
  {
    id: 7,
    name: "Coding Marathon",
    department: "IT",
    date: "Apr 05, 2026",
    status: "approved" as const,
  },
  {
    id: 8,
    name: "Power Workshop",
    department: "Electrical",
    date: "Apr 08, 2026",
    status: "pending" as const,
  },
]

const approvalStats = [
  { name: "Approved", value: 72, color: "var(--color-accent)" },
  { name: "Pending", value: 10, color: "var(--color-warning)" },
  { name: "Rejected", value: 5, color: "var(--color-destructive)" },
]

const chartConfig = {
  approved: { label: "Approved", color: "var(--color-accent)" },
  pending: { label: "Pending", color: "var(--color-warning)" },
  rejected: { label: "Rejected", color: "var(--color-destructive)" },
}

export default function HODViewPage() {
  const totalEvents = departments.reduce((sum, d) => sum + d.events, 0)
  const totalApproved = departments.reduce((sum, d) => sum + d.approved, 0)
  const totalPending = departments.reduce((sum, d) => sum + d.pending, 0)
  const totalRejected = departments.reduce((sum, d) => sum + d.rejected, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">HOD Dashboard</h1>
          <p className="text-muted-foreground">
            View-only overview of all departments and events
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground">
          <Eye className="h-4 w-4" />
          View Only Mode
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Departments"
          value={departments.length}
          icon={Building2}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
          iconClassName="bg-secondary/10 text-secondary"
        />
        <StatCard
          title="Approved Events"
          value={totalApproved}
          description={`${Math.round((totalApproved / totalEvents) * 100)}% approval rate`}
          icon={CheckCircle}
          iconClassName="bg-accent/10 text-accent"
        />
        <StatCard
          title="Pending Review"
          value={totalPending}
          description="awaiting approval"
          icon={Clock}
          iconClassName="bg-warning/10 text-warning-foreground"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Approval Statistics Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Statistics</CardTitle>
            <CardDescription>Overall event approval distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <PieChart>
                <Pie
                  data={approvalStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {approvalStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2 mt-4">
              {approvalStats.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Departments</CardTitle>
            <CardDescription>Event statistics by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-muted-foreground">
                      {dept.approved}/{dept.events} approved
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(dept.approved / dept.events) * 100}
                      className="h-2 flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12">
                      {Math.round((dept.approved / dept.events) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Events Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Complete list of techfest events</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="ee">Electrical</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead className="hidden sm:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground sm:hidden">
                      {event.department}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {event.department}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {event.date}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Performer</p>
                <p className="font-semibold">Computer Science</p>
                <p className="text-xs text-muted-foreground">24 events organized</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Approval</p>
                <p className="font-semibold">Information Technology</p>
                <p className="text-xs text-muted-foreground">87.5% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rejected</p>
                <p className="font-semibold">{totalRejected} Events</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round((totalRejected / totalEvents) * 100)}% rejection rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

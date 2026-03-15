"use client"

import { Calendar, CheckCircle, Clock, FileText, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

const departmentData = [
  { name: "CS", events: 24 },
  { name: "ECE", events: 18 },
  { name: "Mech", events: 15 },
  { name: "Civil", events: 12 },
  { name: "EE", events: 10 },
]

const statusData = [
  { name: "Approved", value: 45, color: "var(--color-accent)" },
  { name: "Pending", value: 30, color: "var(--color-warning)" },
  { name: "Rejected", value: 10, color: "var(--color-destructive)" },
]

const recentEvents = [
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
    status: "pending" as const,
  },
  {
    id: 4,
    name: "AI Symposium",
    department: "Computer Science",
    date: "Mar 28, 2026",
    status: "rejected" as const,
  },
]

const recentRequests = [
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
]

const chartConfig = {
  events: {
    label: "Events",
    color: "var(--color-primary)",
  },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here is an overview of the system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Events"
          value={85}
          description="across all departments"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Pending Requests"
          value={30}
          description="awaiting approval"
          icon={Clock}
          iconClassName="bg-warning/10 text-warning-foreground"
        />
        <StatCard
          title="Approved Requests"
          value={45}
          description="this month"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          iconClassName="bg-accent/10 text-accent"
        />
        <StatCard
          title="Rejected Requests"
          value={10}
          description="need revision"
          icon={XCircle}
          iconClassName="bg-destructive/10 text-destructive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Events by Department</CardTitle>
            <CardDescription>
              Number of events per department this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={departmentData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={50}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="events"
                  fill="var(--color-primary)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Status Distribution</CardTitle>
            <CardDescription>
              Overview of request statuses this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest events across departments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/events" className="gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.department} • {event.date}
                    </p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Latest requests submitted</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/requests" className="gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{request.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.event} • {request.date}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

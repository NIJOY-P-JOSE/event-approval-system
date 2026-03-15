"use client"

import {
  Building2,
  Calendar,
  CheckCircle,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const activityData = [
  { date: "Jan", events: 12, approvals: 10 },
  { date: "Feb", events: 18, approvals: 15 },
  { date: "Mar", events: 24, approvals: 22 },
  { date: "Apr", events: 15, approvals: 14 },
  { date: "May", events: 20, approvals: 18 },
  { date: "Jun", events: 28, approvals: 25 },
]

const departmentStats = [
  { name: "Computer Science", events: 24, approved: 20, pending: 3, rejected: 1 },
  { name: "Electronics", events: 18, approved: 15, pending: 2, rejected: 1 },
  { name: "Mechanical", events: 15, approved: 12, pending: 2, rejected: 1 },
  { name: "Civil", events: 12, approved: 10, pending: 1, rejected: 1 },
  { name: "Electrical", events: 10, approved: 8, pending: 1, rejected: 1 },
  { name: "Information Technology", events: 8, approved: 7, pending: 1, rejected: 0 },
]

const chartConfig = {
  events: {
    label: "Events",
    color: "var(--color-primary)",
  },
  approvals: {
    label: "Approvals",
    color: "var(--color-accent)",
  },
}

export default function ReportsPage() {
  const totalEvents = departmentStats.reduce((sum, d) => sum + d.events, 0)
  const totalApproved = departmentStats.reduce((sum, d) => sum + d.approved, 0)
  const totalPending = departmentStats.reduce((sum, d) => sum + d.pending, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard / Reports
        </h1>
        <p className="text-muted-foreground">
          System overview and analytics for Techfest heads
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Departments"
          value={departmentStats.length}
          icon={Building2}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Total Events"
          value={totalEvents}
          description="this semester"
          icon={Calendar}
          trend={{ value: 15, isPositive: true }}
          iconClassName="bg-secondary/10 text-secondary"
        />
        <StatCard
          title="Pending Approvals"
          value={totalPending}
          description="awaiting action"
          icon={FileText}
          iconClassName="bg-warning/10 text-warning-foreground"
        />
        <StatCard
          title="Approval Rate"
          value={`${Math.round((totalApproved / totalEvents) * 100)}%`}
          description="events approved"
          icon={CheckCircle}
          trend={{ value: 5, isPositive: true }}
          iconClassName="bg-accent/10 text-accent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>
              Monthly events and approvals trend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="approvals"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-accent)", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Events Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Approvals</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Events by Department</CardTitle>
            <CardDescription>
              Distribution across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={departmentStats} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={100}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(value) => value.split(" ")[0]}
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
      </div>

      {/* Department Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Statistics</CardTitle>
          <CardDescription>
            Detailed breakdown of events by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Total Events</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Approved</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Pending</TableHead>
                <TableHead className="text-center hidden md:table-cell">Rejected</TableHead>
                <TableHead className="hidden lg:table-cell">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentStats.map((dept) => (
                <TableRow key={dept.name}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell className="text-center">{dept.events}</TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <span className="text-accent">{dept.approved}</span>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <span className="text-warning-foreground">{dept.pending}</span>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    <span className="text-destructive">{dept.rejected}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(dept.approved / dept.events) * 100}
                        className="h-2 w-24"
                      />
                      <span className="text-sm text-muted-foreground">
                        {Math.round((dept.approved / dept.events) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Most Active Dept</p>
                <p className="font-semibold">Computer Science</p>
                <p className="text-sm text-accent">24 events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Approval Rate</p>
                <p className="font-semibold">Information Technology</p>
                <p className="text-sm text-accent">87.5% approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coordinators</p>
                <p className="font-semibold">19 Faculty</p>
                <p className="text-sm text-muted-foreground">45 Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

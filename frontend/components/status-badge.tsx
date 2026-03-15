import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "pending" | "approved" | "rejected" | "in-progress"

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning-foreground border-warning/30 hover:bg-warning/20",
  },
  approved: {
    label: "Approved",
    className: "bg-accent/10 text-accent-foreground border-accent/30 hover:bg-accent/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}

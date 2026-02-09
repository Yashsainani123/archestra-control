import { useQuery } from "@tanstack/react-query";
import { getAuditLog, type Audit_Log_Event } from "@/services/serviceApi";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusColor: Record<string, string> = {
  success: "text-success-val",
  warning: "text-signal",
  failed: "text-threat",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } };

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function AuditLogDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ["audit-log"], queryFn: getAuditLog });

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-8" />)}
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground text-sm mt-1">Immutable record of all agent activity</p>
      </motion.div>

      <motion.div variants={item} className="glass-panel glow-border rounded-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
          <Terminal className="h-4 w-4 text-cyber" />
          <span className="text-xs font-mono text-muted-foreground">archestra-nexus:~$ tail -f /var/log/agent-activity.log</span>
          <div className="ml-auto flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          </div>
        </div>

        {/* Log Entries */}
        <div className="p-4 max-h-[600px] overflow-y-auto bg-background/50">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
            {data.map((log) => (
              <motion.div key={log.id} variants={item} className="terminal-line flex items-start gap-2 py-1.5 px-2 rounded hover:bg-accent/30 transition-colors">
                <span className="text-muted-foreground shrink-0">[{formatTime(log.timestamp)}]</span>
                <span className="text-cyber shrink-0">{log.agentName}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-foreground">
                  {log.action}
                </span>
                <span className="text-muted-foreground">Tool:</span>
                <span className="text-foreground">{log.tool}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">STATUS:</span>
                <span className={`font-semibold ${statusColor[log.status]}`}>
                  {log.status.toUpperCase()}
                </span>
                <span className="text-muted-foreground ml-auto shrink-0">{log.duration}ms</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Blinking cursor */}
        <div className="px-6 py-2 border-t border-border/30">
          <span className="terminal-line text-muted-foreground">
            <span className="animate-pulse-glow">█</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

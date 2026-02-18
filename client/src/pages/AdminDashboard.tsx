import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Mail, Phone, Building2, User, Calendar, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { data: consultations = [], isLoading } = trpc.consultation.list.useQuery();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="text-red-800">
              <p>You do not have permission to access the admin dashboard. Only administrators can view consultation requests.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-white sticky top-0 z-40">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-foreground/70 mt-1">Manage consultation requests</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{consultations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">New Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {consultations.filter(c => c.status === 'new').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">Contacted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {consultations.filter(c => c.status === 'contacted').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultation Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Consultation Requests</CardTitle>
            <CardDescription>All consultation submissions from your website</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-foreground/70">Loading consultation requests...</div>
              </div>
            ) : consultations.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground/70">No consultation requests yet</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="border border-border rounded-lg p-6 hover:bg-foreground/5 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-primary">{consultation.fullName}</h3>
                          <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                            <Building2 className="w-4 h-4" />
                            {consultation.company}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          consultation.status === 'new'
                            ? 'default'
                            : consultation.status === 'contacted'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-foreground/50" />
                        <a href={`mailto:${consultation.email}`} className="text-accent hover:underline">
                          {consultation.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-foreground/50" />
                        <a href={`tel:${consultation.phone}`} className="text-accent hover:underline">
                          {consultation.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground/70 mb-2">Message:</p>
                      <p className="text-sm text-foreground/80 bg-foreground/5 p-3 rounded-lg whitespace-pre-wrap">
                        {consultation.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-foreground/50">
                        <Calendar className="w-4 h-4" />
                        {formatDistanceToNow(new Date(consultation.createdAt), { addSuffix: true })}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `mailto:${consultation.email}`}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

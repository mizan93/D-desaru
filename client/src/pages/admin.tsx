import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Inquiry } from "@shared/schema";
import { 
  CalendarIcon, 
  MailIcon, 
  PhoneIcon, 
  UserIcon,
  MessageSquareIcon,
  HomeIcon,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

export default function AdminPage() {
  const { data: inquiriesData, isLoading, error } = useQuery<{ success: boolean; inquiries: Inquiry[] }>({
    queryKey: ["/api/inquiries"],
  });

  const inquiries = inquiriesData?.inquiries || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading inquiries...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="text-center py-20">
            <p className="text-destructive">Error loading inquiries. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-admin-title">
              Guest Inquiries Admin
            </h1>
            <p className="text-muted-foreground mt-2" data-testid="text-admin-description">
              Manage and respond to guest inquiries for Mountain Retreat
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-to-site">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <MessageSquareIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-total-inquiries">{inquiries.length}</p>
                  <p className="text-sm text-muted-foreground">Total Inquiries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <CalendarIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-today-inquiries">
                    {inquiries.filter(inquiry => 
                      new Date(inquiry.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <HomeIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-with-dates">
                    {inquiries.filter(inquiry => 
                      inquiry.checkIn && inquiry.checkOut
                    ).length}
                  </p>
                  <p className="text-sm text-muted-foreground">With Dates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold" data-testid="text-inquiries-list">Recent Inquiries</h2>
          
          {inquiries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquareIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No inquiries yet</h3>
                <p className="text-muted-foreground">
                  Guest inquiries will appear here when people submit the contact form on your website.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {inquiries.map((inquiry, index) => (
                <Card key={inquiry.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {inquiry.firstName.charAt(0)}{inquiry.lastName.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg" data-testid={`text-guest-name-${index}`}>
                            {inquiry.firstName} {inquiry.lastName}
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span data-testid={`text-inquiry-date-${index}`}>
                              {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" data-testid={`badge-inquiry-${index}`}>
                        New
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div>
                        <h4 className="font-semibold mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <a 
                              href={`mailto:${inquiry.email}`} 
                              className="text-primary hover:underline"
                              data-testid={`link-email-${index}`}
                            >
                              {inquiry.email}
                            </a>
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center text-sm">
                              <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a 
                                href={`tel:${inquiry.phone}`} 
                                className="text-primary hover:underline"
                                data-testid={`link-phone-${index}`}
                              >
                                {inquiry.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stay Information */}
                      <div>
                        <h4 className="font-semibold mb-3">Stay Information</h4>
                        <div className="space-y-2">
                          {inquiry.checkIn && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Check-in:</span>
                              <span className="ml-2 font-medium" data-testid={`text-checkin-${index}`}>
                                {new Date(inquiry.checkIn).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {inquiry.checkOut && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Check-out:</span>
                              <span className="ml-2 font-medium" data-testid={`text-checkout-${index}`}>
                                {new Date(inquiry.checkOut).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {inquiry.checkIn && inquiry.checkOut && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="ml-2 font-medium" data-testid={`text-duration-${index}`}>
                                {Math.ceil(
                                  (new Date(inquiry.checkOut).getTime() - new Date(inquiry.checkIn).getTime()) / 
                                  (1000 * 60 * 60 * 24)
                                )} nights
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Message</h4>
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm leading-relaxed" data-testid={`text-message-${index}`}>
                          {inquiry.message}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-6">
                      <Button 
                        size="sm" 
                        asChild
                        data-testid={`button-email-${index}`}
                      >
                        <a href={`mailto:${inquiry.email}?subject=Re: Your inquiry for Mountain Retreat&body=Hi ${inquiry.firstName},%0A%0AThank you for your interest in Mountain Retreat!%0A%0A`}>
                          <MailIcon className="h-4 w-4 mr-2" />
                          Reply via Email
                        </a>
                      </Button>
                      {inquiry.phone && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                          data-testid={`button-call-${index}`}
                        >
                          <a href={`tel:${inquiry.phone}`}>
                            <PhoneIcon className="h-4 w-4 mr-2" />
                            Call
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
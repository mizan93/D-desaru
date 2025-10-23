import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import FloatingBackToTop from "@/components/floating-back-to-top";
import { 
  Mountain, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Bath, 
  Bed, 
  Home, 
  ShowerHead,
  MapPin,
  Phone,
  Mail,
  Clock,
  Key,
  AlertTriangle,
  Wrench,
  Menu,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Palette,
  Drama,
  Store
} from "lucide-react";
// import background from '../image/Desaru-Coast-Malaysia.jpg';
import image from '../image/images';
import images from "../image/images";

export default function HomePage() {
  const { toast } = useToast();
  const [selectedDates, setSelectedDates] = useState({ checkIn: "2024-12-15", checkOut: "2024-12-17" });

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      message: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 2 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiryMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary flex items-center">
              <img src={image.logo} alt="D'Desaru logo" className="mr-2 h-20 w-20 object-cover rounded-full" />
              D'Desaru
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("overview")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-overview"
              >
                Overview
              </button>
              <button 
                onClick={() => scrollToSection("gallery")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-gallery"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection("facilities")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-facilities"
              >
                Facilities
              </button>
              <button 
                onClick={() => scrollToSection("location")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-location"
              >
                Location
              </button>
              <button 
                onClick={() => scrollToSection("reviews")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-reviews"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-secondary-foreground hover:text-primary transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center parallax" style={{backgroundImage: `url(${image.background})`}}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              The Beauty of Desaru Beach
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90" data-testid="text-hero-description">
              Experience unparalleled comfort in our stunning beach. Perfect for families, couples, and adventurers seeking tranquility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg font-semibold px-8 py-4" data-testid="button-book-now">
                Book Now - RM299/night
              </Button>
              <Button variant="outline" size="lg" className="text-lg font-semibold px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-foreground" data-testid="button-virtual-tour">
                Take Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Manual - Top */}
      <section id="facilities" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-facilities-title">Property Facilities Guide</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-facilities-description">Everything you need to know about our premium amenities and services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wifi className="text-primary text-xl h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid="text-wifi-title">High-Speed WiFi</h3>
                <p className="text-muted-foreground" data-testid="text-wifi-description">Complimentary fiber-optic internet throughout the property. Perfect for remote work and streaming.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShowerHead className="text-primary text-xl h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid="text-hottub-title">Private Hot Tub</h3>
                <p className="text-muted-foreground" data-testid="text-hottub-description">Relax in our heated outdoor hot tub with panoramic mountain views. Available 24/7.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="text-primary text-xl h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid="text-kitchen-title">Gourmet Kitchen</h3>
                <p className="text-muted-foreground" data-testid="text-kitchen-description">Fully equipped kitchen with premium appliances, perfect for preparing meals with local ingredients.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Car className="text-primary text-xl h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid="text-parking-title">Free Parking</h3>
                <p className="text-muted-foreground" data-testid="text-parking-description">Secure parking for up to 3 vehicles. EV charging station available upon request.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section id="overview" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-overview-title">Your Perfect Mountain Getaway</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-overview-description">
                Nestled in the heart of the Rocky Mountains, our luxury retreat offers an unparalleled blend of rustic charm and modern sophistication. With panoramic mountain views, premium amenities, and access to world-class outdoor activities, this is your gateway to adventure and relaxation.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <Bed className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold" data-testid="text-bedrooms">4 Bedrooms</div>
                    <div className="text-sm text-muted-foreground">Sleeps up to 8</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <Bath className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold" data-testid="text-bathrooms">3 Bathrooms</div>
                    <div className="text-sm text-muted-foreground">All en-suite</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <Home className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold" data-testid="text-sqft">3,200 sq ft</div>
                    <div className="text-sm text-muted-foreground">Spacious layout</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <Star className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold" data-testid="text-rating">5-Star Rating</div>
                    <div className="text-sm text-muted-foreground">148 reviews</div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-accent-foreground mb-2" data-testid="text-price">Starting at RM299/night</h3>
                  <p className="text-muted-foreground mb-4">Includes all amenities, cleaning service, and concierge support</p>
                  <Button data-testid="button-check-availability">Check Availability</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <img 
                src={image.livinghall}
                alt="Luxury living room with mountain views" 
                className="rounded-xl shadow-lg w-full h-auto gallery-image" 
                data-testid="img-overview-main"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-gallery-title">Property Gallery</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-gallery-description">Explore every corner of your mountain retreat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: image.livinghall, alt: "Modern living room", label: "Living Room" },
              { src: image.playground, alt: "Elegant living space", label: "Entertainment Area" },
              { src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Bright modern living room", label: "Open Living Space" },
              { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Minimalist living room", label: "Lounge Area" },
              { src: image.bedroom, alt: "Serene guest bedroom", label: "Guest Bedroom" },
              { src: image.bedroom2, alt: "Bedroom with mountain views", label: "Mountain View Room" },
              { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Modern gourmet kitchen", label: "Gourmet Kitchen" },
              { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Luxury kitchen design", label: "Chef's Kitchen" },
              { src: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Outdoor patio with mountain views", label: "Outdoor Patio" },
              { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", alt: "Garden outdoor space", label: "Garden Area" },
            ].map((image, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover rounded-lg gallery-image" 
                  data-testid={`img-gallery-${index}`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold" data-testid={`text-gallery-label-${index}`}>{image.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions - Tabbed Interface */}
      <section id="location" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-attractions-title">Explore the Area</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-attractions-description">Discover amazing attractions and activities nearby</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="outdoor" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="outdoor" data-testid="tab-outdoor">Outdoor Activities</TabsTrigger>
                <TabsTrigger value="dining" data-testid="tab-dining">Dining & Entertainment</TabsTrigger>
                <TabsTrigger value="landmarks" data-testid="tab-landmarks">Local Landmarks</TabsTrigger>
                <TabsTrigger value="culture" data-testid="tab-culture">Arts & Culture</TabsTrigger>
              </TabsList>
              
              <TabsContent value="outdoor" className="mt-6">
                <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      image: image.waterpark,
                      title: "Adventure Waterpark Desaru Coast",
                      distance: "5.2 km • Moderate",
                      description: "Breathtaking Amazing Roller Coster"
                    },
                    { 
                      image: image.crocfarm,
                      title: "Teluk Sengat Crocodile Farm",
                      distance: "12 minutes drive",
                      description: "World-class skiing and snowboarding"
                    },
                    { 
                      image: image.tour,
                      title: "Desaru Mangrove Tour",
                      distance: "8 minutes drive",
                      description: "Kayaking, fishing, and swimming"
                    },
                    { 
                      image: "https://images.unsplash.com/photo-1464822759844-d150baec0d56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
                      title: "Eagle's Peak",
                      distance: "15 minutes hike",
                      description: "Historic lookout point and wildlife viewing"
                    },
                    { 
                      image: image.background,
                      title: "Tanjung Balau",
                      distance: "15 minutes hike",
                      description: "Historic lookout point and wildlife viewing"
                    }
                  ].map((activity, index) => (
                    <Card key={index} className="overflow-hidden shadow-lg">
                      <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" data-testid={`img-outdoor-${index}`} />
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2" data-testid={`text-outdoor-title-${index}`}>{activity.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-outdoor-distance-${index}`}>{activity.distance}</p>
                        <p className="text-sm" data-testid={`text-outdoor-description-${index}`}>{activity.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="dining" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Utensils, title: "Mountain View Bistro", type: "Fine dining • 5 minutes", description: "Farm-to-table cuisine with panoramic views" },
                    { icon: ShowerHead, title: "Alpine Brewery", type: "Craft beer • 8 minutes", description: "Local craft beers and pub fare" },
                    { icon: Star, title: "The Lodge Bar", type: "Live music • 10 minutes", description: "Cozy atmosphere with local musicians" }
                  ].map((venue, index) => (
                    <Card key={index} className="p-6 shadow-lg">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <venue.icon className="text-accent h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2" data-testid={`text-dining-title-${index}`}>{venue.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-dining-type-${index}`}>{venue.type}</p>
                      <p className="text-sm" data-testid={`text-dining-description-${index}`}>{venue.description}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="landmarks" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4" data-testid="text-historic-landmarks">Historic Landmarks</h3>
                    <div className="space-y-4">
                      {[
                        { title: "Old Mining Town", description: "Historic gold rush settlement - 20 minutes drive" },
                        { title: "Pioneer Museum", description: "Local history and artifacts - 15 minutes drive" },
                        { title: "Heritage Bridge", description: "19th century railway bridge - 12 minutes drive" }
                      ].map((landmark, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold" data-testid={`text-historic-title-${index}`}>{landmark.title}</h4>
                            <p className="text-sm text-muted-foreground" data-testid={`text-historic-description-${index}`}>{landmark.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4" data-testid="text-natural-landmarks">Natural Landmarks</h3>
                    <div className="space-y-4">
                      {[
                        { title: "Thunder Falls", description: "150ft waterfall - 25 minutes hike" },
                        { title: "Devil's Canyon", description: "Dramatic rock formations - 30 minutes drive" },
                        { title: "Sunrise Point", description: "Best sunrise views - 10 minutes hike" }
                      ].map((landmark, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold" data-testid={`text-natural-title-${index}`}>{landmark.title}</h4>
                            <p className="text-sm text-muted-foreground" data-testid={`text-natural-description-${index}`}>{landmark.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="culture" className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Palette, title: "Art Gallery District", description: "Local artists and rotating exhibitions" },
                    { icon: Drama, title: "Community Theater", description: "Live performances and cultural events" },
                    { icon: Store, title: "Artisan Market", description: "Local crafts and handmade goods" }
                  ].map((venue, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <venue.icon className="text-primary h-8 w-8" />
                      </div>
                      <h3 className="font-semibold mb-2" data-testid={`text-culture-title-${index}`}>{venue.title}</h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-culture-description-${index}`}>{venue.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-booking-title">Check Availability</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-booking-description">Select your preferred dates</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6" data-testid="text-calendar-title">Booking Calendar</h3>
                    <div className="bg-muted p-6 rounded-lg">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold" data-testid="text-calendar-month">December 2024</h4>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                          <div key={day} className="p-2 font-semibold" data-testid={`text-day-${day.toLowerCase()}`}>{day}</div>
                        ))}
                        
                        {/* Calendar days */}
                        {Array.from({ length: 31 }, (_, i) => {
                          const day = i + 1;
                          const isSelected = day >= 15 && day <= 17;
                          const isUnavailable = day >= 22 && day <= 25;
                          
                          return (
                            <div 
                              key={day} 
                              className={`p-2 rounded cursor-pointer ${
                                isSelected 
                                  ? "bg-primary text-primary-foreground" 
                                  : isUnavailable 
                                    ? "bg-destructive/20 text-destructive cursor-not-allowed"
                                    : "hover:bg-primary hover:text-primary-foreground"
                              }`}
                              data-testid={`calendar-day-${day}`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 text-xs space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                          <span>Selected dates</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-destructive/20 rounded mr-2"></div>
                          <span>Unavailable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-6" data-testid="text-booking-summary">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Check-in:</span>
                        <span className="font-semibold" data-testid="text-checkin-date">Dec 15, 2024</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Check-out:</span>
                        <span className="font-semibold" data-testid="text-checkout-date">Dec 17, 2024</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Guests:</span>
                        <span className="font-semibold" data-testid="text-guests">4 adults</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Nights:</span>
                        <span className="font-semibold" data-testid="text-nights">2</span>
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <div className="flex justify-between">
                          <span>$299 × 2 nights</span>
                          <span data-testid="text-subtotal">$598</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cleaning fee</span>
                          <span data-testid="text-cleaning-fee">$75</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee</span>
                          <span data-testid="text-service-fee">$45</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                          <span>Total</span>
                          <span data-testid="text-total">$718</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-6" size="lg" data-testid="button-reserve">
                        Reserve Now
                      </Button>
                      
                      <p className="text-center text-sm text-muted-foreground">You won't be charged yet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials */}
      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-reviews-title">Guest Reviews</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-accent text-2xl mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <span className="text-xl font-semibold" data-testid="text-rating-score">4.9 out of 5</span>
              <span className="text-muted-foreground ml-2" data-testid="text-review-count">(148 reviews)</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                initials: "SM", 
                name: "Sarah Martinez", 
                date: "December 2024",
                review: "Absolutely stunning property! The mountain views are breathtaking and the amenities are top-notch. Perfect for a romantic getaway. The hot tub under the stars was magical."
              },
              { 
                initials: "RJ", 
                name: "Robert Johnson", 
                date: "November 2024",
                review: "Our family had an incredible week here. The kids loved the space and we adults appreciated the luxury touches. Great location for hiking and the kitchen was perfect for family meals."
              },
              { 
                initials: "EW", 
                name: "Emily Watson", 
                date: "October 2024",
                review: "Exceeded all expectations! The property is even more beautiful in person. Host was incredibly responsive and helpful. Already planning our return visit for next year."
              }
            ].map((review, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-3">
                      {review.initials}
                    </div>
                    <div>
                      <div className="font-semibold" data-testid={`text-reviewer-name-${index}`}>{review.name}</div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-review-date-${index}`}>{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-accent mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground" data-testid={`text-review-content-${index}`}>{review.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">Get in Touch</h2>
              <p className="text-xl text-muted-foreground" data-testid="text-contact-description">Have questions? We'd love to hear from you.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6" data-testid="text-contact-info">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-muted-foreground" data-testid="text-address">6, Kemboja 7, Taman Sri Penawar<br />Desaru, 81930 Johor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground" data-testid="text-phone">+60142770607</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground" data-testid="text-email">ndeprise.16@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-muted-foreground" data-testid="text-response-time">Usually within 2 hours<br />Available 24/7 for emergencies</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6" data-testid="text-contact-form">Send us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} data-testid="input-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 (555) 123-4567" {...field} value={field.value ?? ""} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Preferred Dates</FormLabel>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <FormField
                            control={form.control}
                            name="checkIn"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input type="date" {...field} value={field.value ?? ""} data-testid="input-check-in" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="checkOut"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input type="date" {...field} value={field.value ?? ""} data-testid="input-check-out" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={4} 
                                placeholder="Tell us about your stay preferences, special requests, or any questions you have..." 
                                {...field} 
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={createInquiryMutation.isPending}
                        data-testid="button-send-message"
                      >
                        {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Manual - Bottom */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-manual-title">Property Manual</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-manual-description">Important information for your stay</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Key className="text-primary mr-3 h-6 w-6" />
                  Check-in & Check-out
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p data-testid="text-checkin-time"><strong>Check-in:</strong> 4:00 PM - 10:00 PM</p>
                  <p data-testid="text-checkout-time"><strong>Check-out:</strong> 11:00 AM</p>
                  <p data-testid="text-self-checkin"><strong>Self Check-in:</strong> Keypad entry (code provided)</p>
                  <p data-testid="text-early-late"><strong>Early/Late:</strong> Available upon request</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Home className="text-primary mr-3 h-6 w-6" />
                  House Rules
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p data-testid="text-max-guests"><strong>Guests:</strong> Maximum 8 people</p>
                  <p data-testid="text-smoking"><strong>Smoking:</strong> Strictly prohibited</p>
                  <p data-testid="text-pets"><strong>Pets:</strong> Welcome ($50 cleaning fee)</p>
                  <p data-testid="text-parties"><strong>Parties:</strong> No large gatherings</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="text-primary mr-3 h-6 w-6" />
                  Safety & Emergency
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p data-testid="text-emergency"><strong>Emergency:</strong> Call 911</p>
                  <p data-testid="text-fire-extinguisher"><strong>Fire Extinguisher:</strong> Kitchen & each bedroom</p>
                  <p data-testid="text-first-aid"><strong>First Aid:</strong> Master bathroom cabinet</p>
                  <p data-testid="text-property-manager"><strong>Property Manager:</strong> +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Wrench className="text-primary mr-3 h-6 w-6" />
                  Appliances & Equipment
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p data-testid="text-wifi-password"><strong>WiFi Password:</strong> MountainView2024</p>
                  <p data-testid="text-hottub-controls"><strong>Hot Tub:</strong> Controls in utility room</p>
                  <p data-testid="text-fireplace"><strong>Fireplace:</strong> Remote on mantle</p>
                  <p data-testid="text-tv-sound"><strong>TV/Sound:</strong> Instructions in living room</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4 flex items-center">
                {/* img src={image.logo} className="mr-2 h-20 w-20 object-cover rounded-full" */}
                <img src={image.logo} className="mr-2 h-20 w-20" />
                D'Desaru
              </div>
              <p className="text-background/80 mb-4" data-testid="text-footer-description">Experience luxury in the heart of the Rocky Mountains.</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/ahmad.hamizan.9828" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-colors" data-testid="link-facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/hamizan99?igsh=anNyNXBkYWMyZmVj" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-colors" data-testid="link-instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-background/60 hover:text-primary transition-colors" data-testid="link-twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://wa.me/60142770607" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-colors" data-testid="link-whatsapp">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" data-testid="text-quick-links">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection("overview")} className="block text-background/80 hover:text-primary transition-colors text-left" data-testid="link-footer-overview">Overview</button>
                <button onClick={() => scrollToSection("gallery")} className="block text-background/80 hover:text-primary transition-colors text-left" data-testid="link-footer-gallery">Gallery</button>
                <button onClick={() => scrollToSection("location")} className="block text-background/80 hover:text-primary transition-colors text-left" data-testid="link-footer-location">Location</button>
                <button onClick={() => scrollToSection("reviews")} className="block text-background/80 hover:text-primary transition-colors text-left" data-testid="link-footer-reviews">Reviews</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" data-testid="text-support">Support</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection("contact")} className="block text-background/80 hover:text-primary transition-colors text-left" data-testid="link-footer-contact">Contact Us</button>
                <a href="#" className="block text-background/80 hover:text-primary transition-colors" data-testid="link-footer-faq">FAQ</a>
                <a href="#" className="block text-background/80 hover:text-primary transition-colors" data-testid="link-footer-cancellation">Cancellation Policy</a>
                <a href="#" className="block text-background/80 hover:text-primary transition-colors" data-testid="link-footer-terms">Terms of Service</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" data-testid="text-contact-info-footer">Contact Info</h4>
              <div className="space-y-2 text-background/80">
                <p data-testid="text-footer-address">6, Kemboja 7, Taman Sri Penawar</p>
                <p data-testid="text-footer-city">Desaru, 81930 Johor</p>
                <p data-testid="text-footer-phone">+60142770607</p>
                <p data-testid="text-footer-email">ndeprise.16@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <div className="flex justify-between items-center">
              <p className="text-background/60" data-testid="text-copyright">&copy; 2025 D'Desaru. All rights reserved.</p>
              <button 
                onClick={() => window.location.href = '/admin'}
                className="text-background/40 hover:text-background/60 text-xs transition-colors"
                data-testid="link-admin"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      <FloatingBackToTop />
    </>
  );
}

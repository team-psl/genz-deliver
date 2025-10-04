"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I calculate delivery costs?",
    answer:
      "Use our smart delivery calculator above to get instant quotes. Simply select your pickup and destination cities, choose delivery speed, package type, and weight. Our system considers distance, delivery options, and package specifications to provide accurate pricing.",
  },
  {
    id: 2,
    question: "What are your delivery time options?",
    answer:
      "We offer three delivery speeds: Standard (2-3 business days), Express (next business day), and Same Day (within 6 hours). Delivery times may vary based on distance and location accessibility.",
  },
  {
    id: 3,
    question: "How can I track my parcel?",
    answer:
      "Once your parcel is booked, you'll receive a tracking number via SMS and email. Use our track order feature on the homepage or call our customer service for real-time updates on your delivery status.",
  },
  {
    id: 4,
    question: "What items can I send?",
    answer:
      "We accept documents, regular parcels, fragile items, and electronics. We handle packages from 0.5kg to 50kg. Prohibited items include hazardous materials, perishable goods, illegal items, and valuable items without proper insurance.",
  },
  {
    id: 5,
    question: "Do you provide insurance coverage?",
    answer:
      "Yes, we offer insurance coverage for valuable items. Basic coverage is included for all deliveries up to ৳5,000. Additional insurance can be purchased for higher-value items at booking.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on pickup, mobile banking (bKash, Nagad, Rocket), bank transfers, and major credit/debit cards. Payment can be made online during booking or to our delivery agent.",
  },
  {
    id: 7,
    question: "Can I schedule a pickup?",
    answer:
      "Yes, you can schedule pickups during booking. We offer same-day pickup for orders placed before 2 PM, or you can schedule for the next available business day. Emergency pickup services are also available.",
  },
  {
    id: 8,
    question: "What if my parcel is damaged or lost?",
    answer:
      "We take full responsibility for parcels in our care. If your parcel is damaged or lost, contact our customer service immediately. We'll investigate and provide compensation based on our terms and any insurance coverage.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq-section"
      className="py-24 bg-gradient-to-br from-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Got Questions? We've Got{" "}
            <span className="text-primary">Answers</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our{" "}
            <span className="text-primary font-medium">
              {" "}
              Genz Deliver services
            </span>
            , pricing, and delivery options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border border-border/50 rounded-lg bg-background/80 backdrop-blur-sm px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-6 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto backdrop-blur-sm">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                24/7 Support Available
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Help? We're Here for You
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find what you're looking for? Our dedicated customer
                support team is ready to assist you with any questions or
                concerns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:09610003030"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[200px] justify-center"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">Call Now</div>
                    <div className="font-bold">09610 003030</div>
                  </div>
                </a>

                <a
                  href="mailto:support@genzdeliver.com"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border border-primary/20 text-foreground rounded-2xl hover:bg-white hover:border-primary/40 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 min-w-[200px] justify-center"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">
                      Email Us
                    </div>
                    <div className="font-bold">Get Support</div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/10">
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Average response time: 2 minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    Available in Bengali & English
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

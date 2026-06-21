import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import Button from "../components/Button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "garv.agarwal2409@gmail.com",
    href : "#"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7003303044",
    href : "#"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, India",
    href: "#",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setSubmitStatus({
      type: null,
      message: "",
    });

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(
        `${apiBaseUrl}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      setSubmitStatus({
        type: "success",
        message:
          data.message ||
          "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 relative bg-background text-foreground overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's build{" "}
            <span className="font-serif italic text-primary">
              something great.
            </span>
          </h2>

          <p className="text-muted-foreground">
            Have a project in mind? I'd love to hear
            about it. Send me a message and let's
            discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass p-6 md:p-8 rounded-3xl border border-primary/20">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  placeholder="Your Name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  placeholder="your@email.com"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  placeholder="Tell me about your project..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              {/* Status */}
              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.type ===
                  "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}

                  <p className="text-sm">
                    {submitStatus.message}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map(
                  (item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>

                        <div className="font-medium">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-3xl p-6 md:p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

                <span className="font-medium">
                  Available for Opportunities
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Currently pursuing B.Tech in
                Computer Science & Engineering at
                SVNIT Surat. Open to internships,
                collaborations, hackathons, and
                exciting software development
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import { MessageCircle, Globe, Users, Zap } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-base-100 via-neutral to-base-100 relative overflow-hidden"
      data-theme="dark"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Logo/Brand area */}
        <div className="mb-8 flex items-center space-x-3">
          <div className="btn btn-primary btn-circle btn-lg">
            <MessageCircle className="w-8 h-8" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ChatLingo
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-base-content">Master Languages</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Through Conversation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-base-content/70 mb-12 max-w-3xl leading-relaxed">
          Connect with native speakers worldwide. Practice real conversations,
          get instant feedback, and accelerate your language learning journey
          with AI-powered chat sessions.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="badge badge-lg bg-base-300 border-base-300 text-base-content flex items-center space-x-2 px-4 py-3">
            <Globe className="w-5 h-5 text-primary" />
            <span>50+ Languages</span>
          </div>
          <div className="badge badge-lg bg-base-300 border-base-300 text-base-content flex items-center space-x-2 px-4 py-3">
            <Users className="w-5 h-5 text-secondary" />
            <span>Native Speakers</span>
          </div>
          <div className="badge badge-lg bg-base-300 border-base-300 text-base-content flex items-center space-x-2 px-4 py-3">
            <Zap className="w-5 h-5 text-accent" />
            <span>AI-Powered</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/register"
            className="btn btn-primary btn-lg px-8 text-lg font-semibold shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Start Learning Free
          </Link>
          <Link
            href="/login"
            className="btn btn-outline btn-lg px-8 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Social proof */}
        <p className="text-base-content/50 text-sm">
          Join 100,000+ learners already improving their language skills
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </div>
  );
};

export default Home;

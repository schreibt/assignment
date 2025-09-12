import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Play, Download, Volume2, Bot, Music, Mic, Globe, Copy, Headphones } from "lucide-react";

// Helper array for the features list for cleaner code
const features = [
  { name: "TEXT TO SPEECH", icon: Volume2, active: true },
  { name: "AGENTS", icon: Bot, active: false },
  { name: "MUSIC", icon: Music, active: false },
  { name: "SPEECH TO TEXT", icon: Mic, active: false },
  { name: "DUBBING", icon: Globe, active: false },
  { name: "VOICE CLONING", icon: Copy, active: false },
  { name: "ELEVENREADER", icon: Headphones, active: false },
];

export function ElevenLabsLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter">IIElevenLabs</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                <span>Creative Platform</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                <span>Agents Platform</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                <span>Developers</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Enterprise</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Log in</Button>
              <Button size="sm">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            The most realistic voice AI platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            AI voice models and products powering millions of developers, creators, and enterprises.
            From low-latency conversational agents to the leading AI voice generator for voiceovers
            and audiobooks.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="px-8">SIGN UP</Button>
            <Button size="lg" variant="outline" className="px-8">CONTACT SALES</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {features.map((feature) => (
            <Button
              key={feature.name}
              variant={feature.active ? "default" : "outline"}
              className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium ${
                feature.active ? '' : 'border bg-background hover:bg-muted'
              }`}
            >
              <feature.icon className="h-4 w-4" />
              <span>{feature.name}</span>
            </Button>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2
                        bg-gradient-to-t from-orange-300 via-pink-400 to-cyan-300
                        opacity-20 blur-3xl -z-10" />

          <Card className="shadow-lg">
            <CardContent className="px-6 py-6 md:px-8 md:py-8">
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <textarea
                    className="w-full min-h-[120px] bg-transparent border-0 focus:ring-0 resize-none text-base"
                    defaultValue={
                      `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`
                    }
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-blue-400 rounded-full" /><span>Samara</span><span className="text-xs text-muted-foreground">Narrate a story</span></Badge>
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-pink-400 rounded-full" /><span>2 speakers</span><span className="text-xs text-muted-foreground">Create a dialogue</span></Badge>
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-green-400 rounded-full" /><span>Announcer</span><span className="text-xs text-muted-foreground">Voiceover a game</span></Badge>
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-purple-400 rounded-full" /><span>Sergeant</span><span className="text-xs text-muted-foreground">Play a drill sergeant</span></Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-cyan-400 rounded-full" /><span>Spuds</span><span className="text-xs text-muted-foreground">Recount an old story</span></Badge>
                    <Badge variant="secondary" className="cursor-pointer flex items-center space-x-2 px-3 py-1.5"><div className="w-2 h-2 bg-red-400 rounded-full" /><span>Jessica</span><span className="text-xs text-muted-foreground">Provide customer support</span></Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm font-medium">ENGLISH</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button size="lg" className="flex items-center space-x-2 px-6">
                      <Play className="h-5 w-5" />
                      <span>PLAY</span>
                    </Button>
                    <Button size="lg" variant="ghost">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Powered by Eleven v3 (alpha)
        </p>

      </main>
    </div>
  );
}
'use client';

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, TrendingUp, Users, Calendar, Zap, Star,
  ChevronRight, Search, Crown, Activity, Target,
  Flame, ArrowUp, ArrowDown, Minus, Plus, Check, Sparkles,
  BarChart3, Home, Volleyball, X, LogOut, User as UserIcon,
  Shield, GitCompareArrows, Award, BookOpen, LogIn, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TEAMS, TEAM_ABBRS } from "@/lib/ipl/teams";
import { PLAYERS, Player, getPlayersByRole, PlayerRole } from "@/lib/ipl/players";
import {
  MATCHES, UPCOMING_MATCHES, STANDINGS, FANTASY_LEADERBOARD,
  IMPACT_PLAYERS, POINT_SYSTEM, FantasyTeam, IPL_2027_STATUS
} from "@/lib/ipl/matches";
import { useAuth, UserTeam } from "@/lib/ipl/auth";

const ROLE_ORDER: PlayerRole[] = ["Wicketkeeper", "Batsman", "All-Rounder", "Bowler"];
const ROLE_COLORS: Record<PlayerRole, string> = {
  "Batsman": "bg-amber-100 text-amber-700 border-amber-200",
  "Bowler": "bg-rose-100 text-rose-700 border-rose-200",
  "All-Rounder": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Wicketkeeper": "bg-violet-100 text-violet-700 border-violet-200",
};
const ROLE_ICONS: Record<PlayerRole, string> = {
  "Batsman": "🏏",
  "Bowler": "⚾",
  "All-Rounder": "⭐",
  "Wicketkeeper": "🧤",
};

type Section = "home" | "team-builder" | "players" | "schedule" | "leaderboard" | "standings" | "contests" | "stats" | "my-team";

export default function IPLFantasyPage() {
  const [section, setSection] = useState<Section>("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [statsPlayer, setStatsPlayer] = useState<Player | null>(null);
  const { user, hasJoined, logout, savedTeam } = useAuth();
  const { toast } = useToast();

  const navItems: { id: Section; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "team-builder", label: "Build Team", icon: Volleyball },
    { id: "my-team", label: "My Team", icon: Shield },
    { id: "players", label: "Players", icon: Users },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "standings", label: "Standings", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "contests", label: "Contests", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        section={section}
        setSection={setSection}
        navItems={navItems}
        onAuthClick={() => setAuthOpen(true)}
        onCompareClick={() => setCompareOpen(true)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {section === "home" && <HomeSection key="home" setSection={setSection} onAuthClick={() => setAuthOpen(true)} onPlayerClick={setStatsPlayer} />}
          {section === "team-builder" && <TeamBuilder key="tb" onAuthClick={() => setAuthOpen(true)} onPlayerClick={setStatsPlayer} />}
          {section === "my-team" && <MyTeamSection key="my-team" setSection={setSection} onAuthClick={() => setAuthOpen(true)} onPlayerClick={setStatsPlayer} />}
          {section === "players" && <PlayersSection key="players" onPlayerClick={setStatsPlayer} onCompareClick={() => setCompareOpen(true)} />}
          {section === "schedule" && <ScheduleSection key="schedule" />}
          {section === "standings" && <StandingsSection key="standings" />}
          {section === "leaderboard" && <LeaderboardSection key="leaderboard" />}
          {section === "contests" && <ContestsSection key="contests" onAuthClick={() => setAuthOpen(true)} />}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />

      {/* Player Stats Modal */}
      <PlayerStatsModal player={statsPlayer} onClose={() => setStatsPlayer(null)} />

      {/* Compare Modal */}
      <CompareModal open={compareOpen} onOpenChange={setCompareOpen} />
    </div>
  );
}

// ============ HEADER ============
function Header({ section, setSection, navItems, onAuthClick, onCompareClick }: any) {
  const { user, hasJoined, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection("home")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Volleyball className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-lg tracking-tight bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                IPL FANTASY
              </div>
              <div className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wider uppercase">IPL 2026 Champions: RCB • 2027 Coming Soon</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  section === item.id ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onCompareClick} className="hidden md:flex rounded-full">
              <GitCompareArrows className="w-4 h-4 mr-1.5" /> Compare
            </Button>
            {hasJoined && user ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9 ring-2 ring-orange-200 cursor-pointer" onClick={() => setSection("my-team")}>
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-rose-500 text-white text-xs font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button onClick={logout} className="hidden sm:block text-xs text-slate-500 hover:text-rose-600 font-medium" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button size="sm" onClick={onAuthClick} className="rounded-full bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg">
                <LogIn className="w-4 h-4 mr-1.5" /> Join
              </Button>
            )}
            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile/tablet nav */}
        <div className={`lg:hidden ${menuOpen ? "block" : "hidden"} pb-3`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setMenuOpen(false); }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 justify-center ${
                  section === item.id ? "bg-slate-900 text-white" : "text-slate-600 bg-slate-100"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
            <button onClick={() => { onCompareClick(); setMenuOpen(false); }} className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 flex items-center gap-1.5 justify-center">
              <GitCompareArrows className="w-3.5 h-3.5" /> Compare
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============ HOME SECTION ============
function HomeSection({ setSection, onAuthClick, onPlayerClick }: any) {
  const { hasJoined } = useAuth();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/40 to-rose-50/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
                <Sparkles className="w-3 h-3 mr-1" /> IPL 2026 COMPLETED • CHAMPIONS: RCB 🏆
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                Build Your Dream
                <span className="block bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Cricket Dynasty
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                IPL 2026 season is complete. Build your fantasy XI from the 10 IPL teams, choose your Captain & Vice-Captain,
                and compete on the global leaderboard. <span className="font-semibold text-violet-600">IPL 2027 coming soon!</span>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => hasJoined ? setSection("team-builder") : onAuthClick()}
                  className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-xl hover:shadow-orange-500/30 text-white font-bold px-6 rounded-full"
                >
                  <Volleyball className="w-4 h-4 mr-2" /> {hasJoined ? "Build Your Team" : "Join Now — It's Free"}
                </Button>
                <Button size="lg" variant="outline" onClick={() => setSection("leaderboard")} className="rounded-full border-slate-300 font-bold">
                  <Trophy className="w-4 h-4 mr-2" /> View Leaderboard
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4">
                <HeroStat label="Players" value="180+" icon={Users} />
                <HeroStat label="Matches" value="74" icon={Calendar} />
                <HeroStat label="Teams" value="10" icon={Volleyball} />
                <HeroStat label="Fans" value="2.4K" icon={Trophy} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <FeaturedMatchCard />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">10 Teams • One Champion</h3>
            <Button variant="ghost" size="sm" onClick={() => setSection("standings")} className="text-xs">
              View Standings <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
            {TEAM_ABBRS.map((abbr) => {
              const team = TEAMS[abbr];
              return (
                <button key={abbr} className="group cursor-pointer" onClick={() => setSection("standings")}>
                  <div
                    className="aspect-square rounded-2xl flex items-center justify-center font-black text-white text-sm sm:text-base shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
                  >
                    {abbr}
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold text-slate-600 text-center truncate">{team.shortName}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard icon={Volleyball} title="Team Builder" desc="Create your fantasy XI" color="from-rose-500 to-orange-500" onClick={() => hasJoined ? setSection("team-builder") : onAuthClick()} />
          <QuickActionCard icon={Users} title="Player Stats" desc="Analyze 180+ players" color="from-emerald-500 to-teal-500" onClick={() => setSection("players")} />
          <QuickActionCard icon={Calendar} title="Fixtures" desc="All 74 matches schedule" color="from-violet-500 to-purple-500" onClick={() => setSection("schedule")} />
          <QuickActionCard icon={Trophy} title="Leaderboard" desc="See top fantasy teams" color="from-amber-500 to-yellow-500" onClick={() => setSection("leaderboard")} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <Badge className="mb-2 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
              <Flame className="w-3 h-3 mr-1" /> HOT PICKS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Top Performing Players</h2>
            <p className="text-sm text-slate-500 mt-1">Based on IPL 2026 season form & fantasy points</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSection("players")} className="hidden sm:flex">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {PLAYERS.filter((p) => p.isTopPick).sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 5).map((p, i) => (
            <TopPickCard key={p.id} player={p} rank={i + 1} onClick={() => onPlayerClick(p)} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <Badge className="mb-2 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">
                    <Activity className="w-3 h-3 mr-1" /> RECENT
                  </Badge>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Latest Results</h2>
                </div>
              </div>
              <div className="space-y-3">
                {MATCHES.filter((m) => m.isCompleted && (m.stage === "Final" || m.id === 71 || m.id === 73 || m.id === 72)).slice(0, 4).map((m) => (
                  <ResultRow key={m.id} match={m} />
                ))}
              </div>
            </div>
            <div>
              <Badge className="mb-2 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                <Crown className="w-3 h-3 mr-1" /> MATCH HEROES
              </Badge>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">Player of the Match</h2>
              <div className="space-y-3">
                {IMPACT_PLAYERS.slice(0, 4).map((ip, i) => (
                  <Card key={i} className="p-4 border-amber-200 bg-gradient-to-br from-amber-50 to-white cursor-pointer hover:shadow-md transition-all" onClick={() => {
                    const p = PLAYERS.find((pl) => pl.name === ip.playerName);
                    if (p) onPlayerClick(p);
                  }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: TEAMS[ip.team]?.primary }}>
                            {ip.team}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900">{ip.playerName}</div>
                            <div className="text-xs text-slate-500">{ip.role}</div>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">{ip.reason}</p>
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-xl font-black text-amber-600">{ip.points}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold">pts</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-800 p-8 sm:p-12 text-white">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-3 bg-white/20 text-white border-white/30 hover:bg-white/20">
                <Crown className="w-3 h-3 mr-1" /> IPL 2026 CHAMPIONS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Royal Challengers Bengaluru</h2>
              <p className="mt-2 text-white/80">Beat Punjab Kings by 6 runs in the Final at Narendra Modi Stadium, Ahmedabad</p>
              <p className="mt-2 text-sm text-white/70 font-mono">RCB 190/9 (20.0) | PBKS 184/7 (20.0)</p>
              <p className="mt-1 text-xs text-white/60">Player of the Match: Krunal Pandya (2/15 + 28)</p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white/15 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroStat({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-slate-200 shadow-sm">
      <Icon className="w-4 h-4 text-orange-500 mb-1" />
      <div className="text-xl sm:text-2xl font-black text-slate-900">{value}</div>
      <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</div>
    </div>
  );
}

function FeaturedMatchCard() {
  return (
    <Card className="overflow-hidden border-slate-200 shadow-2xl shadow-slate-300/50">
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-white/20 hover:bg-white/20 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" /> COMING SOON
          </Badge>
          <span className="text-xs font-semibold text-white/80">Next Season</span>
        </div>
        <span className="text-xs text-white/60 font-mono">IPL 2027</span>
      </div>
      <div className="p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">IPL 2027 Schedule</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {IPL_2027_STATUS.message}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">Expected: {IPL_2027_STATUS.expectedStart}</span>
        </div>
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-black text-slate-900">TBD</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Start</div>
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">10</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Teams</div>
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">74+</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Matches</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TeamBadgeLarge({ team }: { team: any }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-black text-white text-xl sm:text-2xl shadow-lg"
        style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
      >
        {team.abbr}
      </div>
      <div className="mt-2 text-xs font-bold text-slate-700">{team.shortName}</div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  return (
    <button onClick={onClick} className="group text-left">
      <Card className="p-5 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all h-full">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="font-bold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
        <div className="mt-3 text-xs font-semibold text-slate-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Open <ChevronRight className="w-3 h-3" />
        </div>
      </Card>
    </button>
  );
}

function TopPickCard({ player, rank, onClick }: { player: Player; rank: number; onClick: () => void }) {
  const team = TEAMS[player.team];
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all group cursor-pointer" onClick={onClick}>
      <div className="h-2" style={{ background: `linear-gradient(to right, ${team.primary}, ${team.secondary})` }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow" style={{ background: team.primary }}>
            {player.team}
          </div>
          <div className="flex items-center gap-1">
            {rank === 1 && <Crown className="w-4 h-4 text-amber-500" />}
            <span className="text-xs font-bold text-slate-400">#{rank}</span>
          </div>
        </div>
        <div className="font-bold text-slate-900 text-sm leading-tight">{player.name}</div>
        <div className="text-xs text-slate-500 mt-0.5">{player.country}</div>
        <Badge className={`mt-2 ${ROLE_COLORS[player.role]} border`} variant="outline">
          {ROLE_ICONS[player.role]} {player.role}
        </Badge>
        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Points</div>
            <div className="font-black text-slate-900">{player.totalPoints}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Selected</div>
            <div className="font-black text-slate-900">{player.selectedBy}%</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ResultRow({ match }: { match: any }) {
  const teamA = TEAMS[match.abbrs[0]];
  const teamB = TEAMS[match.abbrs[1]];
  return (
    <Card className="p-4 border-slate-200 hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between gap-3 mb-2">
        <Badge variant="outline" className="text-[10px] bg-slate-50">{match.stage || "League"}</Badge>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="font-mono font-semibold">{match.date}</span>
          <span>•</span>
          <span>{match.time}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: teamA.primary }}>
            {match.abbrs[0]}
          </div>
          <div className="font-semibold text-slate-900 text-sm hidden sm:block">{teamA.shortName}</div>
        </div>
        <div className="text-center text-[10px] font-bold text-slate-400">VS</div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="font-semibold text-slate-900 text-sm hidden sm:block">{teamB.shortName}</div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: teamB.primary }}>
            {match.abbrs[1]}
          </div>
        </div>
      </div>
      {match.result && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-700 font-medium">{match.result}</div>
          {match.score && <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{match.score}</div>}
          {match.pom && <div className="text-[11px] text-amber-700 mt-0.5 font-medium">⭐ MoM: {match.pom}</div>}
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <Target className="w-3 h-3" /> {match.venue}
          </div>
        </div>
      )}
    </Card>
  );
}

// ============ TEAM BUILDER ============
function TeamBuilder({ onAuthClick, onPlayerClick }: any) {
  const { user, hasJoined, saveTeam, savedTeam } = useAuth();
  const { toast } = useToast();

  const [selected, setSelected] = useState<string[]>(savedTeam?.players.map((p) => PLAYERS.find((pl) => pl.name === p.name)?.id).filter(Boolean) as string[] || []);
  const [captain, setCaptain] = useState<string | null>(savedTeam?.players.find((p) => p.isCaptain)?.name ? PLAYERS.find((pl) => pl.name === savedTeam.players.find((p) => p.isCaptain)!.name)?.id || null : null);
  const [viceCaptain, setViceCaptain] = useState<string | null>(savedTeam?.players.find((p) => p.isViceCaptain)?.name ? PLAYERS.find((pl) => pl.name === savedTeam.players.find((p) => p.isViceCaptain)!.name)?.id || null : null);
  const [filterTeam, setFilterTeam] = useState<string>("ALL");
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [teamName, setTeamName] = useState(savedTeam?.teamName || user?.teamName || "");
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const MAX_PLAYERS = 11;
  const BUDGET = 100;
  const MAX_PER_TEAM = 7;

  const selectedPlayers = selected.map((id) => PLAYERS.find((p) => p.id === id)!).filter(Boolean);
  const totalCredits = selectedPlayers.reduce((sum, p) => sum + p.credits, 0);
  const remainingBudget = BUDGET - totalCredits;

  const roleCount = useMemo(() => {
    const c: Record<PlayerRole, number> = { Batsman: 0, Bowler: 0, "All-Rounder": 0, Wicketkeeper: 0 };
    selectedPlayers.forEach((p) => c[p.role]++);
    return c;
  }, [selectedPlayers]);

  const teamCount = useMemo(() => {
    const c: Record<string, number> = {};
    selectedPlayers.forEach((p) => { c[p.team] = (c[p.team] || 0) + 1; });
    return c;
  }, [selectedPlayers]);

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter((p) => {
      if (filterTeam !== "ALL" && p.team !== filterTeam) return false;
      if (filterRole !== "ALL" && p.role !== filterRole) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  }, [filterTeam, filterRole, search]);

  function togglePlayer(id: string) {
    const player = PLAYERS.find((p) => p.id === id)!;
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
      if (captain === id) setCaptain(null);
      if (viceCaptain === id) setViceCaptain(null);
    } else {
      if (selected.length >= MAX_PLAYERS) {
        toast({ title: "Squad Full", description: "You already have 11 players. Remove one to add another.", variant: "destructive" });
        return;
      }
      if (totalCredits + player.credits > BUDGET) {
        toast({ title: "Over Budget", description: `Adding ${player.name} would exceed 100 credits.`, variant: "destructive" });
        return;
      }
      if ((teamCount[player.team] || 0) >= MAX_PER_TEAM) {
        toast({ title: "Team Limit", description: `Max 7 players from ${player.team}. Remove one first.`, variant: "destructive" });
        return;
      }
      setSelected([...selected, id]);
    }
  }

  function handleSaveTeam() {
    if (!hasJoined || !user) {
      onAuthClick();
      return;
    }
    if (selected.length !== 11) {
      toast({ title: "Incomplete Squad", description: `Select ${11 - selected.length} more player(s).`, variant: "destructive" });
      return;
    }
    if (!captain) {
      toast({ title: "Choose Captain", description: "Please select your Captain (2x points).", variant: "destructive" });
      return;
    }
    if (!viceCaptain) {
      toast({ title: "Choose Vice-Captain", description: "Please select your Vice-Captain (1.5x points).", variant: "destructive" });
      return;
    }
    if (!teamName.trim()) {
      toast({ title: "Team Name Required", description: "Please enter a team name.", variant: "destructive" });
      return;
    }
    const cap = PLAYERS.find((p) => p.id === captain)!;
    const totalPts = selectedPlayers.reduce((sum, p) => {
      let pts = p.totalPoints;
      if (p.id === captain) pts *= 2;
      if (p.id === viceCaptain) pts *= 1.5;
      return sum + pts;
    }, 0);
    const userTeam: UserTeam = {
      owner: user.name,
      teamName: teamName.trim(),
      totalPoints: Math.round(totalPts),
      weekPoints: Math.round(totalPts * 0.05),
      captain: cap.name,
      players: selectedPlayers.map((p) => ({
        name: p.name,
        team: p.team,
        points: p.totalPoints,
        isCaptain: p.id === captain,
        isViceCaptain: p.id === viceCaptain,
      })),
      joinedAt: Date.now(),
    };
    saveTeam(userTeam);
    setShowSaveDialog(false);
    toast({ title: "Team Saved!", description: `${teamName} joined the leaderboard. Good luck!` });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
          <Volleyball className="w-3 h-3 mr-1" /> TEAM BUILDER
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Create Your Fantasy XI</h1>
        <p className="text-sm text-slate-500 mt-1">Budget: 100 credits • Max 11 players • Max 7 per team • 1 WK required</p>
      </div>

      {!hasJoined && (
        <Card className="p-4 mb-5 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-600" /> Join to Save Your Team
              </div>
              <div className="text-xs text-slate-600 mt-0.5">Quick sign-up — just enter your name. No email, no password.</div>
            </div>
            <Button size="sm" onClick={onAuthClick} className="bg-gradient-to-r from-rose-600 to-orange-600">
              Join Now
            </Button>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search players..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-50 border-slate-200" />
              </div>
              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200"><SelectValue placeholder="Team" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Teams</SelectItem>
                  {TEAM_ABBRS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200"><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  {ROLE_ORDER.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-3">
            {filteredPlayers.map((p) => {
              const isSelected = selected.includes(p.id);
              const team = TEAMS[p.team];
              const teamFull = (teamCount[p.team] || 0) >= MAX_PER_TEAM;
              const budgetFull = totalCredits + p.credits > BUDGET;
              const squadFull = selected.length >= MAX_PLAYERS;
              const disabled = !isSelected && (teamFull || budgetFull || squadFull);
              return (
                <Card
                  key={p.id}
                  className={`p-4 transition-all cursor-pointer border-2 ${isSelected ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 hover:border-slate-300"} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}
                  onClick={() => !disabled && togglePlayer(p.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold shadow flex-shrink-0" style={{ background: team.primary }} onClick={(e) => { e.stopPropagation(); onPlayerClick(p); }}>
                      {p.team}
                    </div>
                    <div className="flex-1 min-w-0">
                      <button onClick={(e) => { e.stopPropagation(); onPlayerClick(p); }} className="font-bold text-slate-900 text-sm truncate hover:text-orange-600 text-left">
                        {p.name}
                      </button>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant="outline" className={`text-[10px] ${ROLE_COLORS[p.role]}`}>{p.role}</Badge>
                        {p.isTopPick && <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"><Star className="w-2.5 h-2.5 mr-0.5" /> Top</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{p.credits.toFixed(1)}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">credits</div>
                    </div>
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4 text-white" /></div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0"><Plus className="w-4 h-4 text-slate-400" /></div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div><div className="text-[10px] text-slate-500 uppercase">Pts</div><div className="text-sm font-bold text-slate-900">{p.totalPoints}</div></div>
                    <div><div className="text-[10px] text-slate-500 uppercase">Sel%</div><div className="text-sm font-bold text-slate-900">{p.selectedBy}%</div></div>
                    <div><div className="text-[10px] text-slate-500 uppercase">Form</div><div className="flex items-center justify-center gap-0.5">{p.form.slice(-3).map((f, i) => (<div key={i} className={`w-1 h-3 rounded-sm ${f > 60 ? "bg-emerald-500" : f > 40 ? "bg-amber-400" : "bg-rose-400"}`} />))}</div></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <div className="sticky top-20 space-y-4">
            <Card className="p-5 border-slate-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Your Squad</div>
                  <div className="text-2xl font-black text-slate-900">{selected.length}/11</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Budget Left</div>
                  <div className={`text-2xl font-black ${remainingBudget < 0 ? "text-rose-600" : "text-emerald-600"}`}>{remainingBudget.toFixed(1)}</div>
                </div>
              </div>
              <Progress value={(selected.length / 11) * 100} className="h-2 mb-4" />
              <div className="grid grid-cols-4 gap-2 mb-4">
                {ROLE_ORDER.map((r) => (
                  <div key={r} className="text-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-base">{ROLE_ICONS[r]}</div>
                    <div className="text-lg font-black text-slate-900">{roleCount[r]}</div>
                    <div className="text-[9px] text-slate-500 font-semibold uppercase leading-tight">{r.slice(0, 4)}</div>
                  </div>
                ))}
              </div>

              {hasJoined && (
                <div className="mb-3">
                  <Label className="text-xs font-semibold text-slate-600 uppercase mb-1.5 block">Team Name</Label>
                  <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter team name" className="bg-slate-50" />
                </div>
              )}

              {selected.length === 11 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1"><Crown className="w-3 h-3 text-amber-500" /> Captain (2x points)</div>
                    <Select value={captain || ""} onValueChange={setCaptain}>
                      <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue placeholder="Choose captain" /></SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.team})</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1"><Star className="w-3 h-3 text-violet-500" /> Vice-Captain (1.5x)</div>
                    <Select value={viceCaptain || ""} onValueChange={setViceCaptain}>
                      <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue placeholder="Choose vice-captain" /></SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.filter((p) => p.id !== captain).map((p) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.team})</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Button className="w-full mt-4 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg" disabled={selected.length !== 11} onClick={handleSaveTeam}>
                {selected.length === 11 ? (savedTeam ? "Update Team" : "Save & Join Contest") : `Select ${11 - selected.length} more`}
              </Button>
            </Card>

            {selectedPlayers.length > 0 && (
              <Card className="p-4 border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase mb-3">Selected Players</div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {selectedPlayers.map((p) => {
                    const team = TEAMS[p.team];
                    const isCap = captain === p.id;
                    const isVC = viceCaptain === p.id;
                    return (
                      <div key={p.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: team.primary }}>{p.team}</div>
                        <div className="flex-1 min-w-0">
                          <button onClick={() => onPlayerClick(p)} className="text-xs font-bold text-slate-900 truncate hover:text-orange-600 text-left">{p.name}</button>
                          <div className="text-[10px] text-slate-500">{p.role} • {p.credits} cr</div>
                        </div>
                        {isCap && <Badge className="text-[9px] bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">C</Badge>}
                        {isVC && <Badge className="text-[9px] bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">VC</Badge>}
                        <button onClick={() => togglePlayer(p.id)} className="text-rose-400 hover:text-rose-600 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MY TEAM SECTION ============
function MyTeamSection({ setSection, onAuthClick, onPlayerClick }: any) {
  const { user, savedTeam, hasJoined } = useAuth();

  if (!hasJoined || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center mx-auto mb-5">
          <Shield className="w-10 h-10 text-orange-500" />
        </div>
        <Badge className="mb-3 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
          <Shield className="w-3 h-3 mr-1" /> MY TEAM
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">You haven't joined yet</h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          Join the league to build your fantasy team and see it here. It's quick — just enter your name.
        </p>
        <Button size="lg" onClick={onAuthClick} className="mt-6 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg rounded-full">
          <LogIn className="w-4 h-4 mr-2" /> Join Now — It's Free
        </Button>
      </div>
    );
  }

  if (!savedTeam) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center mx-auto mb-5">
          <Volleyball className="w-10 h-10 text-rose-500" />
        </div>
        <Badge className="mb-3 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
          <Volleyball className="w-3 h-3 mr-1" /> BUILD YOUR TEAM
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">No team saved yet</h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          Welcome, <span className="font-bold text-slate-900">{user.name}</span>! Build your fantasy XI to see it here and join the leaderboard.
        </p>
        <Button size="lg" onClick={() => setSection("team-builder")} className="mt-6 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg rounded-full">
          <Volleyball className="w-4 h-4 mr-2" /> Build Your Team
        </Button>
      </div>
    );
  }

  // Compute stats
  const captain = savedTeam.players.find((p) => p.isCaptain);
  const viceCaptain = savedTeam.players.find((p) => p.isViceCaptain);
  const roleCount: Record<PlayerRole, number> = { Batsman: 0, Bowler: 0, "All-Rounder": 0, Wicketkeeper: 0 };
  savedTeam.players.forEach((p) => {
    const player = PLAYERS.find((pl) => pl.name === p.name);
    if (player) roleCount[player.role]++;
  });
  const teamCount: Record<string, number> = {};
  savedTeam.players.forEach((p) => {
    teamCount[p.team] = (teamCount[p.team] || 0) + 1;
  });
  const totalCredits = savedTeam.players.reduce((sum, p) => {
    const player = PLAYERS.find((pl) => pl.name === p.name);
    return sum + (player?.credits || 0);
  }, 0);
  const savedAt = new Date(savedTeam.joinedAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
          <Shield className="w-3 h-3 mr-1" /> MY TEAM
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{savedTeam.teamName}</h1>
        <p className="text-sm text-slate-500 mt-1">
          Owner: <span className="font-semibold text-slate-700">{savedTeam.owner}</span> • Saved on {savedAt}
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 border-slate-200">
          <Trophy className="w-5 h-5 text-amber-500 mb-2" />
          <div className="text-2xl font-black text-slate-900">{savedTeam.totalPoints.toLocaleString()}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">Total Points</div>
        </Card>
        <Card className="p-5 border-slate-200">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
          <div className="text-2xl font-black text-slate-900">+{savedTeam.weekPoints}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">This Week</div>
        </Card>
        <Card className="p-5 border-slate-200">
          <Users className="w-5 h-5 text-violet-500 mb-2" />
          <div className="text-2xl font-black text-slate-900">{savedTeam.players.length}/11</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">Players</div>
        </Card>
        <Card className="p-5 border-slate-200">
          <Zap className="w-5 h-5 text-amber-500 mb-2" />
          <div className="text-2xl font-black text-slate-900">{totalCredits.toFixed(1)}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold">Credits Used</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Players list (spans 2) */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="font-bold flex items-center gap-2">
                <Users className="w-4 h-4" /> Your Fantasy XI
              </div>
              <Badge className="bg-white/10 text-white border-0 hover:bg-white/10">Captain: {captain?.name || "-"}</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              {savedTeam.players.map((p, i) => {
                const player = PLAYERS.find((pl) => pl.name === p.name);
                const team = TEAMS[p.team];
                return (
                  <div
                    key={i}
                    className="p-3 flex items-center gap-3 hover:bg-slate-50/50 cursor-pointer"
                    onClick={() => player && onPlayerClick(player)}
                  >
                    <div className="w-8 text-center font-black text-slate-400 text-sm">{i + 1}</div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: team.primary }}
                    >
                      {p.team}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        {p.name}
                        {p.isCaptain && <Badge className="text-[9px] bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">C • 2x</Badge>}
                        {p.isViceCaptain && <Badge className="text-[9px] bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">VC • 1.5x</Badge>}
                      </div>
                      <div className="text-xs text-slate-500">
                        {player?.role || "—"} • {team.shortName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900 text-sm">
                        {p.isCaptain ? p.points * 2 : p.isViceCaptain ? Math.round(p.points * 1.5) : p.points}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase">pts</div>
                    </div>
                    {player && (
                      <div className="text-right hidden sm:block">
                        <div className="font-bold text-slate-700 text-xs">{player.credits.toFixed(1)}</div>
                        <div className="text-[10px] text-slate-500 uppercase">cr</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => setSection("team-builder")} variant="outline" className="rounded-full">
              <Volleyball className="w-4 h-4 mr-2" /> Edit Team
            </Button>
            <Button onClick={() => setSection("leaderboard")} variant="outline" className="rounded-full">
              <Trophy className="w-4 h-4 mr-2" /> View Leaderboard
            </Button>
            <Button onClick={() => setSection("contests")} variant="outline" className="rounded-full">
              <Award className="w-4 h-4 mr-2" /> Join Contests
            </Button>
          </div>
        </div>

        {/* Right: Sidebar info */}
        <div className="space-y-4">
          {/* Captain & VC */}
          <Card className="p-5 border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase mb-3">Leadership</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-amber-700 uppercase">Captain (2x points)</div>
                  <div className="font-bold text-slate-900 text-sm truncate">{captain?.name || "—"}</div>
                  <div className="text-xs text-slate-500">{captain?.team}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 border border-violet-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-violet-700 uppercase">Vice-Captain (1.5x)</div>
                  <div className="font-bold text-slate-900 text-sm truncate">{viceCaptain?.name || "—"}</div>
                  <div className="text-xs text-slate-500">{viceCaptain?.team}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Role composition */}
          <Card className="p-5 border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase mb-3">Role Composition</div>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_ORDER.map((r) => (
                <div key={r} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg">{ROLE_ICONS[r]}</div>
                  <div className="text-2xl font-black text-slate-900">{roleCount[r]}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">{r}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Team spread */}
          <Card className="p-5 border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase mb-3">Team Distribution</div>
            <div className="space-y-2">
              {Object.entries(teamCount).sort((a, b) => b[1] - a[1]).map(([abbr, count]) => {
                const team = TEAMS[abbr];
                return (
                  <div key={abbr} className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: team.primary }}
                    >
                      {abbr}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 truncate">{team.shortName}</span>
                        <span className="font-bold text-slate-900">{count}</span>
                      </div>
                      <Progress value={(count / 7) * 100} className="h-1 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============ PLAYERS SECTION ============
function PlayersSection({ onPlayerClick, onCompareClick }: any) {
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const [filterTeam, setFilterTeam] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("points");

  const filtered = useMemo(() => {
    let list = PLAYERS.filter((p) => {
      if (filterRole !== "ALL" && p.role !== filterRole) return false;
      if (filterTeam !== "ALL" && p.team !== filterTeam) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "points") list.sort((a, b) => b.totalPoints - a.totalPoints);
    else if (sortBy === "credits") list.sort((a, b) => b.credits - a.credits);
    else if (sortBy === "selected") list.sort((a, b) => b.selectedBy - a.selectedBy);
    return list;
  }, [filterRole, filterTeam, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge className="mb-2 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            <Users className="w-3 h-3 mr-1" /> PLAYER DATABASE
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">All Players</h1>
          <p className="text-sm text-slate-500 mt-1">{PLAYERS.length} players across 10 IPL teams • Click any player for detailed stats</p>
        </div>
        <Button onClick={onCompareClick} className="bg-slate-900 hover:bg-slate-800">
          <GitCompareArrows className="w-4 h-4 mr-2" /> Compare Players
        </Button>
      </div>

      <Card className="p-4 border-slate-200 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search player by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-50 border-slate-200" />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              {ROLE_ORDER.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterTeam} onValueChange={setFilterTeam}>
            <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200"><SelectValue placeholder="Team" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Teams</SelectItem>
              {TEAM_ABBRS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[160px] bg-slate-50 border-slate-200"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Most Points</SelectItem>
              <SelectItem value="credits">Highest Credits</SelectItem>
              <SelectItem value="selected">Most Selected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-bold text-slate-600 text-xs uppercase">Player</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase">Role</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase hidden sm:table-cell">Team</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase hidden md:table-cell">M</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase hidden md:table-cell">Runs</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase hidden md:table-cell">Wkts</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase">Pts</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase hidden sm:table-cell">Sel%</th>
                <th className="text-center py-3 px-3 font-bold text-slate-600 text-xs uppercase">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const team = TEAMS[p.team];
                return (
                  <tr key={p.id} className="hover:bg-orange-50/30 cursor-pointer" onClick={() => onPlayerClick(p)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: team.primary }}>{p.team}</div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3"><Badge variant="outline" className={`text-[10px] ${ROLE_COLORS[p.role]}`}>{p.role}</Badge></td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell"><span className="font-mono text-xs font-bold text-slate-700">{p.team}</span></td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.matches}</td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.runs ?? "-"}</td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.wickets ?? "-"}</td>
                    <td className="text-center py-3 px-3"><span className="font-black text-slate-900">{p.totalPoints}</span></td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell text-slate-700 font-medium">{p.selectedBy}%</td>
                    <td className="text-center py-3 px-3"><Badge variant="outline" className="font-mono bg-slate-50">{p.credits.toFixed(1)}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============ SCHEDULE SECTION ============
function ScheduleSection() {
  const [tab, setTab] = useState("completed");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">
          <Calendar className="w-3 h-3 mr-1" /> FIXTURES & RESULTS
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Match Schedule</h1>
        <p className="text-sm text-slate-500 mt-1">IPL 2026 — Mar 22 to Jun 3, 2026 • 74 matches • Final: RCB vs PBKS</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">IPL 2027 — Coming Soon</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white">IPL 2026 Results ({MATCHES.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-5">
          <Card className="border-dashed border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white">
            <div className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/30">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <Badge className="mb-3 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">
                <Sparkles className="w-3 h-3 mr-1" /> COMING SOON
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">IPL 2027</h2>
              <p className="mt-3 text-slate-600 max-w-md mx-auto leading-relaxed">
                {IPL_2027_STATUS.message}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">Expected to start: {IPL_2027_STATUS.expectedStart}</span>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">TBD</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Start Date</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">10</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Teams</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">74+</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Matches</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">₹5Cr+</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold mt-1">Prize Pool</div>
                </div>
              </div>
              <p className="mt-6 text-xs text-slate-400">
                Once BCCI announces the official IPL 2027 schedule, fixtures will appear here automatically.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-5">
          <div className="space-y-3">
            {MATCHES.map((m) => <ResultRow key={m.id} match={m} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UpcomingMatchCard({ match }: { match: any }) {
  const teamA = TEAMS[match.abbrs[0]];
  const teamB = TEAMS[match.abbrs[1]];
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="bg-slate-50 text-slate-700">{match.stage}</Badge>
          <span className="text-xs text-slate-500 font-mono">#{match.id}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black shadow-md" style={{ background: `linear-gradient(135deg, ${teamA.primary}, ${teamA.secondary})` }}>{teamA.abbr}</div>
            <div className="text-xs font-semibold text-slate-700">{teamA.shortName}</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold text-slate-400">VS</div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">{match.time}</div>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black shadow-md" style={{ background: `linear-gradient(135deg, ${teamB.primary}, ${teamB.secondary})` }}>{teamB.abbr}</div>
            <div className="text-xs font-semibold text-slate-700">{teamB.shortName}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium truncate max-w-[60%]">{match.venue}</div>
          <div className="text-xs font-bold text-slate-700">{match.date}</div>
        </div>
      </div>
    </Card>
  );
}

// ============ STANDINGS SECTION ============
function StandingsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
          <BarChart3 className="w-3 h-3 mr-1" /> POINTS TABLE
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">IPL 2026 Standings</h1>
        <p className="text-sm text-slate-500 mt-1">Final standings after league stage — Top 4 qualified for Playoffs</p>
      </div>

      <Card className="border-slate-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase">Pos</th>
                <th className="text-left py-3 px-4 font-bold text-xs uppercase">Team</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase">P</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase">W</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase">L</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase">NRR</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase">Pts</th>
                <th className="text-center py-3 px-3 font-bold text-xs uppercase hidden sm:table-cell">Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STANDINGS.map((s, i) => {
                const team = TEAMS[s.abbr];
                const isPlayoffs = i < 4;
                return (
                  <tr key={s.abbr} className={`hover:bg-slate-50/50 ${isPlayoffs ? "bg-emerald-50/30" : ""}`}>
                    <td className="py-3 px-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? "bg-amber-100 text-amber-700" : i < 4 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{i + 1}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ background: team.primary }}>{team.abbr}</div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm hidden sm:block">{team.name}</div>
                          <div className="font-bold text-slate-900 text-sm sm:hidden">{team.abbr}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3 text-slate-700 font-semibold">{s.played}</td>
                    <td className="text-center py-3 px-3 text-emerald-600 font-bold">{s.won}</td>
                    <td className="text-center py-3 px-3 text-rose-600 font-bold">{s.lost}</td>
                    <td className="text-center py-3 px-3 text-slate-700 font-mono text-xs">{s.nrr > 0 ? "+" : ""}{s.nrr.toFixed(3)}</td>
                    <td className="text-center py-3 px-3"><span className="font-black text-slate-900 text-base">{s.points}</span></td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {s.form.map((r, idx) => (
                          <div key={idx} className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center text-white ${r === "W" ? "bg-emerald-500" : r === "L" ? "bg-rose-500" : "bg-slate-400"}`}>{r}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-100" /> Top 4 qualified for Playoffs</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-100" /> League Winner</div>
          </div>
        </div>
      </Card>

      {/* Point System */}
      <div>
        <Badge className="mb-2 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
          <BookOpen className="w-3 h-3 mr-1" /> FANTASY POINT SYSTEM
        </Badge>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">How Points Are Calculated</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POINT_SYSTEM.map((cat) => (
            <Card key={cat.category} className="p-4 border-slate-200">
              <div className="font-bold text-slate-900 mb-3 text-sm">{cat.category}</div>
              <div className="space-y-2">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{item.event}</span>
                    <Badge variant="outline" className={`font-mono font-bold ${item.points.startsWith("-") ? "bg-rose-50 text-rose-700" : item.points.includes("x") ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{item.points}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ LEADERBOARD SECTION ============
function LeaderboardSection() {
  const { user, savedTeam, savedTeams } = useAuth();
  const [expanded, setExpanded] = useState<number | null>(null);

  // Combine default + user teams
  const allTeams = useMemo(() => {
    const teams: FantasyTeam[] = [...FANTASY_LEADERBOARD];
    savedTeams.forEach((ut) => {
      const idx = teams.findIndex((t) => t.teamName === ut.teamName && t.owner === ut.owner);
      if (idx === -1) {
        // New user team — set prevRank high so they show as "rising"
        teams.push({ ...ut, rank: 0, prevRank: 99, isUser: true });
      } else {
        teams[idx] = { ...teams[idx], ...ut, isUser: true };
      }
    });
    teams.sort((a, b) => b.totalPoints - a.totalPoints);
    return teams.map((t, i) => ({ ...t, rank: i + 1 }));
  }, [savedTeams]);

  const userRank = allTeams.find((t) => t.isUser)?.rank;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          <Trophy className="w-3 h-3 mr-1" /> FANTASY LEADERBOARD
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Top Fantasy Teams</h1>
        <p className="text-sm text-slate-500 mt-1">
          {savedTeam ? `Your team "${savedTeam.teamName}" is ranked #${userRank}` : "Join to compete with thousands of cricket fans"}
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 max-w-3xl mx-auto">
        {[1, 0, 2].map((idx) => {
          const t = allTeams[idx];
          if (!t) return null;
          const isFirst = idx === 0;
          const heights = ["h-32 sm:h-40", "h-40 sm:h-52", "h-28 sm:h-32"];
          const medals = ["🥇", "🥈", "🥉"];
          const colors = ["from-amber-400 to-yellow-500", "from-slate-300 to-slate-400", "from-orange-400 to-amber-700"];
          return (
            <div key={t.rank} className="flex flex-col items-center">
              {isFirst ? <div className="text-3xl sm:text-4xl mb-1">👑</div> : <div className="text-2xl sm:text-3xl mb-1">{medals[idx]}</div>}
              <div className={`${heights[idx]} w-full bg-gradient-to-br ${colors[idx]} rounded-t-2xl flex items-end justify-center pb-3 shadow-lg`}>
                <div className="text-white font-black text-2xl sm:text-3xl">#{t.rank}</div>
              </div>
              <Card className={`w-full p-3 sm:p-4 -mt-2 border-slate-200 text-center ${t.isUser ? "ring-2 ring-orange-400" : ""}`}>
                <div className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">{t.teamName}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{t.isUser ? "YOU" : t.owner}</div>
                <div className="text-lg sm:text-2xl font-black text-slate-900 mt-1">{t.totalPoints}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold">points</div>
              </Card>
            </div>
          );
        })}
      </div>

      <Card className="border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-3 grid grid-cols-12 gap-2 text-xs font-bold text-slate-600 uppercase">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5 sm:col-span-4">Team</div>
          <div className="col-span-2 hidden sm:block">Captain</div>
          <div className="col-span-2 text-center">Total</div>
          <div className="col-span-2 text-center">Week</div>
          <div className="col-span-2 sm:col-span-1 text-center">Trend</div>
        </div>
        <div className="divide-y divide-slate-100">
          {allTeams.map((t) => (
            <div key={`${t.owner}-${t.teamName}`}>
              <div className={`p-3 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 cursor-pointer ${t.isUser ? "bg-orange-50/40" : ""}`} onClick={() => setExpanded(expanded === t.rank ? null : t.rank)}>
                <div className="col-span-1 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mx-auto ${t.rank === 1 ? "bg-amber-100 text-amber-700" : t.rank === 2 ? "bg-slate-200 text-slate-700" : t.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>{t.rank}</div>
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">{t.teamName} {t.isUser && <Badge className="text-[9px] bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">YOU</Badge>}</div>
                  <div className="text-xs text-slate-500">{t.owner}</div>
                </div>
                <div className="col-span-2 hidden sm:block text-xs text-slate-700">{t.captain}</div>
                <div className="col-span-2 text-center"><div className="font-black text-slate-900">{t.totalPoints}</div></div>
                <div className="col-span-2 text-center"><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">+{t.weekPoints}</Badge></div>
                <div className="col-span-2 sm:col-span-1 text-center">
                  {t.rank < t.prevRank ? <ArrowUp className="w-4 h-4 text-emerald-500 mx-auto" /> : t.rank > t.prevRank ? <ArrowDown className="w-4 h-4 text-rose-500 mx-auto" /> : <Minus className="w-4 h-4 text-slate-400 mx-auto" />}
                </div>
              </div>
              {expanded === t.rank && (
                <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-3">Squad ({t.players.length} players)</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {t.players.map((p, i) => {
                      const team = TEAMS[p.team];
                      return (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: team.primary }}>{p.team}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">{p.name}{p.isCaptain && <Crown className="w-3 h-3 text-amber-500 flex-shrink-0" />}{p.isViceCaptain && <Star className="w-3 h-3 text-violet-500 flex-shrink-0" />}</div>
                            <div className="text-[10px] text-slate-500">{p.points} pts</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============ CONTESTS SECTION ============
function ContestsSection({ onAuthClick }: any) {
  const { hasJoined, user } = useAuth();
  const { toast } = useToast();
  const [joined, setJoined] = useState<number[]>([]);

  const contests = [
    { id: 1, name: "Mega Contest", entry: "FREE", prize: "₹1,00,000", spots: 50000, filled: 42150, color: "from-amber-500 to-yellow-500", icon: Crown },
    { id: 2, name: "RCB Fan Contest", entry: "FREE", prize: "₹25,000", spots: 10000, filled: 7800, color: "from-rose-500 to-red-500", icon: Trophy },
    { id: 3, name: "Beginner's Luck", entry: "FREE", prize: "₹10,000", spots: 5000, filled: 3200, color: "from-emerald-500 to-teal-500", icon: Sparkles },
    { id: 4, name: "Head-to-Head", entry: "FREE", prize: "₹500", spots: 2, filled: 1, color: "from-violet-500 to-purple-500", icon: GitCompareArrows },
    { id: 5, name: "Weekly Winner", entry: "FREE", prize: "₹50,000", spots: 20000, filled: 15600, color: "from-orange-500 to-amber-500", icon: Award },
    { id: 6, name: "Champion's League", entry: "FREE", prize: "₹5,00,000", spots: 100000, filled: 87500, color: "from-blue-500 to-indigo-500", icon: Trophy },
  ];

  function joinContest(id: number, name: string) {
    if (!hasJoined) { onAuthClick(); return; }
    if (joined.includes(id)) {
      setJoined(joined.filter((j) => j !== id));
      toast({ title: "Left Contest", description: `You left "${name}"` });
    } else {
      setJoined([...joined, id]);
      toast({ title: "Joined Contest!", description: `"${name}" — Good luck, ${user?.name}!` });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
          <Award className="w-3 h-3 mr-1" /> CONTESTS
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Join Contests</h1>
        <p className="text-sm text-slate-500 mt-1">Compete with thousands of cricket fans • All contests are free</p>
      </div>

      {!hasJoined && (
        <Card className="p-4 mb-5 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-2"><Shield className="w-4 h-4 text-orange-600" /> Join to Enter Contests</div>
              <div className="text-xs text-slate-600 mt-0.5">Quick sign-up — just enter your name. No email, no password.</div>
            </div>
            <Button size="sm" onClick={onAuthClick} className="bg-gradient-to-r from-rose-600 to-orange-600">Join Now</Button>
          </div>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map((c) => {
          const isJoined = joined.includes(c.id);
          const pct = (c.filled / c.spots) * 100;
          return (
            <Card key={c.id} className={`p-5 border-2 transition-all ${isJoined ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200 hover:shadow-lg"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-md`}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                {isJoined && <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Joined</Badge>}
              </div>
              <div className="font-bold text-slate-900">{c.name}</div>
              <div className="text-xs text-slate-500 mb-3">Entry: {c.entry}</div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-500">Prize Pool</span>
                <span className="font-black text-emerald-600 text-base">{c.prize}</span>
              </div>
              <Progress value={pct} className="h-1.5 mb-2" />
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-3">
                <span>{c.filled.toLocaleString()} joined</span>
                <span>{(c.spots - c.filled).toLocaleString()} spots left</span>
              </div>
              <Button className={`w-full ${isJoined ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg"}`} onClick={() => joinContest(c.id, c.name)}>
                {isJoined ? "Leave Contest" : hasJoined ? "Join Contest" : "Sign Up to Join"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ============ AUTH MODAL ============
function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { join, hasJoined, user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [step, setStep] = useState(1);

  function handleSubmit() {
    if (!name.trim()) {
      toast({ title: "Name Required", description: "Please enter your name to join.", variant: "destructive" });
      return;
    }
    if (!teamName.trim()) {
      toast({ title: "Team Name Required", description: "Please enter your fantasy team name.", variant: "destructive" });
      return;
    }
    join(name.trim(), teamName.trim());
    toast({ title: "Welcome aboard! 🎉", description: `${name} joined as "${teamName}". Build your team now!` });
    onOpenChange(false);
    setName("");
    setTeamName("");
    setStep(1);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center mb-3 shadow-lg">
            <Volleyball className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl font-black">Join IPL Fantasy</DialogTitle>
          <DialogDescription>Quick sign-up. Just enter your name — no email, no password needed.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="name" className="text-xs font-semibold text-slate-600 uppercase mb-1.5">Your Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Shabad Grover" className="bg-slate-50" />
          </div>
          <div>
            <Label htmlFor="team" className="text-xs font-semibold text-slate-600 uppercase mb-1.5">Fantasy Team Name</Label>
            <Input id="team" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Cover Drive Kings" className="bg-slate-50" />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600">
            <LogIn className="w-4 h-4 mr-1.5" /> Join League
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============ PLAYER STATS MODAL ============
function PlayerStatsModal({ player, onClose }: { player: Player | null; onClose: () => void }) {
  if (!player) return null;
  const team = TEAMS[player.team];
  const progression = [60, 75, 50, 85, 90, 65, 80, 95, 70, 88]; // Mock progression data
  const maxPts = Math.max(...progression);

  return (
    <Dialog open={!!player} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black shadow-lg" style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}>
              {player.team}
            </div>
            <div>
              <DialogTitle className="text-xl font-black">{player.name}</DialogTitle>
              <DialogDescription>{player.country} • {team.name}</DialogDescription>
            </div>
            <div className="ml-auto">
              <Badge className={`${ROLE_COLORS[player.role]} border`}>{ROLE_ICONS[player.role]} {player.role}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            <StatBox label="Matches" value={player.matches} />
            <StatBox label="Runs" value={player.runs ?? "-"} />
            <StatBox label="Wickets" value={player.wickets ?? "-"} />
            <StatBox label="Avg" value={player.avg?.toFixed(1) ?? "-"} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <StatBox label="Strike Rate" value={player.sr?.toFixed(1) ?? "-"} />
            <StatBox label="Economy" value={player.econ?.toFixed(1) ?? "-"} />
            <StatBox label="Credits" value={player.credits.toFixed(1)} />
          </div>

          {/* Fantasy Stats */}
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-rose-50 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase">Fantasy Points</span>
              {player.isTopPick && <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"><Star className="w-3 h-3 mr-1" /> Top Pick</Badge>}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-black text-slate-900">{player.totalPoints}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{player.selectedBy}%</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Selected By</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{Math.round(player.totalPoints / player.matches)}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Avg/Match</div>
              </div>
            </div>
          </Card>

          {/* Form (last 5 matches) */}
          <div>
            <div className="text-xs font-bold text-slate-600 uppercase mb-2">Form (Last 5 Matches)</div>
            <div className="flex items-end gap-1.5 h-20">
              {player.form.map((f, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full rounded-t-md ${f > 70 ? "bg-emerald-500" : f > 50 ? "bg-amber-400" : f > 30 ? "bg-orange-400" : "bg-rose-400"}`} style={{ height: `${(f / 100) * 60}px` }} />
                  <span className="text-[9px] text-slate-500 font-mono">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Season Progression Chart */}
          <div>
            <div className="text-xs font-bold text-slate-600 uppercase mb-2">Season Progression (10 matches)</div>
            <div className="flex items-end gap-1 h-16 p-2 bg-slate-50 rounded-lg">
              {progression.map((p, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-orange-500 to-amber-400" style={{ height: `${(p / maxPts) * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatBox({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-200">
      <div className="text-lg font-black text-slate-900">{value}</div>
      <div className="text-[9px] text-slate-500 uppercase font-semibold">{label}</div>
    </div>
  );
}

// ============ COMPARE MODAL ============
function CompareModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [p1, setP1] = useState<string>("");
  const [p2, setP2] = useState<string>("");

  const player1 = PLAYERS.find((p) => p.id === p1);
  const player2 = PLAYERS.find((p) => p.id === p2);

  function compareStat(a: any, b: any) {
    if (a == null && b == null) return null;
    if (a == null) return "b";
    if (b == null) return "a";
    if (a > b) return "a";
    if (b > a) return "b";
    return "tie";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <GitCompareArrows className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black">Head-to-Head Comparison</DialogTitle>
              <DialogDescription>Compare two players side by side</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Select value={p1} onValueChange={setP1}>
            <SelectTrigger><SelectValue placeholder="Select Player 1" /></SelectTrigger>
            <SelectContent>
              {PLAYERS.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.team})</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={p2} onValueChange={setP2}>
            <SelectTrigger><SelectValue placeholder="Select Player 2" /></SelectTrigger>
            <SelectContent>
              {PLAYERS.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} ({p.team})</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {player1 && player2 ? (
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white font-black shadow-lg" style={{ background: TEAMS[player1.team].primary }}>{player1.team}</div>
                <div className="font-bold text-sm mt-2">{player1.name}</div>
                <Badge variant="outline" className={`text-[10px] mt-1 ${ROLE_COLORS[player1.role]}`}>{player1.role}</Badge>
              </div>
              <div className="text-center text-xs font-bold text-slate-400">VS</div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white font-black shadow-lg" style={{ background: TEAMS[player2.team].primary }}>{player2.team}</div>
                <div className="font-bold text-sm mt-2">{player2.name}</div>
                <Badge variant="outline" className={`text-[10px] mt-1 ${ROLE_COLORS[player2.role]}`}>{player2.role}</Badge>
              </div>
            </div>

            <Separator />

            {/* Stats comparison */}
            {[
              { label: "Matches", a: player1.matches, b: player2.matches },
              { label: "Runs", a: player1.runs, b: player2.runs },
              { label: "Wickets", a: player1.wickets, b: player2.wickets },
              { label: "Average", a: player1.avg, b: player2.avg },
              { label: "Strike Rate", a: player1.sr, b: player2.sr },
              { label: "Economy", a: player1.econ, b: player2.econ, lowerBetter: true },
              { label: "Fantasy Points", a: player1.totalPoints, b: player2.totalPoints },
              { label: "Selected %", a: player1.selectedBy, b: player2.selectedBy },
              { label: "Credits", a: player1.credits, b: player2.credits, lowerBetter: true },
            ].map((row) => {
              const winner = row.lowerBetter
                ? compareStat(row.a == null ? null : -row.a, row.b == null ? null : -row.b)
                : compareStat(row.a, row.b);
              return (
                <div key={row.label} className="grid grid-cols-3 gap-2 items-center">
                  <div className={`text-right font-black ${winner === "a" ? "text-emerald-600 text-lg" : "text-slate-600"}`}>{row.a ?? "-"}</div>
                  <div className="text-center text-[10px] text-slate-500 uppercase font-semibold">{row.label}</div>
                  <div className={`text-left font-black ${winner === "b" ? "text-emerald-600 text-lg" : "text-slate-600"}`}>{row.b ?? "-"}</div>
                </div>
              );
            })}

            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => { setP1(p2); setP2(p1); }}>Swap Players</Button>
              <Button variant="outline" size="sm" onClick={() => { setP1(""); setP2(""); }}>Clear</Button>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-slate-500">Select two players above to compare their stats</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center"><Volleyball className="w-4 h-4 text-white" /></div>
              <div className="font-black text-slate-900">IPL FANTASY</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">The premium cricket fantasy experience. Built with passion for IPL fans.</p>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">Game</div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div>Build Team</div><div>Players</div><div>Schedule</div><div>Standings</div><div>Contests</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">Teams</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-500">
              {TEAM_ABBRS.slice(0, 6).map((t) => <div key={t}>{t}</div>)}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">About</div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div>How to Play</div><div>Point System</div><div>Fair Play</div><div>Contact</div>
            </div>
          </div>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>© 2026 IPL Fantasy League. Not affiliated with BCCI/IPL. For demo purposes only.</div>
          <div className="flex items-center gap-3">
            <span>Privacy</span><span>Terms</span><span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

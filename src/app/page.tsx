'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, TrendingUp, Users, Calendar, Zap, Star,
  ChevronRight, Search, Filter, Crown, Activity, Target,
  Flame, ArrowUp, ArrowDown, Minus, Plus, Check, Sparkles,
  BarChart3, Layers, Award, Home, Volleyball
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
import { TEAMS, TEAM_ABBRS } from "@/lib/ipl/teams";
import { PLAYERS, Player, getPlayersByRole, PlayerRole } from "@/lib/ipl/players";
import { MATCHES, UPCOMING_MATCHES, STANDINGS, FANTASY_LEADERBOARD, IMPACT_PLAYERS, PLAYER_PROGRESSION } from "@/lib/ipl/matches";

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

type Section = "home" | "team-builder" | "players" | "schedule" | "leaderboard" | "standings";

export default function IPLFantasyPage() {
  const [section, setSection] = useState<Section>("home");

  const navItems: { id: Section; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "team-builder", label: "Build Team", icon: Volleyball },
    { id: "players", label: "Players", icon: Users },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "standings", label: "Standings", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <Header section={section} setSection={setSection} navItems={navItems} />

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {section === "home" && <HomeSection key="home" setSection={setSection} />}
          {section === "team-builder" && <TeamBuilder key="tb" />}
          {section === "players" && <PlayersSection key="players" />}
          {section === "schedule" && <ScheduleSection key="schedule" />}
          {section === "standings" && <StandingsSection key="standings" />}
          {section === "leaderboard" && <LeaderboardSection key="leaderboard" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ============ HEADER ============
function Header({ section, setSection, navItems }: any) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection("home")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Volleyball className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-lg tracking-tight bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                IPL FANTASY 2026
              </div>
              <div className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wider uppercase">Premium Cricket League</div>
            </div>
          </div>

          {/* Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  section === item.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User */}
          <div className="flex items-center gap-3">
            <Badge className="hidden sm:flex bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              LIVE
            </Badge>
            <Avatar className="w-9 h-9 ring-2 ring-slate-200">
              <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-bold">
                SG
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto scrollbar-none">
          {navItems.map((item: any) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                section === item.id ? "bg-slate-900 text-white" : "text-slate-600 bg-slate-100"
              }`}
            >
              <item.icon className="w-3 h-3" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ============ HOME SECTION ============
function HomeSection({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/40 to-rose-50/30">
        {/* Decorative bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
                <Sparkles className="w-3 h-3 mr-1" /> SEASON 2026 • CHAMPION: RCB
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                Build Your Dream
                <span className="block bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Cricket Dynasty
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Pick your squad of 11 from 10 IPL teams. Compete with friends. Climb the leaderboard.
                Win bragging rights in the most realistic cricket fantasy experience.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => setSection("team-builder")}
                  className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-xl hover:shadow-orange-500/30 text-white font-bold px-6 rounded-full"
                >
                  <Volleyball className="w-4 h-4 mr-2" /> Build Your Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSection("leaderboard")}
                  className="rounded-full border-slate-300 font-bold"
                >
                  <Trophy className="w-4 h-4 mr-2" /> View Leaderboard
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <HeroStat label="Players" value="180+" icon={Users} />
                <HeroStat label="Matches" value="74" icon={Calendar} />
                <HeroStat label="Fantasy Teams" value="2.4K" icon={Trophy} />
              </div>
            </motion.div>

            {/* Right - Featured Match Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeaturedMatchCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM BADGES STRIP */}
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
                <div
                  key={abbr}
                  className="group cursor-pointer"
                >
                  <div
                    className="aspect-square rounded-2xl flex items-center justify-center font-black text-white text-sm sm:text-base shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${team.primary}, ${team.secondary})` }}
                  >
                    {abbr}
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold text-slate-600 text-center truncate">{team.shortName}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon={Volleyball}
            title="Team Builder"
            desc="Create your fantasy XI"
            color="from-rose-500 to-orange-500"
            onClick={() => setSection("team-builder")}
          />
          <QuickActionCard
            icon={Users}
            title="Player Stats"
            desc="Analyze 180+ players"
            color="from-emerald-500 to-teal-500"
            onClick={() => setSection("players")}
          />
          <QuickActionCard
            icon={Calendar}
            title="Fixtures"
            desc="All 74 matches schedule"
            color="from-violet-500 to-purple-500"
            onClick={() => setSection("schedule")}
          />
          <QuickActionCard
            icon={Trophy}
            title="Leaderboard"
            desc="See top fantasy teams"
            color="from-amber-500 to-yellow-500"
            onClick={() => setSection("leaderboard")}
          />
        </div>
      </section>

      {/* TOP PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <Badge className="mb-2 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
              <Flame className="w-3 h-3 mr-1" /> HOT PICKS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Top Performing Players</h2>
            <p className="text-sm text-slate-500 mt-1">Based on season form, points & selection rate</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSection("players")} className="hidden sm:flex">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {PLAYERS.filter((p) => p.isTopPick).sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 5).map((p, i) => (
            <TopPickCard key={p.id} player={p} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* LATEST RESULTS + IMPACT */}
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
                {MATCHES.filter((m) => m.isCompleted && m.stage === "Final" || m.id === 71 || m.id === 73).slice(0, 4).map((m) => (
                  <ResultRow key={m.id} match={m} />
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-2 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                <Crown className="w-3 h-3 mr-1" /> IMPACT PLAYERS
              </Badge>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">Match Heroes</h2>
              <div className="space-y-3">
                {IMPACT_PLAYERS.map((ip, i) => (
                  <Card key={i} className="p-4 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: TEAMS[ip.team]?.primary }}>
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

      {/* CHAMPIONS BANNER */}
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
              <p className="mt-2 text-white/80">
                Beat Gujarat Titans by 5 wickets in the Final at Narendra Modi Stadium, Ahmedabad
              </p>
              <p className="mt-2 text-sm text-white/70 font-mono">RCB 161/5 (18.0) | GT 155/8 (20.0)</p>
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
  const match = UPCOMING_MATCHES[0];
  const teamA = TEAMS[match.abbrs[0]];
  const teamB = TEAMS[match.abbrs[1]];
  return (
    <Card className="overflow-hidden border-slate-200 shadow-2xl shadow-slate-300/50">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-rose-500 hover:bg-rose-500 text-white border-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
            UPCOMING
          </Badge>
          <span className="text-xs font-semibold text-white/70">{match.date}</span>
        </div>
        <span className="text-xs text-white/60 font-mono">Match {match.id}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <TeamBadgeLarge team={teamA} />
          <div className="text-center">
            <div className="text-xs font-bold text-slate-400 uppercase">VS</div>
            <div className="text-[10px] text-slate-400 mt-1">{match.time}</div>
          </div>
          <TeamBadgeLarge team={teamB} />
        </div>
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Target className="w-3.5 h-3.5" />
            <span className="font-medium">{match.venue}</span>
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

function TopPickCard({ player, rank }: { player: Player; rank: number }) {
  const team = TEAMS[player.team];
  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-all group">
      <div
        className="h-2"
        style={{ background: `linear-gradient(to right, ${team.primary}, ${team.secondary})` }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
            style={{ background: team.primary }}
          >
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
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: teamA.primary }}>
            {match.abbrs[0]}
          </div>
          <div className="font-semibold text-slate-900 text-sm hidden sm:block">{teamA.shortName}</div>
        </div>
        <div className="text-center">
          <Badge variant="outline" className="text-[10px] bg-slate-50">
            {match.stage || "League"}
          </Badge>
        </div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="font-semibold text-slate-900 text-sm hidden sm:block">{teamB.shortName}</div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: teamB.primary }}>
            {match.abbrs[1]}
          </div>
        </div>
      </div>
      {match.result && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-700 font-medium">{match.result}</div>
          {match.score && <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{match.score}</div>}
        </div>
      )}
    </Card>
  );
}

// ============ TEAM BUILDER ============
function TeamBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [captain, setCaptain] = useState<string | null>(null);
  const [viceCaptain, setViceCaptain] = useState<string | null>(null);
  const [filterTeam, setFilterTeam] = useState<string>("ALL");
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const [search, setSearch] = useState("");

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
    selectedPlayers.forEach((p) => {
      c[p.team] = (c[p.team] || 0) + 1;
    });
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
      if (selected.length >= MAX_PLAYERS) return;
      if (totalCredits + player.credits > BUDGET) return;
      if ((teamCount[player.team] || 0) >= MAX_PER_TEAM) return;
      setSelected([...selected, id]);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-2 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
          <Volleyball className="w-3 h-3 mr-1" /> TEAM BUILDER
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Create Your Fantasy XI</h1>
        <p className="text-sm text-slate-500 mt-1">Budget: 100 credits • Max 11 players • Max 7 per team</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Player List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <Card className="p-4 border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search players..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200"
                />
              </div>
              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Teams</SelectItem>
                  {TEAM_ABBRS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  {ROLE_ORDER.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Player Grid */}
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
                  className={`p-4 transition-all cursor-pointer border-2 ${
                    isSelected ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 hover:border-slate-300"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}
                  onClick={() => !disabled && togglePlayer(p.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold shadow flex-shrink-0"
                      style={{ background: team.primary }}
                    >
                      {p.team}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm truncate">{p.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant="outline" className={`text-[10px] ${ROLE_COLORS[p.role]}`}>
                          {p.role}
                        </Badge>
                        {p.isTopPick && (
                          <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                            <Star className="w-2.5 h-2.5 mr-0.5" /> Top
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">{p.credits.toFixed(1)}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">credits</div>
                    </div>
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Plus className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                  {/* Stats row */}
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Pts</div>
                      <div className="text-sm font-bold text-slate-900">{p.totalPoints}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Sel%</div>
                      <div className="text-sm font-bold text-slate-900">{p.selectedBy}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Form</div>
                      <div className="flex items-center justify-center gap-0.5">
                        {p.form.slice(-3).map((f, i) => (
                          <div key={i} className={`w-1 h-3 rounded-sm ${
                            f > 60 ? "bg-emerald-500" : f > 40 ? "bg-amber-400" : "bg-rose-400"
                          }`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right: Squad Summary */}
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
                  <div className={`text-2xl font-black ${remainingBudget < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                    {remainingBudget.toFixed(1)}
                  </div>
                </div>
              </div>
              <Progress value={(selected.length / 11) * 100} className="h-2 mb-4" />

              {/* Role counts */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {ROLE_ORDER.map((r) => (
                  <div key={r} className="text-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-base">{ROLE_ICONS[r]}</div>
                    <div className="text-lg font-black text-slate-900">{roleCount[r]}</div>
                    <div className="text-[9px] text-slate-500 font-semibold uppercase leading-tight">{r.slice(0, 4)}</div>
                  </div>
                ))}
              </div>

              {/* Captain selection */}
              {selected.length === 11 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-500" /> Captain (2x points)
                    </div>
                    <Select value={captain || ""} onValueChange={setCaptain}>
                      <SelectTrigger className="bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Choose captain" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
                      <Star className="w-3 h-3 text-violet-500" /> Vice-Captain (1.5x)
                    </div>
                    <Select value={viceCaptain || ""} onValueChange={setViceCaptain}>
                      <SelectTrigger className="bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Choose vice-captain" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedPlayers.filter((p) => p.id !== captain).map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:shadow-lg"
                disabled={selected.length !== 11}
              >
                {selected.length === 11 ? "Save Team & Join Contest" : `Select ${11 - selected.length} more`}
              </Button>
            </Card>

            {/* Selected players list */}
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
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ background: team.primary }}
                        >
                          {p.team}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.role}</div>
                        </div>
                        {isCap && <Badge className="text-[9px] bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">C</Badge>}
                        {isVC && <Badge className="text-[9px] bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">VC</Badge>}
                        <button
                          onClick={() => togglePlayer(p.id)}
                          className="text-rose-400 hover:text-rose-600 transition-colors"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
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

// ============ PLAYERS SECTION ============
function PlayersSection() {
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
      <div className="mb-6">
        <Badge className="mb-2 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          <Users className="w-3 h-3 mr-1" /> PLAYER DATABASE
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">All Players</h1>
        <p className="text-sm text-slate-500 mt-1">{PLAYERS.length} players across 10 IPL teams</p>
      </div>

      {/* Filters */}
      <Card className="p-4 border-slate-200 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search player by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              {ROLE_ORDER.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterTeam} onValueChange={setFilterTeam}>
            <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Teams</SelectItem>
              {TEAM_ABBRS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[160px] bg-slate-50 border-slate-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Most Points</SelectItem>
              <SelectItem value="credits">Highest Credits</SelectItem>
              <SelectItem value="selected">Most Selected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Players Table */}
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
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ background: team.primary }}
                        >
                          {p.team}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3">
                      <Badge variant="outline" className={`text-[10px] ${ROLE_COLORS[p.role]}`}>{p.role}</Badge>
                    </td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell">
                      <span className="font-mono text-xs font-bold text-slate-700">{p.team}</span>
                    </td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.matches}</td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.runs ?? "-"}</td>
                    <td className="text-center py-3 px-3 hidden md:table-cell text-slate-700 font-medium">{p.wickets ?? "-"}</td>
                    <td className="text-center py-3 px-3">
                      <span className="font-black text-slate-900">{p.totalPoints}</span>
                    </td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell text-slate-700 font-medium">{p.selectedBy}%</td>
                    <td className="text-center py-3 px-3">
                      <Badge variant="outline" className="font-mono bg-slate-50">{p.credits.toFixed(1)}</Badge>
                    </td>
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
        <p className="text-sm text-slate-500 mt-1">IPL 2026 — All matches across the season</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">Upcoming ({UPCOMING_MATCHES.length})</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white">Results ({MATCHES.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {UPCOMING_MATCHES.map((m) => (
              <UpcomingMatchCard key={m.id} match={m} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-5">
          <div className="space-y-3">
            {MATCHES.map((m) => (
              <ResultRow key={m.id} match={m} />
            ))}
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
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black shadow-md"
              style={{ background: `linear-gradient(135deg, ${teamA.primary}, ${teamA.secondary})` }}
            >
              {teamA.abbr}
            </div>
            <div className="text-xs font-semibold text-slate-700">{teamA.shortName}</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold text-slate-400">VS</div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">{match.time}</div>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black shadow-md"
              style={{ background: `linear-gradient(135deg, ${teamB.primary}, ${teamB.secondary})` }}
            >
              {teamB.abbr}
            </div>
            <div className="text-xs font-semibold text-slate-700">{teamB.shortName}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium truncate">{match.venue}</div>
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
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Team Standings</h1>
        <p className="text-sm text-slate-500 mt-1">IPL 2026 League Stage Standings</p>
      </div>

      <Card className="border-slate-200 overflow-hidden">
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
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                        i === 0 ? "bg-amber-100 text-amber-700" :
                        i < 4 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {i + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ background: team.primary }}
                        >
                          {team.abbr}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm hidden sm:block">{team.name}</div>
                          <div className="font-bold text-slate-900 text-sm sm:hidden">{team.abbr}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3 text-slate-700 font-semibold">{s.played}</td>
                    <td className="text-center py-3 px-3 text-emerald-600 font-bold">{s.won}</td>
                    <td className="text-center py-3 px-3 text-rose-600 font-bold">{s.lost}</td>
                    <td className="text-center py-3 px-3 text-slate-700 font-mono text-xs">
                      {s.nrr > 0 ? "+" : ""}{s.nrr.toFixed(3)}
                    </td>
                    <td className="text-center py-3 px-3">
                      <span className="font-black text-slate-900 text-base">{s.points}</span>
                    </td>
                    <td className="text-center py-3 px-3 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {s.form.map((r, idx) => (
                          <div key={idx} className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center text-white ${
                            r === "W" ? "bg-emerald-500" : r === "L" ? "bg-rose-500" : "bg-slate-400"
                          }`}>
                            {r}
                          </div>
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
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-100" /> Top 4 qualify for Playoffs
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-100" /> League Winner
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============ LEADERBOARD SECTION ============
function LeaderboardSection() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Badge className="mb-2 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          <Trophy className="w-3 h-3 mr-1" /> FANTASY LEADERBOARD
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Top Fantasy Teams</h1>
        <p className="text-sm text-slate-500 mt-1">Leading fantasy squads in the IPL 2026 season</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 max-w-3xl mx-auto">
        {[1, 0, 2].map((idx) => {
          const t = FANTASY_LEADERBOARD[idx];
          const isFirst = idx === 0;
          const heights = ["h-32 sm:h-40", "h-40 sm:h-52", "h-28 sm:h-32"];
          const medals = ["🥇", "🥈", "🥉"];
          const colors = ["from-amber-400 to-yellow-500", "from-slate-300 to-slate-400", "from-orange-400 to-amber-700"];
          return (
            <div key={t.rank} className="flex flex-col items-center">
              {isFirst ? (
                <div className="text-3xl sm:text-4xl mb-1">👑</div>
              ) : (
                <div className="text-2xl sm:text-3xl mb-1">{medals[idx]}</div>
              )}
              <div className={`${heights[idx]} w-full bg-gradient-to-br ${colors[idx]} rounded-t-2xl flex items-end justify-center pb-3 shadow-lg`}>
                <div className="text-white font-black text-2xl sm:text-3xl">#{t.rank}</div>
              </div>
              <Card className="w-full p-3 sm:p-4 -mt-2 border-slate-200 text-center">
                <div className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">{t.teamName}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{t.owner}</div>
                <div className="text-lg sm:text-2xl font-black text-slate-900 mt-1">{t.totalPoints}</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold">points</div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
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
          {FANTASY_LEADERBOARD.map((t) => (
            <div key={t.rank}>
              <div
                className="p-3 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 cursor-pointer"
                onClick={() => setExpanded(expanded === t.rank ? null : t.rank)}
              >
                <div className="col-span-1 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mx-auto ${
                    t.rank === 1 ? "bg-amber-100 text-amber-700" :
                    t.rank === 2 ? "bg-slate-200 text-slate-700" :
                    t.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {t.rank}
                  </div>
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <div className="font-bold text-slate-900 text-sm">{t.teamName}</div>
                  <div className="text-xs text-slate-500">{t.owner}</div>
                </div>
                <div className="col-span-2 hidden sm:block text-xs text-slate-700">{t.captain}</div>
                <div className="col-span-2 text-center">
                  <div className="font-black text-slate-900">{t.totalPoints}</div>
                </div>
                <div className="col-span-2 text-center">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    +{t.weekPoints}
                  </Badge>
                </div>
                <div className="col-span-2 sm:col-span-1 text-center">
                  {t.rank < t.prevRank ? <ArrowUp className="w-4 h-4 text-emerald-500 mx-auto" /> :
                   t.rank > t.prevRank ? <ArrowDown className="w-4 h-4 text-rose-500 mx-auto" /> :
                   <Minus className="w-4 h-4 text-slate-400 mx-auto" />}
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
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                            style={{ background: team.primary }}
                          >
                            {p.team}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                              {p.name}
                              {p.isCaptain && <Crown className="w-3 h-3 text-amber-500 flex-shrink-0" />}
                              {p.isViceCaptain && <Star className="w-3 h-3 text-violet-500 flex-shrink-0" />}
                            </div>
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

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center">
                <Volleyball className="w-4 h-4 text-white" />
              </div>
              <div className="font-black text-slate-900">IPL FANTASY</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The premium cricket fantasy experience. Built with passion for IPL 2026.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">Game</div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="hover:text-slate-900 cursor-pointer">Build Team</div>
              <div className="hover:text-slate-900 cursor-pointer">Players</div>
              <div className="hover:text-slate-900 cursor-pointer">Schedule</div>
              <div className="hover:text-slate-900 cursor-pointer">Standings</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">Teams</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-500">
              {TEAM_ABBRS.slice(0, 6).map((t) => (
                <div key={t} className="hover:text-slate-900 cursor-pointer">{t}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-2">About</div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="hover:text-slate-900 cursor-pointer">How to Play</div>
              <div className="hover:text-slate-900 cursor-pointer">Point System</div>
              <div className="hover:text-slate-900 cursor-pointer">Fair Play</div>
              <div className="hover:text-slate-900 cursor-pointer">Contact</div>
            </div>
          </div>
        </div>
        <Separator className="mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>© 2026 IPL Fantasy League. Not affiliated with BCCI/IPL.</div>
          <div className="flex items-center gap-3">
            <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms</span>
            <span className="hover:text-slate-900 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  teamName: string;
  joinedAt: number;
}

export interface UserTeam {
  owner: string;
  teamName: string;
  totalPoints: number;
  weekPoints: number;
  captain: string;
  players: { name: string; team: string; points: number; isCaptain?: boolean; isViceCaptain?: boolean }[];
  joinedAt: number;
}

interface AuthContextValue {
  user: User | null;
  savedTeam: UserTeam | null;
  savedTeams: UserTeam[];
  join: (name: string, teamName: string) => void;
  logout: () => void;
  saveTeam: (team: UserTeam) => void;
  hasJoined: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "ipl_fantasy_user";
const SAVED_TEAMS_KEY = "ipl_fantasy_saved_teams";

function loadFromStorage() {
  if (typeof window === "undefined") {
    return { user: null, teams: [], myTeam: null };
  }
  try {
    const u = localStorage.getItem(USER_KEY);
    const t = localStorage.getItem(SAVED_TEAMS_KEY);
    const parsedUser = u ? JSON.parse(u) : null;
    const parsedTeams = t ? JSON.parse(t) : [];
    const myTeam = parsedUser ? parsedTeams.find((tm: UserTeam) => tm.owner === parsedUser.name && tm.teamName === parsedUser.teamName) : null;
    return { user: parsedUser, teams: parsedTeams, myTeam: myTeam || null };
  } catch {
    return { user: null, teams: [], myTeam: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lazy initialize from localStorage — runs once on first render
  const [initial] = useState(loadFromStorage);
  const [user, setUser] = useState<User | null>(initial.user);
  const [savedTeam, setSavedTeam] = useState<UserTeam | null>(initial.myTeam);
  const [savedTeams, setSavedTeams] = useState<UserTeam[]>(initial.teams);

  function join(name: string, teamName: string) {
    const newUser: User = { name, teamName, joinedAt: Date.now() };
    setUser(newUser);
    try { localStorage.setItem(USER_KEY, JSON.stringify(newUser)); } catch {}
  }

  function logout() {
    setUser(null);
    setSavedTeam(null);
    try { localStorage.removeItem(USER_KEY); } catch {}
  }

  function saveTeam(team: UserTeam) {
    const newTeams = [...savedTeams.filter((t) => !(t.owner === team.owner && t.teamName === team.teamName)), team];
    setSavedTeams(newTeams);
    setSavedTeam(team);
    try { localStorage.setItem(SAVED_TEAMS_KEY, JSON.stringify(newTeams)); } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, savedTeam, savedTeams, join, logout, saveTeam, hasJoined: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

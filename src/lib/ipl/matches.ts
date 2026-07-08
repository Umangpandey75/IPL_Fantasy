// IPL 2026 Match Schedule & Results
export interface Match {
  id: number;
  name: string;
  teams: [string, string];
  abbrs: [string, string];
  date: string;
  time: string;
  venue: string;
  isCompleted: boolean;
  result?: string;
  score?: string;
  stage?: "League" | "Qualifier 1" | "Eliminator" | "Qualifier 2" | "Final";
}

export const MATCHES: Match[] = [
  { id: 1, name: "Match 1: RCB vs SRH", teams: ["Royal Challengers Bengaluru", "Sunrisers Hyderabad"], abbrs: ["RCB", "SRH"], date: "Sat, 28 Mar 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium", isCompleted: true, result: "RCB beat SRH by 12 runs", score: "RCB 218/4 (20) | SRH 206/8 (20)", stage: "League" },
  { id: 2, name: "Match 2: MI vs KKR", teams: ["Mumbai Indians", "Kolkata Knight Riders"], abbrs: ["MI", "KKR"], date: "Sun, 29 Mar 2026", time: "7:30 PM", venue: "Wankhede Stadium", isCompleted: true, result: "KKR beat MI by 8 wickets", score: "MI 168/7 (20) | KKR 169/2 (18.2)", stage: "League" },
  { id: 3, name: "Match 3: RR vs CSK", teams: ["Rajasthan Royals", "Chennai Super Kings"], abbrs: ["RR", "CSK"], date: "Mon, 30 Mar 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium", isCompleted: true, result: "CSK beat RR by 24 runs", score: "CSK 195/6 (20) | RR 171/9 (20)", stage: "League" },
  { id: 33, name: "Match 33: MI vs CSK", teams: ["Mumbai Indians", "Chennai Super Kings"], abbrs: ["MI", "CSK"], date: "Thu, 23 Apr 2026", time: "7:30 PM", venue: "Wankhede Stadium", isCompleted: true, result: "CSK beat MI by 103 runs", score: "CSK 207/6 (20) | MI 104/10 (19)", stage: "League" },
  { id: 34, name: "Match 34: RCB vs GT", teams: ["Royal Challengers Bengaluru", "Gujarat Titans"], abbrs: ["RCB", "GT"], date: "Fri, 24 Apr 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium", isCompleted: true, result: "RCB beat GT by 5 wickets", score: "RCB 206/5 (18.5) | GT 205/3 (20)", stage: "League" },
  { id: 35, name: "Match 35: DC vs PBKS", teams: ["Delhi Capitals", "Punjab Kings"], abbrs: ["DC", "PBKS"], date: "Sat, 25 Apr 2026", time: "3:30 PM", venue: "Arun Jaitley Stadium", isCompleted: true, result: "PBKS beat DC by 6 wickets", score: "PBKS 265/4 (18.5) | DC 264/2 (20)", stage: "League" },
  { id: 36, name: "Match 36: RR vs SRH", teams: ["Rajasthan Royals", "Sunrisers Hyderabad"], abbrs: ["RR", "SRH"], date: "Sat, 25 Apr 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium", isCompleted: true, result: "SRH beat RR by 5 wickets", score: "RR 228/6 (20) | SRH 229/5 (18.3)", stage: "League" },
  { id: 71, name: "Qualifier 1: RCB vs GT", teams: ["Royal Challengers Bengaluru", "Gujarat Titans"], abbrs: ["RCB", "GT"], date: "Tue, 26 May 2026", time: "7:30 PM", venue: "Dharamshala", isCompleted: true, result: "RCB beat GT by 92 runs", score: "RCB 254/5 (20) | GT 162/10 (19.3)", stage: "Qualifier 1" },
  { id: 72, name: "Eliminator: SRH vs RR", teams: ["Sunrisers Hyderabad", "Rajasthan Royals"], abbrs: ["SRH", "RR"], date: "Wed, 27 May 2026", time: "7:30 PM", venue: "New Chandigarh", isCompleted: true, result: "RR beat SRH by 47 runs", score: "RR 243/8 (20) | SRH 196/10 (19.2)", stage: "Eliminator" },
  { id: 73, name: "Qualifier 2: GT vs RR", teams: ["Gujarat Titans", "Rajasthan Royals"], abbrs: ["GT", "RR"], date: "Fri, 29 May 2026", time: "7:30 PM", venue: "New Chandigarh", isCompleted: true, result: "GT beat RR by 7 wickets", score: "GT 219/3 (18.4) | RR 214/6 (20)", stage: "Qualifier 2" },
  { id: 74, name: "Final: RCB vs GT", teams: ["Royal Challengers Bengaluru", "Gujarat Titans"], abbrs: ["RCB", "GT"], date: "Sun, 31 May 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "RCB beat GT by 5 wickets — CHAMPIONS!", score: "RCB 161/5 (18) | GT 155/8 (20)", stage: "Final" },
];

// Upcoming matches (next fixtures in 2026)
export const UPCOMING_MATCHES: Match[] = [
  { id: 101, name: "Match 75: RCB vs MI", teams: ["Royal Challengers Bengaluru", "Mumbai Indians"], abbrs: ["RCB", "MI"], date: "Sat, 12 Sep 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium", isCompleted: false, stage: "League" },
  { id: 102, name: "Match 76: CSK vs KKR", teams: ["Chennai Super Kings", "Kolkata Knight Riders"], abbrs: ["CSK", "KKR"], date: "Sun, 13 Sep 2026", time: "3:30 PM", venue: "M.A. Chidambaram Stadium", isCompleted: false, stage: "League" },
  { id: 103, name: "Match 77: SRH vs DC", teams: ["Sunrisers Hyderabad", "Delhi Capitals"], abbrs: ["SRH", "DC"], date: "Sun, 13 Sep 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium", isCompleted: false, stage: "League" },
  { id: 104, name: "Match 78: GT vs PBKS", teams: ["Gujarat Titans", "Punjab Kings"], abbrs: ["GT", "PBKS"], date: "Mon, 14 Sep 2026", time: "7:30 PM", venue: "Narendra Modi Stadium", isCompleted: false, stage: "League" },
  { id: 105, name: "Match 79: RR vs LSG", teams: ["Rajasthan Royals", "Lucknow Super Giants"], abbrs: ["RR", "LSG"], date: "Tue, 15 Sep 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium", isCompleted: false, stage: "League" },
];

export interface TeamStanding {
  abbr: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  nrr: number;
  points: number;
  form: ("W" | "L" | "T")[];
}

export const STANDINGS: TeamStanding[] = [
  { abbr: "RCB", played: 14, won: 10, lost: 4, tied: 0, nrr: 0.842, points: 20, form: ["W", "W", "W", "L", "W"] },
  { abbr: "GT", played: 14, won: 9, lost: 5, tied: 0, nrr: 0.612, points: 18, form: ["W", "L", "W", "W", "W"] },
  { abbr: "SRH", played: 14, won: 8, lost: 6, tied: 0, nrr: 0.345, points: 16, form: ["L", "W", "W", "L", "W"] },
  { abbr: "RR", played: 14, won: 8, lost: 6, tied: 0, nrr: 0.218, points: 16, form: ["W", "L", "W", "W", "L"] },
  { abbr: "CSK", played: 14, won: 7, lost: 7, tied: 0, nrr: -0.124, points: 14, form: ["W", "W", "L", "L", "W"] },
  { abbr: "MI", played: 14, won: 7, lost: 7, tied: 0, nrr: -0.234, points: 14, form: ["L", "W", "L", "W", "W"] },
  { abbr: "KKR", played: 14, won: 6, lost: 8, tied: 0, nrr: -0.382, points: 12, form: ["L", "W", "L", "L", "W"] },
  { abbr: "PBKS", played: 14, won: 6, lost: 8, tied: 0, nrr: -0.451, points: 12, form: ["L", "L", "W", "L", "W"] },
  { abbr: "DC", played: 14, won: 5, lost: 9, tied: 0, nrr: -0.612, points: 10, form: ["L", "L", "W", "L", "L"] },
  { abbr: "LSG", played: 14, won: 4, lost: 10, tied: 0, nrr: -0.845, points: 8, form: ["L", "L", "L", "W", "L"] },
];

// Fantasy Leaderboard
export interface FantasyTeam {
  rank: number;
  prevRank: number;
  teamName: string;
  owner: string;
  totalPoints: number;
  weekPoints: number;
  captain: string;
  players: { name: string; team: string; points: number; isCaptain?: boolean; isViceCaptain?: boolean }[];
}

export const FANTASY_LEADERBOARD: FantasyTeam[] = [
  {
    rank: 1, prevRank: 2, teamName: "Shabad's Strikers", owner: "Shabad Grover", totalPoints: 4892, weekPoints: 312, captain: "Virat Kohli",
    players: [
      { name: "Virat Kohli", team: "RCB", points: 892, isCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854, isViceCaptain: true },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Nicholas Pooran", team: "LSG", points: 712 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Sunil Narine", team: "KKR", points: 712 },
      { name: "Matheesha Pathirana", team: "CSK", points: 598 },
      { name: "Arshdeep Singh", team: "PBKS", points: 598 },
    ],
  },
  {
    rank: 2, prevRank: 1, teamName: "Virat's Warriors", owner: "Virat Singh", totalPoints: 4768, weekPoints: 287, captain: "Suryakumar Yadav",
    players: [
      { name: "Suryakumar Yadav", team: "MI", points: 812, isCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892, isViceCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Yashasvi Jaiswal", team: "RR", points: 824 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Travis Head", team: "SRH", points: 712 },
      { name: "Yuzvendra Chahal", team: "RR", points: 648 },
      { name: "Kuldeep Yadav", team: "DC", points: 642 },
    ],
  },
  {
    rank: 3, prevRank: 3, teamName: "Dhoni's Dynamos", owner: "Arjun Mehta", totalPoints: 4654, weekPoints: 298, captain: "MS Dhoni",
    players: [
      { name: "MS Dhoni", team: "CSK", points: 562, isCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Sunil Narine", team: "KKR", points: 712 },
      { name: "Ruturaj Gaikwad", team: "CSK", points: 698 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
  {
    rank: 4, prevRank: 6, teamName: "Mumbai Paltan", owner: "Rohit Fan", totalPoints: 4521, weekPoints: 325, captain: "Rohit Sharma",
    players: [
      { name: "Rohit Sharma", team: "MI", points: 645, isCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Hardik Pandya", team: "MI", points: 712 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Tilak Varma", team: "MI", points: 562 },
      { name: "Mitchell Starc", team: "MI", points: 698 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
  {
    rank: 5, prevRank: 4, teamName: "Knight Riders XI", owner: "Priya Nair", totalPoints: 4489, weekPoints: 276, captain: "Andre Russell",
    players: [
      { name: "Andre Russell", team: "KKR", points: 798, isCaptain: true },
      { name: "Sunil Narine", team: "KKR", points: 712, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Varun Chakravarthy", team: "KKR", points: 612 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Shreyas Iyer", team: "PBKS", points: 642 },
      { name: "Rinku Singh", team: "KKR", points: 524 },
      { name: "Harshit Rana", team: "KKR", points: 482 },
    ],
  },
  {
    rank: 6, prevRank: 5, teamName: "Lions XI", owner: "Karan Singh", totalPoints: 4421, weekPoints: 268, captain: "Shubman Gill",
    players: [
      { name: "Shubman Gill", team: "GT", points: 856, isCaptain: true },
      { name: "Rashid Khan", team: "GT", points: 768, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Sai Sudharsan", team: "GT", points: 642 },
      { name: "Mohammed Siraj", team: "GT", points: 658 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Noor Ahmad", team: "GT", points: 482 },
      { name: "Washington Sundar", team: "GT", points: 438 },
    ],
  },
  {
    rank: 7, prevRank: 7, teamName: "Royal Riders", owner: "Ananya R", totalPoints: 4318, weekPoints: 245, captain: "Rishabh Pant",
    players: [
      { name: "Rishabh Pant", team: "LSG", points: 768, isCaptain: true },
      { name: "Nicholas Pooran", team: "LSG", points: 712, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Ayush Badoni", team: "LSG", points: 372 },
      { name: "Mayank Yadav", team: "LSG", points: 382 },
      { name: "Wanindu Hasaranga", team: "LSG", points: 548 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
  {
    rank: 8, prevRank: 8, teamName: "Punjab Power", owner: "Harkirat", totalPoints: 4267, weekPoints: 234, captain: "Shreyas Iyer",
    players: [
      { name: "Shreyas Iyer", team: "PBKS", points: 642, isCaptain: true },
      { name: "Arshdeep Singh", team: "PBKS", points: 598, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Kagiso Rabada", team: "PBKS", points: 658 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Liam Livingstone", team: "PBKS", points: 487 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Prabhsimran Singh", team: "PBKS", points: 458 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
];

// Player performance progression across matches
export const PLAYER_PROGRESSION = {
  "Virat Kohli": [85, 42, 110, 67, 95, 78, 102, 88, 75, 92],
  "Shubman Gill": [62, 95, 85, 78, 88, 102, 75, 91, 68, 82],
  "Jasprit Bumrah": [72, 85, 91, 65, 78, 88, 75, 82, 95, 68],
  "Suryakumar Yadav": [78, 52, 95, 68, 81, 88, 75, 92, 65, 78],
  "Andre Russell": [78, 52, 88, 65, 72, 85, 68, 92, 75, 88],
  "Rashid Khan": [72, 58, 85, 65, 78, 82, 88, 75, 92, 68],
};

// Recent Match Impact Players
export interface ImpactPlayer {
  matchId: number;
  playerName: string;
  team: string;
  points: number;
  role: string;
  reason: string;
}

export const IMPACT_PLAYERS: ImpactPlayer[] = [
  { matchId: 74, playerName: "Virat Kohli", team: "RCB", points: 142, role: "Batsman", reason: "78 runs (42 balls) in Final — Captain's knock" },
  { matchId: 73, playerName: "Shubman Gill", team: "GT", points: 128, role: "Batsman", reason: "95 runs (48 balls) — anchored the chase" },
  { matchId: 72, playerName: "Yuzvendra Chahal", team: "RR", points: 165, role: "Bowler", reason: "5/22 in 4 overs — match-winning spell" },
  { matchId: 71, playerName: "Andre Russell", team: "KKR", points: 158, role: "All-Rounder", reason: "62 (24) + 3/28 — complete all-round show" },
];

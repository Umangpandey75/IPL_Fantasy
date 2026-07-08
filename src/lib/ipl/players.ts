// IPL 2026 Players Database
export type PlayerRole = "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper";

export interface Player {
  id: string;
  name: string;
  team: string;
  role: PlayerRole;
  credits: number;
  country: string;
  // Stats
  matches: number;
  runs?: number;
  wickets?: number;
  avg?: number;
  sr?: number;
  econ?: number;
  // Form: last 5 matches points
  form: number[];
  totalPoints: number;
  selectedBy: number; // percentage
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isTopPick?: boolean;
  injury?: string;
}

// Helper to generate form array
const f = (...args: number[]) => args;

export const PLAYERS: Player[] = [
  // ===== RCB =====
  { id: "vkohli", name: "Virat Kohli", team: "RCB", role: "Batsman", credits: 11.0, country: "India", matches: 16, runs: 765, avg: 54.6, sr: 156.2, form: f(85, 42, 110, 67, 95), totalPoints: 892, selectedBy: 92.4, isTopPick: true },
  { id: "rshepherd", name: "Romario Shepherd", team: "RCB", role: "All-Rounder", credits: 9.5, country: "West Indies", matches: 14, runs: 312, wickets: 11, avg: 28.4, sr: 198.5, econ: 9.8, form: f(72, 35, 88, 51, 67), totalPoints: 612, selectedBy: 68.2, isTopPick: true },
  { id: "jdhuf", name: "Jacob Duffy", team: "RCB", role: "Bowler", credits: 8.5, country: "New Zealand", matches: 12, wickets: 18, econ: 8.4, form: f(45, 62, 38, 71, 55), totalPoints: 548, selectedBy: 54.7 },
  { id: "dpadikkal", name: "Devdutt Padikkal", team: "RCB", role: "Batsman", credits: 8.0, country: "India", matches: 13, runs: 412, avg: 34.3, sr: 142.8, form: f(28, 55, 41, 67, 38), totalPoints: 425, selectedBy: 38.1, isTopPick: true },
  { id: "jcox", name: "Jordan Cox", team: "RCB", role: "Wicketkeeper", credits: 8.0, country: "England", matches: 11, runs: 298, avg: 27.1, sr: 151.4, form: f(35, 48, 22, 61, 33), totalPoints: 392, selectedBy: 32.5 },
  { id: "linvic", name: "Liam Livingstone", team: "RCB", role: "All-Rounder", credits: 9.0, country: "England", matches: 15, runs: 384, wickets: 7, sr: 168.2, econ: 8.9, form: f(48, 72, 31, 55, 41), totalPoints: 487, selectedBy: 45.3 },
  { id: "kyle", name: "Krunal Pandya", team: "RCB", role: "All-Rounder", credits: 8.5, country: "India", matches: 16, runs: 268, wickets: 12, sr: 142.1, econ: 8.1, form: f(38, 45, 52, 29, 41), totalPoints: 438, selectedBy: 41.8 },

  // ===== CSK =====
  { id: "rutu", name: "Ruturaj Gaikwad", team: "CSK", role: "Batsman", credits: 10.0, country: "India", matches: 15, runs: 584, avg: 41.7, sr: 148.3, form: f(72, 38, 95, 61, 48), totalPoints: 698, selectedBy: 78.5, isTopPick: true },
  { id: "msd", name: "MS Dhoni", team: "CSK", role: "Wicketkeeper", credits: 9.5, country: "India", matches: 16, runs: 312, avg: 52.0, sr: 162.4, form: f(45, 38, 62, 41, 55), totalPoints: 562, selectedBy: 89.7, isTopPick: true },
  { id: "joverton", name: "Jamie Overton", team: "CSK", role: "All-Rounder", credits: 8.5, country: "England", matches: 13, runs: 198, wickets: 14, sr: 175.2, econ: 9.2, form: f(48, 35, 67, 42, 51), totalPoints: 458, selectedBy: 42.1, isTopPick: true },
  { id: "santhner", name: "Mitchell Santner", team: "CSK", role: "All-Rounder", credits: 8.5, country: "New Zealand", matches: 14, runs: 142, wickets: 16, econ: 7.6, form: f(52, 41, 38, 55, 45), totalPoints: 487, selectedBy: 47.2, isTopPick: true },
  { id: "spathirana", name: "Matheesha Pathirana", team: "CSK", role: "Bowler", credits: 9.0, country: "Sri Lanka", matches: 13, wickets: 21, econ: 8.2, form: f(58, 41, 72, 38, 65), totalPoints: 598, selectedBy: 71.4, isTopPick: true },
  { id: "sthakur", name: "Shardul Thakur", team: "CSK", role: "Bowler", credits: 8.5, country: "India", matches: 14, wickets: 17, econ: 9.1, form: f(38, 55, 42, 48, 35), totalPoints: 432, selectedBy: 38.9 },
  { id: "skhan", name: "Sarfaraz Khan", team: "CSK", role: "Batsman", credits: 7.5, country: "India", matches: 11, runs: 287, avg: 31.9, sr: 152.1, form: f(35, 48, 22, 51, 38), totalPoints: 365, selectedBy: 28.4 },
  { id: "mshort", name: "Matthew Short", team: "CSK", role: "Batsman", credits: 8.0, country: "Australia", matches: 10, runs: 245, avg: 28.2, sr: 148.7, form: f(32, 41, 28, 55, 35), totalPoints: 328, selectedBy: 24.8 },
  { id: "mhenry", name: "Matt Henry", team: "CSK", role: "Bowler", credits: 8.0, country: "New Zealand", matches: 12, wickets: 14, econ: 8.8, form: f(42, 35, 48, 31, 38), totalPoints: 392, selectedBy: 31.2 },
  { id: "sdube", name: "Shivam Dube", team: "CSK", role: "All-Rounder", credits: 9.0, country: "India", matches: 15, runs: 348, wickets: 5, sr: 168.5, form: f(52, 41, 68, 35, 48), totalPoints: 514, selectedBy: 56.7 },

  // ===== MI =====
  { id: "hpandya", name: "Hardik Pandya", team: "MI", role: "All-Rounder", credits: 10.5, country: "India", matches: 15, runs: 412, wickets: 13, sr: 158.2, econ: 9.4, form: f(72, 45, 88, 51, 65), totalPoints: 712, selectedBy: 85.6, isTopPick: true },
  { id: "rohit", name: "Rohit Sharma", team: "MI", role: "Batsman", credits: 10.0, country: "India", matches: 16, runs: 542, avg: 38.7, sr: 152.8, form: f(58, 41, 85, 32, 62), totalPoints: 645, selectedBy: 74.2, isTopPick: true },
  { id: "starc", name: "Mitchell Starc", team: "MI", role: "Bowler", credits: 10.0, country: "Australia", matches: 14, wickets: 22, econ: 8.7, form: f(68, 52, 75, 48, 61), totalPoints: 698, selectedBy: 78.9, isTopPick: true },
  { id: "boom", name: "Jasprit Bumrah", team: "MI", role: "Bowler", credits: 11.0, country: "India", matches: 14, wickets: 25, econ: 6.8, form: f(85, 72, 91, 65, 78), totalPoints: 854, selectedBy: 91.3, isTopPick: true },
  { id: "sky", name: "Suryakumar Yadav", team: "MI", role: "Batsman", credits: 10.5, country: "India", matches: 15, runs: 618, avg: 47.5, sr: 178.4, form: f(78, 52, 95, 68, 81), totalPoints: 812, selectedBy: 87.4, isTopPick: true },
  { id: "msantner", name: "Mitchell Santner", team: "MI", role: "All-Rounder", credits: 8.5, country: "New Zealand", matches: 12, runs: 132, wickets: 14, econ: 7.8, form: f(45, 38, 52, 41, 48), totalPoints: 412, selectedBy: 38.5 },
  { id: "tvarma", name: "Tilak Varma", team: "MI", role: "Batsman", credits: 9.0, country: "India", matches: 16, runs: 458, avg: 38.2, sr: 152.1, form: f(52, 41, 68, 35, 55), totalPoints: 562, selectedBy: 58.7 },
  { id: "rminz", name: "Robin Minz", team: "MI", role: "Wicketkeeper", credits: 8.0, country: "India", matches: 10, runs: 198, sr: 145.2, form: f(28, 35, 22, 41, 32), totalPoints: 285, selectedBy: 22.1 },
  { id: "dchahar", name: "Deepak Chahar", team: "MI", role: "Bowler", credits: 8.5, country: "India", matches: 13, wickets: 15, econ: 8.9, form: f(38, 45, 32, 51, 42), totalPoints: 398, selectedBy: 35.4 },
  { id: "nthakur", name: "Naman Dhir", team: "MI", role: "All-Rounder", credits: 7.5, country: "India", matches: 11, runs: 178, wickets: 6, sr: 168.5, form: f(32, 28, 41, 25, 38), totalPoints: 285, selectedBy: 18.9 },

  // ===== KKR =====
  { id: "narine", name: "Sunil Narine", team: "KKR", role: "All-Rounder", credits: 10.0, country: "West Indies", matches: 16, runs: 384, wickets: 17, sr: 168.2, econ: 7.2, form: f(62, 48, 75, 55, 68), totalPoints: 712, selectedBy: 82.1, isTopPick: true },
  { id: "russell", name: "Andre Russell", team: "KKR", role: "All-Rounder", credits: 10.5, country: "West Indies", matches: 15, runs: 412, wickets: 18, sr: 198.5, econ: 9.5, form: f(78, 52, 88, 65, 72), totalPoints: 798, selectedBy: 84.5, isTopPick: true },
  { id: "iyer", name: "Shreyas Iyer", team: "KKR", role: "Batsman", credits: 10.0, country: "India", matches: 16, runs: 542, avg: 41.7, sr: 152.4, form: f(68, 41, 82, 55, 65), totalPoints: 658, selectedBy: 76.8 },
  { id: "rinku", name: "Rinku Singh", team: "KKR", role: "Batsman", credits: 9.0, country: "India", matches: 15, runs: 398, avg: 39.8, sr: 148.5, form: f(52, 38, 65, 48, 41), totalPoints: 524, selectedBy: 62.3 },
  { id: "rpowell", name: "Rovman Powell", team: "KKR", role: "Batsman", credits: 8.5, country: "West Indies", matches: 12, runs: 287, avg: 31.9, sr: 165.4, form: f(45, 32, 58, 38, 48), totalPoints: 412, selectedBy: 41.5, isTopPick: true },
  { id: "rsingh", name: "Ramandeep Singh", team: "KKR", role: "All-Rounder", credits: 8.0, country: "India", matches: 13, runs: 198, wickets: 8, sr: 178.2, form: f(38, 45, 32, 52, 41), totalPoints: 382, selectedBy: 32.8 },
  { id: "ktyagi", name: "Kartik Tyagi", team: "KKR", role: "Bowler", credits: 8.0, country: "India", matches: 12, wickets: 14, econ: 8.9, form: f(38, 45, 32, 51, 42), totalPoints: 385, selectedBy: 34.2, isTopPick: true },
  { id: "mpandey", name: "Manish Pandey", team: "KKR", role: "Batsman", credits: 8.0, country: "India", matches: 11, runs: 245, avg: 27.2, sr: 132.5, form: f(28, 35, 41, 22, 38), totalPoints: 298, selectedBy: 21.4 },
  { id: "hrana", name: "Harshit Rana", team: "KKR", role: "Bowler", credits: 8.5, country: "India", matches: 14, wickets: 18, econ: 9.2, form: f(52, 41, 38, 55, 48), totalPoints: 482, selectedBy: 51.4 },
  { id: "varun", name: "Varun Chakravarthy", team: "KKR", role: "Bowler", credits: 9.0, country: "India", matches: 15, wickets: 21, econ: 7.8, form: f(58, 45, 62, 51, 68), totalPoints: 612, selectedBy: 68.9 },

  // ===== DC =====
  { id: "axar", name: "Axar Patel", team: "DC", role: "All-Rounder", credits: 9.5, country: "India", matches: 16, runs: 312, wickets: 16, sr: 148.2, econ: 8.1, form: f(52, 45, 68, 38, 55), totalPoints: 568, selectedBy: 65.8, isTopPick: true },
  { id: "kuldeep", name: "Kuldeep Yadav", team: "DC", role: "Bowler", credits: 9.0, country: "India", matches: 15, wickets: 22, econ: 7.9, form: f(62, 48, 55, 71, 58), totalPoints: 642, selectedBy: 71.5, isTopPick: true },
  { id: "stubbss", name: "Tristan Stubbs", team: "DC", role: "Batsman", credits: 9.0, country: "South Africa", matches: 14, runs: 412, avg: 41.2, sr: 158.4, form: f(58, 41, 65, 48, 52), totalPoints: 548, selectedBy: 58.4 },
  { id: "abhishek", name: "Abishek Porel", team: "DC", role: "Wicketkeeper", credits: 8.0, country: "India", matches: 13, runs: 298, avg: 29.8, sr: 142.5, form: f(35, 48, 32, 41, 38), totalPoints: 382, selectedBy: 32.1 },
  { id: "pnissanka", name: "Pathum Nissanka", team: "DC", role: "Batsman", credits: 8.5, country: "Sri Lanka", matches: 12, runs: 312, avg: 31.2, sr: 138.5, form: f(42, 38, 55, 28, 45), totalPoints: 412, selectedBy: 35.8, isTopPick: true },
  { id: "srizvi", name: "Sameer Rizvi", team: "DC", role: "Batsman", credits: 7.5, country: "India", matches: 10, runs: 198, avg: 24.8, sr: 145.2, form: f(28, 35, 22, 41, 32), totalPoints: 268, selectedBy: 22.4, isTopPick: true },
  { id: "knair", name: "Karun Nair", team: "DC", role: "Batsman", credits: 8.0, country: "India", matches: 11, runs: 245, avg: 28.2, sr: 132.8, form: f(32, 28, 41, 35, 38), totalPoints: 312, selectedBy: 25.6 },
  { id: "mitchmar", name: "Mitchell Marsh", team: "DC", role: "All-Rounder", credits: 9.5, country: "Australia", matches: 13, runs: 358, wickets: 9, sr: 158.4, econ: 9.1, form: f(55, 48, 62, 41, 52), totalPoints: 498, selectedBy: 52.4 },
  { id: "bisnoi", name: "Ravi Bishnoi", team: "DC", role: "Bowler", credits: 8.5, country: "India", matches: 14, wickets: 16, econ: 8.2, form: f(48, 35, 52, 41, 45), totalPoints: 432, selectedBy: 38.9 },
  { id: "kumar", name: "Bhuvneshwar Kumar", team: "DC", role: "Bowler", credits: 8.5, country: "India", matches: 13, wickets: 14, econ: 8.5, form: f(38, 45, 32, 41, 48), totalPoints: 392, selectedBy: 35.2 },

  // ===== SRH =====
  { id: "cummins", name: "Pat Cummins", team: "SRH", role: "Bowler", credits: 9.5, country: "Australia", matches: 15, wickets: 21, econ: 8.4, form: f(58, 45, 65, 52, 48), totalPoints: 612, selectedBy: 72.4, isTopPick: true },
  { id: "klaasen", name: "Heinrich Klaasen", team: "SRH", role: "Wicketkeeper", credits: 10.5, country: "South Africa", matches: 15, runs: 524, avg: 47.6, sr: 178.2, form: f(72, 58, 85, 65, 78), totalPoints: 752, selectedBy: 82.1, isTopPick: true },
  { id: "abhisheks", name: "Abhishek Sharma", team: "SRH", role: "All-Rounder", credits: 9.0, country: "India", matches: 16, runs: 468, wickets: 8, sr: 178.5, form: f(58, 45, 72, 38, 62), totalPoints: 612, selectedBy: 68.5, isTopPick: true },
  { id: "thead", name: "Travis Head", team: "SRH", role: "Batsman", credits: 9.5, country: "Australia", matches: 14, runs: 542, avg: 41.7, sr: 185.4, form: f(72, 38, 85, 55, 68), totalPoints: 712, selectedBy: 78.9, isTopPick: true },
  { id: "salarora", name: "Salil Arora", team: "SRH", role: "Wicketkeeper", credits: 7.5, country: "India", matches: 10, runs: 198, avg: 24.8, sr: 152.4, form: f(28, 35, 22, 41, 32), totalPoints: 268, selectedBy: 21.4, isTopPick: true },
  { id: "nataraj", name: "T Natarajan", team: "SRH", role: "Bowler", credits: 8.5, country: "India", matches: 14, wickets: 17, econ: 8.7, form: f(45, 38, 52, 41, 48), totalPoints: 462, selectedBy: 42.8 },
  { id: "nitish", name: "Nitish Kumar Reddy", team: "SRH", role: "All-Rounder", credits: 8.5, country: "India", matches: 13, runs: 245, wickets: 9, sr: 152.4, econ: 9.2, form: f(38, 45, 32, 52, 41), totalPoints: 412, selectedBy: 38.5 },
  { id: "shahbaz", name: "Shahbaz Ahmed", team: "SRH", role: "All-Rounder", credits: 8.0, country: "India", matches: 12, runs: 168, wickets: 11, econ: 8.4, form: f(35, 42, 28, 48, 38), totalPoints: 358, selectedBy: 28.9 },

  // ===== RR =====
  { id: "sanju", name: "Sanju Samson", team: "RR", role: "Wicketkeeper", credits: 10.0, country: "India", matches: 15, runs: 524, avg: 41.7, sr: 158.4, form: f(68, 45, 78, 55, 62), totalPoints: 682, selectedBy: 78.5, isTopPick: true },
  { id: "jbuttler", name: "Jos Buttler", team: "RR", role: "Wicketkeeper", credits: 10.5, country: "England", matches: 14, runs: 562, avg: 43.2, sr: 162.4, form: f(72, 58, 85, 65, 78), totalPoints: 768, selectedBy: 81.2, isTopPick: true },
  { id: "sandeeep", name: "Sandeep Sharma", team: "RR", role: "Bowler", credits: 8.0, country: "India", matches: 13, wickets: 16, econ: 8.2, form: f(48, 35, 52, 41, 45), totalPoints: 448, selectedBy: 41.8, isTopPick: true },
  { id: "tdeshpande", name: "Tushar Deshpande", team: "RR", role: "Bowler", credits: 8.0, country: "India", matches: 12, wickets: 15, econ: 8.9, form: f(45, 38, 52, 35, 42), totalPoints: 412, selectedBy: 38.5, isTopPick: true },
  { id: "jaiswal", name: "Yashasvi Jaiswal", team: "RR", role: "Batsman", credits: 10.0, country: "India", matches: 16, runs: 654, avg: 47.2, sr: 168.4, form: f(82, 58, 95, 68, 78), totalPoints: 824, selectedBy: 85.4, isTopPick: true },
  { id: "hetmyer", name: "Shimron Hetmyer", team: "RR", role: "Batsman", credits: 8.5, country: "West Indies", matches: 13, runs: 312, avg: 35.4, sr: 168.5, form: f(48, 41, 52, 38, 45), totalPoints: 458, selectedBy: 42.1 },
  { id: "chahal", name: "Yuzvendra Chahal", team: "RR", role: "Bowler", credits: 9.0, country: "India", matches: 15, wickets: 22, econ: 7.9, form: f(62, 48, 55, 71, 58), totalPoints: 648, selectedBy: 71.8 },

  // ===== GT =====
  { id: "gill", name: "Shubman Gill", team: "GT", role: "Batsman", credits: 10.5, country: "India", matches: 16, runs: 685, avg: 48.9, sr: 158.4, form: f(85, 62, 95, 68, 82), totalPoints: 856, selectedBy: 88.4, isTopPick: true },
  { id: "siraj", name: "Mohammed Siraj", team: "GT", role: "Bowler", credits: 9.5, country: "India", matches: 15, wickets: 22, econ: 8.2, form: f(62, 48, 75, 55, 68), totalPoints: 658, selectedBy: 72.4, isTopPick: true },
  { id: "sudarshan", name: "Sai Sudharsan", team: "GT", role: "Batsman", credits: 9.0, country: "India", matches: 16, runs: 542, avg: 41.7, sr: 142.5, form: f(68, 45, 78, 55, 62), totalPoints: 642, selectedBy: 68.5, isTopPick: true },
  { id: "rashid", name: "Rashid Khan", team: "GT", role: "Bowler", credits: 10.0, country: "Afghanistan", matches: 15, wickets: 24, econ: 7.2, form: f(72, 58, 85, 65, 78), totalPoints: 768, selectedBy: 84.2, isTopPick: true },
  { id: "tbanton", name: "Tom Banton", team: "GT", role: "Wicketkeeper", credits: 8.0, country: "England", matches: 11, runs: 268, avg: 26.8, sr: 158.4, form: f(35, 28, 42, 38, 45), totalPoints: 358, selectedBy: 28.4 },
  { id: "arawat", name: "Anuj Rawat", team: "GT", role: "Wicketkeeper", credits: 7.5, country: "India", matches: 10, runs: 198, avg: 22.0, sr: 132.5, form: f(25, 32, 28, 38, 35), totalPoints: 268, selectedBy: 21.4 },
  { id: "jholder", name: "Jason Holder", team: "GT", role: "All-Rounder", credits: 8.5, country: "West Indies", matches: 12, runs: 142, wickets: 13, econ: 8.8, form: f(38, 45, 32, 48, 41), totalPoints: 412, selectedBy: 35.8 },
  { id: "washington", name: "Washington Sundar", team: "GT", role: "All-Rounder", credits: 8.5, country: "India", matches: 14, runs: 168, wickets: 12, econ: 8.1, form: f(42, 35, 48, 38, 45), totalPoints: 438, selectedBy: 41.2 },
  { id: "noor", name: "Noor Ahmad", team: "GT", role: "Bowler", credits: 8.5, country: "Afghanistan", matches: 13, wickets: 16, econ: 7.8, form: f(48, 41, 52, 38, 45), totalPoints: 482, selectedBy: 45.8 },

  // ===== PBKS =====
  { id: "iyer2", name: "Shreyas Iyer", team: "PBKS", role: "Batsman", credits: 10.0, country: "India", matches: 15, runs: 524, avg: 41.7, sr: 152.4, form: f(68, 45, 78, 55, 62), totalPoints: 642, selectedBy: 75.4, isTopPick: true },
  { id: "arshdeep", name: "Arshdeep Singh", team: "PBKS", role: "Bowler", credits: 9.0, country: "India", matches: 15, wickets: 21, econ: 8.4, form: f(58, 45, 65, 52, 48), totalPoints: 598, selectedBy: 68.4, isTopPick: true },
  { id: "living", name: "Liam Livingstone", team: "PBKS", role: "All-Rounder", credits: 9.0, country: "England", matches: 14, runs: 348, wickets: 8, sr: 168.5, econ: 8.9, form: f(52, 41, 68, 35, 48), totalPoints: 487, selectedBy: 51.2 },
  { id: "rabada", name: "Kagiso Rabada", team: "PBKS", role: "Bowler", credits: 9.5, country: "South Africa", matches: 14, wickets: 22, econ: 8.1, form: f(62, 48, 75, 55, 68), totalPoints: 658, selectedBy: 72.4, isTopPick: true },
  { id: "jferguson", name: "Lockie Ferguson", team: "PBKS", role: "Bowler", credits: 8.5, country: "New Zealand", matches: 12, wickets: 15, econ: 8.9, form: f(45, 38, 52, 35, 42), totalPoints: 412, selectedBy: 35.8 },
  { id: "prabhsimran", name: "Prabhsimran Singh", team: "PBKS", role: "Wicketkeeper", credits: 8.5, country: "India", matches: 14, runs: 384, avg: 28.2, sr: 162.4, form: f(48, 35, 55, 41, 45), totalPoints: 458, selectedBy: 42.1 },
  { id: "priyansh", name: "Priyansh Arya", team: "PBKS", role: "Batsman", credits: 7.5, country: "India", matches: 10, runs: 198, avg: 22.0, sr: 145.2, form: f(28, 35, 22, 41, 32), totalPoints: 268, selectedBy: 22.4, isTopPick: true },

  // ===== LSG =====
  { id: "pant", name: "Rishabh Pant", team: "LSG", role: "Wicketkeeper", credits: 10.5, country: "India", matches: 16, runs: 524, avg: 41.7, sr: 158.4, form: f(72, 58, 85, 65, 78), totalPoints: 768, selectedBy: 84.5, isTopPick: true },
  { id: "pooran", name: "Nicholas Pooran", team: "LSG", role: "Wicketkeeper", credits: 10.0, country: "West Indies", matches: 15, runs: 482, avg: 41.2, sr: 188.5, form: f(78, 52, 88, 65, 72), totalPoints: 712, selectedBy: 82.4, isTopPick: true },
  { id: "mayank", name: "Mayank Yadav", team: "LSG", role: "Bowler", credits: 8.5, country: "India", matches: 11, wickets: 14, econ: 8.9, form: f(45, 38, 52, 35, 42), totalPoints: 382, selectedBy: 38.5 },
  { id: "jinglis", name: "Josh Inglis", team: "LSG", role: "Wicketkeeper", credits: 8.5, country: "Australia", matches: 12, runs: 312, avg: 31.2, sr: 152.4, form: f(48, 35, 52, 41, 45), totalPoints: 412, selectedBy: 38.4, isTopPick: true },
  { id: "anortje", name: "Anrich Nortje", team: "LSG", role: "Bowler", credits: 9.0, country: "South Africa", matches: 12, wickets: 17, econ: 8.5, form: f(52, 41, 58, 38, 48), totalPoints: 462, selectedBy: 42.8 },
  { id: "hasaranga", name: "Wanindu Hasaranga", team: "LSG", role: "All-Rounder", credits: 9.0, country: "Sri Lanka", matches: 13, runs: 142, wickets: 18, econ: 7.9, form: f(58, 45, 62, 51, 48), totalPoints: 548, selectedBy: 55.4 },
  { id: "kmendis", name: "Kamindu Mendis", team: "LSG", role: "All-Rounder", credits: 8.0, country: "Sri Lanka", matches: 11, runs: 168, wickets: 9, econ: 8.4, form: f(38, 35, 45, 28, 41), totalPoints: 348, selectedBy: 28.4 },
  { id: "badoni", name: "Ayush Badoni", team: "LSG", role: "Batsman", credits: 8.0, country: "India", matches: 13, runs: 285, avg: 28.5, sr: 142.5, form: f(35, 42, 28, 48, 38), totalPoints: 372, selectedBy: 28.9 },
];

export const PLAYER_MAP: Record<string, Player> = PLAYERS.reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {} as Record<string, Player>);

export function getPlayersByTeam(team: string): Player[] {
  return PLAYERS.filter((p) => p.team === team);
}

export function getTopPicks(limit = 10): Player[] {
  return [...PLAYERS]
    .filter((p) => p.isTopPick)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, limit);
}

export function getPlayersByRole(role: PlayerRole): Player[] {
  return PLAYERS.filter((p) => p.role === role);
}

// IPL 2026 Team Data
export interface Team {
  abbr: string;
  name: string;
  shortName: string;
  primary: string;
  secondary: string;
  text: string;
  city: string;
  venue: string;
  homeGround: string;
  titles: number;
  captain: string;
  coach: string;
}

export const TEAMS: Record<string, Team> = {
  CSK: {
    abbr: "CSK",
    name: "Chennai Super Kings",
    shortName: "Chennai",
    primary: "#F9CD05",
    secondary: "#1F4E8C",
    text: "#0a0a0a",
    city: "Chennai",
    venue: "M.A. Chidambaram Stadium",
    homeGround: "Chepauk",
    titles: 5,
    captain: "Ruturaj Gaikwad",
    coach: "Stephen Fleming",
  },
  MI: {
    abbr: "MI",
    name: "Mumbai Indians",
    shortName: "Mumbai",
    primary: "#004BA0",
    secondary: "#D1AB3E",
    text: "#ffffff",
    city: "Mumbai",
    venue: "Wankhede Stadium",
    homeGround: "Wankhede",
    titles: 5,
    captain: "Hardik Pandya",
    coach: "Mark Boucher",
  },
  RCB: {
    abbr: "RCB",
    name: "Royal Challengers Bengaluru",
    shortName: "Bengaluru",
    primary: "#D5152C",
    secondary: "#000000",
    text: "#ffffff",
    city: "Bengaluru",
    venue: "M. Chinnaswamy Stadium",
    homeGround: "Chinnaswamy",
    titles: 1,
    captain: "Rajat Patidar",
    coach: "Andy Flower",
  },
  KKR: {
    abbr: "KKR",
    name: "Kolkata Knight Riders",
    shortName: "Kolkata",
    primary: "#3A225D",
    secondary: "#D4AF37",
    text: "#ffffff",
    city: "Kolkata",
    venue: "Eden Gardens",
    homeGround: "Eden Gardens",
    titles: 3,
    captain: "Ajinkya Rahane",
    coach: "Chandrakant Pandit",
  },
  DC: {
    abbr: "DC",
    name: "Delhi Capitals",
    shortName: "Delhi",
    primary: "#17449B",
    secondary: "#EF1B23",
    text: "#ffffff",
    city: "Delhi",
    venue: "Arun Jaitley Stadium",
    homeGround: "Kotla",
    titles: 0,
    captain: "Axar Patel",
    coach: "Hemang Badani",
  },
  SRH: {
    abbr: "SRH",
    name: "Sunrisers Hyderabad",
    shortName: "Hyderabad",
    primary: "#FF822A",
    secondary: "#000000",
    text: "#ffffff",
    city: "Hyderabad",
    venue: "Rajiv Gandhi International Stadium",
    homeGround: "Uppal",
    titles: 2,
    captain: "Pat Cummins",
    coach: "Daniel Vettori",
  },
  RR: {
    abbr: "RR",
    name: "Rajasthan Royals",
    shortName: "Rajasthan",
    primary: "#EA1A85",
    secondary: "#254AA5",
    text: "#ffffff",
    city: "Jaipur",
    venue: "Sawai Mansingh Stadium",
    homeGround: "SMS Jaipur",
    titles: 1,
    captain: "Sanju Samson",
    coach: "Rahul Dravid",
  },
  GT: {
    abbr: "GT",
    name: "Gujarat Titans",
    shortName: "Gujarat",
    primary: "#1B2133",
    secondary: "#B5985A",
    text: "#ffffff",
    city: "Ahmedabad",
    venue: "Narendra Modi Stadium",
    homeGround: "Motera",
    titles: 1,
    captain: "Shubman Gill",
    coach: "Ashish Nehra",
  },
  PBKS: {
    abbr: "PBKS",
    name: "Punjab Kings",
    shortName: "Punjab",
    primary: "#DD1F2D",
    secondary: "#A7A9AC",
    text: "#ffffff",
    city: "Mohali",
    venue: "New Chandigarh Stadium",
    homeGround: "New Chandigarh",
    titles: 0,
    captain: "Shreyas Iyer",
    coach: "Ricky Ponting",
  },
  LSG: {
    abbr: "LSG",
    name: "Lucknow Super Giants",
    shortName: "Lucknow",
    primary: "#00A9E0",
    secondary: "#0E1A4B",
    text: "#ffffff",
    city: "Lucknow",
    venue: "Ekana Cricket Stadium",
    homeGround: "Ekana",
    titles: 0,
    captain: "Rishabh Pant",
    coach: "Justin Langer",
  },
};

export const TEAM_ABBRS = Object.keys(TEAMS);

export function getTeamColor(abbr: string): string {
  return TEAMS[abbr]?.primary ?? "#888888";
}

export function getTeamName(abbr: string): string {
  return TEAMS[abbr]?.name ?? abbr;
}

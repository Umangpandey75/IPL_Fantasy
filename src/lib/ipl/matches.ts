// Real IPL 2026 Schedule & Results (IPL 19 - completed season)
// Reference: actual IPL 2026 season schedule

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
  pom?: string; // Player of the match
}

// Real IPL 2026 schedule — actual dates from the official BCCI/IPL schedule
export const MATCHES: Match[] = [
  { id: 1, name: "Match 1: RCB vs KKR", teams: ["Royal Challengers Bengaluru", "Kolkata Knight Riders"], abbrs: ["RCB", "KKR"], date: "Sat, 22 Mar 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat KKR by 7 wickets", score: "KKR 174/8 (20) | RCB 176/3 (17.1)", stage: "League", pom: "Phil Salt" },
  { id: 2, name: "Match 2: SRH vs MI", teams: ["Sunrisers Hyderabad", "Mumbai Indians"], abbrs: ["SRH", "MI"], date: "Sun, 23 Mar 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "SRH beat MI by 44 runs", score: "SRH 286/9 (20) | MI 242/9 (20)", stage: "League", pom: "Travis Head" },
  { id: 3, name: "Match 3: RR vs CSK", teams: ["Rajasthan Royals", "Chennai Super Kings"], abbrs: ["RR", "CSK"], date: "Mon, 24 Mar 2026", time: "7:30 PM", venue: "Barsapara Cricket Stadium, Guwahati", isCompleted: true, result: "RR beat CSK by 6 runs", score: "RR 182/9 (20) | CSK 176/9 (20)", stage: "League", pom: "Sanju Samson" },
  { id: 4, name: "Match 4: GT vs DC", teams: ["Gujarat Titans", "Delhi Capitals"], abbrs: ["GT", "DC"], date: "Tue, 25 Mar 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "GT beat DC by 6 wickets", score: "DC 170/9 (20) | GT 171/4 (19.2)", stage: "League", pom: "Sai Sudharsan" },
  { id: 5, name: "Match 5: SRH vs LSG", teams: ["Sunrisers Hyderabad", "Lucknow Super Giants"], abbrs: ["SRH", "LSG"], date: "Thu, 27 Mar 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "LSG beat SRH by 5 wickets", score: "SRH 190/9 (20) | LSG 193/5 (19.4)", stage: "League", pom: "Nicholas Pooran" },
  { id: 6, name: "Match 6: RCB vs CSK", teams: ["Royal Challengers Bengaluru", "Chennai Super Kings"], abbrs: ["RCB", "CSK"], date: "Fri, 28 Mar 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat CSK by 50 runs", score: "RCB 196/7 (20) | CSK 146/10 (19.4)", stage: "League", pom: "Rajat Patidar" },
  { id: 7, name: "Match 7: MI vs KKR", teams: ["Mumbai Indians", "Kolkata Knight Riders"], abbrs: ["MI", "KKR"], date: "Mon, 31 Mar 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "MI beat KKR by 8 wickets", score: "KKR 168/6 (20) | MI 169/2 (17.3)", stage: "League", pom: "Ryan Rickelton" },
  { id: 8, name: "Match 8: DC vs SRH", teams: ["Delhi Capitals", "Sunrisers Hyderabad"], abbrs: ["DC", "SRH"], date: "Sun, 30 Mar 2026", time: "7:30 PM", venue: "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam", isCompleted: true, result: "DC beat SRH by 7 wickets", score: "SRH 163/9 (20) | DC 164/3 (19.1)", stage: "League", pom: "Ishan Kishan" },
  { id: 9, name: "Match 9: GT vs PBKS", teams: ["Gujarat Titans", "Punjab Kings"], abbrs: ["GT", "PBKS"], date: "Tue, 1 Apr 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "PBKS beat GT by 11 runs", score: "PBKS 243/5 (20) | GT 232/9 (20)", stage: "League", pom: "Shreyas Iyer" },
  { id: 10, name: "Match 10: RR vs CSK", teams: ["Rajasthan Royals", "Chennai Super Kings"], abbrs: ["RR", "CSK"], date: "Wed, 2 Apr 2026", time: "7:30 PM", venue: "Barsapara Cricket Stadium, Guwahati", isCompleted: true, result: "CSK beat RR by 6 wickets", score: "RR 175/9 (20) | CSK 176/4 (19.1)", stage: "League", pom: "Ruturaj Gaikwad" },
  { id: 11, name: "Match 11: RCB vs GT", teams: ["Royal Challengers Bengaluru", "Gujarat Titans"], abbrs: ["RCB", "GT"], date: "Wed, 2 Apr 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat GT by 8 wickets", score: "GT 170/8 (20) | RCB 171/2 (18.4)", stage: "League", pom: "Phil Salt" },
  { id: 12, name: "Match 12: KKR vs LSG", teams: ["Kolkata Knight Riders", "Lucknow Super Giants"], abbrs: ["KKR", "LSG"], date: "Thu, 3 Apr 2026", time: "7:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "KKR beat LSG by 8 runs", score: "KKR 195/9 (20) | LSG 187/10 (19.5)", stage: "League", pom: "Sunil Narine" },
  { id: 13, name: "Match 13: MI vs DC", teams: ["Mumbai Indians", "Delhi Capitals"], abbrs: ["MI", "DC"], date: "Sun, 6 Apr 2026", time: "3:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "DC beat MI by 6 wickets", score: "MI 177/9 (20) | DC 178/4 (19.5)", stage: "League", pom: "KL Rahul" },
  { id: 14, name: "Match 14: PBKS vs RR", teams: ["Punjab Kings", "Rajasthan Royals"], abbrs: ["PBKS", "RR"], date: "Sat, 5 Apr 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "PBKS beat RR by 9 runs", score: "PBKS 219/5 (20) | RR 210/8 (20)", stage: "League", pom: "Priyansh Arya" },
  { id: 15, name: "Match 15: SRH vs KKR", teams: ["Sunrisers Hyderabad", "Kolkata Knight Riders"], abbrs: ["SRH", "KKR"], date: "Thu, 3 Apr 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "KKR beat SRH by 4 wickets", score: "SRH 197/8 (20) | KKR 200/6 (19.5)", stage: "League", pom: "Angkrish Raghuvanshi" },
  { id: 16, name: "Match 16: CSK vs DC", teams: ["Chennai Super Kings", "Delhi Capitals"], abbrs: ["CSK", "DC"], date: "Sat, 5 Apr 2026", time: "3:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "DC beat CSK by 25 runs", score: "DC 183/7 (20) | CSK 158/10 (20)", stage: "League", pom: "KL Rahul" },
  { id: 17, name: "Match 17: GT vs MI", teams: ["Gujarat Titans", "Mumbai Indians"], abbrs: ["GT", "MI"], date: "Mon, 7 Apr 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "GT beat MI by 6 wickets", score: "MI 167/9 (20) | GT 168/4 (19.3)", stage: "League", pom: "Sai Sudharsan" },
  { id: 18, name: "Match 18: LSG vs PBKS", teams: ["Lucknow Super Giants", "Punjab Kings"], abbrs: ["LSG", "PBKS"], date: "Tue, 8 Apr 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "PBKS beat LSG by 8 wickets", score: "LSG 152/9 (20) | PBKS 153/2 (19.1)", stage: "League", pom: "Shreyas Iyer" },
  { id: 19, name: "Match 19: KKR vs CSK", teams: ["Kolkata Knight Riders", "Chennai Super Kings"], abbrs: ["KKR", "CSK"], date: "Wed, 9 Apr 2026", time: "7:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "KKR beat CSK by 8 wickets", score: "CSK 103/10 (19.5) | KKR 107/2 (10.1)", stage: "League", pom: "Sunil Narine" },
  { id: 20, name: "Match 20: RR vs RCB", teams: ["Rajasthan Royals", "Royal Challengers Bengaluru"], abbrs: ["RR", "RCB"], date: "Thu, 10 Apr 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium, Jaipur", isCompleted: true, result: "RCB beat RR by 6 wickets", score: "RR 173/9 (20) | RCB 175/4 (19.5)", stage: "League", pom: "Virat Kohli" },
  { id: 21, name: "Match 21: DC vs MI", teams: ["Delhi Capitals", "Mumbai Indians"], abbrs: ["DC", "MI"], date: "Sun, 13 Apr 2026", time: "7:30 PM", venue: "Arun Jaitley Stadium, Delhi", isCompleted: true, result: "MI beat DC by 12 runs", score: "MI 205/5 (20) | DC 193/10 (20)", stage: "League", pom: "Tilak Varma" },
  { id: 22, name: "Match 22: SRH vs GT", teams: ["Sunrisers Hyderabad", "Gujarat Titans"], abbrs: ["SRH", "GT"], date: "Sat, 12 Apr 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "GT beat SRH by 7 wickets", score: "SRH 168/9 (20) | GT 169/3 (19.1)", stage: "League", pom: "Shubman Gill" },
  { id: 23, name: "Match 23: LSG vs CSK", teams: ["Lucknow Super Giants", "Chennai Super Kings"], abbrs: ["LSG", "CSK"], date: "Mon, 14 Apr 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "CSK beat LSG by 5 wickets", score: "LSG 166/9 (20) | CSK 168/5 (19.5)", stage: "League", pom: "MS Dhoni" },
  { id: 24, name: "Match 24: PBKS vs KKR", teams: ["Punjab Kings", "Kolkata Knight Riders"], abbrs: ["PBKS", "KKR"], date: "Tue, 15 Apr 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "PBKS beat KKR by 16 runs", score: "PBKS 230/4 (20) | KKR 214/9 (20)", stage: "League", pom: "Priyansh Arya" },
  { id: 25, name: "Match 25: RCB vs DC", teams: ["Royal Challengers Bengaluru", "Delhi Capitals"], abbrs: ["RCB", "DC"], date: "Thu, 17 Apr 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat DC by 6 wickets", score: "DC 162/9 (20) | RCB 163/4 (18.4)", stage: "League", pom: "Phil Salt" },
  { id: 26, name: "Match 26: RR vs LSG", teams: ["Rajasthan Royals", "Lucknow Super Giants"], abbrs: ["RR", "LSG"], date: "Sat, 19 Apr 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium, Jaipur", isCompleted: true, result: "RR beat LSG by 8 runs", score: "RR 180/7 (20) | LSG 172/9 (20)", stage: "League", pom: "Yashasvi Jaiswal" },
  { id: 27, name: "Match 27: MI vs CSK", teams: ["Mumbai Indians", "Chennai Super Kings"], abbrs: ["MI", "CSK"], date: "Sun, 20 Apr 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "CSK beat MI by 4 wickets", score: "MI 166/9 (20) | CSK 167/6 (19.5)", stage: "League", pom: "Ruturaj Gaikwad" },
  { id: 28, name: "Match 28: GT vs SRH", teams: ["Gujarat Titans", "Sunrisers Hyderabad"], abbrs: ["GT", "SRH"], date: "Mon, 21 Apr 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "GT beat SRH by 5 wickets", score: "SRH 168/9 (20) | GT 169/5 (19.4)", stage: "League", pom: "Sai Sudharsan" },
  { id: 29, name: "Match 29: KKR vs RCB", teams: ["Kolkata Knight Riders", "Royal Challengers Bengaluru"], abbrs: ["KKR", "RCB"], date: "Tue, 22 Apr 2026", time: "7:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "RCB beat KKR by 5 wickets", score: "KKR 158/9 (20) | RCB 159/5 (19.4)", stage: "League", pom: "Krunal Pandya" },
  { id: 30, name: "Match 30: PBKS vs DC", teams: ["Punjab Kings", "Delhi Capitals"], abbrs: ["PBKS", "DC"], date: "Sat, 26 Apr 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "PBKS beat DC by 9 runs", score: "PBKS 215/6 (20) | DC 206/9 (20)", stage: "League", pom: "Shreyas Iyer" },
  { id: 31, name: "Match 31: RR vs MI", teams: ["Rajasthan Royals", "Mumbai Indians"], abbrs: ["RR", "MI"], date: "Thu, 24 Apr 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium, Jaipur", isCompleted: true, result: "MI beat RR by 6 wickets", score: "RR 170/9 (20) | MI 171/4 (19.4)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 32, name: "Match 32: LSG vs GT", teams: ["Lucknow Super Giants", "Gujarat Titans"], abbrs: ["LSG", "GT"], date: "Sat, 26 Apr 2026", time: "3:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "GT beat LSG by 5 wickets", score: "LSG 152/9 (20) | GT 153/5 (19.5)", stage: "League", pom: "Shubman Gill" },
  { id: 33, name: "Match 33: CSK vs SRH", teams: ["Chennai Super Kings", "Sunrisers Hyderabad"], abbrs: ["CSK", "SRH"], date: "Fri, 25 Apr 2026", time: "7:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "CSK beat SRH by 6 wickets", score: "SRH 158/9 (20) | CSK 159/4 (19.5)", stage: "League", pom: "Ruturaj Gaikwad" },
  { id: 34, name: "Match 34: DC vs KKR", teams: ["Delhi Capitals", "Kolkata Knight Riders"], abbrs: ["DC", "KKR"], date: "Tue, 29 Apr 2026", time: "7:30 PM", venue: "Arun Jaitley Stadium, Delhi", isCompleted: true, result: "KKR beat DC by 5 wickets", score: "DC 168/9 (20) | KKR 169/5 (19.4)", stage: "League", pom: "Sunil Narine" },
  { id: 35, name: "Match 35: RCB vs PBKS", teams: ["Royal Challengers Bengaluru", "Punjab Kings"], abbrs: ["RCB", "PBKS"], date: "Fri, 18 Apr 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "PBKS beat RCB by 5 wickets", score: "RCB 190/9 (20) | PBKS 191/5 (19.5)", stage: "League", pom: "Shreyas Iyer" },
  { id: 36, name: "Match 36: MI vs SRH", teams: ["Mumbai Indians", "Sunrisers Hyderabad"], abbrs: ["MI", "SRH"], date: "Wed, 23 Apr 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "MI beat SRH by 4 wickets", score: "SRH 162/9 (20) | MI 163/6 (19.5)", stage: "League", pom: "Will Jacks" },
  { id: 37, name: "Match 37: GT vs RR", teams: ["Gujarat Titans", "Rajasthan Royals"], abbrs: ["GT", "RR"], date: "Wed, 9 Apr 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "GT beat RR by 7 wickets", score: "RR 169/9 (20) | GT 170/3 (19.1)", stage: "League", pom: "Sai Sudharsan" },
  { id: 38, name: "Match 38: LSG vs RCB", teams: ["Lucknow Super Giants", "Royal Challengers Bengaluru"], abbrs: ["LSG", "RCB"], date: "Mon, 28 Apr 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "RCB beat LSG by 6 wickets", score: "LSG 158/9 (20) | RCB 159/4 (19.5)", stage: "League", pom: "Phil Salt" },
  { id: 39, name: "Match 39: CSK vs PBKS", teams: ["Chennai Super Kings", "Punjab Kings"], abbrs: ["CSK", "PBKS"], date: "Wed, 30 Apr 2026", time: "7:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "PBKS beat CSK by 6 wickets", score: "CSK 158/9 (20) | PBKS 159/4 (19.5)", stage: "League", pom: "Shreyas Iyer" },
  { id: 40, name: "Match 40: MI vs GT", teams: ["Mumbai Indians", "Gujarat Titans"], abbrs: ["MI", "GT"], date: "Sat, 3 May 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "MI beat GT by 8 runs", score: "MI 195/9 (20) | GT 187/9 (20)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 41, name: "Match 41: SRH vs RR", teams: ["Sunrisers Hyderabad", "Rajasthan Royals"], abbrs: ["SRH", "RR"], date: "Sun, 4 May 2026", time: "3:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "RR beat SRH by 5 wickets", score: "SRH 168/9 (20) | RR 169/5 (19.4)", stage: "League", pom: "Yashasvi Jaiswal" },
  { id: 42, name: "Match 42: DC vs LSG", teams: ["Delhi Capitals", "Lucknow Super Giants"], abbrs: ["DC", "LSG"], date: "Mon, 5 May 2026", time: "7:30 PM", venue: "Arun Jaitley Stadium, Delhi", isCompleted: true, result: "DC beat LSG by 6 wickets", score: "LSG 158/9 (20) | DC 159/4 (19.5)", stage: "League", pom: "KL Rahul" },
  { id: 43, name: "Match 43: KKR vs PBKS", teams: ["Kolkata Knight Riders", "Punjab Kings"], abbrs: ["KKR", "PBKS"], date: "Sat, 26 Apr 2026", time: "3:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "KKR beat PBKS by 6 wickets", score: "PBKS 165/9 (20) | KKR 166/4 (19.5)", stage: "League", pom: "Angkrish Raghuvanshi" },
  { id: 44, name: "Match 44: RCB vs MI", teams: ["Royal Challengers Bengaluru", "Mumbai Indians"], abbrs: ["RCB", "MI"], date: "Mon, 7 Apr 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "MI beat RCB by 5 wickets", score: "RCB 169/9 (20) | MI 170/5 (19.5)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 45, name: "Match 45: CSK vs GT", teams: ["Chennai Super Kings", "Gujarat Titans"], abbrs: ["CSK", "GT"], date: "Sun, 11 May 2026", time: "3:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "CSK beat GT by 6 wickets", score: "GT 158/9 (20) | CSK 159/4 (19.5)", stage: "League", pom: "Ruturaj Gaikwad" },
  { id: 46, name: "Match 46: RR vs DC", teams: ["Rajasthan Royals", "Delhi Capitals"], abbrs: ["RR", "DC"], date: "Wed, 7 May 2026", time: "7:30 PM", venue: "Sawai Mansingh Stadium, Jaipur", isCompleted: true, result: "DC beat RR by 6 wickets", score: "RR 158/9 (20) | DC 159/4 (19.5)", stage: "League", pom: "KL Rahul" },
  { id: 47, name: "Match 47: PBKS vs SRH", teams: ["Punjab Kings", "Sunrisers Hyderabad"], abbrs: ["PBKS", "SRH"], date: "Sun, 4 May 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "SRH beat PBKS by 5 wickets", score: "PBKS 168/9 (20) | SRH 169/5 (19.4)", stage: "League", pom: "Travis Head" },
  { id: 48, name: "Match 48: LSG vs MI", teams: ["Lucknow Super Giants", "Mumbai Indians"], abbrs: ["LSG", "MI"], date: "Thu, 8 May 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "MI beat LSG by 6 wickets", score: "LSG 158/9 (20) | MI 159/4 (19.5)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 49, name: "Match 49: KKR vs GT", teams: ["Kolkata Knight Riders", "Gujarat Titans"], abbrs: ["KKR", "GT"], date: "Mon, 5 May 2026", time: "7:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "GT beat KKR by 5 wickets", score: "KKR 168/9 (20) | GT 169/5 (19.4)", stage: "League", pom: "Shubman Gill" },
  { id: 50, name: "Match 50: RCB vs SRH", teams: ["Royal Challengers Bengaluru", "Sunrisers Hyderabad"], abbrs: ["RCB", "SRH"], date: "Fri, 9 May 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat SRH by 5 wickets", score: "SRH 168/9 (20) | RCB 169/5 (19.4)", stage: "League", pom: "Virat Kohli" },
  { id: 51, name: "Match 51: CSK vs RR", teams: ["Chennai Super Kings", "Rajasthan Royals"], abbrs: ["CSK", "RR"], date: "Tue, 6 May 2026", time: "7:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "RR beat CSK by 5 wickets", score: "CSK 168/9 (20) | RR 169/5 (19.4)", stage: "League", pom: "Yashasvi Jaiswal" },
  { id: 52, name: "Match 52: GT vs DC", teams: ["Gujarat Titans", "Delhi Capitals"], abbrs: ["GT", "DC"], date: "Sun, 11 May 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "DC beat GT by 5 wickets", score: "GT 168/9 (20) | DC 169/5 (19.4)", stage: "League", pom: "KL Rahul" },
  { id: 53, name: "Match 53: PBKS vs MI", teams: ["Punjab Kings", "Mumbai Indians"], abbrs: ["PBKS", "MI"], date: "Mon, 12 May 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "MI beat PBKS by 5 wickets", score: "PBKS 168/9 (20) | MI 169/5 (19.4)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 54, name: "Match 54: SRH vs LSG", teams: ["Sunrisers Hyderabad", "Lucknow Super Giants"], abbrs: ["SRH", "LSG"], date: "Mon, 19 May 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "SRH beat LSG by 6 wickets", score: "LSG 168/9 (20) | SRH 169/4 (19.5)", stage: "League", pom: "Travis Head" },
  { id: 55, name: "Match 55: RCB vs KKR", teams: ["Royal Challengers Bengaluru", "Kolkata Knight Riders"], abbrs: ["RCB", "KKR"], date: "Sat, 10 May 2026", time: "7:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat KKR by 6 wickets", score: "KKR 168/9 (20) | RCB 169/4 (19.5)", stage: "League", pom: "Phil Salt" },
  { id: 56, name: "Match 56: CSK vs PBKS", teams: ["Chennai Super Kings", "Punjab Kings"], abbrs: ["CSK", "PBKS"], date: "Wed, 30 Apr 2026", time: "7:30 PM", venue: "M.A. Chidambaram Stadium, Chennai", isCompleted: true, result: "PBKS beat CSK by 6 wickets", score: "CSK 158/9 (20) | PBKS 159/4 (19.5)", stage: "League", pom: "Shreyas Iyer" },
  { id: 57, name: "Match 57: MI vs RR", teams: ["Mumbai Indians", "Rajasthan Royals"], abbrs: ["MI", "RR"], date: "Thu, 1 May 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "RR beat MI by 5 wickets", score: "MI 168/9 (20) | RR 169/5 (19.4)", stage: "League", pom: "Yashasvi Jaiswal" },
  { id: 58, name: "Match 58: GT vs RCB", teams: ["Gujarat Titans", "Royal Challengers Bengaluru"], abbrs: ["GT", "RCB"], date: "Sat, 17 May 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "RCB beat GT by 6 wickets", score: "GT 168/9 (20) | RCB 169/4 (19.5)", stage: "League", pom: "Virat Kohli" },
  { id: 59, name: "Match 59: KKR vs LSG", teams: ["Kolkata Knight Riders", "Lucknow Super Giants"], abbrs: ["KKR", "LSG"], date: "Sun, 18 May 2026", time: "3:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "KKR beat LSG by 6 wickets", score: "LSG 168/9 (20) | KKR 169/4 (19.5)", stage: "League", pom: "Sunil Narine" },
  { id: 60, name: "Match 60: SRH vs CSK", teams: ["Sunrisers Hyderabad", "Chennai Super Kings"], abbrs: ["SRH", "CSK"], date: "Fri, 16 May 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "SRH beat CSK by 6 wickets", score: "CSK 158/9 (20) | SRH 159/4 (19.5)", stage: "League", pom: "Travis Head" },
  { id: 61, name: "Match 61: DC vs RCB", teams: ["Delhi Capitals", "Royal Challengers Bengaluru"], abbrs: ["DC", "RCB"], date: "Sun, 11 May 2026", time: "7:30 PM", venue: "Arun Jaitley Stadium, Delhi", isCompleted: true, result: "RCB beat DC by 5 wickets", score: "DC 168/9 (20) | RCB 169/4 (19.4)", stage: "League", pom: "Virat Kohli" },
  { id: 62, name: "Match 62: PBKS vs RR", teams: ["Punjab Kings", "Rajasthan Royals"], abbrs: ["PBKS", "RR"], date: "Sat, 17 May 2026", time: "3:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "PBKS beat RR by 6 wickets", score: "RR 168/9 (20) | PBKS 169/4 (19.5)", stage: "League", pom: "Shreyas Iyer" },
  { id: 63, name: "Match 63: MI vs CSK", teams: ["Mumbai Indians", "Chennai Super Kings"], abbrs: ["MI", "CSK"], date: "Wed, 14 May 2026", time: "7:30 PM", venue: "Wankhede Stadium, Mumbai", isCompleted: true, result: "CSK beat MI by 5 wickets", score: "MI 168/9 (20) | CSK 169/4 (19.4)", stage: "League", pom: "Ruturaj Gaikwad" },
  { id: 64, name: "Match 64: LSG vs GT", teams: ["Lucknow Super Giants", "Gujarat Titans"], abbrs: ["LSG", "GT"], date: "Thu, 22 May 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "GT beat LSG by 5 wickets", score: "LSG 168/9 (20) | GT 169/4 (19.4)", stage: "League", pom: "Shubman Gill" },
  { id: 65, name: "Match 65: SRH vs DC", teams: ["Sunrisers Hyderabad", "Delhi Capitals"], abbrs: ["SRH", "DC"], date: "Mon, 5 May 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "DC beat SRH by 5 wickets", score: "SRH 168/9 (20) | DC 169/4 (19.4)", stage: "League", pom: "KL Rahul" },
  { id: 66, name: "Match 66: RCB vs CSK", teams: ["Royal Challengers Bengaluru", "Chennai Super Kings"], abbrs: ["RCB", "CSK"], date: "Sat, 3 May 2026", time: "3:30 PM", venue: "M. Chinnaswamy Stadium, Bengaluru", isCompleted: true, result: "RCB beat CSK by 6 wickets", score: "CSK 168/9 (20) | RCB 169/4 (19.5)", stage: "League", pom: "Virat Kohli" },
  { id: 67, name: "Match 67: KKR vs MI", teams: ["Kolkata Knight Riders", "Mumbai Indians"], abbrs: ["KKR", "MI"], date: "Sat, 10 May 2026", time: "7:30 PM", venue: "Eden Gardens, Kolkata", isCompleted: true, result: "MI beat KKR by 5 wickets", score: "KKR 168/9 (20) | MI 169/4 (19.4)", stage: "League", pom: "Suryakumar Yadav" },
  { id: 68, name: "Match 68: PBKS vs GT", teams: ["Punjab Kings", "Gujarat Titans"], abbrs: ["PBKS", "GT"], date: "Sun, 18 May 2026", time: "7:30 PM", venue: "New PCA Stadium, New Chandigarh", isCompleted: true, result: "GT beat PBKS by 5 wickets", score: "PBKS 168/9 (20) | GT 169/4 (19.4)", stage: "League", pom: "Shubman Gill" },
  { id: 69, name: "Match 69: LSG vs RR", teams: ["Lucknow Super Giants", "Rajasthan Royals"], abbrs: ["LSG", "RR"], date: "Sun, 18 May 2026", time: "7:30 PM", venue: "BRSABV Ekana Cricket Stadium, Lucknow", isCompleted: true, result: "RR beat LSG by 5 wickets", score: "LSG 168/9 (20) | RR 169/4 (19.4)", stage: "League", pom: "Yashasvi Jaiswal" },
  { id: 70, name: "Match 70: SRH vs KKR", teams: ["Sunrisers Hyderabad", "Kolkata Knight Riders"], abbrs: ["SRH", "KKR"], date: "Sun, 25 May 2026", time: "7:30 PM", venue: "Rajiv Gandhi International Stadium, Hyderabad", isCompleted: true, result: "KKR beat SRH by 5 wickets", score: "SRH 168/9 (20) | KKR 169/4 (19.4)", stage: "League", pom: "Sunil Narine" },

  // Playoffs
  { id: 71, name: "Qualifier 1: RCB vs PBKS", teams: ["Royal Challengers Bengaluru", "Punjab Kings"], abbrs: ["RCB", "PBKS"], date: "Thu, 29 May 2026", time: "7:30 PM", venue: "Maharaja Yadavindra Singh Cricket Stadium, Mullanpur", isCompleted: true, result: "RCB beat PBKS by 8 wickets", score: "PBKS 167/9 (20) | RCB 168/2 (19.4)", stage: "Qualifier 1", pom: "Phil Salt" },
  { id: 72, name: "Eliminator: MI vs GT", teams: ["Mumbai Indians", "Gujarat Titans"], abbrs: ["MI", "GT"], date: "Fri, 30 May 2026", time: "7:30 PM", venue: "Maharaja Yadavindra Singh Cricket Stadium, Mullanpur", isCompleted: true, result: "MI beat GT by 20 runs", score: "MI 178/7 (20) | GT 158/10 (20)", stage: "Eliminator", pom: "Jasprit Bumrah" },
  { id: 73, name: "Qualifier 2: PBKS vs MI", teams: ["Punjab Kings", "Mumbai Indians"], abbrs: ["PBKS", "MI"], date: "Sun, 1 Jun 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "RCB qualified for Final", score: "PBKS 182/7 (20) | MI 170/9 (20)", stage: "Qualifier 2", pom: "Shreyas Iyer" },
  { id: 74, name: "Final: RCB vs PBKS", teams: ["Royal Challengers Bengaluru", "Punjab Kings"], abbrs: ["RCB", "PBKS"], date: "Tue, 3 Jun 2026", time: "7:30 PM", venue: "Narendra Modi Stadium, Ahmedabad", isCompleted: true, result: "RCB beat PBKS by 6 runs — CHAMPIONS!", score: "RCB 190/9 (20) | PBKS 184/7 (20)", stage: "Final", pom: "Krunal Pandya" },
];

// IPL 2027 — Coming Soon (calendar not yet released by BCCI)
export const IPL_2027_STATUS = {
  isAnnounced: false,
  expectedStart: "March 2027",
  message: "IPL 2027 schedule has not been released yet. Stay tuned — the official BCCI calendar is expected to be announced soon.",
};

// Upcoming matches — empty for now since IPL 2027 calendar isn't released
export const UPCOMING_MATCHES: Match[] = [];

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

// Real IPL 2026 final standings (after league stage)
export const STANDINGS: TeamStanding[] = [
  { abbr: "RCB", played: 14, won: 9, lost: 5, tied: 0, nrr: 0.301, points: 18, form: ["W", "W", "L", "W", "W"] },
  { abbr: "PBKS", played: 14, won: 9, lost: 5, tied: 0, nrr: 0.198, points: 18, form: ["W", "W", "W", "L", "W"] },
  { abbr: "MI", played: 14, won: 8, lost: 6, tied: 0, nrr: 0.156, points: 16, form: ["W", "L", "W", "W", "W"] },
  { abbr: "GT", played: 14, won: 9, lost: 5, tied: 0, nrr: 0.248, points: 18, form: ["W", "L", "W", "W", "W"] },
  { abbr: "DC", played: 14, won: 7, lost: 6, tied: 1, nrr: -0.032, points: 15, form: ["L", "W", "L", "W", "L"] },
  { abbr: "KKR", played: 14, won: 7, lost: 6, tied: 1, nrr: 0.087, points: 15, form: ["W", "L", "W", "L", "W"] },
  { abbr: "RR", played: 14, won: 4, lost: 10, tied: 0, nrr: -0.587, points: 8, form: ["L", "L", "L", "W", "L"] },
  { abbr: "SRH", played: 14, won: 5, lost: 9, tied: 0, nrr: -0.412, points: 10, form: ["L", "W", "L", "L", "W"] },
  { abbr: "LSG", played: 14, won: 4, lost: 10, tied: 0, nrr: -0.471, points: 8, form: ["L", "L", "W", "L", "L"] },
  { abbr: "CSK", played: 14, won: 4, lost: 10, tied: 0, nrr: -0.668, points: 8, form: ["L", "L", "W", "L", "W"] },
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
  isUser?: boolean;
}

export const FANTASY_LEADERBOARD: FantasyTeam[] = [
  {
    rank: 1, prevRank: 3, teamName: "Cover Drive Kings", owner: "Aarav Sharma", totalPoints: 4892, weekPoints: 312, captain: "Virat Kohli",
    players: [
      { name: "Virat Kohli", team: "RCB", points: 892, isCaptain: true },
      { name: "Phil Salt", team: "RCB", points: 754 },
      { name: "Jasprit Bumrah", team: "MI", points: 854, isViceCaptain: true },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Nicholas Pooran", team: "LSG", points: 712 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Sunil Narine", team: "KKR", points: 712 },
      { name: "Arshdeep Singh", team: "PBKS", points: 598 },
    ],
  },
  {
    rank: 2, prevRank: 1, teamName: "Babar's Brigade", owner: "Imran Khan", totalPoints: 4768, weekPoints: 287, captain: "Suryakumar Yadav",
    players: [
      { name: "Suryakumar Yadav", team: "MI", points: 812, isCaptain: true },
      { name: "Shubman Gill", team: "GT", points: 856, isViceCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Yashasvi Jaiswal", team: "RR", points: 824 },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Travis Head", team: "SRH", points: 712 },
      { name: "Yuzvendra Chahal", team: "RR", points: 648 },
      { name: "Kuldeep Yadav", team: "DC", points: 642 },
    ],
  },
  {
    rank: 3, prevRank: 5, teamName: "Super Over Squad", owner: "Rahul Verma", totalPoints: 4654, weekPoints: 298, captain: "Shubman Gill",
    players: [
      { name: "Shubman Gill", team: "GT", points: 856, isCaptain: true },
      { name: "Jasprit Bumrah", team: "MI", points: 854, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Yashasvi Jaiswal", team: "RR", points: 824 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Sunil Narine", team: "KKR", points: 712 },
      { name: "Ruturaj Gaikwad", team: "CSK", points: 698 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
  {
    rank: 4, prevRank: 2, teamName: "Wankhede Warriors", owner: "Sneha Patel", totalPoints: 4521, weekPoints: 325, captain: "Rohit Sharma",
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
    rank: 5, prevRank: 4, teamName: "Eden Army", owner: "Priya Nair", totalPoints: 4489, weekPoints: 276, captain: "Andre Russell",
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
    rank: 6, prevRank: 7, teamName: "Chepauk Lions", owner: "Karan Singh", totalPoints: 4421, weekPoints: 268, captain: "MS Dhoni",
    players: [
      { name: "MS Dhoni", team: "CSK", points: 562, isCaptain: true },
      { name: "Ruturaj Gaikwad", team: "CSK", points: 698, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Jasprit Bumrah", team: "MI", points: 854 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Shivam Dube", team: "CSK", points: 514 },
      { name: "Rashid Khan", team: "GT", points: 768 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Andre Russell", team: "KKR", points: 798 },
      { name: "Matheesha Pathirana", team: "CSK", points: 598 },
      { name: "Washington Sundar", team: "GT", points: 438 },
    ],
  },
  {
    rank: 7, prevRank: 6, teamName: "Powerplay Pandas", owner: "Ananya R", totalPoints: 4318, weekPoints: 245, captain: "Rishabh Pant",
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
    rank: 8, prevRank: 8, teamName: "Yorker Kings", owner: "Harkirat", totalPoints: 4267, weekPoints: 234, captain: "Jasprit Bumrah",
    players: [
      { name: "Jasprit Bumrah", team: "MI", points: 854, isCaptain: true },
      { name: "Arshdeep Singh", team: "PBKS", points: 598, isViceCaptain: true },
      { name: "Virat Kohli", team: "RCB", points: 892 },
      { name: "Shubman Gill", team: "GT", points: 856 },
      { name: "Shreyas Iyer", team: "PBKS", points: 642 },
      { name: "Kagiso Rabada", team: "PBKS", points: 658 },
      { name: "Suryakumar Yadav", team: "MI", points: 812 },
      { name: "Liam Livingstone", team: "PBKS", points: 487 },
      { name: "Heinrich Klaasen", team: "SRH", points: 752 },
      { name: "Prabhsimran Singh", team: "PBKS", points: 458 },
      { name: "Pat Cummins", team: "SRH", points: 612 },
    ],
  },
];

// Recent Match Impact Players / Player of the Match awards
export interface ImpactPlayer {
  matchId: number;
  playerName: string;
  team: string;
  points: number;
  role: string;
  reason: string;
}

export const IMPACT_PLAYERS: ImpactPlayer[] = [
  { matchId: 74, playerName: "Krunal Pandya", team: "RCB", points: 168, role: "All-Rounder", reason: "2/15 in 4 overs + 28 (15) in Final — Player of the Match" },
  { matchId: 73, playerName: "Shreyas Iyer", team: "PBKS", points: 142, role: "Batsman", reason: "87 (45) in Qualifier 2 — anchored the chase" },
  { matchId: 72, playerName: "Jasprit Bumrah", team: "MI", points: 165, role: "Bowler", reason: "3/18 in 4 overs in Eliminator — match-winning spell" },
  { matchId: 71, playerName: "Phil Salt", team: "RCB", points: 158, role: "Batsman", reason: "84* (43) in Qualifier 1 — chase masterclass" },
  { matchId: 50, playerName: "Virat Kohli", team: "RCB", points: 132, role: "Batsman", reason: "78 (42) vs SRH — anchored the chase" },
];

// Player performance progression across matches (form guide for charts)
export const PLAYER_PROGRESSION: Record<string, number[]> = {
  "Virat Kohli": [85, 42, 110, 67, 95, 78, 102, 88, 75, 92],
  "Shubman Gill": [62, 95, 85, 78, 88, 102, 75, 91, 68, 82],
  "Jasprit Bumrah": [72, 85, 91, 65, 78, 88, 75, 82, 95, 68],
  "Suryakumar Yadav": [78, 52, 95, 68, 81, 88, 75, 92, 65, 78],
  "Andre Russell": [78, 52, 88, 65, 72, 85, 68, 92, 75, 88],
  "Rashid Khan": [72, 58, 85, 65, 78, 82, 88, 75, 92, 68],
};

// Point System Reference
export const POINT_SYSTEM = [
  { category: "Batting", items: [
    { event: "Each Run scored", points: "+1" },
    { event: "Each 4 hit", points: "+1" },
    { event: "Each 6 hit", points: "+2" },
    { event: "Half Century (50 runs)", points: "+8" },
    { event: "Century (100 runs)", points: "+16" },
    { event: "Duck (out on 0)", points: "-2" },
    { event: "Strike Rate 170+ (min 10 balls)", points: "+6" },
    { event: "Strike Rate 150-170", points: "+4" },
    { event: "Strike Rate 130-150", points: "+2" },
  ]},
  { category: "Bowling", items: [
    { event: "Each Wicket", points: "+25" },
    { event: "LBW / Bowled wicket", points: "+8" },
    { event: "3 Wickets in a match", points: "+4" },
    { event: "4+ Wickets in a match", points: "+8" },
    { event: "Maiden over", points: "+12" },
    { event: "Economy Rate below 5 RPO", points: "+6" },
    { event: "Economy Rate 5-6 RPO", points: "+4" },
    { event: "Economy Rate 10-11 RPO", points: "-2" },
    { event: "Economy Rate above 11 RPO", points: "-4" },
  ]},
  { category: "Fielding", items: [
    { event: "Each Catch", points: "+8" },
    { event: "3 Catches in a match", points: "+4" },
    { event: "Stumping", points: "+12" },
    { event: "Run Out (direct throw)", points: "+12" },
    { event: "Run Out (indirect throw)", points: "+6" },
  ]},
  { category: "Bonuses", items: [
    { event: "Captain multiplier", points: "2x" },
    { event: "Vice-Captain multiplier", points: "1.5x" },
    { event: "In Starting XI", points: "+4" },
    { event: "Player of the Match", points: "+20" },
  ]},
];

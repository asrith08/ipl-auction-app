// 1. Unified Player Interface
export interface Player {
  id: number;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'WK';
  overseas: boolean;
  country: string;
  category: string;
  basePrice: number;
  batting: number;
  bowling: number;
  fielding: number;
  experience: number;
  captaincy: number;
  rating: number;
}

// 2. Updated Helper Function
let currentId = 1;

const createPlayer = (
  name: string,
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'WK',
  overseas = false,
  country = "India",
  category = "Capped",
  basePrice = 0.5,
  batting = 60,
  bowling = 60,
  fielding = 60,
  experience = 50,
  captaincy = 40
): Player => {
  let rating = 0;

  if (role === 'Batsman') {
    rating = (batting * 0.8) + (fielding * 0.2);
  } else if (role === 'Bowler') {
    rating = (bowling * 0.8) + (fielding * 0.2);
  } else if (role === 'WK') {
    rating = (batting * 0.7) + (fielding * 0.3);
  } else {
    rating = (batting * 0.4) + (bowling * 0.4) + (fielding * 0.2);
  }

  return {
    id: currentId++,
    name,
    role,
    overseas,
    country,
    category,
    basePrice,
    batting,
    bowling,
    fielding,
    experience,
    captaincy,
    rating: Math.round(rating),
  };
};

// 3. Player Sets
export const playerSets = {
  batterSet1: ["Virat Kohli","Rohit Sharma","Suryakumar Yadav","Travis Head","Heinrich Klaasen","Jos Buttler","Shubman Gill"],
  batterSet2: ["Ruturaj Gaikwad","Yashasvi Jaiswal","Nicholas Pooran","KL Rahul","Shreyas Iyer","David Miller","Phil Salt"],
  batterSet3: ["Rajat Patidar","Tilak Varma","Sai Sudharsan","Rinku Singh","Sanju Samson","Dhruv Jurel","Shimron Hetmyer"],
  batterSet4: ["Tristan Stubbs","Abishek Porel","Prabhsimran Singh","Devon Conway","Jake Fraser-McGurk","Harry Brook","Rahul Tripathi"],
  batterSet5: ["Aiden Markram","Devdutt Padikkal","David Warner","Jonny Bairstow","Quinton de Kock","Rahmanullah Gurbaz","Ishan Kishan"],
  batterSet6: ["Faf du Plessis","Glenn Phillips","Rovman Powell","Ajinkya Rahane","Kane Williamson","Josh Inglis","Ryan Rickelton"],
  batterSet7: ["Finn Allen","Dewald Brevis","Ben Duckett","Manish Pandey","Rilee Rossouw","Sherfane Rutherford","Ashton Turner"],
  batterSet8: ["James Vince","Tom Banton","Sam Billings","Jordan Cox","Ben McDermott","Kusal Mendis","Kusal Perera"],
  batterSet9: ["Josh Philippe","Johnson Charles","Litton Das","Andre Fletcher","Tom Latham","Ollie Pope","Kyle Verreynne"],
  batterSet10: ["Matthew Breetzke","Mark Chapman","Brandon King","Evin Lewis","Pathum Nissanka","Bhanuka Rajapaksa","Steven Smith"],
  batterSet11: ["Towhid Hridoy","Mikyle Louis","Harry Tector","Rassie van der Dussen","Will Young","Najibullah Zadran","Ibrahim Zadran"],
  batterSet12: ["Abhinav Manohar","Karun Nair","Angkrish Raghuvanshi","Atharva Taide","Nehal Wadhera","Aryan Juyal","Kumar Kushagra"],
  batterSet13: ["Robin Minz","Anuj Rawat","Luvnith Sisodia","Vishnu Vinod","Mayank Agarwal","Prithvi Shaw","Sachin Baby"],
  batterSet14: ["Priyam Garg","Harnoor Singh","C Andre Siddarth","Mohammed Azharuddeen","Urvil Patel","Salil Arora","Dinesh Bana"],
  batterSet15: ["Narayan Jagadeesan","Krishnan Shrijith","Michael Pepper","Vishnu Solanki","Sediqullah Atal","Ashwin Hebbar","Rohan Kunnummal"],
  batterSet16: ["Ayush Pandey","Akshat Raghuwanshi","Shoun Roger","Virat Singh","Ricky Bhui","Aarya Desai","Madhav Kaushik"],
  batterSet17: ["Pukhraj Mann","Harvik Desai","Tom Kohler-Cadmore","BR Sharath","Swastik Chikara","Shubham Dubey","Shaik Rasheed"],

  allrounderSet1: ["Hardik Pandya","Ravindra Jadeja","Andre Russell","Sunil Narine","Glenn Maxwell","Pat Cummins","Axar Patel"],
  allrounderSet2: ["Liam Livingstone","Marcus Stoinis","Abhishek Sharma","Nitish Kumar Reddy","Shivam Dube","Varun Chakravarthy","Riyan Parag"],
  allrounderSet3: ["Rahul Tewatia","M Shahrukh Khan","Ayush Badoni","Shashank Singh","Ravichandran Ashwin","Venkatesh Iyer","Mitchell Marsh"],
  allrounderSet4: ["Harshal Patel","Rachin Ravindra","Sam Curran","Marco Jansen","Krunal Pandya","Nitish Rana","Washington Sundar"],
  allrounderSet5: ["Harpreet Brar","Naman Dhir","Mahipal Lomror","Sameer Rizvi","Abdul Samad","Vijay Shankar","Ashutosh Sharma"],
  allrounderSet6: ["Nishant Sindhu","Utkarsh Singh","Anshul Kamboj","Arshad Khan","Darshan Nalkande","Anukul Roy","Swapnil Singh"],
  allrounderSet7: ["Yudhvir Singh","Rishi Dhawan","Rajvardhan Hangargekar","Tanush Kotian","Arshin Kulkarni","Shams Mulani","Shivam Singh"],
  allrounderSet8: ["Priyansh Arya","Manoj Bhandage","Praveen Dubey","Ajay Mandal","Prerak Mankad","Vipraj Nigam","Vicky Ostwal"],
  allrounderSet9: ["Sean Abbott","Jacob Bethell","Brydon Carse","Aaron Hardie","Sarfaraz Khan","Kyle Mayers","Kamindu Mendis"],
  allrounderSet10: ["Gus Atkinson","Tom Curran","Krishnappa Gowtham","Mohammad Nabi","Gulbadin Naib","Sikandar Raza","Mitchell Santner"],
  allrounderSet11: ["Jayant Yadav","Shahbaz Ahmed","Moeen Ali","Tim David","Deepak Hooda","Will Jacks","Azmatullah Omarzai"],
  allrounderSet12: ["Sai Kishore","Romario Shepherd","Suyash Prabhudessai","Sanvir Singh","Mayank Dagar","Lalit Yadav","Shivalik Sharma"],

  bowlerSet1: ["Jasprit Bumrah","Rashid Khan","Mitchell Starc","Trent Boult","Josh Hazlewood","Arshdeep Singh","Mohammed Siraj"],
  bowlerSet2: ["Yash Dayal","Matheesha Pathirana","Kuldeep Yadav","Harshit Rana","Sandeep Sharma","Ravi Bishnoi","Mayank Yadav"],
  bowlerSet3: ["Mohsin Khan","Kagiso Rabada","Yuzvendra Chahal","Mohammed Shami","Khaleel Ahmed","Avesh Khan","Prasidh Krishna"],
  bowlerSet4: ["T Natarajan","Anrich Nortje","Noor Ahmad","Rahul Chahar","Wanindu Hasaranga","Waqar Salamkheil","Maheesh Theekshana"],
  bowlerSet5: ["Adam Zampa","Vaibhav Arora","Rasikh Salam","Akash Madhwal","Mohit Sharma","Simarjeet Singh","Yash Thakur"],
  bowlerSet6: ["Vijaykumar Vyshak","Piyush Chawla","Shreyas Gopal","Mayank Markande","Suyash Sharma","Karn Sharma","Kumar Kartikeya"],
  bowlerSet7: ["Manav Suthar","Deepak Chahar","Gerald Coetzee","Akash Deep","Tushar Deshpande","Lockie Ferguson","Bhuvneshwar Kumar"],
  bowlerSet8: ["Mukesh Kumar","AM Ghazanfar","Akeal Hosein","Keshav Maharaj","Mujeeb Ur Rahman","Adil Rashid","Vijayakanth Viyaskanth"],
  bowlerSet9: ["Gurnoor Brar","Mukesh Choudhary","Sakib Hussain","Vidwath Kaverappa","Rajan Kumar","Sushant Mishra","Arjun Tendulkar"],
  bowlerSet10: ["Zeeshan Ansari","Prince Choudhary","Himanshu Sharma","Manimaran Siddharth","Digvesh Rathi","Prashant Solanki","Jhathavedh Subramanyan"],
  bowlerSet11: ["Spencer Johnson","Umran Malik","Mustafizur Rahman","Ishant Sharma","Nuwan Thushara","Naveen-ul-Haq","Jaydev Unadkat"],
  bowlerSet12: ["Umesh Yadav","Rishad Hossain","Zahir Khan","Nqabayomzi Peter","Tanveer Sangha","Tabraiz Shamsi","Jeffrey Vandersay"],
  bowlerSet13: ["Money Grewal","Ashwani Kumar","Ishan Porel","Abhilash Shetty","Akash Singh","Gurjapneet Singh","Basil Thampi"],
  bowlerSet14: ["Murugan Ashwin","Shreyas Chavan","Chintal Gandhi","Raghav Goyal","Jagadeesha Suchith","Roshan Waghsare","Bailapudi Yeswanth"],
  bowlerSet15: ["KM Asif","Akhil Chaudhary","Himanshu Chauhan","Arpit Guleria","Saranu Nishanth","Kuldip Yadav","Prithvi Raj"],
  bowlerSet16: ["Shubham Agarwal","Jasinder Singh","Jasmer Dhankhar","Pulkit Narang","Saumy Pandey","Mohit Rathee","Himanshu Singh"],
  bowlerSet17: ["Fazalhaq Farooqi","Richard Gleeson","Matt Henry","Alzarri Joseph","Kwena Maphaka","Kuldeep Sen","Reece Topley"],

  wicketkeeperSet1: ["MS Dhoni","Rishabh Pant","KL Rahul","Nicholas Pooran","Jos Buttler","Quinton de Kock","Sanju Samson"],
  wicketkeeperSet2: ["Jitesh Sharma","Ishan Kishan","Rahmanullah Gurbaz","Josh Inglis","Ryan Rickelton","Tom Banton","Sam Billings"],
  wicketkeeperSet3: ["Kusal Mendis","Kusal Perera","Tim Seifert","Alex Carey","Shai Hope","Upendra Yadav","Vansh Bedi"],
} as const;

// IMPORTANT FIX
type PlayerSetKey = keyof typeof playerSets;

// 4. Overseas detection
const overseasList = [
  "Travis Head","Heinrich Klaasen","Jos Buttler","Nicholas Pooran",
  "David Miller","Phil Salt","Shimron Hetmyer","Devon Conway",
  "Jake Fraser-McGurk","Aiden Markram","David Warner","Jonny Bairstow",
  "Quinton de Kock","Rahmanullah Gurbaz","Faf du Plessis",
  "Glenn Phillips","Rovman Powell","Kane Williamson","Josh Inglis",
  "Ryan Rickelton","Finn Allen","Dewald Brevis","Ben Duckett",
  "Rilee Rossouw","Sherfane Rutherford","Ashton Turner","James Vince",
  "Tom Banton","Sam Billings","Jordan Cox","Ben McDermott",
  "Kusal Mendis","Kusal Perera","Josh Philippe","Johnson Charles",
  "Litton Das","Andre Fletcher","Tom Latham","Ollie Pope",
  "Kyle Verreynne","Matthew Breetzke","Mark Chapman","Brandon King",
  "Evin Lewis","Pathum Nissanka","Bhanuka Rajapaksa","Steven Smith",
  "Towhid Hridoy","Mikyle Louis","Harry Tector","Rassie van der Dussen",
  "Will Young","Najibullah Zadran","Ibrahim Zadran","Andre Russell",
  "Sunil Narine","Glenn Maxwell","Liam Livingstone","Marcus Stoinis",
  "Mitchell Marsh","Rachin Ravindra","Sam Curran","Marco Jansen",
  "Sean Abbott","Jacob Bethell","Brydon Carse","Aaron Hardie",
  "Kyle Mayers","Kamindu Mendis","Gus Atkinson","Tom Curran",
  "Mohammad Nabi","Gulbadin Naib","Sikandar Raza","Mitchell Santner",
  "Moeen Ali","Tim David","Will Jacks","Azmatullah Omarzai",
  "Mitchell Starc","Trent Boult","Josh Hazlewood","Kagiso Rabada",
  "Anrich Nortje","Noor Ahmad","Wanindu Hasaranga","Waqar Salamkheil",
  "Maheesh Theekshana","Adam Zampa","Gerald Coetzee","Lockie Ferguson",
  "AM Ghazanfar","Akeal Hosein","Keshav Maharaj","Mujeeb Ur Rahman",
  "Adil Rashid","Vijayakanth Viyaskanth","Spencer Johnson",
  "Mustafizur Rahman","Nuwan Thushara","Naveen-ul-Haq",
  "Rishad Hossain","Zahir Khan","Nqabayomzi Peter","Tanveer Sangha",
  "Tabraiz Shamsi","Jeffrey Vandersay","Fazalhaq Farooqi",
  "Richard Gleeson","Matt Henry","Alzarri Joseph","Kwena Maphaka",
  "Reece Topley","Pat Cummins","Rashid Khan"
];

// 5. Manual Elite Players
const elitePlayers = [
  "Virat Kohli",
  "Rohit Sharma",
  "Jasprit Bumrah",
  "Suryakumar Yadav",
  "Hardik Pandya",
  "Pat Cummins",
  "Rashid Khan",
  "Travis Head",
  "Nicholas Pooran",
  "Jos Buttler",
  "Rishabh Pant",
  "KL Rahul",
  "Shreyas Iyer",
  "Shubman Gill",
  "Ruturaj Gaikwad",
  "Yashasvi Jaiswal"
];

// 6. Master Players List
export const players: Player[] = [
  createPlayer("Virat Kohli","Batsman",false,"India","Marquee",2,99,5,95,100,90),
  createPlayer("Rohit Sharma","Batsman",false,"India","Marquee",2,95,10,85,100,99),
  createPlayer("Jasprit Bumrah","Bowler",false,"India","Marquee",2,15,99,90,95,70),
  createPlayer("Suryakumar Yadav","Batsman",false,"India","Elite",2,98,0,90,90,75),
  createPlayer("Hardik Pandya","All-rounder",false,"India","Elite",2,88,85,90,88,92),
  createPlayer("Pat Cummins","All-rounder",true,"Australia","Elite",2,75,95,85,95,95),
  createPlayer("Rashid Khan","Bowler",true,"Afghanistan","Elite",2,45,99,85,95,50),
  createPlayer("Travis Head","Batsman",true,"Australia","Elite",2,92,35,82,85,60),
  createPlayer("Nicholas Pooran","WK",true,"West Indies","Elite",2,92,0,82,82,65),
  createPlayer("Jos Buttler","WK",true,"England","Elite",2,94,0,84,90,80),
  createPlayer("Rishabh Pant","WK",false,"India","Elite",2,91,0,85,82,85),
  createPlayer("KL Rahul","WK",false,"India","Elite",2,88,0,80,85,85),
  createPlayer("Shreyas Iyer","Batsman",false,"India","Elite",2,87,5,82,82,90),
  createPlayer("Shubman Gill","Batsman",false,"India","Elite",2,92,0,84,80,80),
  createPlayer("Ruturaj Gaikwad","Batsman",false,"India","Elite",2,90,0,80,75,85),
  createPlayer("Yashasvi Jaiswal","Batsman",false,"India","Elite",2,91,5,80,65,40),

  ...Object.values(playerSets)
    .flat()
    .filter((name) => !elitePlayers.includes(name))
    .map((name) => {
      const isOverseas = overseasList.includes(name);

      let role: 'Batsman' | 'Bowler' | 'All-rounder' | 'WK' = "Batsman";

      const setEntries = Object.entries(playerSets) as [
        PlayerSetKey,
        readonly string[]
      ][];

      if (
        setEntries.some(
          ([key, list]) =>
            key.includes("allrounder") && list.includes(name)
        )
      ) {
        role = "All-rounder";
      } else if (
        setEntries.some(
          ([key, list]) =>
            key.includes("bowler") && list.includes(name)
        )
      ) {
        role = "Bowler";
      } else if (
        setEntries.some(
          ([key, list]) =>
            key.includes("wicketkeeper") && list.includes(name)
        )
      ) {
        role = "WK";
      }

      return createPlayer(
        name,
        role,
        isOverseas,
        isOverseas ? "Overseas" : "India",
        "Capped",
        0.5,
        70,
        70,
        70,
        60,
        40
      );
    })
];
// seed.js
const mongoose = require('mongoose');
const config = require('./src/config');
const News = require('./src/models/News');

// Sample news data with 10 articles for each category
const newsSamples = [
  // Tech news samples
  {
    title: "New AI Model Can Predict Climate Change Impacts with 95% Accuracy",
    content: "Researchers at MIT have developed a groundbreaking AI model that can predict climate change impacts with unprecedented accuracy. The model uses a combination of satellite imagery, historical weather data, and advanced machine learning algorithms to make predictions that are 95% accurate.",
    summary: "MIT researchers create AI model with 95% accuracy in predicting climate change effects",
    category: "Tech",
    source: "Tech Chronicle",
    author: "Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Apple Unveils Next-Generation M3 Chips for New Mac Lineup",
    content: "Apple has announced its latest M3 chip lineup, featuring unprecedented performance improvements and energy efficiency. The new chips will power the next generation of Mac computers, with significant boosts in graphics processing capabilities and machine learning performance.",
    summary: "Apple's new M3 chips promise major performance gains for upcoming Mac devices",
    category: "Tech",
    source: "Apple Insider",
    author: "Mark Roberts",
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Google's Project Starline Creates Photorealistic 3D Video Calls",
    content: "Google has revealed Project Starline, a revolutionary technology that creates immersive, photorealistic 3D video calls that make participants feel as if they're physically in the same room. The technology uses advanced compression, spatial audio, and light field display systems to create a lifelike presence.",
    summary: "Google unveils technology for realistic 3D video communication",
    category: "Tech",
    source: "Google Blog",
    author: "Priya Sharma",
    imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Quantum Computing Breakthrough Achieves 99% Error Correction",
    content: "Scientists at IBM have achieved a major breakthrough in quantum computing error correction, reaching 99% accuracy. This development brings practical quantum computers significantly closer to reality, potentially revolutionizing fields from drug discovery to cryptography.",
    summary: "IBM scientists reach milestone in quantum computing with 99% error correction",
    category: "Tech",
    source: "Quantum Review",
    author: "David Chen",
    imageUrl: "https://images.unsplash.com/photo-1635070040809-d434392ae756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "SpaceX Starlink Now Provides Internet to Over 1 Million Global Users",
    content: "SpaceX's Starlink satellite internet service has surpassed 1 million active users worldwide, a significant milestone for the company's goal of providing global broadband coverage. The service now operates in 45 countries, with plans to expand coverage to remote and underserved regions.",
    summary: "SpaceX's Starlink reaches 1 million users across 45 countries",
    category: "Tech",
    source: "Space Technology Today",
    author: "Elena Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "New Cybersecurity Framework Adopted by Major Tech Companies",
    content: "A coalition of major tech companies including Microsoft, Google, and Amazon has adopted a new cybersecurity framework designed to protect critical infrastructure and consumer data. The framework establishes common standards for threat detection, incident response, and vulnerability management.",
    summary: "Tech giants adopt unified cybersecurity framework to enhance protection",
    category: "Tech",
    source: "Cybersecurity Daily",
    author: "Michael Wu",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Breakthrough in Flexible Display Technology Enables Fully Foldable Smartphones",
    content: "Researchers have developed a new flexible display technology that allows smartphones to be folded multiple times without damage. The technology uses a novel polymer substrate and organic light-emitting materials that maintain brightness and color accuracy even after thousands of fold cycles.",
    summary: "New display technology enables smartphones that can be folded multiple times",
    category: "Tech",
    source: "Display Technology Review",
    author: "Jessica Park",
    imageUrl: "https://images.unsplash.com/photo-1626144296725-4f0b0fb7bb22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "EU Approves Landmark AI Regulation Framework",
    content: "The European Union has approved a comprehensive AI regulation framework that establishes rules for the development and deployment of artificial intelligence systems. The regulations aim to ensure AI technologies are safe, transparent, and respect fundamental rights while fostering innovation.",
    summary: "EU passes first comprehensive legal framework for AI regulation",
    category: "Tech",
    source: "European Tech Policy",
    author: "Hans Mueller",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Neural Interface Allows Typing with Mind at 90 Words Per Minute",
    content: "A team of neuroscientists has developed a brain-computer interface that allows users to type by thinking, achieving speeds of up to 90 words per minute. The non-invasive device uses advanced machine learning to interpret neural signals and translate them into text with high accuracy.",
    summary: "New brain-computer interface enables mind typing at 90 WPM",
    category: "Tech",
    source: "Neural Tech Review",
    author: "Aisha Johnson",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Revolutionary Battery Technology Extends EV Range to 1000 Miles",
    content: "A startup has unveiled a new battery technology that could extend electric vehicle range to 1000 miles on a single charge. The solid-state battery design uses sustainable materials and promises faster charging times, longer lifespan, and improved safety compared to conventional lithium-ion batteries.",
    summary: "New battery technology could revolutionize electric vehicles with 1000-mile range",
    category: "Tech",
    source: "EV Technology Today",
    author: "Jason Kim",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a156bb16cb3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  
  // Business news samples
  {
    title: "Amazon Acquires AI Startup for $3.5 Billion to Enhance Logistics",
    content: "Amazon has acquired DeepRoute.ai, an artificial intelligence startup specializing in supply chain optimization, for $3.5 billion. The acquisition is expected to enhance Amazon's logistics capabilities and reduce delivery times by up to 30% through advanced predictive algorithms.",
    summary: "Amazon's $3.5B acquisition aims to revolutionize its logistics operations",
    category: "Business",
    source: "Business Insider",
    author: "Thomas Reed",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Global Stock Markets Hit Record Highs Following Fed Announcement",
    content: "Stock markets worldwide reached record highs after the Federal Reserve announced plans to maintain current interest rates. The S&P 500, Dow Jones, and NASDAQ all closed at unprecedented levels, with tech and financial sectors leading the gains.",
    summary: "Markets surge to record levels after Fed maintains current monetary policy",
    category: "Business",
    source: "Financial Times",
    author: "Emma Chang",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Starbucks Announces Major Expansion in Southeast Asia with 500 New Locations",
    content: "Starbucks has unveiled plans to open 500 new stores across Southeast Asia over the next three years, creating approximately 10,000 jobs. The expansion will focus on Vietnam, Thailand, and the Philippines, with each location featuring locally inspired menu items and designs.",
    summary: "Starbucks plans 500 new stores in Southeast Asian markets over next three years",
    category: "Business",
    source: "Retail Business Daily",
    author: "Nguyen Tran",
    imageUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Tesla Exceeds Quarterly Delivery Expectations with Record 450,000 Vehicles",
    content: "Tesla has reported quarterly deliveries of 450,000 vehicles, significantly exceeding analyst expectations of 420,000. The strong performance was primarily driven by demand for the Model Y and increased production capacity at the company's Shanghai and Berlin factories.",
    summary: "Tesla delivers record 450,000 vehicles, beating market expectations",
    category: "Business",
    source: "Auto Industry News",
    author: "Robert Garcia",
    imageUrl: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "JPMorgan Chase Launches $2.5 Billion Fund for Climate Technology Investments",
    content: "JPMorgan Chase has announced a $2.5 billion investment fund focused on climate technologies and sustainable infrastructure. The fund will target innovations in renewable energy, carbon capture, and green building technologies, with commitments to achieve measurable carbon reduction outcomes.",
    summary: "JPMorgan creates $2.5B fund dedicated to climate tech investments",
    category: "Business",
    source: "Investment Weekly",
    author: "Claire Wilson",
    imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Microsoft's Cloud Revenue Surpasses $100 Billion Annual Run Rate",
    content: "Microsoft has reported that its cloud computing services have surpassed a $100 billion annual revenue run rate for the first time. Azure, the company's cloud platform, grew by 35% year-over-year, driving Microsoft's overall quarterly profits to exceed market expectations.",
    summary: "Microsoft cloud business reaches $100B annual revenue milestone",
    category: "Business",
    source: "Tech Financial Review",
    author: "Alan Peterson",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Remote Work Trend Drives Record Commercial Real Estate Vacancies in Major Cities",
    content: "Major urban centers are experiencing record-high commercial real estate vacancies as companies continue to embrace remote work policies. Office vacancy rates in New York, San Francisco, and Chicago have reached 25-30%, prompting property owners to consider converting spaces to residential or mixed-use developments.",
    summary: "Office vacancies hit record highs as remote work reshapes urban real estate",
    category: "Business",
    source: "Real Estate Journal",
    author: "Sophia Mitchell",
    imageUrl: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Walmart Launches Healthcare Subscription Service at $99 Annual Fee",
    content: "Walmart has introduced a healthcare subscription service priced at $99 annually, offering members unlimited virtual doctor visits, discounted prescriptions, and preventive care services. The move represents Walmart's latest expansion into healthcare, competing directly with Amazon's healthcare initiatives.",
    summary: "Walmart enters healthcare subscription market with affordable annual plan",
    category: "Business",
    source: "Healthcare Business Today",
    author: "Marcus Johnson",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Singapore Becomes World's Leading Fintech Hub, Surpassing London",
    content: "Singapore has overtaken London as the world's top fintech hub according to the Global Fintech Index. The city-state's favorable regulatory environment, government support, and strategic location in Asia have attracted over 1,000 fintech companies and $4.1 billion in investment over the past year.",
    summary: "Singapore named top global fintech hub in latest industry rankings",
    category: "Business",
    source: "Fintech Monthly",
    author: "Li Wei",
    imageUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Beyond Meat Partners with McDonald's for Global Plant-Based Burger Rollout",
    content: "Beyond Meat has announced a three-year partnership with McDonald's to be the exclusive supplier of plant-based patties for the McPlant burger. The deal will see the McPlant launched in 70 countries, marking the largest global distribution agreement in the plant-based meat industry.",
    summary: "Beyond Meat signs exclusive deal to supply McDonald's plant-based burgers worldwide",
    category: "Business",
    source: "Food Industry Report",
    author: "Rachel Green",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  
  // Sports news samples
  {
    title: "Lionel Messi Announces Retirement from International Football",
    content: "Football legend Lionel Messi has announced his retirement from international football following Argentina's World Cup victory. The 39-year-old forward ends his international career with an impressive record of 172 caps and 98 goals for his country, having finally secured the World Cup trophy in his final tournament.",
    summary: "Messi retires from Argentina duty after achieving World Cup glory",
    category: "Sports",
    source: "World Football News",
    author: "Carlos Diaz",
    imageUrl: "https://images.unsplash.com/photo-1577223048322-0c7b21f39d27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "US Olympic Team Sets Medal Record at 2024 Paris Games",
    content: "The United States Olympic team has set a new medal record at the Paris 2024 Games, securing 135 medals in total including 45 gold, 50 silver, and 40 bronze. Swimming and track and field athletes led the medal count, with breakout performances in new Olympic sports like climbing and skateboarding.",
    summary: "Team USA breaks Olympic medal record with 135 total medals at Paris Games",
    category: "Sports",
    source: "Olympic Daily",
    author: "Jennifer Taylor",
    imageUrl: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Kansas City Chiefs Win Third Consecutive Super Bowl in Overtime Thriller",
    content: "The Kansas City Chiefs have claimed their third straight Super Bowl title with a 34-31 overtime victory against the Dallas Cowboys. Quarterback Patrick Mahomes was named MVP after throwing for 380 yards and four touchdowns in what analysts are calling one of the greatest Super Bowl performances ever.",
    summary: "Chiefs secure historic three-peat with overtime Super Bowl victory",
    category: "Sports",
    source: "NFL Network",
    author: "Tyrone Williams",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Serena Williams Announces Comeback for 2025 Australian Open",
    content: "Tennis great Serena Williams has announced a surprise comeback to professional tennis, confirming she will compete in the 2025 Australian Open. The 43-year-old, who previously retired with 23 Grand Slam singles titles, stated her goal is to surpass Margaret Court's record of 24 major championships.",
    summary: "Serena Williams plans tennis return at 43, targeting Grand Slam record",
    category: "Sports",
    source: "Tennis Magazine",
    author: "Amanda Foster",
    imageUrl: "https://images.unsplash.com/photo-1595435934949-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Formula 1 Announces Expansion to Africa with South African Grand Prix",
    content: "Formula 1 has officially announced the return of the South African Grand Prix, with Kyalami Circuit set to host races beginning in the 2026 season. This marks F1's return to Africa after a 34-year absence and completes the sport's presence on all inhabited continents.",
    summary: "F1 returns to Africa with addition of South African Grand Prix from 2026",
    category: "Sports",
    source: "Motorsport Global",
    author: "Daniel Khumalo",
    imageUrl: "https://images.unsplash.com/photo-1617645576307-463231417dfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "NBA Approves Expansion Teams in Las Vegas and Seattle",
    content: "The National Basketball Association has approved expansion franchises in Las Vegas and Seattle, increasing the league to 32 teams. The Seattle SuperSonics will make their return after a 16-year absence, while Las Vegas will welcome its first major professional basketball team, with both franchises set to begin play in the 2026-27 season.",
    summary: "NBA expands to 32 teams with new franchises in Las Vegas and Seattle",
    category: "Sports",
    source: "Basketball Insider",
    author: "Marcus Johnson",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "17-Year-Old Swimmer Breaks Michael Phelps' 200m Butterfly World Record",
    content: "Romanian swimming prodigy Andrei Popescu, just 17 years old, has broken Michael Phelps' long-standing world record in the 200m butterfly. Popescu's time of 1:50.23 at the European Championships shattered the previous mark by 0.32 seconds, ending Phelps' 16-year hold on the record.",
    summary: "Teen phenom breaks one of swimming's most enduring world records",
    category: "Sports",
    source: "Swimming World",
    author: "Petra Schmidt",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Premier League Introduces AI Referee System for 2025-26 Season",
    content: "The English Premier League has announced the implementation of an AI-assisted referee system for the 2025-26 season. The technology will provide real-time offside decisions and assist with goal-line technology, penalty decisions, and other contentious calls, reducing game stoppages and human error.",
    summary: "Premier League adopts advanced AI referee technology for next season",
    category: "Sports",
    source: "Football Technology",
    author: "Ian Wright",
    imageUrl: "https://images.unsplash.com/photo-1638627682399-7bcc4a7f23b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "India Wins Cricket World Cup on Home Soil After 28-Year Wait",
    content: "India has won the ICC Cricket World Cup, defeating Australia by 5 wickets in a thrilling final match in Mumbai. Captain Virat Kohli led the chase with an unbeaten century as India claimed their third World Cup title and their first on home soil since 1987, sparking nationwide celebrations.",
    summary: "India claims Cricket World Cup with dramatic victory over Australia",
    category: "Sports",
    source: "Cricket Today",
    author: "Rahul Sharma",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "LeBron James Becomes First NBA Player to Reach 40,000 Career Points",
    content: "LeBron James has made basketball history by becoming the first NBA player to score 40,000 career points. The 40-year-old Los Angeles Lakers star reached the unprecedented milestone during a home game against the Denver Nuggets, further cementing his legacy as one of the greatest players of all time.",
    summary: "LeBron James reaches historic 40,000-point milestone in legendary career",
    category: "Sports",
    source: "NBA News Network",
    author: "Jamal Washington",
    imageUrl: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  
  // Entertainment news samples
  {
    title: "Beyoncé and Taylor Swift Announce Surprise Joint Album and World Tour",
    content: "In a move that has stunned the music world, Beyoncé and Taylor Swift have announced a collaborative album and accompanying world stadium tour. The album, titled 'Legends United', will feature 16 tracks blending both artists' musical styles and is set for release next month, followed by a 40-city global tour.",
    summary: "Music superstars Beyoncé and Taylor Swift reveal unprecedented collaboration",
    category: "Entertainment",
    source: "Rolling Stone",
    author: "Jessica Morgan",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Avatar 3 Breaks Opening Weekend Box Office Record with $450 Million",
    content: "James Cameron's 'Avatar 3: Pandora Rising' has shattered global box office records with an opening weekend haul of $450 million. The film, which introduces new biomes and civilizations on Pandora, has received critical acclaim for its groundbreaking visual effects and environmental storytelling.",
    summary: "Third Avatar film sets new opening weekend record with massive global earnings",
    category: "Entertainment",
    source: "Hollywood Reporter",
    author: "Steven Chen",
    imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Disney Announces Five New Marvel Series for Streaming Platform",
    content: "Disney has unveiled plans for five new Marvel television series to premiere on its streaming service over the next two years. The lineup includes shows focused on Doctor Strange, Shang-Chi, Young Avengers, X-Men: First Class, and a Nova series, expanding the Marvel Cinematic Universe in new directions.",
    summary: "Disney+ expands Marvel content with five new series announcements",
    category: "Entertainment",
    source: "Entertainment Weekly",
    author: "Zoe Davis",
    imageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Adele Sweeps Grammy Awards with Six Wins Including Album of the Year",
    content: "British singer-songwriter Adele dominated the Grammy Awards, winning all six categories she was nominated in, including Album of the Year for '32'. Her emotional performance of the ballad 'Never Again' received a standing ovation and was widely praised as the highlight of the ceremony.",
    summary: "Adele claims six Grammy awards in clean sweep at music's biggest night",
    category: "Entertainment",
    source: "Music Today",
    author: "Chris Reynolds",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Netflix Announces Interactive Film Technology Allowing Viewers to Control Major Storylines",
    content: "Netflix has revealed a new interactive film technology that allows viewers to make significant plot decisions throughout movies, creating unique viewing experiences. The platform plans to implement this technology in upcoming original films across multiple genres, starting with a sci-fi thriller directed by Christopher Nolan.",
    summary: "Netflix unveils advanced interactive storytelling technology for upcoming films",
    category: "Entertainment",
    source: "Streaming Insider",
    author: "Tanya Williams",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Broadway Sees Record Attendance as Theater Industry Fully Recovers",
    content: "Broadway theaters have reported record attendance figures, with over 15 million tickets sold in the past year. The resurgence has been driven by innovative new productions, revivals of classic shows, and increased international tourism to New York City, marking a full recovery for the industry.",
    summary: "Broadway celebrates record-breaking year with 15 million tickets sold",
    category: "Entertainment",
    source: "Theater Monthly",
    author: "Benjamin Ross",
    imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Korean Drama 'Silent Shadows' Becomes Most-Watched Non-English Series in Streaming History",
    content: "The Korean psychological thriller 'Silent Shadows' has become the most-watched non-English language series ever, with over 300 million viewing hours in its first month. The show's unexpected plot twists and complex characters have generated massive social media buzz and critical acclaim worldwide.",
    summary: "Korean thriller breaks all-time viewing records for non-English content",
    category: "Entertainment",
    source: "Global Entertainment News",
    author: "Ji-Young Kim",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Virtual Reality Concert Platform Attracts 50 Million Users for Live Music Events",
    content: "A virtual reality concert platform has reported reaching 50 million users worldwide, with recent performances by major artists drawing audiences of up to 10 million simultaneous viewers. The technology allows fans to experience immersive concerts from anywhere, with interactive features and virtual meet-and-greets with performers.",
    summary: "VR concert platform reaches 50M users, transforming live music experience",
    category: "Entertainment",
    source: "Digital Entertainment Today",
    author: "Maya Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Studio Ghibli Announces First Fully AI-Enhanced Animated Film",
    content: "Legendary Japanese animation house Studio Ghibli has announced its first project using AI-enhanced animation techniques. The film, titled 'Whispers of the Wind', will maintain the studio's distinctive hand-drawn aesthetic while using artificial intelligence to create more detailed environmental elements and complex movement sequences.",
    summary: "Studio Ghibli embraces AI technology for groundbreaking new animated feature",
    category: "Entertainment",
    source: "Animation World",
    author: "Haruki Tanaka",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Streaming Services Introduce Unified Subscription Option After Industry Agreement",
    content: "Major streaming platforms including Netflix, Disney+, HBO Max, and Hulu have announced a groundbreaking industry agreement to offer consumers a unified subscription option. The collaborative package will provide access to all participating platforms at a significantly reduced price compared to individual subscriptions.",
    summary: "Major streaming services join forces to offer combined subscription package",
    category: "Entertainment",
    source: "Media Business Review",
    author: "Alexis Carter",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  
  // Science news samples
  {
    title: "NASA Confirms Evidence of Ancient Microbial Life on Mars",
    content: "NASA scientists have confirmed the discovery of fossilized microbial structures in Martian rock samples returned to Earth by the Perseverance rover. The finding provides the strongest evidence yet that simple life forms once existed on the red planet, fundamentally changing our understanding of life in the solar system.",
    summary: "Mars samples reveal conclusive evidence of ancient microbial life",
    category: "Science",
    source: "Astronomy Today",
    author: "Dr. Samantha Lewis",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Breakthrough CRISPR Therapy Cures Sickle Cell Disease in Clinical Trial",
    content: "A new CRISPR gene editing therapy has effectively cured sickle cell disease in all 45 patients participating in a landmark clinical trial. The one-time treatment modifies patients' stem cells to produce healthy hemoglobin, eliminating symptoms and complications of the disease with minimal side effects.",
    summary: "Gene editing treatment shows 100% effectiveness in sickle cell disease trial",
    category: "Science",
    source: "Medical Research Journal",
    author: "Dr. James Wilson",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Scientists Achieve Room-Temperature Superconductivity at Ambient Pressure",
    content: "Physicists have achieved the holy grail of materials science: room-temperature superconductivity at ambient pressure. The breakthrough material, a novel hydrogen-rich compound, conducts electricity with zero resistance at 20°C, potentially revolutionizing energy transmission, computing, and transportation technologies.",
    summary: "Physics breakthrough creates superconductor that works at room temperature",
    category: "Science",
    source: "Physics World",
    author: "Dr. Elena Kuznetsov",
    imageUrl: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Astronomers Detect Clear Signs of Life in Atmosphere of Exoplanet Kepler-452b",
    content: "Using the James Webb Space Telescope, astronomers have detected a combination of oxygen, methane, and other biosignature gases in the atmosphere of exoplanet Kepler-452b. Scientists consider this the strongest evidence yet for the existence of life beyond our solar system, though further observations are planned.",
    summary: "Webb telescope finds compelling evidence of life on distant Earth-like planet",
    category: "Science",
    source: "Space Science Review",
    author: "Dr. Michael Chen",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Scientists Create First Complete Synthetic Human Chromosome",
    content: "Researchers have successfully synthesized a complete human Y chromosome, marking a significant milestone in synthetic biology. The achievement demonstrates the ability to construct large, functioning genetic structures that could eventually lead to treatments for genetic diseases and advances in regenerative medicine.",
    summary: "Synthetic biology breakthrough as scientists create artificial human chromosome",
    category: "Science",
    source: "Nature Genomics",
    author: "Dr. Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Quantum Computer Performs Calculation That Would Take Supercomputer 10,000 Years",
    content: "A quantum computer developed by an international research team has performed a specialized calculation in minutes that would take the world's fastest supercomputer approximately 10,000 years to complete. The achievement demonstrates definitive quantum advantage and opens new possibilities for complex simulations and optimization problems.",
    summary: "Quantum computing reaches major milestone with unprecedented calculation speed",
    category: "Science",
    source: "Quantum Computing Report",
    author: "Dr. Hiroshi Yamamoto",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "AI System Discovers New Antibiotic Effective Against Drug-Resistant Bacteria",
    content: "An artificial intelligence system designed to identify potential antibiotics has discovered a novel compound effective against numerous drug-resistant bacteria. The molecule, named Halicin after the computer HAL 9000, works through a mechanism different from existing antibiotics and has shown remarkable efficacy in initial tests.",
    summary: "AI discovers powerful new antibiotic compound that kills resistant bacteria",
    category: "Science",
    source: "Microbiology Today",
    author: "Dr. Rachel Martinez",
    imageUrl: "https://images.unsplash.com/photo-1583912271918-0d9a8f2fb7e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Nuclear Fusion Reactor Maintains Plasma for Record 100 Seconds",
    content: "Scientists at the ITER project have achieved a major breakthrough in nuclear fusion, maintaining a stable plasma at 100 million degrees Celsius for over 100 seconds. This milestone brings commercial fusion energy significantly closer to reality, potentially providing an abundant, clean energy source within the next decade.",
    summary: "Fusion energy breakthrough as reactor maintains stable reaction for record time",
    category: "Science",
    source: "Energy Science Journal",
    author: "Dr. Philippe Lefevre",
    imageUrl: "https://images.unsplash.com/photo-1589149098258-3b71a54013e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Biologists Revive 100,000-Year-Old Microbes from Arctic Ice",
    content: "A team of microbiologists has successfully revived and cultivated microorganisms that had been frozen in Arctic permafrost for approximately 100,000 years. The ancient bacteria quickly adapted to modern conditions and provide unprecedented insights into microbial evolution and ancient Earth environments.",
    summary: "Scientists bring 100,000-year-old microorganisms back to life from frozen Arctic",
    category: "Science",
    source: "Microbiology Weekly",
    author: "Dr. Anders Nielsen",
    imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "First Successful Brain Implant Restores Speech to Paralyzed Patient",
    content: "Neuroscientists have successfully implemented a brain-computer interface that has restored speech to a fully paralyzed patient. The implant translates neural signals into text and synthesized speech in real time, allowing the patient to communicate at nearly normal conversational speeds for the first time in seven years.",
    summary: "Revolutionary brain implant allows paralyzed patient to speak again",
    category: "Science",
    source: "Neuroscience Today",
    author: "Dr. Maya Patel",
    imageUrl: "https://images.unsplash.com/photo-1559757175-7cb057fba3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  
  // Health news samples
  {
    title: "Universal Cancer Vaccine Shows 95% Effectiveness in Early Trials",
    content: "A revolutionary mRNA-based cancer vaccine has demonstrated 95% effectiveness in preventing cancer recurrence in early clinical trials. The personalized vaccine, which targets specific mutations in cancer cells, could transform cancer treatment from reactive to preventive medicine for high-risk individuals and cancer survivors.",
    summary: "Breakthrough cancer vaccine shows remarkable success in preventing recurrence",
    category: "Health",
    source: "Medical Innovation Today",
    author: "Dr. Rebecca Chen",
    imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Study Finds Daily 10-Minute Meditation Reduces Biological Age by 2.5 Years",
    content: "A long-term study involving over 5,000 participants has found that practicing just 10 minutes of meditation daily can reduce biological age by approximately 2.5 years. Researchers measured cellular aging markers including telomere length and epigenetic clock data, finding significant improvements in participants who maintained consistent meditation practices.",
    summary: "Research shows regular short meditation sessions can slow biological aging",
    category: "Health",
    source: "Preventive Medicine Journal",
    author: "Dr. Jonathan Miller",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Artificial Pancreas System Receives Approval for Type 2 Diabetes Treatment",
    content: "Health authorities have approved the first artificial pancreas system for treating type 2 diabetes. The closed-loop system continuously monitors blood glucose levels and automatically delivers insulin as needed, dramatically improving glycemic control and reducing complications without requiring constant management by patients.",
    summary: "Automated insulin delivery system approved for wider diabetes treatment",
    category: "Health",
    source: "Diabetes Care",
    author: "Dr. Sarah Thompson",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "New Drug Combination Reverses Alzheimer's Symptoms in Clinical Trial",
    content: "A phase III clinical trial testing a novel combination of drugs has demonstrated unprecedented success in reversing cognitive decline and other symptoms in Alzheimer's patients. The treatment targets both amyloid plaques and tau tangles while reducing neuroinflammation, with 68% of participants showing significant cognitive improvement.",
    summary: "Groundbreaking treatment shows first evidence of reversing Alzheimer's progression",
    category: "Health",
    source: "Neurology Today",
    author: "Dr. Frank Martinez",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Digital Therapeutic App Receives Approval as ADHD Treatment for Children",
    content: "A video game-based digital therapeutic application has received regulatory approval as a prescription treatment for ADHD in children. The app, which adapts to each child's abilities and progress, has shown effectiveness comparable to traditional medications with none of the side effects in extensive clinical testing.",
    summary: "Therapeutic video game approved as prescription ADHD treatment for kids",
    category: "Health",
    source: "Pediatric Health Technology",
    author: "Dr. Alisha Johnson",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Scientists Identify Molecule That Naturally Suppresses Hunger and Obesity",
    content: "Researchers have identified a naturally occurring molecule in the human gut that effectively suppresses hunger and prevents obesity in preliminary studies. The compound, named Lipokine-7, regulates appetite signals and metabolic processes without the side effects associated with current weight management medications.",
    summary: "Natural hunger-suppressing molecule discovered with potential for obesity treatment",
    category: "Health",
    source: "Metabolic Science Journal",
    author: "Dr. Emily Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Digital Therapeutic App Receives Approval as ADHD Treatment for Children",
    content: "A video game-based digital therapeutic application has received regulatory approval as a prescription treatment for ADHD in children. The app, which adapts to each child's abilities and progress, has shown effectiveness comparable to traditional medications with none of the side effects in extensive clinical testing.",
    summary: "Therapeutic video game approved as prescription ADHD treatment for kids",
    category: "Health",
    source: "Pediatric Health Technology",
    author: "Dr. Alisha Johnson",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Scientists Identify Molecule That Naturally Suppresses Hunger and Obesity",
    content: "Researchers have identified a naturally occurring molecule in the human gut that effectively suppresses hunger and prevents obesity in preliminary studies. The compound, named Lipokine-7, regulates appetite signals and metabolic processes without the side effects associated with current weight management medications.",
    summary: "Natural hunger-suppressing molecule discovered with potential for obesity treatment",
    category: "Health",
    source: "Metabolic Science Journal",
    author: "Dr. Emily Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Smartphone Eye Scan Detects Early Signs of Cardiovascular Disease",
    content: "A new smartphone app that scans the blood vessels in the eye can detect early signs of cardiovascular disease with 90% accuracy. The non-invasive technology uses the phone's camera and machine learning to identify subtle changes in retinal vasculature that indicate increased risk of heart attack and stroke years before symptoms appear.",
    summary: "Phone-based eye scanning technology provides early warning of heart disease risk",
    category: "Health",
    source: "Preventative Cardiology",
    author: "Dr. Hassan Ali",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "New Surgical Technique Repairs Spinal Cord Injuries with 70% Success Rate",
    content: "Neurosurgeons have developed a revolutionary surgical technique for treating spinal cord injuries, achieving partial or complete recovery of motor function in 70% of patients with previously untreatable injuries. The procedure combines stem cell transplantation with a synthetic scaffold and electrical stimulation to promote nerve regeneration.",
    summary: "Innovative surgery allows majority of spinal injury patients to regain mobility",
    category: "Health",
    source: "Neurosurgery Advances",
    author: "Dr. Priya Sharma",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Study Finds Intermittent Fasting Extends Lifespan by Up to 15%",
    content: "A comprehensive 20-year study on caloric restriction and intermittent fasting has concluded that specific fasting protocols can extend human lifespan by up to 15%. The research identified time-restricted eating with a 6-hour daily window as optimal for longevity benefits without significant lifestyle disruption.",
    summary: "Long-term research confirms significant lifespan extension from intermittent fasting",
    category: "Health",
    source: "Longevity Science Review",
    author: "Dr. Miguel Santos",
    imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  },
  {
    title: "Universal Flu Vaccine Shows Long-Lasting Protection Against All Strains",
    content: "Scientists have developed a universal influenza vaccine that provides protection against all known strains of the flu virus. In clinical trials, the vaccine demonstrated effectiveness lasting at least three years and worked against seasonal influenza variants as well as potentially pandemic strains, eliminating the need for annual shots.",
    summary: "Single vaccine provides multi-year protection against all influenza variants",
    category: "Health",
    source: "Infectious Disease Journal",
    author: "Dr. Yuki Tanaka",
    imageUrl: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 5000)
  }
];

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB for seeding');

    // Delete existing news articles if any
    await News.deleteMany({});
    console.log('Cleared existing news articles');

    // Insert new sample news articles
    const result = await News.insertMany(newsSamples);
    console.log(`Successfully seeded ${result.length} news articles`);

    // Log counts by category
    const categoryCounts = await News.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    console.log('News articles by category:');
    categoryCounts.forEach(category => {
      console.log(`${category._id}: ${category.count} articles`);
    });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding function
seedDatabase();

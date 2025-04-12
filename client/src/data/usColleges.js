/**
 * US Colleges and Universities data for Campi
 * Based on the US Colleges and Universities dataset
 * Processed for use in the Campi application
 */

const usColleges = [
  // Top Universities by region
  { id: 'northeast_1', name: 'Harvard University', location: 'Cambridge, MA', region: 'northeast' },
  { id: 'northeast_2', name: 'Yale University', location: 'New Haven, CT', region: 'northeast' },
  { id: 'northeast_3', name: 'MIT', location: 'Cambridge, MA', region: 'northeast' },
  { id: 'northeast_4', name: 'Princeton University', location: 'Princeton, NJ', region: 'northeast' },
  { id: 'northeast_5', name: 'Columbia University', location: 'New York, NY', region: 'northeast' },
  { id: 'northeast_6', name: 'Brown University', location: 'Providence, RI', region: 'northeast' },
  { id: 'northeast_7', name: 'Dartmouth College', location: 'Hanover, NH', region: 'northeast' },
  { id: 'northeast_8', name: 'Cornell University', location: 'Ithaca, NY', region: 'northeast' },
  { id: 'northeast_9', name: 'Boston University', location: 'Boston, MA', region: 'northeast' },
  { id: 'northeast_10', name: 'Northeastern University', location: 'Boston, MA', region: 'northeast' },
  
  { id: 'midwest_1', name: 'University of Chicago', location: 'Chicago, IL', region: 'midwest' },
  { id: 'midwest_2', name: 'Northwestern University', location: 'Evanston, IL', region: 'midwest' },
  { id: 'midwest_3', name: 'University of Michigan', location: 'Ann Arbor, MI', region: 'midwest' },
  { id: 'midwest_4', name: 'University of Notre Dame', location: 'Notre Dame, IN', region: 'midwest' },
  { id: 'midwest_5', name: 'Washington University in St. Louis', location: 'St. Louis, MO', region: 'midwest' },
  { id: 'midwest_6', name: 'Ohio State University', location: 'Columbus, OH', region: 'midwest' },
  { id: 'midwest_7', name: 'University of Wisconsin-Madison', location: 'Madison, WI', region: 'midwest' },
  { id: 'midwest_8', name: 'University of Illinois', location: 'Urbana-Champaign, IL', region: 'midwest' },
  { id: 'midwest_9', name: 'Purdue University', location: 'West Lafayette, IN', region: 'midwest' },
  { id: 'midwest_10', name: 'Michigan State University', location: 'East Lansing, MI', region: 'midwest' },
  
  { id: 'south_1', name: 'Duke University', location: 'Durham, NC', region: 'south' },
  { id: 'south_2', name: 'Rice University', location: 'Houston, TX', region: 'south' },
  { id: 'south_3', name: 'Vanderbilt University', location: 'Nashville, TN', region: 'south' },
  { id: 'south_4', name: 'University of Virginia', location: 'Charlottesville, VA', region: 'south' },
  { id: 'south_5', name: 'University of North Carolina', location: 'Chapel Hill, NC', region: 'south' },
  { id: 'south_6', name: 'University of Texas', location: 'Austin, TX', region: 'south' },
  { id: 'south_7', name: 'University of Florida', location: 'Gainesville, FL', region: 'south' },
  { id: 'south_8', name: 'Georgia Tech', location: 'Atlanta, GA', region: 'south' },
  { id: 'south_9', name: 'Emory University', location: 'Atlanta, GA', region: 'south' },
  { id: 'south_10', name: 'University of Miami', location: 'Miami, FL', region: 'south' },
  
  { id: 'west_1', name: 'Stanford University', location: 'Stanford, CA', region: 'west' },
  { id: 'west_2', name: 'Caltech', location: 'Pasadena, CA', region: 'west' },
  { id: 'west_3', name: 'UC Berkeley', location: 'Berkeley, CA', region: 'west' },
  { id: 'west_4', name: 'UCLA', location: 'Los Angeles, CA', region: 'west' },
  { id: 'west_5', name: 'University of Southern California', location: 'Los Angeles, CA', region: 'west' },
  { id: 'west_6', name: 'University of Washington', location: 'Seattle, WA', region: 'west' },
  { id: 'west_7', name: 'UC San Diego', location: 'San Diego, CA', region: 'west' },
  { id: 'west_8', name: 'UC Davis', location: 'Davis, CA', region: 'west' },
  { id: 'west_9', name: 'University of Colorado', location: 'Boulder, CO', region: 'west' },
  { id: 'west_10', name: 'Arizona State University', location: 'Tempe, AZ', region: 'west' }
];

// Campus areas - common to most universities
const campusAreas = [
  { id: 'all', name: 'All Areas' },
  { id: 'north', name: 'North Campus' },
  { id: 'south', name: 'South Campus' },
  { id: 'central', name: 'Central Campus' },
  { id: 'east', name: 'East Campus' },
  { id: 'west', name: 'West Campus' },
  { id: 'dorms', name: 'Residence Halls' },
  { id: 'dining', name: 'Dining Commons' },
  { id: 'library', name: 'Library' },
  { id: 'student_center', name: 'Student Center' },
  { id: 'rec_center', name: 'Recreation Center' },
  { id: 'quad', name: 'The Quad' }
];

// Academic departments - common to most universities 
const academicDepartments = [
  { id: 'all', name: 'All Departments' },
  { id: 'business', name: 'Business' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'arts_sciences', name: 'Arts & Sciences' },
  { id: 'medicine', name: 'Medicine' },
  { id: 'law', name: 'Law' },
  { id: 'education', name: 'Education' },
  { id: 'computer_science', name: 'Computer Science' },
  { id: 'journalism', name: 'Journalism' },
  { id: 'architecture', name: 'Architecture' },
  { id: 'fine_arts', name: 'Fine Arts' },
  { id: 'music', name: 'Music' },
  { id: 'psychology', name: 'Psychology' },
  { id: 'biology', name: 'Biology' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'physics', name: 'Physics' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'history', name: 'History' },
  { id: 'english', name: 'English' },
  { id: 'philosophy', name: 'Philosophy' }
];

// Messages for when no chefs are found in specific areas
const noChefMessages = {
  becomeFirst: [
    "Be the first to share your culinary talents at {school}!",
    "No chefs found at {school} yet. You could be the first!",
    "{school} is waiting for its first campus chef. Could that be you?",
    "Start a food revolution at {school} by becoming the first chef!",
    "The {school} community is hungry for homemade food. Be the pioneer!"
  ],
  tryAgain: [
    "No chefs found in {area} at {school} right now. Check back soon!",
    "We're still growing our chef community at {school}. Check other areas or come back later!",
    "Hungry? We're working on expanding to {area} at {school}.",
    "Our chef network at {school} is growing daily. Try a different area or check back soon!",
    "{area} at {school} is a food desert right now, but not for long!"
  ]
};

export { usColleges, campusAreas, academicDepartments, noChefMessages };

export interface MockEvent {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  location: string;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  hostName?: string;
  startDate?: string;
  expiryDate?: string;
  createdDate?: string;
  description?: string;
}

const CATEGORIES = [
  'Music Festival',
  'Tech Developers Summit',
  'Modern Art Gallery',
  'Gourmet Food Expo',
  'Global Business Round',
  'Esports Championship',
  'Charity Marathon',
  'Startup Pitch Night',
  'AI & Robotics Workshop',
  'Wine Tasting Seminar'
];

const LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'London, UK',
  'Berlin, DE',
  'Tokyo, JP',
  'Virtual (Zoom)',
  'Los Angeles, CA',
  'Chicago, IL',
  'Toronto, ON'
];

const HOST_NAMES = [
  'Aakash Yadav',
  'Adam Jampa',
  'Mutaz',
  'Ron Morrison',
  'John Smith',
  'Jane Doe',
  'Michael Johnson',
  'Sarah Connor',
  'David Miller',
  'Emily Anderson'
];

export const generateEventsForUser = (userId: string, count: number, type: 'created' | 'joined'): MockEvent[] => {
  const events: MockEvent[] = [];
  
  // Extract number from userId for consistent seeding
  const numSeed = parseInt(userId.replace(/[^0-9]/g, '') || '1', 10);

  for (let i = 0; i < count; i++) {
    const eventIndex = (numSeed * 17 + i * 31) % 100;
    const category = CATEGORIES[eventIndex % CATEGORIES.length];
    
    // Create realistic names depending on type
    const title = type === 'created' 
      ? `Organizing: ${category} 2026`
      : `Attending: ${category} Meetup`;

    const location = LOCATIONS[(eventIndex + 5) % LOCATIONS.length];
    
    // Status distribution
    let status: 'active' | 'completed' | 'cancelled' | 'expired' = 'completed';
    if (i % 3 === 0) {
      status = 'active';
    } else if (i % 7 === 0) {
      status = 'cancelled';
    }

    // Generate date
    const dayOffset = (i * 5 + 3) * (i % 2 === 0 ? 1 : -1);
    const date = new Date(1771234567890 + dayOffset * 24 * 60 * 60 * 1000);

    events.push({
      id: `e-${userId}-${type}-${i}`,
      title,
      category,
      dateTime: date.toISOString(),
      location,
      status,
    });
  }

  return events;
};

// Generate realistic mock events for the main listing
export const generateAllEvents = (): MockEvent[] => {
  const list: MockEvent[] = [];
  
  for (let i = 1; i <= 95; i++) {
    const catIndex = (i * 7) % CATEGORIES.length;
    const locIndex = (i * 13) % LOCATIONS.length;
    const hostIndex = (i * 3) % HOST_NAMES.length;
    
    const category = CATEGORIES[catIndex];
    let location = LOCATIONS[locIndex];
    let hostName = HOST_NAMES[hostIndex];
    let title = `${category} - ${location.split(',')[0]} Edition 2026`;
    let status = i % 3 === 0 ? 'expired' : 'active';
    
    // Dates
    let createdDate = new Date(1771234567890 - i * 86400000 - 15 * 86400000).toISOString();
    let startDate = new Date(1771234567890 - i * 86400000).toISOString();
    let expiryDate = new Date(1771234567890 - i * 86400000 + 30 * 86400000).toISOString();
    let description = 'This is an event description. Join us for a great session filled with networking, learning, and exciting activities.';

    if (i === 95) {
      title = 'Annual Tech Conference 2024';
      hostName = 'Sarah Johnson';
      location = '—';
      status = 'expired';
      startDate = '2024-03-15T09:00:00.000Z';
      expiryDate = '2024-03-17T09:00:00.000Z';
      createdDate = '2024-02-01T10:00:00.000Z';
      description = undefined;
    }

    list.push({
      id: i === 95 ? '1' : `E-${1000 + i}`,
      title,
      category,
      dateTime: startDate,
      location,
      status,
      hostName,
      startDate,
      expiryDate,
      createdDate,
      description,
    });
  }
  
  return list;
};

export interface MockParticipant {
  name: string;
  email: string;
  rsvpStatus: 'going' | 'maybe' | 'invited';
  joinedDate: string;
  role: 'Participant' | 'Co-Host';
}

export const generateParticipantsForEvent = (eventId: string): MockParticipant[] => {
  const participants: MockParticipant[] = [];
  const seed = parseInt(eventId.replace(/[^0-9]/g, '') || '1', 10);
  
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica', 'Shubham', 'Aakash'];
  const lastNames = ['Doe', 'Connor', 'Johnson', 'Miller', 'Anderson', 'Kushwaha', 'Yadav', 'Smith', 'Jackson', 'Davis'];
  
  const count = 12; // Generates 12 participants so it showcases the 5-row max-height scroll limit
  
  for (let i = 0; i < count; i++) {
    const nameIndex = (seed * 7 + i * 3) % firstNames.length;
    const lastNameIndex = (seed * 11 + i * 5) % lastNames.length;
    const name = `${firstNames[nameIndex]} ${lastNames[lastNameIndex]}`;
    const email = `${firstNames[nameIndex].toLowerCase()}.${lastNames[lastNameIndex].toLowerCase()}@example.com`;
    
    let rsvpStatus: 'going' | 'maybe' | 'invited' = 'invited';
    if (i % 3 === 0) {
      rsvpStatus = 'going';
    } else if (i % 3 === 1) {
      rsvpStatus = 'maybe';
    }
    
    const role = (i === 2) ? 'Co-Host' : 'Participant';
    const date = new Date(1771234567890 - (i * 2) * 3600000).toISOString();
    
    participants.push({
      name,
      email,
      rsvpStatus,
      joinedDate: date,
      role,
    });
  }
  
  return participants;
};

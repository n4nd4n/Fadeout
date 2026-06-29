export interface MockUser {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  status: 'active' | 'inactive';
  eventsCreated: number;
  eventsJoined: number;
  createdDate: string;
  isDeleted: boolean;
  description?: string;
  deletedDate?: string;
}

export const FIRST_10_USERS: MockUser[] = [
  {
    id: 'u-1',
    fullName: 'Aakash Yadav',
    email: 'aakash.yadav@hiddenbrains.in',
    isVerified: true,
    status: 'active',
    eventsCreated: 1,
    eventsJoined: 1,
    createdDate: '2026-03-16T05:43:34.956Z',
    isDeleted: false,
  },
  {
    id: 'u-2',
    fullName: 'Adam Jampa',
    email: 'adam.jampa12321@yopmail.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 1,
    createdDate: '2026-03-30T14:10:09.244Z',
    isDeleted: false,
  },
  {
    id: 'u-3',
    fullName: 'Mutaz',
    email: 'admin@fadeoutapp.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 0,
    createdDate: '2026-02-27T10:48:09.553Z',
    isDeleted: false,
  },
  {
    id: 'u-4',
    fullName: 'Ron Morrison',
    email: 'agsna123@yopmail.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 0,
    createdDate: '2026-03-16T15:29:38.618Z',
    isDeleted: false,
  },
  {
    id: 'u-5',
    fullName: "I'm Smith",
    email: 'albert.smith134@yopmail.com',
    isVerified: true,
    status: 'active',
    eventsCreated: 4,
    eventsJoined: 12,
    createdDate: '2026-03-24T08:15:06.758Z',
    isDeleted: false,
  },
  {
    id: 'u-6',
    fullName: 'Alex',
    email: 'alex@example.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 1,
    createdDate: '2026-04-07T07:11:34.175Z',
    isDeleted: false,
  },
  {
    id: 'u-7',
    fullName: 'Alex Robert',
    email: 'alex09876@yopmail.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 1,
    createdDate: '2026-03-17T10:08:00.483Z',
    isDeleted: false,
  },
  {
    id: 'u-8',
    fullName: 'Alexa',
    email: 'alexa@yopmail.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 1,
    createdDate: '2026-03-13T08:19:33.249Z',
    isDeleted: false,
  },
  {
    id: 'u-9',
    fullName: 'Alexa',
    email: 'alexa+1@yopmail.com',
    isVerified: true,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 0,
    createdDate: '2026-03-13T08:29:03.408Z',
    isDeleted: false,
  },
  {
    id: 'u-10',
    fullName: 'Alex Brown',
    email: 'alexajs@yopmail.com',
    isVerified: false,
    status: 'active',
    eventsCreated: 0,
    eventsJoined: 1,
    createdDate: '2026-04-03T12:38:20.067Z',
    isDeleted: false,
  },
];

// Helper to generate more realistic mock users to complete 149 users
export const generateMockUsers = (): MockUser[] => {
  const list = [...FIRST_10_USERS];
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Jessica', 'Robert', 'Karen', 'William', 'Linda'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson'];
  
  for (let i = 11; i <= 149; i++) {
    if (i === 12) {
      list.push({
        id: 'u-12',
        fullName: 'Emma Jhonson',
        email: 'emma.jhonson1234@yopmail.com',
        isVerified: true,
        status: 'inactive',
        eventsCreated: 3,
        eventsJoined: 8,
        createdDate: '2026-03-01T10:00:00.000Z',
        isDeleted: true,
        description: 'Testing by tushar',
        deletedDate: '2026-03-24T16:27:00.000Z',
      });
      continue;
    }

    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const name = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;
    const isDeleted = i % 12 === 0;
    const isVerified = i % 3 !== 0 || (isDeleted && i % 8 === 0);
    const status = i % 15 === 0 ? 'inactive' : 'active';
    
    list.push({
      id: `u-${i}`,
      fullName: name,
      email,
      isVerified,
      status,
      eventsCreated: (i * 3) % 8,
      eventsJoined: (i * 7) % 25,
      createdDate: new Date(1771234567890 - i * 86400000).toISOString(),
      isDeleted,
      description: isDeleted ? `Account deactivated due to user deletion request or administrative policy check.` : undefined,
      deletedDate: isDeleted ? new Date(1771234567890 - i * 86400000 + 172800000).toISOString() : undefined,
    });
  }
  return list;
};

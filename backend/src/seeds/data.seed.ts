import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../modules/user/entities/user.entity';
import { Event } from '../modules/event/entities/event.entity';
import { EventParticipant } from '../modules/event/entities/event-participant.entity';

@Injectable()
export class DataSeed {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventParticipant)
    private participantRepository: Repository<EventParticipant>,
  ) {}

  async seed() {
    console.log('🌱 Starting User, Event, and Participant Seeder...');

    // Clear existing data to avoid PK conflicts and allow fresh seeding
    console.log('🧹 Cleaning old data...');
    await this.userRepository.query('TRUNCATE TABLE event_participants, events, users CASCADE');

    const passwordHash = await bcrypt.hash('User@123', 10);

    const firstNames = ['Aakash', 'Adam', 'Emma', 'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Jessica', 'Robert', 'Karen', 'William', 'Linda', 'Alex', 'Alexa', 'Ron', 'Albert', 'Mutaz'];
    const lastNames = ['Yadav', 'Jampa', 'Jhonson', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Morrison', 'Robert', 'Brown'];

    const usersToCreate: Partial<User>[] = [];

    // 1. Admin user
    usersToCreate.push({
      firstName: 'Mutaz',
      lastName: 'Admin',
      email: 'admin@fadeoutapp.com',
      password: passwordHash,
      isVerified: true,
      isActive: true,
      profileImage: null,
      eventsCreated: 0,
      eventsJoined: 0,
    });

    // 2. Custom Emma Jhonson deleted user matching screenshot
    usersToCreate.push({
      firstName: 'Emma',
      lastName: 'Jhonson',
      email: 'emma.jhonson1234@yopmail.com',
      password: passwordHash,
      isVerified: true,
      isActive: false,
      profileImage: null,
      eventsCreated: 0,
      eventsJoined: 0,
      deletedReason: 'Testing by tushar',
      deletedAt: new Date('2026-03-24T16:27:00.000Z'),
    });

    // 3. Create 50 other mock users
    for (let i = 1; i <= 50; i++) {
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;

      const isDeleted = i % 8 === 0;
      const isVerified = i % 3 !== 0;
      const isActive = i % 10 !== 0;

      usersToCreate.push({
        firstName: fn,
        lastName: ln,
        email,
        password: passwordHash,
        isVerified,
        isActive: isDeleted ? false : isActive,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${ln}${i}`,
        eventsCreated: 0,
        eventsJoined: 0,
        deletedReason: isDeleted ? 'Account deactivated due to user deletion request or administrative policy check.' : null,
        deletedAt: isDeleted ? new Date(Date.now() - i * 24 * 60 * 60 * 1000) : null,
      });
    }

    // Save all users
    console.log(`👤 Seeding ${usersToCreate.length} users...`);
    const seededUsers = await this.userRepository.save(usersToCreate);
    const activeUsers = seededUsers.filter(u => !u.deletedAt && u.isActive);

    // 4. Create 55 Events
    const eventNames = [
      'Annual Tech Conference', 'AI & Robotics Workshop', 'Tech Developers Summit',
      'Global Business Round', 'Startup Pitch Night', 'Creative Designers Meetup',
      'Product Launch Showcase', 'Cloud Computing Webinar', 'UI/UX Masterclass',
      'Marketing Strategy Seminar', 'Agile Methodology Camp', 'Cybersecurity Forum',
      'Finance & Wealth Expo', 'Digital Health Symposium', 'Green Energy Conclave'
    ];

    const locations = ['Austin, Texas', 'Toronto, Canada', 'London, UK', 'Virtual (Zoom)', 'San Francisco, CA', 'New York, NY', 'Berlin, Germany', 'Tokyo, Japan', 'Sydney, Australia', 'Paris, France'];
    const statuses = ['Active', 'Upcoming', 'Expired', 'Completed', 'Cancelled'];

    const eventsToCreate: Partial<Event>[] = [];

    for (let i = 1; i <= 55; i++) {
      const eventName = `${eventNames[i % eventNames.length]} ${2024 + (i % 3)}`;
      const creator = activeUsers[i % activeUsers.length];
      const host = activeUsers[(i + 2) % activeUsers.length];
      const status = statuses[i % statuses.length];

      let startDate: Date;
      let expiryDate: Date;

      if (status === 'Active') {
        startDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        expiryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
      } else if (status === 'Upcoming') {
        startDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
        expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      } else if (status === 'Expired' || status === 'Completed') {
        startDate = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
        expiryDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      } else { // Cancelled
        startDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }

      eventsToCreate.push({
        eventId: `EVT-${10000 + i}`,
        eventName,
        description: `This is an amazing and comprehensive detail description for ${eventName}. Join us for networking, keynotes, panel discussions, and hands-on exercises with industry experts.`,
        hostName: `${host.firstName} ${host.lastName}`,
        startDate,
        expiryDate,
        status,
        location: locations[i % locations.length],
        createdByUserId: creator.id,
        hostUserId: host.id,
        totalInvited: 0,
        acceptedCount: 0,
        declinedCount: 0,
        pendingCount: 0,
        checkedInCount: 0,
      });
    }

    console.log(`📅 Seeding ${eventsToCreate.length} events...`);
    const seededEvents = await this.eventRepository.save(eventsToCreate);

    // 5. Seed Event Participants
    console.log('👥 Seeding event participants and calculating RSVPs...');
    const participantsToCreate: Partial<EventParticipant>[] = [];

    for (const event of seededEvents) {
      // Pick random number of participants between 5 and 20
      const numParticipants = Math.floor(Math.random() * 15) + 5;
      // Shuffle users
      const shuffledUsers = [...seededUsers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, numParticipants);

      let accepted = 0;
      let declined = 0;
      let pending = 0;
      let checkedIn = 0;

      for (const u of selectedUsers) {
        const rsvpStatuses = ['going', 'maybe', 'not going'];
        const rsvp = rsvpStatuses[Math.floor(Math.random() * rsvpStatuses.length)];
        const isGoing = rsvp === 'going';
        const isCheckedIn = isGoing && Math.random() > 0.4;

        if (rsvp === 'going') accepted++;
        else if (rsvp === 'not going') declined++;
        else pending++;

        if (isCheckedIn) checkedIn++;

        participantsToCreate.push({
          eventId: event.id,
          userId: u.id,
          userName: `${u.firstName} ${u.lastName}`,
          email: u.email,
          rsvpStatus: rsvp,
          checkedIn: isCheckedIn,
          rsvpDate: new Date(event.startDate.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000),
        });
      }

      // Update event stats
      event.totalInvited = numParticipants;
      event.acceptedCount = accepted;
      event.declinedCount = declined;
      event.pendingCount = pending;
      event.checkedInCount = checkedIn;
    }

    // Save participants
    await this.participantRepository.save(participantsToCreate);
    // Save updated events
    await this.eventRepository.save(seededEvents);

    // 6. Calculate eventsCreated and eventsJoined for all users
    console.log('🔄 Re-calculating user creation/participation counts...');
    for (const u of seededUsers) {
      const createdCount = await this.eventRepository.count({ where: { createdByUserId: u.id } });
      const joinedCount = await this.participantRepository.count({ where: { userId: u.id, rsvpStatus: 'going' } });

      u.eventsCreated = createdCount;
      u.eventsJoined = joinedCount;
    }
    await this.userRepository.save(seededUsers);

    console.log('✅ Seeding complete!');
  }
}

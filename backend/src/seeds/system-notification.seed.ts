import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemNotification } from '../modules/system-notification/entities/system-notification.entity';

@Injectable()
export class SystemNotificationSeed {
  constructor(
    @InjectRepository(SystemNotification)
    private systemNotificationRepository: Repository<SystemNotification>,
  ) {}

  async seed() {
    console.log('🌱 Starting System Notification Seeder...');

    const templates = [
      {
        templateId: 'SYS-001',
        templateCode: 'ACCOUNT_CREATED_EMAIL_VERIFICATION',
        templateTitle: 'Account Created ',
        body: '<p>Welcome to FadeOut! Please verify your email by clicking the link: <a href="{{verification_link}}">{{verification_link}}</a></p>',
        status: 'active',
        updatedAt: new Date('2026-06-19T09:35:27.050Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'SYS-012',
        templateCode: 'GALLERY_OPENS',
        templateTitle: 'Gallery Opens',
        body: '<p>The gallery for event {{event_name}} is now open! View photos now.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T12:21:53.307Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'SYS-005',
        templateCode: 'RSVP_SUBMITTED',
        templateTitle: 'RSVP Submitted',
        body: '<p>You have successfully submitted your RSVP for {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:52:48.199Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'SYS-019',
        templateCode: 'HOST_REMINDER_EDIT_LOCK_2HR_BEFORE',
        templateTitle: 'Host Reminder – Edit Lock',
        body: '<p>Reminder: The details for {{event_name}} will be locked in 2 hours.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:30:39.344Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'SYS-008',
        templateCode: '3_HOUR_RSVP_REMINDER',
        templateTitle: '3-Hour RSVP Reminder',
        body: '<p>Only 3 hours left to RSVP for {{event_name}}!</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:30:06.561Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-006',
        templateCode: 'RSVP_UPDATED_BEFORE_2HR_CUTOFF',
        templateTitle: 'RSVP Updated ',
        body: '<p>Your RSVP for {{event_name}} has been updated successfully.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-27T14:29:59.792Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'SYS-007',
        templateCode: 'NEW_PARTICIPANT_JOINED',
        templateTitle: 'New Participant Joined',
        body: '<p>Good news! {{participant_name}} has joined your event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-27T14:28:25.041Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-011',
        templateCode: 'ACTIVITY_DIGEST_ONCE_PER_DAY_AT_6_PM',
        templateTitle: 'Activity Digest',
        body: '<p>Here is your daily activity digest for FadeOut events.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:22:23.248Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-021',
        templateCode: 'EVENT_FADING_IN_24_HOURS_3_DAY_7_DAY_EVENTS_ONLY',
        templateTitle: 'Event Fading in 24 Hours',
        body: '<p>Important: The event {{event_name}} will fade in 24 hours.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:21:57.004Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-010',
        templateCode: 'EVENT_LIVE',
        templateTitle: 'Event Live',
        body: '<p>Hooray! The event {{event_name}} is now live!</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T16:24:28.057Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-002',
        templateCode: 'PASSWORD_RESET_OTP',
        templateTitle: 'Password Reset OTP',
        body: '<p>Your password reset code is: <strong>{{otp}}</strong>. It will expire in 10 minutes.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T15:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-003',
        templateCode: 'PASSWORD_CHANGED',
        templateTitle: 'Password Changed Successfully',
        body: '<p>Hi {{user_name}}, your password has been updated successfully.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T14:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-004',
        templateCode: 'EVENT_CREATED',
        templateTitle: 'Event Created',
        body: '<p>Congratulations! You have created event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T13:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'SYS-009',
        templateCode: 'EVENT_CANCELLED',
        templateTitle: 'Event Cancelled',
        body: '<p>We are sorry to inform you that event {{event_name}} has been cancelled.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-23T15:30:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'SYS-013',
        templateCode: 'PHOTO_UPLOADED',
        templateTitle: 'New Photo Uploaded',
        body: '<p>A new photo has been uploaded to event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-22T09:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-014',
        templateCode: 'COHOST_INVITATION',
        templateTitle: 'Co-Host Invitation',
        body: '<p>You have been invited to be a co-host for event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-21T14:45:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'SYS-015',
        templateCode: 'COHOST_ACCEPTED',
        templateTitle: 'Co-Host Invitation Accepted',
        body: '<p>{{cohost_name}} accepted your invitation to co-host event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-20T11:20:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'SYS-016',
        templateCode: 'COMMENT_ON_PHOTO',
        templateTitle: 'Comment on Photo',
        body: '<p>Someone commented on your photo in event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-19T08:15:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'SYS-017',
        templateCode: 'REACTION_ON_PHOTO',
        templateTitle: 'Reaction on Photo',
        body: '<p>Someone reacted to your photo in event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-18T10:05:00.000Z'),
        updatedBy: 'System',
      },
    ];

    for (const t of templates) {
      const existing = await this.systemNotificationRepository.findOne({
        where: { templateId: t.templateId },
      });

      if (existing) {
        existing.templateCode = t.templateCode;
        existing.templateTitle = t.templateTitle;
        existing.body = t.body;
        existing.status = t.status;
        existing.updatedBy = t.updatedBy;
        existing.updatedAt = t.updatedAt;
        await this.systemNotificationRepository.save(existing);
      } else {
        const created = this.systemNotificationRepository.create(t);
        await this.systemNotificationRepository.save(created);
      }
    }

    console.log(`✅ Seeded ${templates.length} system notifications successfully.`);
  }
}

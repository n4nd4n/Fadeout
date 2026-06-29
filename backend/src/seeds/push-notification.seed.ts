import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushNotification } from '../modules/push-notification/entities/push-notification.entity';

@Injectable()
export class PushNotificationSeed {
  constructor(
    @InjectRepository(PushNotification)
    private pushNotificationRepository: Repository<PushNotification>,
  ) {}

  async seed() {
    console.log('🌱 Starting Push Notification Seeder...');

    const templates = [
      {
        templateId: 'ACCOUNT_CREATED_EMAIL_VERIFICATION',
        templateName: 'Account Created ',
        body: '<p>Welcome to FadeOut! Please verify your account using the code sent to your email.</p>',
        status: 'active',
        updatedAt: new Date('2026-06-19T09:35:27.050Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'GALLERY_OPENS',
        templateName: 'Gallery Opens',
        body: '<p>The photo gallery for event {{event_name}} is now open! Tap to view.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T12:21:53.307Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'RSVP_SUBMITTED',
        templateName: 'RSVP Submitted',
        body: '<p>You have RSVP\'d successfully to {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:52:48.199Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'HOST_REMINDER_EDIT_LOCK_2HR_BEFORE',
        templateName: 'Host Reminder – Edit Lock',
        body: '<p>Reminder: Event details edit lock will trigger in 2 hours for {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:30:39.344Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: '3_HOUR_RSVP_REMINDER',
        templateName: '3-Hour RSVP Reminder',
        body: '<p>Don\'t forget! Only 3 hours remaining to RSVP for {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:30:06.561Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'RSVP_UPDATED_BEFORE_2HR_CUTOFF',
        templateName: 'RSVP Updated ',
        body: '<p>Your RSVP for {{event_name}} has been updated successfully.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-27T14:29:59.792Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'NEW_PARTICIPANT_JOINED',
        templateName: 'New Participant Joined',
        body: '<p>{{participant_name}} has joined your event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-27T14:28:25.041Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'ACTIVITY_DIGEST_ONCE_PER_DAY_AT_6_PM',
        templateName: 'Activity Digest',
        body: '<p>Here is your daily activity digest of new photos and comments.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:22:23.248Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'EVENT_FADING_IN_24_HOURS_3_DAY_7_DAY_EVENTS_ONLY',
        templateName: 'Event Fading in 24 Hours',
        body: '<p>Event {{event_name}} will fade away in 24 hours. Check out the photos now!</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:21:57.004Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'EVENT_LIVE',
        templateName: 'Event Live',
        body: '<p>The event {{event_name}} is now live! Join in.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T16:24:28.057Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'PASSWORD_RESET_OTP',
        templateName: 'Password Reset OTP',
        body: '<p>Use verification code {{otp}} to reset your password.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T15:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'PASSWORD_CHANGED',
        templateName: 'Password Changed Successfully',
        body: '<p>Your password has been successfully updated.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T14:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'EVENT_CREATED',
        templateName: 'Event Created',
        body: '<p>You have successfully created event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-24T13:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'EVENT_CANCELLED',
        templateName: 'Event Cancelled',
        body: '<p>Event {{event_name}} has been cancelled by the host.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-23T15:30:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'PHOTO_UPLOADED',
        templateName: 'New Photo Uploaded',
        body: '<p>A new photo was uploaded to event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-22T09:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'COHOST_INVITATION',
        templateName: 'Co-Host Invitation',
        body: '<p>You have been invited to co-host {{event_name}} by {{host_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-21T14:45:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'COHOST_ACCEPTED',
        templateName: 'Co-Host Invitation Accepted',
        body: '<p>{{cohost_name}} accepted your invitation to co-host {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-20T11:20:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'COMMENT_ON_PHOTO',
        templateName: 'Comment on Photo',
        body: '<p>Someone left a comment on your photo in {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-19T08:15:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'REACTION_ON_PHOTO',
        templateName: 'Reaction on Photo',
        body: '<p>Someone reacted to your photo in {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-18T10:05:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'USER_SUSPENDED_NOTICE',
        templateName: 'User Suspended Notice',
        body: '<p>Your account has been suspended due to violations of user agreements.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-17T09:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'FEEDBACK_REQUEST',
        templateName: 'Event Feedback Request',
        body: '<p>Please share your feedback for event {{event_name}} to help us improve.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-16T12:00:00.000Z'),
        updatedBy: 'System',
      },
    ];

    for (const t of templates) {
      const existing = await this.pushNotificationRepository.findOne({
        where: { templateId: t.templateId },
      });

      if (existing) {
        existing.templateName = t.templateName;
        existing.body = t.body;
        existing.status = t.status;
        existing.updatedBy = t.updatedBy;
        existing.updatedAt = t.updatedAt;
        await this.pushNotificationRepository.save(existing);
      } else {
        const created = this.pushNotificationRepository.create(t);
        await this.pushNotificationRepository.save(created);
      }
    }

    console.log(`✅ Seeded ${templates.length} push notifications successfully.`);
  }
}

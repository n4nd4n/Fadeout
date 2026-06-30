import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from '../modules/email-template/entities/email-template.entity';

@Injectable()
export class EmailTemplateSeed {
  constructor(
    @InjectRepository(EmailTemplate)
    private emailTemplateRepository: Repository<EmailTemplate>,
  ) {}

  async seed() {
    console.log('🌱 Starting Email Template Seeder...');

    const templates = [
      {
        templateId: 'HOST-REMINDER-EDIT-LOCK-2HR-BEFORE',
        templateName: 'Host Reminder – Edit Lock (2hr Before)',
        subject: 'Edit Lock Reminder',
        body: '<p>Hi {{host_name}}, this is a reminder that the edit lock will be active in 2 hours for event {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-06-24T10:27:21.964Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'EVENT-FADING-IN-2-HOURS',
        templateName: 'Event Fading in 2 Hours',
        subject: 'Event starts in 2 hours',
        body: '<p>Hi {{participant_name}}, the event {{event_name}} starts in 2 hours. Get ready!</p>',
        status: 'active',
        updatedAt: new Date('2026-06-19T09:41:17.166Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'SIGNUP-VERIFICATION',
        templateName: 'Account Created – Email Verification',
        subject: 'Verify your email address',
        body: '<p>Hi {{user_name}}, welcome to FadeOut! Please verify your email using this link: <a href="{{verification_link}}">Verify Email</a></p>',
        status: 'active',
        updatedAt: new Date('2026-06-19T08:36:42.089Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'CO-HOST-ADDED',
        templateName: 'Co-Host Added',
        subject: 'You have been added as a co-host',
        body: '<p>Hi {{user_name}}, you have been added as a co-host for the event {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-30T16:10:09.276Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'NEW-PARTICIPANT-JOINED',
        templateName: 'New Participant Joined',
        subject: 'A new participant joined your event',
        body: '<p>Hi {{host_name}}, a new participant {{participant_name}} has RSVP\'d to {{event_name}}.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:31:24.089Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: '3-HOUR-RSVP-REMINDER',
        templateName: '3-Hour RSVP Reminder',
        subject: 'Don\'t forget to RSVP!',
        body: '<p>Hi {{user_name}}, please confirm your attendance for the event {{event_name}} within the next 3 hours.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-30T09:29:57.760Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'GALLERY-OPENS',
        templateName: 'Gallery Opens',
        subject: 'The event photo gallery is now open',
        body: '<p>Hi {{participant_name}}, the photo gallery for {{event_name}} is now open. Start sharing your memories!</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:12:35.376Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'EVENT-LIVE',
        templateName: 'Event Live',
        subject: 'Event is now LIVE!',
        body: '<p>Hi {{participant_name}}, the event {{event_name}} is now live. Tune in and join the fun!</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:12:26.545Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'RSVP-UPDATED-BEFORE-2HR-CUTOFF',
        templateName: 'RSVP Updated (Before 2hr cutoff)',
        subject: 'Your RSVP has been updated',
        body: '<p>Hi {{user_name}}, this confirms that your RSVP status for {{event_name}} was successfully updated.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-27T14:11:56.697Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'RSVP-SUBMITTED',
        templateName: 'RSVP Submitted',
        subject: 'Thank you for your RSVP!',
        body: '<p>Hi {{user_name}}, thank you for RSVP\'ing to {{event_name}}. See details below.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-27T14:11:42.008Z'),
        updatedBy: 'John Doe',
      },
      // Templates to complete the count of 24
      {
        templateId: 'WELCOME-EMAIL',
        templateName: 'Welcome to FadeOut',
        subject: 'Welcome to the platform!',
        body: '<p>Hi {{user_name}}, thank you for joining FadeOut.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-26T10:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'PASSWORD-RESET-REQUEST',
        templateName: 'Password Reset Request OTP',
        subject: 'Reset your password',
        body: '<p>Your OTP for password reset is: {{otp}}. Expiers in 10 minutes.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-25T11:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'PASSWORD-CHANGED-CONFIRM',
        templateName: 'Password Changed Confirmation',
        subject: 'Password updated successfully',
        body: '<p>Hi {{user_name}}, your password has been successfully updated.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-25T12:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'ACCOUNT-DEACTIVATED',
        templateName: 'Account Deactivated Notice',
        subject: 'Your account has been deactivated',
        body: '<p>Hi {{user_name}}, your account has been deactivated. Please contact support.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-24T08:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'EVENT-CANCELLED',
        templateName: 'Event Cancelled Notification',
        subject: 'Event has been cancelled',
        body: '<p>Hi {{participant_name}}, we regret to inform you that {{event_name}} has been cancelled.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-23T15:30:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'EVENT-REMINDER-24H',
        templateName: 'Event Reminder (24 Hours Before)',
        subject: 'Upcoming Event Tomorrow',
        body: '<p>Hi {{participant_name}}, {{event_name}} starts in 24 hours.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-22T09:00:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'EVENT-DETAILS-UPDATED',
        templateName: 'Event Details Updated Alert',
        subject: 'Details for {{event_name}} updated',
        body: '<p>Hi {{participant_name}}, the host has updated details for {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-21T14:45:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'INVITATION-TO-EVENT',
        templateName: 'Event Invitation Alert',
        subject: 'You have been invited to {{event_name}}',
        body: '<p>Hi {{user_name}}, you are invited to join {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-20T11:20:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'COMMENT-ON-PHOTO',
        templateName: 'New Photo Comment Alert',
        subject: 'Someone commented on your photo',
        body: '<p>Hi {{user_name}}, you have a new comment on your uploaded photo.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-19T08:15:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'LIKE-ON-PHOTO',
        templateName: 'New Photo Like Alert',
        subject: 'Someone liked your photo',
        body: '<p>Hi {{user_name}}, your photo received a new like.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-18T10:05:00.000Z'),
        updatedBy: 'System',
      },
      {
        templateId: 'PHOTO-UPLOADED-BY-COHOST',
        templateName: 'Co-Host Photo Upload Notification',
        subject: 'New photos uploaded by co-host',
        body: '<p>Hi {{host_name}}, co-host {{cohost_name}} uploaded new photos to {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-17T16:50:00.000Z'),
        updatedBy: 'Jane Smith',
      },
      {
        templateId: 'HOST-SUMMARY-REPORT',
        templateName: 'Host Summary Report Email',
        subject: 'Your event summary report',
        body: '<p>Hi {{host_name}}, here is your post-event summary for {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-16T12:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'USER-SUSPENDED-NOTICE',
        templateName: 'User Suspended Administration Notice',
        subject: 'Account Suspension Notice',
        body: '<p>Hi {{user_name}}, your account has been suspended for terms violation.</p>',
        status: 'inactive',
        updatedAt: new Date('2026-03-15T09:00:00.000Z'),
        updatedBy: 'John Doe',
      },
      {
        templateId: 'FEEDBACK-REQUEST',
        templateName: 'Event Feedback Request',
        subject: 'Tell us how {{event_name}} went!',
        body: '<p>Hi {{participant_name}}, please share your feedback on {{event_name}}.</p>',
        status: 'active',
        updatedAt: new Date('2026-03-14T17:00:00.000Z'),
        updatedBy: 'System',
      },
    ];

    for (const t of templates) {
      const existing = await this.emailTemplateRepository.findOne({
        where: { templateId: t.templateId },
      });

      if (existing) {
        // Update to match template name, subject, body, status, updatedBy, and updatedAt
        existing.templateName = t.templateName;
        existing.subject = t.subject;
        existing.body = t.body;
        existing.status = t.status;
        existing.updatedBy = t.updatedBy;
        existing.updatedAt = t.updatedAt;
        await this.emailTemplateRepository.save(existing);
      } else {
        const created = this.emailTemplateRepository.create(t);
        await this.emailTemplateRepository.save(created);
      }
    }

    console.log(`✅ Seeded ${templates.length} email templates successfully.`);
  }
}

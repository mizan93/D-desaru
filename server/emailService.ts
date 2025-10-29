// Email service using SendGrid integration
import { MailService } from '@sendgrid/mail';
import { type Inquiry } from '@shared/schema';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY not found - email notifications disabled');
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Email would be sent:', params.subject);
    return false;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) emailData.text = params.text;
    if (params.html) emailData.html = params.html;
    
    await mailService.send(emailData);
    console.log('Email sent successfully:', params.subject);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendNewInquiryNotification(inquiry: Inquiry): Promise<boolean> {
  const emailHtml = `
    <h2>New Airbnb Inquiry Received!</h2>
    <p><strong>Guest:</strong> ${inquiry.firstName} ${inquiry.lastName}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone ?? 'Not provided'}</p>
    <p><strong>Check-in:</strong> ${inquiry.checkIn || 'Not specified'}</p>
    <p><strong>Check-out:</strong> ${inquiry.checkOut || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>${inquiry.message}</p>
    <p><strong>Received:</strong> ${new Date(inquiry.createdAt).toLocaleString()}</p>
  `;

  const emailText = `
    New Airbnb Inquiry Received!
    
    Guest: ${inquiry.firstName} ${inquiry.lastName}
    Email: ${inquiry.email}
    Phone: ${inquiry.phone ?? 'Not provided'}
    Check-in: ${inquiry.checkIn || 'Not specified'}
    Check-out: ${inquiry.checkOut || 'Not specified'}
    
    Message:
    ${inquiry.message}
    
    Received: ${new Date(inquiry.createdAt).toLocaleString()}
  `;

  return await sendEmail({
    to: 'ndeprise16@gmail.com', // Replace with your email
    from: 'ahmadhamizan21@gmail.com', // Replace with your verified sender
    subject: `New Airbnb Inquiry from ${inquiry.firstName} ${inquiry.lastName}`,
    text: emailText,
    html: emailHtml
  });
}
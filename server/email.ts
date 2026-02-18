/**
 * Email Service Integration
 * 
 * Supports SendGrid, AWS SES, and Mailgun
 * Sends consultation notifications and confirmations
 */

import { ENV } from "./_core/env";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using configured service
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const provider = ENV.emailServiceProvider;

    if (!provider || !ENV.emailApiKey || !ENV.emailFromAddress) {
      console.warn("[Email] Email service not configured");
      return false;
    }

    switch (provider) {
      case "sendgrid":
        return await sendViasendGrid(options);
      case "aws-ses":
        return await sendViaAwsSES(options);
      case "mailgun":
        return await sendViaMailgun(options);
      default:
        console.error(`[Email] Unknown provider: ${provider}`);
        return false;
    }
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}

/**
 * Send via SendGrid
 */
async function sendViasendGrid(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ENV.emailApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: options.to }],
            subject: options.subject,
          },
        ],
        from: { email: ENV.emailFromAddress },
        content: [
          {
            type: "text/html",
            value: options.html,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`[SendGrid] Error: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[SendGrid] Failed to send email:", error);
    return false;
  }
}

/**
 * Send via AWS SES
 */
async function sendViaAwsSES(options: EmailOptions): Promise<boolean> {
  try {
    // AWS SES requires AWS SDK - would need additional setup
    // For now, return false as placeholder
    console.warn("[AWS SES] Not yet implemented - use SendGrid or Mailgun");
    return false;
  } catch (error) {
    console.error("[AWS SES] Failed to send email:", error);
    return false;
  }
}

/**
 * Send via Mailgun
 */
async function sendViaMailgun(options: EmailOptions): Promise<boolean> {
  try {
    const domain = ENV.emailApiKey?.split(":")[0] || "mg.ceyrva.com";
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`api:${ENV.emailApiKey}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        from: ENV.emailFromAddress,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || "",
      }),
    });

    if (!response.ok) {
      console.error(`[Mailgun] Error: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Mailgun] Failed to send email:", error);
    return false;
  }
}

/**
 * Email templates
 */

export function getConsultationNotificationEmail(data: {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}): EmailOptions {
  return {
    to: "adam@ceyrva.com",
    subject: `New Consultation Request from ${data.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">New Consultation Request</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; color: #666;">${escapeHtml(data.message)}</p>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; color: #999; font-size: 12px;">
          <p>This is an automated notification from Ceyrva's consultation system.</p>
        </div>
      </div>
    `,
    text: `
New Consultation Request

Name: ${data.fullName}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
    `,
  };
}

export function getClientConfirmationEmail(data: {
  fullName: string;
  email: string;
}): EmailOptions {
  return {
    to: data.email,
    subject: "Consultation Request Received - Ceyrva",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">Thank You for Your Consultation Request</h2>
        
        <p>Hi ${escapeHtml(data.fullName)},</p>

        <p>We've received your consultation request and appreciate you reaching out to Ceyrva. Our team will review your information and contact you within one business day.</p>

        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
          <p style="margin: 0; color: #0066cc;"><strong>What to expect next:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
            <li>We'll review your security needs and organization details</li>
            <li>Our team will contact you to discuss your specific requirements</li>
            <li>We'll provide a customized assessment approach tailored to your environment</li>
          </ul>
        </div>

        <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:adam@ceyrva.com">adam@ceyrva.com</a>.</p>

        <p>Best regards,<br>
        <strong>Ceyrva Team</strong><br>
        Cybersecurity & Risk Advisory</p>

        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; color: #999; font-size: 12px;">
          <p>© 2026 Ceyrva. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
Thank You for Your Consultation Request

Hi ${data.fullName},

We've received your consultation request and appreciate you reaching out to Ceyrva. Our team will review your information and contact you within one business day.

What to expect next:
- We'll review your security needs and organization details
- Our team will contact you to discuss your specific requirements
- We'll provide a customized assessment approach tailored to your environment

If you have any questions in the meantime, feel free to reach out to us at adam@ceyrva.com.

Best regards,
Ceyrva Team
Cybersecurity & Risk Advisory

© 2026 Ceyrva. All rights reserved.
    `,
  };
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

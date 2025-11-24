import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Props = {
  to: string;
  subject: string;
  html: string;
};
export async function sendEmail({ to, subject, html }: Props) {
  try {
    const response = resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.log("Email error", error);
    return null;
  }
}

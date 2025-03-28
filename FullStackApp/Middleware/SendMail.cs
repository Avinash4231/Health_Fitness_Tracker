using System.Net.Mail;
using System.Net;

namespace FullStackApp.Middleware
{
    public class SendMail
    {
        public static string MailInfo(string toEmail, string subject, string body)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("XXXXXXXXX@gmail.com");
                message.To.Add(new MailAddress(toEmail));
                message.Subject = subject;
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = body;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("XXXXXXXXX@gmail.com", "XXXXXXXX");
                Console.WriteLine("Success");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                return "success";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
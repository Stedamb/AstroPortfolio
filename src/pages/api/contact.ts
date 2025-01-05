import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    // Here you would typically send this data to your email service
    // For example, using a service like SendGrid, Mailgun, or your own SMTP server
    console.log("Form submission:", { name, email, subject, message });

    // For now, we'll just return a success response
    return new Response(
      JSON.stringify({
        message: "Thank you for your message! I'll get back to you soon.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        message: "There was an error processing your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

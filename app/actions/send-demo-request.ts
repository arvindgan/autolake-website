"use server"

export interface DemoFormData {
  type: string
  name: string
  email: string
  phone: string
  company: string
  date?: string
  time?: string
}

export async function sendDemoRequest(formData: FormData) {
  try {
    // Extract form data
    const data: DemoFormData = {
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
    }

    // Validate form data
    if (!data.name || !data.email || !data.phone || !data.company || !data.date || !data.time) {
      return { success: false, error: "Please fill in all required fields" }
    }

    // In a production environment, you would:
    // 1. Save the booking to your database
    // 2. Send confirmation emails
    // 3. Create calendar invites
    // 4. Notify the sales team

    console.log("Demo request details:", data)

    // Return success response
    return { success: true }
  } catch (error) {
    console.error("Error sending demo request:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

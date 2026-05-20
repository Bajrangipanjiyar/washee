import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const TELEGRAM_BOT_TOKEN = "8711088345:AAGO0GusGhZT6ccCmjismNwawjQss-vABIg";
    
    // 🚨 TEAM CONFIG: Tumhari aur Founder ki IDs ek sath array me
    const TEAM_CHAT_IDS = ["7854748403", "8438027524"]; 
    
    // Message ka design jo dono ke phone pe chamkega
    const message = `
🚨 *NEW WASHEE ORDER!* 🚨

🚗 *Car:* ${data.carType}
📦 *Plan:* ${data.plan}
💰 *Amount:* ₹${data.price}

👤 *Customer:* ${data.customerDetails.fullName}
📞 *Phone:* +91 ${data.customerDetails.phone}
📍 *Address:* ${data.customerDetails.address}, ${data.customerDetails.city} - ${data.customerDetails.pincode}
⏰ *Schedule:* ${data.customerDetails.date} at ${data.customerDetails.timeSlot}

👉 Check Admin Panel ASAP!
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    // Loop chalakar dono IDs par message bhej rahe hain
    const notifications = TEAM_CHAT_IDS.map(async (chatId) => {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      return response.json();
    });

    // Dono requests ke complete hone ka wait karega system
    const results = await Promise.all(notifications);
    console.log("Telegram Team Notifications Sent:", results);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram Notification Error:", error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
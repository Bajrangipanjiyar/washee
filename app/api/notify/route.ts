import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 🚨 Quotes laga diye hain dono me (VERY IMPORTANT)
    const TELEGRAM_BOT_TOKEN = "8711088345:AAGO0GusGhZT6ccCmjismNwawjQss-vABIg";
    const TELEGRAM_CHAT_ID = "7854748403"; 
    
    // Message ka design jo Telegram pe dikhega
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
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();
    console.log("Telegram Response:", result); // Terminal me dekhne ke liye

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram Notification Error:", error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
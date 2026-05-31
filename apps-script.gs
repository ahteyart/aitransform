/**
 * Google Apps Script – AI Transform Malaysia Registration Form
 *
 * SETUP INSTRUCTIONS:
 * ───────────────────────────────────────────────────────────────────────────
 * 1. Open Google Sheets: https://sheets.google.com
 * 2. Create a new spreadsheet. Name it "AI Transform MY – Registrations"
 * 3. In Row 1, add these headers exactly (one per column):
 *      Timestamp | 姓名 | 行业 | WhatsApp | 电子邮件 | 公司 | 职位
 * 4. Click Extensions → Apps Script
 * 5. Delete the default code and paste ALL of this file
 * 6. Save (Ctrl+S), then click Deploy → New deployment
 * 7. Type: Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 8. Click Deploy → Authorize (sign in with your Google account)
 * 9. Copy the Web App URL shown after deployment
 * 10. Open index.html, find the line:
 *       const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
 *     and replace the placeholder with the URL you just copied.
 * ───────────────────────────────────────────────────────────────────────────
 */

// Replace with the ID from your Google Sheet URL:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME     = 'Sheet1';  // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // If headers are missing, add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', '姓名', '行业', 'WhatsApp', '电子邮件', '公司', '职位']);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Kuala_Lumpur' }),
      data.name     || '',
      data.industry || '',
      data.whatsapp || '',
      data.email    || '',
      data.company  || '',
      data.role     || ''
    ]);

    // Optional: send a confirmation email to the registrant
    // sendConfirmationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional: uncomment and customise to send a WhatsApp/email confirmation */
/*
function sendConfirmationEmail(data) {
  const subject = '【AI Transform Malaysia】报名确认 – 席位已保留';
  const body = `
亲爱的 ${data.name}，

感谢您报名参加马来西亚中小企业 AI 转型峰会！

您的报名资料如下：
• 姓名：${data.name}
• 行业：${data.industry}
• WhatsApp：${data.whatsapp}

活动详情：
📅 日期：2026年7月19日（星期日）
⏰ 时间：上午 9:00 – 下午 6:00
📍 地点：吉隆坡（详细地点将于活动前通过 WhatsApp 通知）

请将此邮件保存作为报名凭证。
如有任何疑问，请通过 WhatsApp 联系我们。

期待与您相见！
AI Transform Malaysia 团队
  `.trim();

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body
  });
}
*/

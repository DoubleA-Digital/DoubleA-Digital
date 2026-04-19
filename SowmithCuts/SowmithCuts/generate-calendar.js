const admin = require('firebase-admin');
const ical  = require('ical-generator').default;

// Init Firebase from secret
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Parse "9:00 AM" → { h: 9, m: 0 }
function parseTime(str) {
  const [time, meridiem] = str.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return { h, m };
}

async function main() {
  const snap = await db.collection('bookings').get();

  const calendar = ical({
    name:     'Sowmith Cuts — Appointments',
    timezone: 'America/Los_Angeles',
  });

  snap.forEach(docSnap => {
    const date  = docSnap.id;          // "YYYY-MM-DD"
    const slots = docSnap.data();      // { "9:00 AM": { name, phone, service, ... } }

    Object.entries(slots).forEach(([time, appt]) => {
      const { h, m } = parseTime(time);
      const [year, month, day] = date.split('-').map(Number);

      const start = new Date(year, month - 1, day, h, m, 0);
      const end   = new Date(year, month - 1, day, h, m + 30, 0); // 30 min slots

      calendar.createEvent({
        start,
        end,
        timezone:    'America/Los_Angeles',
        summary:     `${appt.service} — ${appt.name}`,
        description: `Client: ${appt.name}\nPhone: ${appt.phone}${appt.notes ? '\nNotes: ' + appt.notes : ''}\nRef: ${appt.id || ''}`,
        location:    'Sowmith Cuts, Simi Valley CA',
      });
    });
  });

  const fs = require('fs');
  fs.writeFileSync('calendar.ics', calendar.toString());
  console.log('calendar.ics generated successfully');
}

main().catch(err => { console.error(err); process.exit(1); });

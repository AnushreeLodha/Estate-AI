fetch('http://localhost:5000/api/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Anushree',
    phone: '919660080163',
    budget: '2.5Cr',
    locationPref: 'Andheri',
    bhkPref: '3 BHK',
    status: 'New'
  })
})
.then(res => res.json())
.then(data => console.log('✅ Lead created successfully! Check your WhatsApp.', data))
.catch(err => console.error('❌ Error:', err));

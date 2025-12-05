const form = document.getElementById('answerForm');
const statusEl = document.getElementById('status');
const latEl = document.getElementById('lat');
const lonEl = document.getElementById('lon');

// ===== UBAH URL BACKEND DI SINI =====
const BACKEND_URL = 'https://ardeva.infinityfreeapp.com/save.php';

function getLocation() {
  if (!navigator.geolocation) {
    alert("Browser tidak mendukung geolocation.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      latEl.value = pos.coords.latitude;
      lonEl.value = pos.coords.longitude;
      console.log("Koordinat didapat:", latEl.value, lonEl.value);
    },
    err => {
      console.log("Geolocation ditolak");
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// Jalankan saat halaman dibuka
getLocation();

// ===== KIRIM FORM VIA FETCH (CROSS-ORIGIN) =====
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  statusEl.textContent = 'Mengirim...';
  statusEl.style.color = '#2563eb';
  
  const formData = new FormData(form);
  
  try {
    console.log('Mengirim ke:', BACKEND_URL);
    
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
      mode: 'cors'
    });
    
    console.log('Status response:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.text();
    console.log('Response:', result);
    
    if (result.includes('tersimpan')) {
      statusEl.textContent = '✓ ' + result;
      statusEl.style.color = '#22c55e';
      form.reset();
      setTimeout(() => {
        statusEl.textContent = '';
        getLocation();
      }, 2000);
    } else {
      statusEl.textContent = '✗ ' + result;
      statusEl.style.color = '#ef4444';
    }
  } catch (error) {
    statusEl.textContent = '✗ Error: ' + error.message;
    statusEl.style.color = '#ef4444';
    console.error('Error lengkap:', error);
    console.error('Error message:', error.message);
  }
});

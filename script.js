 const form = document.querySelector('form');
    const latEl = document.getElementById('lat');
    const lonEl = document.getElementById('lon');

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
        //  alert("Anda harus mengizinkan lokasi agar jawaban tercatat dengan koordinat. Jika menolak, lokasi tidak akan tersimpan.");
          
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }

    // Jalankan saat halaman dibuka
    getLocation();
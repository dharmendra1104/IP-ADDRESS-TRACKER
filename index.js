let inputIPadress = document.querySelector(".inputIPadress")
let ipAddress = document.querySelector(".ipAddress")
let country = document.querySelector(".country")
let region = document.querySelector(".region")
let timezone = document.querySelector(".timezone")
let isp = document.querySelector(".isp")
let btn = document.querySelector(".btn")

function fetchData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.ip);
            ipAddress.textContent = data.ip;
            country.textContent = data.location.country;
            region.textContent = data.location.region;
            timezone.textContent = `UTC ${data.location.timezone}`;
            isp.textContent = data.isp;
            const latitude = data.location.lat;
            const longitude = data.location.lng;
            document.querySelector('iframe').src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            ipAddress.textContent = '';
            country.textContent = '';
            region.textContent = '';
            timezone.textContent = '';
            isp.textContent = '';
        });
}

btn.addEventListener('click', () => {
    const value = inputIPadress.value.trim();
    if (value !== '') {
        const url = `https://geo.ipify.org/api/v1?apiKey=at_3KG6NmMqaezLciL4z0xSHfIKKrair&ipAddress=${value}`;
        fetchData(url);
    } else {
        ipAddress.textContent = '';
        country.textContent = '';
        region.textContent = '';
        timezone.textContent = '';
        isp.textContent = '';
    }
});

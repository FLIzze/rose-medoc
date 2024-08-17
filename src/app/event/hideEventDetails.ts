export default function hideEventDetails() {
    const popup = document.getElementById("eventDetails");

    if (popup) {
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
    }
}
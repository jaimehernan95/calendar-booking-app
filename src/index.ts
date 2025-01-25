import i18next from 'i18next';
import { updateUI, setupCalendar } from './app';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
        fr: { translation: fr },
    },
}).then(() => {
    console.log('i18next initialized');
    updateUI();
    setupLanguageSwitcher();
    setupCalendar();
});

function setupLanguageSwitcher() {
    const languageSwitch = document.getElementById('languageSwitch') as HTMLSelectElement;
    if (languageSwitch) {
        languageSwitch.addEventListener('change', (event) => {
            const selectedLanguage = (event.target as HTMLSelectElement).value;
            i18next.changeLanguage(selectedLanguage).then(() => {
                console.log(`Language switched to: ${selectedLanguage}`);
                updateUI();
            });
        });
    }
}

// Ensuring the DOM is ready before initializing the calendar
document.addEventListener('DOMContentLoaded', () => {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    if (timeSlotsContainer) {
        setupCalendar();  // Initialize the calendar
    } else {
        console.error('#time-slots-container not found');
    }
});

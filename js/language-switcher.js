alert('language-switcher.js wurde geladen!');
console.log('Test');

alert('1. Datei gestartet');

document.addEventListener('DOMContentLoaded', function() {
    alert('2. DOM geladen');
    
    // Aktuell ausgewählte Sprache (Standard: Deutsch)
    let currentLanguage = localStorage.getItem('language') || 'de';
    
    const languageSwitch = document.getElementById('language-switch');
    alert('3. languageSwitch gefunden: ' + (languageSwitch !== null));
    
    if (languageSwitch) {
        languageSwitch.value = currentLanguage;
        
        languageSwitch.addEventListener('change', function() {
            alert('4. Change-Event ausgelöst! Sprache: ' + this.value);
            
            currentLanguage = this.value;
            localStorage.setItem('language', currentLanguage);
            updatePageLanguage();
            
            alert('5. updatePageLanguage() wurde aufgerufen');
        });
    }
    
    // Initialer Aufruf
    updatePageLanguage();
    
    // Funktion zum Aktualisieren aller Texte auf der Seite
    function updatePageLanguage() {
        alert('6. updatePageLanguage() wird ausgeführt');
        
        // NEUE TESTS:
        alert('Aktuelle Sprache: ' + currentLanguage);
        alert('translations vorhanden: ' + (typeof translations !== 'undefined'));
        if (typeof translations !== 'undefined') {
            alert('Deutsche Texte: ' + (translations.de ? 'ja' : 'nein'));
            alert('Englische Texte: ' + (translations.en ? 'ja' : 'nein'));
        }
        
        // HTML-Attribut für Dokumentsprache aktualisieren
        document.documentElement.lang = currentLanguage;
        
        // Meta-Beschreibung aktualisieren
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && translations[currentLanguage]?.meta_description) {
            metaDescription.content = translations[currentLanguage].meta_description;
        }
        
        // Seitentitel aktualisieren
        if (translations[currentLanguage]?.page_title) {
            document.title = translations[currentLanguage].page_title;
        }
        
        // Alle Elemente mit data-i18n Attribut aktualisieren
        const elements = document.querySelectorAll('[data-i18n]');
        alert('7. Gefundene Elemente mit data-i18n: ' + elements.length);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
        
        // Spezielle Elemente aktualisieren
        updateFormElements();
        updateCaptchaQuestion();
        updateWordCountInfo();
        updateModalContent();
        updateFooter();
    }
    
    // Hilfsfunktionen
    function updateFormElements() {
        // Formular-Labels
        const nameLabel = document.querySelector('label[for="contact-name"]');
        if (nameLabel && translations[currentLanguage]?.form_name) {
            nameLabel.textContent = translations[currentLanguage].form_name;
        }
        
        const emailLabel = document.querySelector('label[for="contact-email"]');
        if (emailLabel && translations[currentLanguage]?.form_email) {
            emailLabel.textContent = translations[currentLanguage].form_email;
        }
        
        const messageLabel = document.querySelector('label[for="contact-message"]');
        if (messageLabel && translations[currentLanguage]?.form_message) {
            messageLabel.textContent = translations[currentLanguage].form_message;
        }
        
        // Submit-Button
        const submitButton = document.querySelector('.contact-form button[type="submit"]');
        if (submitButton && translations[currentLanguage]?.form_send) {
            submitButton.textContent = translations[currentLanguage].form_send;
        }
    }
    
    function updateCaptchaQuestion() {
        const captchaQuestion = document.querySelector('.captcha-question p');
        if (captchaQuestion && translations[currentLanguage]?.form_captcha) {
            captchaQuestion.textContent = translations[currentLanguage].form_captcha;
        }
    }
    
    function updateWordCountInfo() {
        const wordCountInfo = document.querySelector('.word-count-info');
        if (wordCountInfo && translations[currentLanguage]?.form_max_words) {
            wordCountInfo.textContent = translations[currentLanguage].form_max_words;
        }
    }
    
    function updateModalContent() {
        const modalTitle = document.querySelector('.modal-header h3');
        if (modalTitle && translations[currentLanguage]?.resume_title) {
            modalTitle.textContent = translations[currentLanguage].resume_title;
        }
        
        const downloadButton = document.getElementById('download-resume');
        if (downloadButton && translations[currentLanguage]?.resume_download) {
            const icon = downloadButton.innerHTML.split('</i>')[0] + '</i> ';
            downloadButton.innerHTML = icon + translations[currentLanguage].resume_download;
        }
        
        const iosHint = document.querySelector('#ios-download-hint p');
        if (iosHint && translations[currentLanguage]?.resume_ios_hint) {
            iosHint.textContent = translations[currentLanguage].resume_ios_hint;
        }
    }
    
    function updateFooter() {
        const footerText = document.querySelector('footer p');
        if (footerText && translations[currentLanguage]?.footer_copyright) {
            footerText.textContent = translations[currentLanguage].footer_copyright;
        }
    }
});

alert('language-switcher.js wurde geladen!');
console.log('Test');

// JavaScript für den Sprachumschalter
document.addEventListener('DOMContentLoaded', function() {
    // Lade die Übersetzungen
    // translations ist bereits in translations.js definiert

    // Aktuell ausgewählte Sprache (Standard: Deutsch)
    // Immer Deutsch als Standardsprache verwenden, unabhängig von localStorage
    localStorage.setItem('language', 'de');
    let currentLanguage = 'de';
    
    // Sprachauswahl im Dropdown setzen
    const languageSwitch = document.getElementById('language-switch');
    if (languageSwitch) {
        languageSwitch.value = currentLanguage;
        
        // Event-Listener für Sprachwechsel
        languageSwitch.addEventListener('change', function() {
            currentLanguage = this.value;
            localStorage.setItem('language', currentLanguage);
            updatePageLanguage();
            
            // Zusätzliche Überprüfung für korrekte Anwendung der Übersetzungen
            setTimeout(function() {
                const elements = document.querySelectorAll('[data-i18n]');
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[currentLanguage][key]) {
                        element.textContent = translations[currentLanguage][key];
                    }
                });
                
                // Spezielle Elemente erneut aktualisieren
                updateFormElements();
                updateCaptchaQuestion();
                updateWordCountInfo();
                updateModalContent();
                updateFooter();
            }, 100);
        });
    }
    
    // Initialer Aufruf zum Setzen der Sprache
    updatePageLanguage();
    
    // Funktion zum Aktualisieren aller Texte auf der Seite
    function updatePageLanguage() {
        // HTML-Attribut für Dokumentsprache aktualisieren
        document.documentElement.lang = currentLanguage;
        
        // Meta-Beschreibung aktualisieren
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations[currentLanguage].meta_description;
        }
        
        // Seitentitel aktualisieren
        document.title = translations[currentLanguage].page_title;
        
        // Alle Elemente mit data-i18n Attribut aktualisieren
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
        
        // Spezielle Elemente aktualisieren, die nicht direkt über data-i18n angesprochen werden können
        
        // Formular-Platzhalter und Labels
        updateFormElements();
        
        // Captcha-Frage
        updateCaptchaQuestion();
        
        // Wörter-Zähler Info
        updateWordCountInfo();
        
        // Modal-Inhalte
        updateModalContent();
        
        // Footer Copyright
        updateFooter();
    }
    
    // Hilfsfunktionen für spezielle Elemente
    
    function updateFormElements() {
        // Formular-Labels
        const nameLabel = document.querySelector('label[for="contact-name"]');
        if (nameLabel) nameLabel.textContent = translations[currentLanguage].form_name;
        
        const emailLabel = document.querySelector('label[for="contact-email"]');
        if (emailLabel) emailLabel.textContent = translations[currentLanguage].form_email;
        
        const messageLabel = document.querySelector('label[for="contact-message"]');
        if (messageLabel) messageLabel.textContent = translations[currentLanguage].form_message;
        
        // Formular-Platzhalter (falls vorhanden)
        const nameInput = document.getElementById('contact-name');
        if (nameInput) nameInput.placeholder = translations[currentLanguage].form_name;
        
        const emailInput = document.getElementById('contact-email');
        if (emailInput) emailInput.placeholder = translations[currentLanguage].form_email;
        
        const messageInput = document.getElementById('contact-message');
        if (messageInput) messageInput.placeholder = translations[currentLanguage].form_message;
        
        // Submit-Button
        const submitButton = document.querySelector('.contact-form button[type="submit"]');
        if (submitButton) submitButton.textContent = translations[currentLanguage].form_send;
    }
    
    function updateCaptchaQuestion() {
        const captchaQuestion = document.querySelector('.captcha-question p');
        if (captchaQuestion) {
            captchaQuestion.textContent = translations[currentLanguage].form_captcha;
        }
    }
    
    function updateWordCountInfo() {
        const wordCountInfo = document.querySelector('.word-count-info');
        if (wordCountInfo) {
            const messageTextarea = document.getElementById('contact-message');
            if (messageTextarea) {
                const maxWords = messageTextarea.getAttribute('data-max-words') || 100;
                const words = messageTextarea.value.match(/\S+/g) || [];
                const wordCount = words.length;
                
                wordCountInfo.textContent = `${wordCount} ${translations[currentLanguage].js_of_max} ${maxWords} ${translations[currentLanguage].js_words}`;
            } else {
                wordCountInfo.textContent = translations[currentLanguage].form_max_words;
            }
        }
    }
    
    function updateModalContent() {
        // Lebenslauf Modal Titel
        const modalTitle = document.querySelector('.modal-header h3');
        if (modalTitle) modalTitle.textContent = translations[currentLanguage].resume_title;
        
        // Download Button
        const downloadButton = document.getElementById('download-resume');
        if (downloadButton) {
            const icon = downloadButton.innerHTML.split('</i>')[0] + '</i> ';
            downloadButton.innerHTML = icon + translations[currentLanguage].resume_download;
        }
        
        // iOS Hinweis
        const iosHint = document.querySelector('#ios-download-hint p');
        if (iosHint) iosHint.textContent = translations[currentLanguage].resume_ios_hint;
    }
    
    function updateFooter() {
        const footerText = document.querySelector('footer p');
        if (footerText) footerText.textContent = translations[currentLanguage].footer_copyright;
    }
    
    // Event-Listener für dynamisch generierte Inhalte
    
    // Kontaktformular-Erfolgsbenachrichtigung überschreiben
    const originalShowSuccessMessage = window.showSuccessMessage;
    if (typeof originalShowSuccessMessage === 'function') {
        window.showSuccessMessage = function(name) {
            const formContainer = document.querySelector('.contact-form-container');
            if (formContainer) {
                formContainer.innerHTML = `
                    <div class="success-message">
                        <h3>${translations[currentLanguage].js_thank_you}</h3>
                        <p>${translations[currentLanguage].js_dear} ${name},</p>
                        <p>${translations[currentLanguage].js_message_sent}</p>
                        <p>${translations[currentLanguage].js_no_response}</p>
                        <p>${translations[currentLanguage].js_regards}<br>Astrid Kraft</p>
                    </div>
                `;
                
                // Erfolgsbenachrichtigung stylen
                const successMessage = document.querySelector('.success-message');
                if (successMessage) {
                    successMessage.style.backgroundColor = '#f8f9fa';
                    successMessage.style.padding = '2rem';
                    successMessage.style.borderRadius = '8px';
                    successMessage.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                    
                    // Scroll zum Erfolgstext
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
    }
    
    // Überschreibe die Alert-Meldungen für Formularvalidierung
    const originalFormSubmitHandler = document.querySelector('.contact-form')?.onsubmit;
    if (document.querySelector('.contact-form')) {
        document.querySelector('.contact-form').onsubmit = function(e) {
            e.preventDefault();
            
            // Captcha-Überprüfung
            const captchaInput = document.getElementById('captcha-answer');
            if (captchaInput && parseInt(captchaInput.value) !== 12) {
                alert(translations[currentLanguage].js_captcha_error);
                return;
            }
            
            // Formularfelder auslesen
            const name = document.getElementById('contact-name')?.value;
            const email = document.getElementById('contact-email')?.value;
            const message = document.getElementById('contact-message')?.value;
            
            // Einfache Validierung
            if (!name || !email || !message) {
                alert(translations[currentLanguage].js_form_error);
                return;
            }
            
            // Formular-Daten für FormSubmit vorbereiten
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            
            // Erfolgsbenachrichtigung anzeigen
            window.showSuccessMessage(name);
            
            // Formular per AJAX an FormSubmit senden
            fetch('https://formsubmit.co/e45bd9cc58d2e76d5664bd5119ce0b5f', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log(translations[currentLanguage].js_form_success);
            })
            .catch(error => {
                console.error(translations[currentLanguage].js_form_error_msg, error);
            });
        };
    }
});

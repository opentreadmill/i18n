export default class I18n {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'en';
    }

    async loadLanguage(lang) {
        const response = await fetch(`translations/${lang}.json`);
        this.translations = await response.json();
        this.currentLanguage = lang;
        this.updateTexts();
        this.updateCSSTexts();
    }

    translate(key, params = {}) {
        let text = this.translations[key] || key;
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(`{${param}}`, value);
        }
        return text;
    }

    updateTexts() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const params = JSON.parse(el.getAttribute('data-i18n-params') || '{}');
            el.textContent = this.translate(key, params);
        });
    }

    updateCSSTexts() {
        document.querySelectorAll('[data-i18n-css]').forEach(el => {
            const key = el.getAttribute('data-i18n-css');
            const params = JSON.parse(el.getAttribute('data-i18n-params') || '{}');
            const text = this.translate(key, params);
            el.style.setProperty('--translated-content', `"${text}"`);
        });
    }
}

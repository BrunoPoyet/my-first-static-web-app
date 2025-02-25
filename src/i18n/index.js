import { createI18n } from "vue-i18n";

export default createI18n({
	locale: navigator.language,
	messages: {
		'en-US': {
			hello: 'hello!'
		},
		'fr-FR': {
			hello: 'bonjour !'
		}
	},
	numberFormats: {
		'en-US': {
			ratio: {
				style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1
			}
		},
		'fr-FR': {
			ratio: {
				style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1
			}
		}
	}
});

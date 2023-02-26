import { EmailProps, LanguageType } from 'src/config/interfaces'

export const getConsultHelpConfirmationText = (
	language: LanguageType
): EmailProps => {
	return language === 'ru'
		? {
				theme: 'Запись на помощь в выборе консультации',
				text: 'Это письмо подтверждает, что запись на помощь в выборе консультации была успешна. Я свяжусь с Вами в ближайшее время.',
		  }
		: language === 'ua'
		? {
				theme: 'Запис на допомогу у выборi консультацii',
				text: "Цей лист підтверджує, що запис на допомгу в выборi консультаціi був успішним. Я зв'яжусь з Вами найближчим часом.",
		  }
		: {
				theme: 'Sign for a help with consultation choose',
				text: 'This letter confirms that the your sign for a help with consultation choose appointment was successful. I will contact you ASAP.',
		  }
}

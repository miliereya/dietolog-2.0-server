import { EmailProps, LanguageType } from 'src/config/interfaces'

export const getOrderConfirmationText = (
	language: LanguageType,
	programTitle: string
): EmailProps => {
	return language === 'ru'
		? {
				theme: `Заказ программы ${programTitle}`,
				text: `Это письмо подтверждает, что заказ программы ${programTitle} произошел успешно. Я свяжусь с Вами в ближайшее время.`,
		  }
		: language === 'ua'
		? {
				theme: `Заказ програми ${programTitle}`,
				text: `Цей лист підтверджує, що заказ програми ${programTitle} пройшов успішно. Я зв'яжусь з Вами найближчим часом.`,
		  }
		: {
				theme: `Program order ${programTitle}`,
				text: `This letter confirms that the program ${programTitle} order went successful. I will contact you ASAP.`,
		  }
}

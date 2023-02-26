import { MailAddress, MailAdmin } from 'src/config/constants'
import { transporter } from 'src/config/nodemailer'

class EmailService {
	public async confirmation(to: string, theme: string, text: string) {
		await transporter.sendMail({
			from: MailAddress,
			to,
			subject: theme,
			html: text,
		})
	}

	public async adminAlert(subject: string) {
		await transporter.sendMail({
			from: MailAddress,
			to: MailAdmin,
			subject,
			html: `<b>Новый заказ</b>`,
		})
	}
}

export default new EmailService()

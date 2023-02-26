import { MailAddress, MailPassword } from './constants'

const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: MailAddress, // generated ethereal user
		pass: MailPassword, // generated ethereal password
	},
})

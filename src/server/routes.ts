require('dotenv').config()
import * as mailgunLoader from 'mailgun-js'
import * as express from 'express'

const router = express.Router()

let mailgun = mailgunLoader({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN,
})

const sendEmail = (
  to: string,
  from: string,
  subject: string,
  content: string
) => {
  let data = {
    to,
    from,
    subject,
    text: content,
  }
  return mailgun.messages().send(data)
}

router.post('/api/sendmail', async (req, res, next) => {
  try {
    await sendEmail(
      'admin@vancouverstudent.com',
      'no-reply@test.com',
      'Application Form',
      req.body.message
    )
    res.send('Email sent!')
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

export default router

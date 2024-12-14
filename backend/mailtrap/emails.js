import { mailtrapClient, sender } from '../mailtrap/mailtrap.config.js'
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })

        console.log("Email sent sucessfully", response)
    } catch (error) {
        console.log("Error sending verification", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "f156ef1b-48a0-4412-b23c-61acd5a07fb5",
            template_variables: {
                "company_info_name": "MERN Auth",
                "name": name
            }
        });

        console.log("Welcome email sent successfully", response);

    } catch (error) {
        console.log(`Error sending welcome email`, error)
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        console.log("Password reset email sent successfully", response);

    } catch (error) {
        console.log(`Error sending reset email`, error)
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendResetSucessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"

        })

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.log(`Error sending reset email`, error)
        throw new Error(`Error sending welcome email: ${error}`)
    }
}
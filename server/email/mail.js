const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config");

const OAuth2 = google.auth.OAuth2;

/*
    Set up OAuth client only once
*/
const OAuthClient = new OAuth2(config.clientId, config.clientSecret);
OAuthClient.setCredentials({ refresh_token: config.refreshToken });

/*
    Create the email transport object once and reuse it
*/
let transport;

const createTransporter = async () => {
    if (!transport) {
        try {
            const accessTokenResponse = await OAuthClient.getAccessToken();
            const accessToken = accessTokenResponse.token;

            transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: "OAUTH2",
                    user: config.user,
                    clientId: config.clientId,
                    clientSecret: config.clientSecret,
                    refreshToken: config.refreshToken,
                    accessToken: accessToken,
                }
            });
        } catch (error) {
            console.error("Error setting up the email transporter:", error);
            throw error;
        }
    }
    return transport;
};

/*
    Send Email Function with more optimizations
*/
const sendEmail = async (name, receiver, message, subject = "No Subject", template ) => {
    try {
        // Ensure transporter is ready
        const transporter = await createTransporter();

        // Ensure message and subject are provided, fall back to defaults
        const finalMessage = message || "No message content provided";
        const finalSubject = subject || "No Subject";

        // Create mail options
        const mailOptions = {
            from: `Pic Nest <${config.user}>`,
            to: receiver,
            subject: finalSubject,
            html: template(name, finalMessage),
        };

        // Send email and return the result as a promise
        const result = await transporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;  
    }
};

module.exports = sendEmail;

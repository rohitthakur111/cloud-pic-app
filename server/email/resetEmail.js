module.exports = (name, resetLink) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f8f9fa; /* Light background */
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 50px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        text-align: left;
                    }
                    .email-body {
                        padding: 30px;
                        font-size: 16px;
                        color: #333333;
                        line-height: 1.8;
                        background-color: #f8f9fa;
                    }
                    .email-body p {
                        margin-bottom: 20px;
                    }
                    .email-body a {
                        color: #007BFF;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .email-body a:hover {
                        text-decoration: underline;
                    }
                    .cta-button {
                        display: inline-block;
                        padding: 12px 25px;
                        background-color: #007BFF;
                        color: #ffffff;
                        text-decoration: none;
                        font-size: 16px;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .cta-button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-body">
                        <p>Hello ${name},</p>
                        <p>We received a request to reset your password. If you made this request, please click the link below to reset your password:</p>
                        <p><a href="${resetLink}" class="cta-">Reset Your Password</a></p>
                        <p><em>Please note: This link will expire in 10 minutes.</em></p>
                        <p>If you did not request a password reset, please ignore this email, and your password will remain unchanged.</p>
                        <p>If you have any questions or need further assistance, feel free to reply to this email or contact our support team.</p>
                        <p>Best regards,</p>
                        <p><strong>Pic Nest</strong></p>
                        <p><a href="https://cloud-pic-app.vercel.app">Visit our website</a> | <a href="#">Unsubscribe</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;
}

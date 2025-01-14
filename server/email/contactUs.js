module.exports = (name,message) => {
    return`
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
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-body">
                        <p>Hello ${name},</p>
                        <p>Thank you for reaching out to us! We have successfully received your message and our team will review it shortly. We aim to respond as quickly as possible, so please allow us a little time to get back to you.</p>
                        <p><strong>Your Message:</strong><br> ${message}</p>
                        <p>If you need urgent assistance, feel free to reply to this email or contact us through our support page.</p>
                        <p>We appreciate your patience and look forward to assisting you.</p>
                        <p>Best regards,</p>
                        <p><strong>The Support Team</strong></p>
                        <p><a href="https://yourwebsite.com">Visit our website</a> | <a href="#">Unsubscribe</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;

}

const publicEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
    "icloud.com",
    "mail.com",
    "yandex.com"
];

// Function to check if the email domain is public
export const isPublicEmail = (email: string) => {
    const domain = email.split('@')[1].toLowerCase();
    return publicEmailDomains.includes(domain);
}
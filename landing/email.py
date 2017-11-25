from django.core.mail import EmailMessage

def send_contact_email(name, email, subject, body):
    email = EmailMessage(subject + ' | Soporte para: ' + email, 'De ' + name + '\n' + body, to=['badds.soporte@gmail.com'])
    email.send()

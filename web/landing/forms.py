from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.forms import Form


class LoginForm(AuthenticationForm):
    username = forms.CharField(max_length=30, widget=forms.TextInput(attrs={'placeholder': 'Usuario'}))
    password = forms.CharField(
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'Contraseña'})
    )


class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=30, widget=forms.TextInput(attrs={'placeholder': 'Usuario'}))
    first_name = forms.CharField(max_length=30, required=False, widget=forms.TextInput(attrs={'placeholder': 'Nombre'}))
    last_name = forms.CharField(max_length=30, required=False, widget=forms.TextInput(attrs={'placeholder': 'Apellido'}))
    email = forms.EmailField(max_length=254, widget=forms.TextInput(attrs={'placeholder': 'Email'}))
    password1 = forms.CharField(
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'Contraseña'})
    )
    password2 = forms.CharField(
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirmacion'}),
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2',)


class ContactForm(Form):
    name = forms.CharField(min_length=1, max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Nombre'}))
    email = forms.CharField(min_length=5, max_length=256, widget=forms.TextInput(attrs={'placeholder': 'Email'}))
    subject = forms.CharField(min_length=10, max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Asunto'}))
    body = forms.CharField(min_length=1, max_length=2500, widget=forms.Textarea(attrs={'placeholder': 'Mensaje'}))


class RecoverForm(Form):
    email = forms.CharField(min_length=5, max_length=256, widget=forms.TextInput(attrs={'placeholder': 'Email'}))

from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from django.urls import reverse_lazy

from blind.utils import DataMixin
from users.forms import LoginUserForm, RegisterUserForm


class LoginUser(DataMixin, LoginView):
    form_class = LoginUserForm
    template_name = 'login.html'
    next_page = reverse_lazy('index')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return self.get_mixin_context(context, title='Авторизация')


# class LogoutUser(DataMixin, LogoutView):
#     next_page = reverse_lazy('index')


def logout_user(request):
    logout(request)
    return redirect('index')


def register(request):
    if request.method == 'POST':
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password1'])
            user.save()
            return redirect('users:login')
    else:
        form = RegisterUserForm()
    return render(request, 'register.html', {'form': form})

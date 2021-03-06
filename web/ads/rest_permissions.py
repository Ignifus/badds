from rest_framework import permissions


class IsAuthenticatedAndEmailConfirmed(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.profile.email_confirmed:
            return True
        return False

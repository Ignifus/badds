from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credits = models.FloatField(default=0)
    email_confirmed = models.BooleanField(default=False)
    pending_purchase_amount = models.IntegerField(null=True, default=None)
    pending_purchase_id = models.TextField(null=True, default=None)
    pending_purchase_link = models.TextField(null=True, default=None)

    __original_credits = None

    def __init__(self, *args, **kwargs):
        super(Profile, self).__init__(*args, **kwargs)
        self.__original_credits = self.credits

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        if self.credits != self.__original_credits:
            credits_log = CreditsLog()
            credits_log.user = self.user
            credits_log.credits = self.credits
            credits_log.save()
        super(Profile, self).save(force_insert, force_update, *args, **kwargs)
        self.__original_credits = self.credits

    def __str__(self):
        return self.user.username


class CreditsLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    credits = models.FloatField(default=0)
    time = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

    instance.profile.save()


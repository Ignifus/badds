from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import User

User._meta.get_field('email')._unique = True


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credits = models.FloatField(default=0)
    email_confirmed = models.BooleanField(default=False)
    pending_purchase_amount = models.IntegerField(null=True, default=None)
    pending_purchase_id = models.TextField(null=True, default=None)
    pending_purchase_link = models.TextField(null=True, default=None)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


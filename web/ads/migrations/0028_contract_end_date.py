# Generated by Django 2.2.2 on 2019-11-28 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0027_advertisement_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='end_date',
            field=models.DateTimeField(default='2019-11-27T01:16:36.349926Z'),
            preserve_default=False,
        ),
    ]
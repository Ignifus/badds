# Generated by Django 2.2.8 on 2019-12-16 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0037_auto_20191216_2308'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='logo',
            field=models.TextField(default='https://res.cloudinary.com/geminis/image/upload/v1575435915/placeholder-images-image_large.png', max_length=128),
            preserve_default=False,
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-26 00:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0005_auto_20171126_0005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='space',
            name='application',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='spaces', to='ads.Application'),
        ),
    ]

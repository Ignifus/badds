# Generated by Django 2.2.2 on 2019-11-27 01:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0024_auto_20180624_2030'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='auctionstatus',
            options={'verbose_name_plural': 'Auction Status'},
        ),
        migrations.AlterField(
            model_name='auction',
            name='status',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.PROTECT, to='ads.AuctionStatus'),
        ),
        migrations.AlterField(
            model_name='auctionstatus',
            name='status',
            field=models.CharField(choices=[('Active', 'Active'), ('Extended', 'Extended'), ('Closed', 'Closed'), ('Removed', 'Removed')], default='Active', max_length=16),
        ),
        migrations.AlterField(
            model_name='ip',
            name='country',
            field=models.TextField(max_length=32),
        ),
        migrations.AlterField(
            model_name='space',
            name='name',
            field=models.TextField(max_length=64),
        ),
    ]

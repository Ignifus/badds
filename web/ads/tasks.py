# Create your tasks here
from __future__ import absolute_import, unicode_literals

import datetime

from celery import shared_task
from django.db.models import Q

from ads.models import Contract, Auction


@shared_task
def check_contracts_end():
    contracts = Contract.objects.filter(active=True, end_date__lte=datetime.datetime.now())
    for contract in contracts:
        contract.active = False
        contract.advertisement.user.profile.credits += contract.prints * contract.ppp_usd
        contract.advertisement.user.save()
        contract.save()


@shared_task
def check_auctions_end():
    auctions = Auction.objects.filter(status=True, end_date__lte=datetime.datetime.now())
    for auction in auctions:
        bidding = auction.biddings.order_by('-ppp_usd').first()

        if bidding is not None:
            c = Contract()
            c.space = auction.space
            c.advertisement = bidding.advertisement
            c.prints = auction.prints
            c.ppp_usd = bidding.ppp_usd
            c.end_date = datetime.datetime.now() + datetime.timedelta(days=auction.contract_duration_days)
            c.save()

            biddings = auction.biddings.filter(~Q(user=bidding.user))

            # Refunds
            for b in biddings:
                b.user.profile.credits += b.ppp_usd * auction.prints
                b.user.save()

        auction.status = False
        auction.save()

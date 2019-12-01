# Create your tasks here
from __future__ import absolute_import, unicode_literals

import datetime

from celery import shared_task

from ads.models import Contract, Auction, AuctionStatus


@shared_task
def check_contracts_end():
    contracts = Contract.objects.filter(active=True, end_date__lte=datetime.datetime.now())
    for contract in contracts:
        contract.active = False
        contract.advertisement.user.profile.credits += contract.prints * contract.ppp_usd
        contract.save()


@shared_task
def check_auctions_end():
    auctions = Auction.objects.filter(status=AuctionStatus.objects.get(status='Active'), end_date__lte=datetime.datetime.now())
    for auction in auctions:
        bidding = auction.biddings.order_by('-ppp_usd').first()

        c = Contract()
        c.space = auction.space
        c.advertisement = bidding.advertisement
        c.prints = auction.prints
        c.ppp_usd = bidding.ppp_usd
        c.end_date = datetime.datetime.now() + datetime.timedelta(days=auction.contract_duration_days)
        c.save()

        auction.status = AuctionStatus.objects.get(status='Closed')
        auction.save()

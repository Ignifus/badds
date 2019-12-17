export const getSpaceURL = (pathname, id) => {
  const parts = pathname.split('/');
  if (!isNaN(parts[parts.length - 1])) parts.pop();
  parts[parts.length - 1] = 'spaces';
  parts.push('view');
  parts.push(id);
  return parts.join('/');
}

export const getAdvertisementURL = (pathname, id) => {
  const parts = pathname.split('/');
  parts[parts.length - 1] = 'advertisements';
  parts.push('view');
  parts.push(id);
  return parts.join('/');
}

export const getApplicationURL = (pathname, id) => {
  const parts = pathname.split('/');
  parts[parts.length - 1] = 'products';
  parts.push('view');
  parts.push(id);
  return parts.join('/');
}

export const getAuctionURL = (pathname, id) => {
  const parts = pathname.split('/');
  parts[parts.length - 1] = 'auctions';
  parts.push('view');
  parts.push(id);
  return parts.join('/');
}

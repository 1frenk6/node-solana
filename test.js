/* eslint-disable no-undef */
const lookupOrderTypesPromises = products.map(product => {
  return getLookupOrderTypeByTypeAndProduct({
    type: ProductType.CARD_ONLINE,
    product
  });
});

await Promise.all(lookupOrderTypesPromises).then(async lookupOrderTypesResult => {
  lookupOrderTypesResult.forEach(async lookupOrderType => {
    if (lookupOrderType) {
      await createDefaultMerchantFee(merchant.merchantToken, req.user, lookupOrderType.id);
      await createMerchantProduct(merchant.merchantToken, req.user, lookupOrderType);
    }
  });
});

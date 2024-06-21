import "/node_modules/prebid.js/build/dist/prebid.js";

const PREBID_TIMEOUT = 2000;

const adUnits = [
  {
    code: "ad-div",
    mediaTypes: {
      banner: {
        sizes: [[300, 250]],
      },
    },
    bids: [
      {
        bidder: "advertisex",
        params: {
          adUnitCode: "123456", // Example ad unit code
        },
      },
    ],
  },
];

pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits);
  pbjs.requestBids({
    timeout: PREBID_TIMEOUT,
    bidsBackHandler: backHandler,
  });
});

function backHandler(bidResponses) {
  Object.keys(bidResponses).forEach((bidElement) => {
    const bannersToRenderIds = adUnits.map((adUnit) => adUnit.code);
    if (bannersToRenderIds.includes(bidElement)) {
      const currentBanner = document.getElementById(bidElement);
      pbjs.renderAd(
        currentBanner,
        bidResponses[bidElement].bids.map((bid) => bid.adId)
      );
      currentBanner.innerHTML = bidResponses[bidElement].bids.map(
        (bid) => bid.ad
      );
    }
  });
}

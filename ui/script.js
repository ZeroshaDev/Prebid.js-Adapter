import "/node_modules/prebid.js/build/dist/prebid.js";

const PREBID_TIMEOUT = 2000;

// Define ad units for Prebid.js
const adUnits = [
  {
    code: "ad-div", // Element ID where the ad will be rendered
    mediaTypes: {
      banner: {
        sizes: [[300, 250]], // Banner size
      },
    },
    bids: [
      {
        bidder: "advertisex", // Bidder code for 'advertisex'
        params: {
          adUnitCode: "123456", // Example ad unit code specific to 'advertisex'
        },
      },
    ],
  },
];

// Push ad units configuration to Prebid.js queue
pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits); // Add defined ad units to Prebid.js
  pbjs.requestBids({
    timeout: PREBID_TIMEOUT, // Set timeout for bid requests
    bidsBackHandler: backHandler, // Callback function to handle bid responses
  });
});

// Callback function to handle bid responses
function backHandler(bidResponses) {
  // Iterate through bid responses
  Object.keys(bidResponses).forEach((bidElement) => {
    // Check if the bid response corresponds to a banner that needs rendering
    const bannersToRenderIds = adUnits.map((adUnit) => adUnit.code);
    if (bannersToRenderIds.includes(bidElement)) {
      // Get the DOM element where the ad will be rendered
      const currentBanner = document.getElementById(bidElement);

      // Render the ad using Prebid.js renderAd function
      pbjs.renderAd(
        currentBanner, // Target DOM element
        bidResponses[bidElement].bids.map((bid) => bid.adId) // Array of ad IDs to render
      );

      // Set the HTML content of the ad container to the ad creative
      currentBanner.innerHTML = bidResponses[bidElement].bids.map(
        (bid) => bid.ad
      );
    }
  });
}

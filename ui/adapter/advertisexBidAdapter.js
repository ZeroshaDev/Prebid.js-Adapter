import { registerBidder } from "../src/adapters/bidderFactory.js";
import { BANNER } from "src/mediaTypes.js";

const BIDDER_CODE = "advertisex";
const ADAPTER_VERSION = "1.0";
const ENDPOINT_URL = "http://localhost:8080/getBid";

// Adapter specification for 'advertisex' bidder
const spec = {
  code: BIDDER_CODE,
  version: ADAPTER_VERSION,
  supportedMediaTypes: [BANNER],

  // Function to validate bid requests on the client side
  isBidRequestValid: function (bid) {
    return !!bid.params.adUnitCode;
  },

  // Function to build requests to the server to fetch bids
  buildRequests: function (bidRequests) {
    const requests = bidRequests.map((bid) => {
      return {
        method: "POST",
        url: ENDPOINT_URL,
        data: JSON.stringify({
          id: bid.bidId,
          adUnitCode: bid.params.adUnitCode,
          sizes: bid.sizes,
          site: {
            domain: window.location.hostname,
            page: window.location.href,
            ref: document.referrer,
          },
        }),
      };
    });

    return requests;
  },

  // Function to interpret the server's response
  interpretResponse: function (serverResponse, request) {
    const bidResponses = [];
    const response = serverResponse.body;
    let requestData = request.data;

    if (typeof requestData === "string") {
      requestData = JSON.parse(requestData);
    }

    if (response) {
      // Constructing bid response object from server's response
      const bidResponse = {
        requestId: requestData.id,
        cpm: response.cpm,
        width: response.width,
        height: response.height,
        creativeId: response.creativeId,
        currency: response.currency,
        netRevenue: response.netRevenue,
        ttl: response.ttl,
        ad: response.ad,
        adId: response.adId,
      };
      bidResponses.push(bidResponse);
    } else {
      // Handling case where no valid response is received
      return { error: "No response received from server" };
    }

    return bidResponses;
  },
};

// Registering the bidder adapter with prebid.js
registerBidder(spec);

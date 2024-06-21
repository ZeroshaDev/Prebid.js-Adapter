import { registerBidder } from "../src/adapters/bidderFactory.js";
import { BANNER } from "src/mediaTypes.js";

const BIDDER_CODE = "advertisex";
const ADAPTER_VERSION = "1.0";
const ENDPOINT_URL = "http://localhost:8080/getBid";

const spec = {
  code: BIDDER_CODE,
  version: ADAPTER_VERSION,
  supportedMediaTypes: [BANNER],

  isBidRequestValid: function (bid) {
    return !!bid.params.adUnitCode;
  },

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

  interpretResponse: function (serverResponse, request) {
    const bidResponses = [];
    const response = serverResponse.body;
    let requestData = request.data;

    if (typeof requestData === "string") {
      requestData = JSON.parse(requestData);
    }

    if (response) {
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
      return { error: "No response received from server" };
    }

    return bidResponses;
  },
};

registerBidder(spec);

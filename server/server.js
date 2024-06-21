const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.text());

app.post("/getBid", (req, res) => {
  res.json({
    bidId: "1",
    cpm: 0.1,
    width: 300,
    height: 250,
    creativeId: "1",
    currency: "EUR",
    netRevenue: true,
    ttl: 500,
    adId: "efe3f52f-a22d-4c25-be31-6ec2ec140173",
    ad: `
         <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Рекламный блок</title>
    <style>
        .ad-block {
            width: 300px;
            height: 250px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #ff9966, #ff5e62);
            position: relative;
            transition: transform 0.3s ease-in-out;
        }

        .ad-block:hover {
            transform: scale(1.05);
        }

        .ad-content {
            color: #fff;
            text-align: center;
            padding: 20px;
            z-index: 1;
        }

        .ad-content h4 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .ad-content p {
            font-size: 16px;
            line-height: 1.5;
        }

        .ad-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://via.placeholder.com/300x250');
            background-size: cover;
            background-position: center;
            filter: brightness(0.6);
            z-index: 0;
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="ad-block">
        <div class="ad-image"></div>
        <div class="ad-content">
            <h4>Sale</h4>
            <a target="_blank" href="https://www.google.com.ua/?hl=ru">Amazing product from us for you</a>
        </div>
    </div>
</body>
</html>
        `,
  });
});

app.listen(PORT, () => {
  console.log(`Mock server listening on http://localhost:${PORT}`);
});

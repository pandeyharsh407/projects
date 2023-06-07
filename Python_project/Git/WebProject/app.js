const apiKey = "0I3TEL5Q7S7SR3XN";

const symbols = ["AAPL", "GOOG", "TSLA", "META", "AMZN"];

const fetchStockData = async () => {
  const promises = symbols.map(async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data["Global Quote"];
  });

  const stockData = await Promise.all(promises);
  return stockData;
};

const renderStockData = (stockData) => {
  const stockContainer = document.getElementById("stock-container");
  stockContainer.innerHTML = "";

  stockData.forEach((data) => {
    const stockElement = document.createElement("div");
    stockElement.classList.add("stock");

    const symbolElement = document.createElement("p");
    symbolElement.innerHTML = `<strong>Symbol:</strong> ${data["01. symbol"]}`;

    const priceElement = document.createElement("p");
    priceElement.innerHTML = `<strong>Price:</strong> $${parseFloat(data["05. price"]).toFixed(2)}`;

    stockElement.appendChild(symbolElement);
    stockElement.appendChild(priceElement);

    stockContainer.appendChild(stockElement);
  });
};

const updateStockData = async () => {
  const stockData = await fetchStockData();
  renderStockData(stockData);
};

updateStockData();
setInterval(updateStockData, 10000);

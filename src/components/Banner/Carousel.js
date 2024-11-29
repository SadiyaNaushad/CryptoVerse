import { Container, styled } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try{
      const { data } = await axios.get(TrendingCoins(currency));
      console.log("data: ", data);
      setTrending(data);
    }
    catch{
      setTrending([]);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  const CarouselItem = styled(Link)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  }));
  if (!trending) return <div>Loading...</div>;

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
  
    return (
      <CarouselItem to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const CarouselContainer = styled("div")({
    height: "50%",
    display: "flex",
    alignItems: "center",
  });
  
  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        // responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselContainer>
  );  
};

export default Carousel;

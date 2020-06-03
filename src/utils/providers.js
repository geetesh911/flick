const providers = (offers, filter) => {
  let providers = [];

  offers.forEach((offer) => {
    switch (offer.provider_id) {
      case 8:
        providers.push({
          icon: "https://images.justwatch.com/icon/430997/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 9:
        providers.push({
          icon: "https://images.justwatch.com/icon/52449539/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 10:
        providers.push({
          icon: "https://images.justwatch.com/icon/52449539/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 15:
        providers.push({
          icon: "https://images.justwatch.com/icon/116305230/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 192:
        providers.push({
          icon: "https://images.justwatch.com/icon/59562423/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 235:
        providers.push({
          icon: "https://images.justwatch.com/icon/113378150/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 3:
        providers.push({
          icon: "https://images.justwatch.com/icon/430996/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 175:
        providers.push({
          icon: "https://images.justwatch.com/icon/14385750/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 255:
        providers.push({
          icon: "https://images.justwatch.com/icon/123324312/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 218:
        providers.push({
          icon: "https://images.justwatch.com/icon/82869265/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 232:
        providers.push({
          icon: "https://images.justwatch.com/icon/93795879/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 119:
        providers.push({
          icon: "https://images.justwatch.com/icon/52449861/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 121:
        providers.push({
          icon: "https://images.justwatch.com/icon/4233119/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 122:
        providers.push({
          icon: "https://images.justwatch.com/icon/174849096/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 220:
        providers.push({
          icon: "https://images.justwatch.com/icon/85114140/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 237:
        providers.push({
          icon: "https://images.justwatch.com/icon/99832956/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 319:
        providers.push({
          icon: "https://images.justwatch.com/icon/141488812/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      case 158:
        providers.push({
          icon: "https://images.justwatch.com/icon/6918774/s100",
          url: offer.urls.standard_web,
          type: offer.monetization_type,
          id: offer.provider_id,
        });
        break;
      default:
        break;
    }
  });
  if (filter) {
    let newArray = [];

    let uniqueObject = {};

    for (let i in providers) {
      let objURL = providers[i]["icon"];

      uniqueObject[objURL] = providers[i];
    }

    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    return newArray;
  } else {
    let newArray = [];

    for (let i = 0; i < providers.length; i++) {
      let n = 0;
      for (let j = i + 1; j < providers.length; j++) {
        if (
          providers[i].type === providers[j].type &&
          providers[i].url === providers[j].url
        ) {
          n = 1;
        }
      }
      if (n === 0) newArray.push(providers[i]);
    }

    newArray.forEach((offer) => {
      if (offer.id === 3) {
        let correctURL = "";
        correctURL = offer.url.split("=");
        correctURL[1] = "IN&hl";
        offer.url = correctURL.join("=");
      }
    });

    return newArray;
  }
};

export default providers;

export const generateHighchartsData = (
  foodComsumption = [],
  animalName = []
) => {
  const categories = foodComsumption.map((consum) => {
    return consum.period;
  });

  const series = [];

  if (foodComsumption.length > 0) {
    animalName.forEach((an, idx) => {
      let data = [];
      foodComsumption.forEach((m) => {
        data.push(m.meatConsumption[idx] ? m.meatConsumption[idx].meat : 0);
      });

      series.push({
        name: an.animal,
        data,
      });
    });
  }

  const options = {
    chart: {
      type: "column",
      style: {
        fontFamily: "arial",
        marginBottom: 20,
      },
    },
    title: {
      text: "Daily Food Consumption",
      align: "left",
    },
    legend: {
      align: "right",
      verticalAlign: "top",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      min: 0,
      max: 12,
      scrollbar: {
        enabled: true,
      },
      categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Meat Consumption (kg)",
      },
    },
    tooltip: {
      headerFormat: "<b>Period: {point.x}</b><br/>",
      pointFormat:
        '<span style="color:{series.color}">● </span>{series.name}: {point.y} <br/>',
      footerFormat: "<b>Total: {point.total}</b>",
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series,
  };

  return options;
};

export const sortAndMapData = (foodComsumption = []) => {
  // Sort and mapping the date period
  const data = foodComsumption
    .map((consum) => {
      return {
        period: `${consum.day}/${consum.month}`,
        animal: consum.animal,
        meat: consum.meat,
      };
    })
    .sort((a, b) => {
      const ma = parseInt(a.period.split("/")[0]);
      const mb = parseInt(b.period.split("/")[0]);

      const da = parseInt(a.period.split("/")[1]);
      const db = parseInt(a.period.split("/")[1]);

      const aa = a.animal;
      const ab = b.animal;

      if (ma < mb) return -1;
      if (ma > mb) return 1;
      if (da < db) return -1;
      if (da > db) return 1;
      if (aa === "LAINNYA" || ab === "LAINNYA") return 1;
      if (aa < ab) return -1;
      if (aa > ab) return 1;
      return 0;
    });

  // Sum `meat` keys by value `period` and `aminal`
  let holder = {};

  data.forEach((d) => {
    const key = `${d.period}-${d.animal}`;
    if (holder.hasOwnProperty(key)) {
      holder[key] += parseFloat(`${d.meat}`);
    } else {
      holder[key] = d.meat;
    }
  });

  let newData = [];

  for (let prop in holder) {
    newData.push({
      period: prop.split("-")[0],
      animal: prop.split("-")[1],
      meat: Math.round(holder[prop] * 100) / 100,
    });
  }

  // Gives an object with period as keys
  const groups = newData.reduce((groups, consum) => {
    const period = consum.period;
    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push({
      animal: consum.animal,
      meat: consum.meat,
    });
    return groups;
  }, {});

  newData = [];

  for (const key in groups) {
    newData.push({
      period: key,
      meatConsumption: groups[key],
    });
  }

  return newData;
};

export const getAnimalName = (foodComsumption = []) => {
  const name = [];
  foodComsumption.forEach((el) => {
    const filter = name.findIndex((d) => d === el.animal);
    if (filter === -1) {
      name.push(el.animal);
    }
  });

  name.sort((a, b) => {
    if (a === "LAINNYA" || b === "LAINNYA") return 1;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  return name;
};

export const totalMeatConsumptionByPeriod = (data) => {
  let total = null;

  data.forEach((d) => {
    total += d ? d.meat : 0;
  });

  return Math.round(total * 100) / 100;
};

export const grandTotal = (data) => {
  let total = null;

  data.forEach((d) => {
    d.meatConsumption.forEach((m) => {
      total += m.meat;
    });
  });

  return total;
};

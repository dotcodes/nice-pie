import Nicepie from "./index";

const ele = document.getElementById("app");

Nicepie.pie(ele, {
  inner: {
    enabled: true,
    radius: 60,
    text: "$100",
  },
  data: [
    {
      value: 25,
      label: "Orange",
      color: "#FD9C35",
    },

    {
      label: "Purpule",
      value: 16,
      color: "#B34AFC",
    },
    {
      label: "Sky Blue",
      value: 32,
      color: "#5793F3",
    },
    {
      label: "Blue",
      value: 40,
      color: "#4636FA",
    },
  ],
});

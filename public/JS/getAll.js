$(function () {
  const getAll = async () => {
    // GET DATA
    const { data } = await axios.get("/api/games");
    // VARIABLES
    const titles = [
      "names",
      "developers",
      "publishers",
      "engines",
      "platforms",
      "years",
      "genres",
      "modes",
    ];
    let keywords = [
      { names: [] },
      { developers: [] },
      { publishers: [] },
      { engines: [] },
      { platforms: [] },
      { years: [] },
      { genres: [] },
      { modes: [] },
    ];

    // PUSH DATA TO KEYWORDS OBJECTS
    for (let i = 0; i < data.length; i++) {
      for (let y = 0; y < titles.length; y++) {
        if (
          !Object.values(keywords[y][titles[y]]).includes(data[i][titles[y]])
        ) {
          keywords[y][titles[y]].push(data[i][titles[y]]);
        }
      }
    }
    // DOM ELEMENTS

    // CREATE NAVBAR
    const colors = [
      "#FF595E",
      "#6A4C93",
      "#A4036F",
      "#FEEFE5",
      "#EE6123",
      "#A6B1E1",
      "#C1666B",
      "#A6A2A2",
    ];
    // CREATE NAVBAR MENU AND ASSING MOUSEUP EVENT TO CHANGE COLOR AND BOX COLOR OF INPUTDIV ELEMENTS
    const navFunc = () => {
      for (let i = 0; i < titles.length; i++) {
        const navElement = `<div class="genres pointer transition"></div>`;
        $("nav").append(navElement);
        $(`.genres:eq(${i})`).html(titles[i].toUpperCase());
        $(`.genres:eq(${i})`).attr("id", titles[i]);
        $(`.genres:eq(${i})`).css("border-color", colors[i]);
        $(`.genres:eq(${i})`).css("background-color", colors[i]);
        $(`.genres:eq(${i})`).on({
          mouseup: (e) => {
            let placeholderVar = $(e.currentTarget)
              .html()
              .slice(0, $(e.currentTarget).html().length - 1)
              .toLowerCase();
            $("#label").css("color", colors[i]);
            $("#search").css("box-shadow", `3px 3px 0px 2px ${colors[i]}`);
            $("#search").attr(
              "placeholder",
              `Write the game ${placeholderVar} here!`
            );
          },
        });
      }
    };
    navFunc();
    // INPUT FUNCTIONS
    const inputFunc = () => {
      $(".search").on({
        mouseenter: (e) => {
          let inputColor;
          if ($(e.currentTarget).attr("id") == "size") {
            inputColor = `rgb(83, 83, 196)`;
          } else {
            inputColor = $(e.currentTarget).siblings(".label").css("color");
          }
          $(e.currentTarget).css("box-shadow", `3px 3px 0px 5px ${inputColor}`);
        },
        mouseleave: (e) => {
          let inputColor;
          if ($(e.currentTarget).attr("id") == "size") {
            inputColor = `rgb(83, 83, 196)`;
          } else {
            inputColor = $(e.currentTarget).siblings(".label").css("color");
          }
          $(e.currentTarget).css("box-shadow", `3px 3px 0px 2px ${inputColor}`);
        },
        focus: (e) => {
          let inputColor;
          if ($(e.currentTarget).attr("id") == "size") {
            inputColor = `rgb(83, 83, 196)`;
          } else {
            inputColor = $(e.currentTarget).siblings(".label").css("color");
          }
          $(e.currentTarget).css(
            "box-shadow",
            `3px 3px 0px 10px ${inputColor}`
          );
        },
        focusout: (e) => {
          let inputColor;
          if ($(e.currentTarget).attr("id") == "size") {
            inputColor = `rgb(83, 83, 196)`;
          } else {
            inputColor = $(e.currentTarget).siblings(".label").css("color");
          }
          $(e.currentTarget).css("box-shadow", `3px 3px 0px 2px ${inputColor}`);
        },
      });
    };
    inputFunc();
  };

  getAll();
});

$(function () {
  // HTML ELEMENT VARIABLES
  const games = ` <div class="games grid pointer transition">
            <figure class="transition">
            <div id="borderAnimateTop" class="upDown"></div>
            <div id="borderAnimateRight" class="leftRight"></div>
            <div id="borderAnimateBottom" class="upDown"></div>
            <div id="borderAnimateLeft" class="leftRight"></div>
              <img
                src=""
                alt=""
                class="gameImg transition"
              />
              <figcaption class="transition grid">
              </figcaption>
            </figure></div>`;
  const label = `<div class="label grid pointer">
                  <input type="search" value="" name="" class="labels" />
                  <span class="delete transition grid pointer">X</span>
                </div>`;
  const valueDiv = `<div class="transition grid valueDiv"></div>`;

  // INFODIV COLORS FUNCTION
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
  const infoDivFunc = () => {
    for (let i = 0; i < colors.length; i++) {
      $(`.header2:eq(${i})`).css("color", colors[i]);
      $(`.valueDiv:eq(${i})`).css("background-color", colors[i]);
    }
  };
  const normalKeys = [
    "names",
    "developers",
    "publishers",
    "engines",
    "platforms",
    "years",
    "genres",
    "modes",
  ];
  // AN OBJECT TO GET QUERIES
  let labelList = [
    { names: "" },
    { developers: "" },
    { publishers: "" },
    { engines: "" },
    { platforms: "" },
    { years: "" },
    { genres: "" },
    { modes: "" },
  ];
  // URL AND QUERY VARIABLES
  let page = 1;
  let pages = "";
  let queryParams = "";
  let url = `/api/games?`;

  // NAV FUNCTION - SETS LABEL HTML ACCORDING TO CLICKED NAV OPTION
  $("nav").on({
    mouseenter: () => {
      $(".genres").mouseup(function (e) {
        let name = e.currentTarget.id;
        $("#label").html(name.toUpperCase());
        if (name == "years") {
          $(".year").css("display", "initial");
          $("#buttonDiv").css("display", "grid");
          $("#search, #label").css("display", "none");

          $("#submitBtn").unbind("mouseup");
          $("#submitBtn").mouseup(function () {
            const fromValue = $("#year1").val();
            const toValue = $("#year2").val();
            const yearQuery = fromValue + "-" + toValue;
            $("#gameLibrary").attr("class", yearQuery);
            searchFunc(e);
          });
        } else {
          $(".year").css("display", "none");
          $("#buttonDiv").css("display", "none");
          $("#search, #label").css("display", "initial");
          $("#search").attr("name", name);
        }
        $("#search, #year1, #year2").val("");
        $("#recommendDiv").empty();
      });
    },
  });
  // BASE DATA REQUEST
  const dataFunc = async () => {
    const { data } = await axios.get("/api/games");
    createGames(data);
  };
  dataFunc();
  // GAME APPEND FUNC
  const createGames = (data) => {
    for (let i = 0; i < data.length; i++) {
      $("#gameArticle").append(games);
      $(`.gameImg:eq(${i})`).attr("src", data[i]["src"]);
      $(`figcaption:eq(${i})`).html(data[i]["names"]);
      $(`.games:eq(${i})`).attr("id", data[i]["_id"]);
    }

    // GAMES EVENTS
    const gameFunc = () => {
      $(".games").on({
        mouseenter: (e) => {
          const gamesDiv = $(e.currentTarget);
          const figure = gamesDiv.children("figure");
          const upDown = figure.children(".upDown");
          const leftRight = figure.children(".leftRight");
          const gameImg = figure.children(".gameImg");
          const figcaption = figure.children("figcaption");
          const figcaptionHTML = figure.children("figcaption").html();
          // FETCH DATA FOR FIGCAPTION
          const dataFunc = async () => {
            const { data } = await axios.get(
              `/api/games?names=${figcaptionHTML}`
            );
            // $("#gameArticle").empty();
            // createGames(data)

            figcaption.html("CLICK TO SEE MORE");
            $(gamesDiv).attr("id", data[0]["_id"]);
          };
          dataFunc();
          $(upDown).css({
            width: 0,
            borderRadius: "1.2rem",
            borderWidth: "3px",
            animation: "animationUpDown 1s forwards",
          });
          $(leftRight).css({
            height: 0,
            borderRadius: "1.2rem",
            borderWidth: "3px",
            animation: "animationLeftRight 1s forwards 1s",
          });
          $(figure).css({
            height: "25rem",
            borderRadius: "1.2rem",
            borderWidth: "5px",
          });
          $(gameImg).css({
            transform: "scale(1.3)",
          });
          $(figcaption).css({
            height: "100%",
            top: "-0",
          });
          $(".games").on({
            mouseup: (e) => {
              const gameID = e.currentTarget.id;
              // FETCH DATA FOR FIGCAPTION
              const dataFunc = async () => {
                let { data } = await axios.get(`/api/games?id=${gameID}`);
                $("#gameArticle").empty();
                createGames(data);

                $(".games").removeClass("pointer");
                $("#gameArticle").append(
                  `<div id="infoDiv" class="grid transition"></div>`
                );
                $("figure").css({
                  width: "100%",
                });
                $("figcaption").remove();
                for (let i = 0; i < Object.keys(data[0]).length; i++) {
                  let header2 = Object.keys(data[0])[i];
                  const linkKeys = [
                    "youtube",
                    "wiki",
                    "ign",
                    "steam",
                    "epic",
                    "xbox",
                    "playstation",
                    "nintendo",
                  ];
                  if (normalKeys.includes(header2)) {
                    let header2Element = `<h2 class="header2">${header2.toUpperCase()}</h2>`;
                    $("#infoDiv").append(
                      `<div class="infoDiv grid transition">${
                        header2Element + valueDiv
                      }</div>`
                    );
                    $(`.valueDiv:eq(${-1})`).html(data[0][header2]);
                    $(`.infoDiv:eq(${-1})`).attr("id", header2);
                    console.log(data[0][header2]);
                  }
                  if (linkKeys.includes(header2)) {
                    let header2Element = `<div class="header2 pointer">${header2.toUpperCase()}</div>`;
                    $("#infoDiv").append(
                      `<a target="_blank" class="infoDiv grid transition">${
                        header2Element + valueDiv
                      }</a>`
                    );
                    $(`.infoDiv:eq(-1)`).attr("href", data[0][header2]);
                    $(`.infoDiv:eq(${-1})`).attr("id", header2);
                    $(`.valueDiv:eq(${-1})`).html("Click here to check link.");
                    console.log(data[0][header2]);
                  }
                  // COLOR FUNCTION
                  infoDivFunc();
                  $(".mainButton").attr("id", "back");
                  $("#back").mouseup(function () {
                    $(".mainButton").attr("id", "more");
                    if ($(".labels:eq(-1)").html() == "") {
                      $(".labels:eq(-1)").remove();
                    }
                    labelQueryFunction();
                  });
                }

                $(".infoDiv").on({
                  mouseenter: (e) => {
                    let valueDiv = $(e.currentTarget).children(".valueDiv");
                    $(valueDiv).css("transform", "scale(1)");
                    $(valueDiv).css("height", "auto");
                  },
                  mouseleave: (e) => {
                    let valueDiv = $(e.currentTarget).children(".valueDiv");
                    $(valueDiv).css("transform", "scale(0)");
                    $(valueDiv).css("height", "0");
                  },
                });
              };
              dataFunc();
            },
            mouseleave: (e) => {
              const gamesDiv = $(e.currentTarget);
              const id = e.currentTarget.id;
              const figure = gamesDiv.children("figure");
              const figcaption = figure.children("figcaption");
              const dataFunc = async () => {
                const { data } = await axios.get(`/api/games?id=${id}`);
                figcaption.html(data[0]["names"]);
              };
              dataFunc();
            },
          });
        },
        mouseleave: (e) => {
          const gamesDiv = $(e.currentTarget);
          const figure = gamesDiv.children("figure");
          const upDown = figure.children(".upDown");
          const leftRight = figure.children(".leftRight");
          const gameImg = figure.children(".gameImg");
          const figcaption = figure.children("figcaption");
          $(upDown).css({
            width: "100%",
            borderRadius: "0.8rem",
            borderWidth: "2px",
            animation: "none",
          });
          $(leftRight).css({
            height: "100%",
            borderRadius: "0.8rem",
            borderWidth: "2px",
            animation: "none",
          });
          $(figure).css({
            height: "20rem",
            borderRadius: "0.8rem",
            borderWidth: "3px",
          });
          $(gameImg).css({
            transform: "scale(1)",
          });
          $(figcaption).css({
            height: "4.5rem",
            top: "9rem",
          });
        },
      });
    };
    gameFunc();
  };
  const urlSetFunc = async () => {
    // QUERY LAST "&" REMOVED AND SET TO EMPTY STRING
    pages = `&pages=${page}`;
    queryParams += pages;
    url += queryParams;
    console.log(url);
    queryParams = "";
    const { data } = await axios.get(url);

    // EMPTY WHOLE GAMES
    $("#gameArticle").empty();

    createGames(data);
    url = "/api/games?";
  };

  const moreSize = () => {
    $("#more").mouseup(function () {
      page++;
      labelQueryFunction();
      if ($(".labels:eq(-1)").html() == "") {
        $(".labels:eq(-1)").remove();
      }
      $("html, body").animate(
        {
          scrollTop: $(document).height(),
        },
        "slow"
      );
    });
  };
  moreSize();
  // SEARCH FUNCTION - GET DATA AND A KEY NAME TO LOOP
  const keyUpFunc = (data, searchName) => {
    let regex = new RegExp($("#search").val(), "gi");
    let regList = [];
    const recommend = `<div class="recommend transition pointer grid"></div>`;
    for (let i = 0; i < data.length; i++) {
      let name = data[i][searchName];
      // CHECK THE VALUE IS AN ARRAY OR NOT THEN PUSH THE VALUES TO REGLIST ARRAY - REMOVE THE DUBLICATES
      if (!Array.isArray(name)) {
        regList.push(name);
      } else {
        name = name.join().split(",");
        name = [...new Set(name)];

        for (let i = 0; i < name.length; i++) {
          if (name[i].match(regex)) {
            regList.push(name[i]);
          }
        }
      }
      regList = [...new Set(regList)];
    }

    // CHECK THE DATA LENGTH - ACCORDING TO THAT ADD RECOMMEND DIV TO HTML TO SHOW RECOMMENDED REGULAR EXPRESSION RESULTS
    if (regList.length >= 3) {
      $("#recommendDiv").css("display", "initial");
      while ($(".recommend").length < 3) {
        $("#recommendDiv").append(recommend);
      }
      for (let i = 0; i < 3; i++) {
        $(`.recommend:eq(${i})`).html(regList[i]);
      }
    }
    if (regList.length < 3) {
      $("#recommendDiv").css("display", "initial");
      $("#recommendDiv").empty();

      for (let i = 0; i < regList.length; i++) {
        $("#recommendDiv").append(recommend);
        $(`.recommend:eq(${i})`).html(regList[i]);
      }
      while ($(".recommend").length !== regList.length) {
        $(`.recommend:eq(-1)`).remove();
      }
    }
    if ($("#search").val() == "") {
      $("#recommendDiv").empty();
    }
  };

  // EMPTY AND CREATE LABELS FROM THE VALUES OF LABELLIST KEYS
  const labelQueryFunction = () => {
    $("#labelDiv").empty();
    // CHECK IF LABEL IS NAMES AND CREATE LABELS ACCORDING TO IT. IF LABEL IS NAMES THEN ONLY KEEP THE NAME
    if ($("#label").html() !== "NAMES") {
      labelList[0]["names"] = "";
      for (let i = 0; i < labelList.length; i++) {
        for (const key in labelList[i]) {
          if (labelList[i][key] && key !== "names") {
            // APPEND LABEL AND GIVE THE VALUE
            $("#labelDiv").append(label);
            $(`.labels:eq(-1)`).val(labelList[i][key]);
            $(`.labels:eq(-1)`).attr("name", key);
            $(`.labels:eq(-1)`).attr("class", "labels " + labelList[i][key]);
            // QUERY IS PREPARED
            if (key == "years") {
              queryParams += `years=${labelList[5]["years"]}`;
            } else {
              queryParams += key + "=" + labelList[i][key] + "&";
            }
          }
        }
      }
    } else {
      // APPEND LABEL FOR NAME AND GIVE THE VALUE
      $("#labelDiv").append(label);
      $(`.labels:eq(-1)`).val(labelList[0]["names"]);
      $(`.labels:eq(-1)`).attr("name", "names");
      $(`.labels:eq(-1)`).attr("class", "labels " + labelList[0]["names"]);
      queryParams += `names=${labelList[0]["names"]}`;
      for (let i = 0; i < labelList.length; i++) {
        for (const key in labelList[i]) {
          if (labelList[i][key] && key !== "names") {
            labelList[i][key] = "";
          }
        }
      }
    }
    // CALLS LABEL EVENTS
    labelFunc();
    // URL SET FUNCTION
    urlSetFunc();

    // LABEL COLOR SET
    for (let i = 0; i < $(`.labels`).length; i++) {
      let name = $(`.labels:eq(${i})`).attr("name").toUpperCase();
      for (let y = 0; y < $(`.genres`).length; y++) {
        if (name == $(`.genres:eq(${y})`).html()) {
          $(`.labels:eq(${i})`).css(
            "background-color",
            $(`.genres:eq(${y})`).css("background-color")
          );
        }
      }
    }
  };

  // LABEL FUNCTIONS TO CONTROL ANIMATIONS AND DELETE FUNCTIONS
  const labelFunc = () => {
    // LABEL FUNCTIONS
    $(".label").on({
      keydown: (e) => {
        e.preventDefault();
      },
      mouseenter: (e) => {
        const deleteSign = $(e.currentTarget).children(".delete");
        $(deleteSign).css({
          transform: "scale(1)",
          left: "-10rem",
        });
        $(deleteSign).on({
          mouseenter: (e) => {
            $(e.currentTarget).css({
              backgroundColor: "var(--deleteColor)",
            });
          },
          mouseleave: (e) => {
            $(e.currentTarget).css({
              backgroundColor: "var(--labelColor)",
            });
          },
          mouseup: (e) => {
            const label = $(e.currentTarget).parent();
            $(label).remove();
            queryParams = "";
            page = 1;
            // LOOP LABELLIST TO CHECK IF IT MATCHES WITH LABEL CLASS NAME. IF SO UPDATE THE KEY, IF NOT ASSIGN "" AND SET A NEW QUERYPARAMS
            if ($(".labels").length) {
              for (let i = 0; i < labelList.length; i++) {
                for (const key in labelList[i]) {
                  for (let y = 0; y < $(".labels").length; y++) {
                    let labelName = $(`.labels:eq(${y})`).attr("name");
                    let labelVal = $(`.labels:eq(${y})`).attr("class");
                    labelVal = labelVal.replace("labels ", "");

                    if (key == labelName) {
                      labelList[i][key] = labelVal;
                    } else {
                      labelList[i][key] = "";
                    }
                    if (labelList[i][key]) {
                      queryParams += key + "=" + labelList[i][key];
                    }
                  }
                }
              }
            } else {
              for (let i = 0; i < labelList.length; i++) {
                for (const key in labelList[i]) {
                  labelList[i][key] = "";
                }
              }
            }
            // GET DATA WITH URL + QUERY
            urlSetFunc();
            // RECURSION TO REPEAT LABEL EVENTS
            labelFunc();
          },
        });
      },
      mouseleave: (e) => {
        const deleteSign = $(e.currentTarget).children(".delete");
        $(deleteSign).css({
          transform: "scale(0)",
          left: "-2rem",
        });
      },
      mousedown: (e) => {
        e.preventDefault();
      },
    });
  };

  // ALL FUNCTIONS TOGETHER TO SET QUERY, BRING DATA AND CREATE LABELS
  const searchFunc = (e) => {
    page = 1;
    // RECOMMEND CLICK FUNCTION
    recommendFunc(e);
    // APPEND LABELS AND SET QUERY STRING
    labelQueryFunction(e);
    // LABEL FUNCTIONS
    labelFunc();

    // EMPTY INPUTS AND RECOMMENDDIV
    $("#search, #year1, #year2").val("");
    $("#recommendDiv").empty();
  };

  // RECOMMEND DIV FUNCTIONS
  const recommendClickFunc = () => {
    $(".recommend").mouseup(function (e) {
      searchFunc(e);
    });
  };
  // CREATES NEW KEY/VALUE PAIR IN LABELLIST OBJECT
  const recommendFunc = (e) => {
    const names = $(e.currentTarget).html();
    for (let i = 0; i < labelList.length; i++) {
      let labelI = labelList[i];
      let objectLabelI = Object.keys(labelI);
      if (objectLabelI == $("#label").html().toLowerCase()) {
        labelI[objectLabelI] = names;
      }
    }
    // SETS YEAR VALUE TO GAMELIBRARY CLASS
    labelList[5]["years"] = $("#gameLibrary").attr("class");
  };

  // SEARCH INPUT KEYUP FUNCTION
  $("#search").on({
    keyup: () => {
      const searchName = $("#search").attr("name");
      const searchVal = $("#search").val();
      // REQUEST TO GET REGEX DATA FROM SERVER WITH KEY VALUE PAIR
      const query = async () => {
        const { data } = await axios.get(
          `/api/games?${searchName}=${searchVal}`
        );
        // RECOMMEND CREATE FUNCTION
        keyUpFunc(data, searchName);
        // RECOMMEND FUNCTIONS
        $(".recommend").unbind("mouseup");
        recommendClickFunc();
        $(".mainButton").attr("id", "more");
      };
      query();
    },
  });
});

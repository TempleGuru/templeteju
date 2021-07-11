    let tabViewTitleMonthElement = document.querySelector(
      ".tabViewTitle.month"
    );
    let tabViewTitleVideoElement = document.querySelector(
      ".tabViewTitle.video"
    );
    let MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    localStorage.clear();
    let wheelElement = document.querySelector(".wheel");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentVideoNumber = 0;
    let currentView = "home";
    let currentTempleId = 0;
    let currenDate = new Date().getDate();
    let filename = (currentMonth + 1) * 1000 + currenDate + "home";

    loadData(
      showTemples,
      "https://raw.githubusercontent.com/TempleGuru/templeteju/main/json/" +
        filename,
      "home"
    );
    tabViewTitleMonthElement.innerHTML =
      MONTHS[currentMonth] + "," + currentYear;
    tabViewTitleVideoElement.innerHTML = "Video: Bhagavad Gita";

    // Processing videos/audios
    let nextVideoElement = document.querySelector(".nextVideo");
    nextVideoElement.addEventListener("click", function (event) {
      if (currentView == "gita") showVideo(++currentVideoNumber);
      else if (currentView == "live") showLiveDarshan(++currentVideoNumber);
      else if (currentView == "audios") showAudios(++currentVideoNumber);
    });
    let prevVideoElement = document.querySelector(".prevVideo");
    prevVideoElement.addEventListener("click", function (event) {
      if (currentView == "gita") showVideo(--currentVideoNumber);
      else if (currentView == "live") showLiveDarshan(--currentVideoNumber);
      else if (currentView == "audios") showAudios(--currentVideoNumber);
    });
    let homeVideoElement = document.querySelector(".homeVideo");
    homeVideoElement.addEventListener("click", function (event) {
      currentVideoNumber = 0;
      if (currentView == "gita") showVideo(currentVideoNumber);
      else if (currentView == "live") showLiveDarshan(currentVideoNumber);
      else if (currentView == "audios") showAudios(currentVideoNumber);
    });
    function showTemples() {
      let templesArray = JSON.parse(JSON.parse(localStorage.getItem("home")))
        .temples;
      let templeViewElement = document.querySelector("#templeView");
      let templeHTML = "";

      for (let i = 0; i == 0; i++) {
        let defaultimg = "images/default.png";
        templeHTML += `  
              <div class="video">
                <img class="moreThreeDots" loading="lazy" alt="${templesArray[i].templename}" data-templeid=${templesArray[i].id} src="images/${templesArray[i].id}.png"/> 
              </div>
              <div id="basicInfo">
                <span class="title"> ${templesArray[i].templename} , ${templesArray[i].location} </span> 
                <span class="moreThreeDots" data-templeid=${templesArray[i].id}></span>
                <span class="contacts"> ${templesArray[i].contacts} </span>
                <span><a class="website" href=${templesArray[i].website} target="_blank"> ${templesArray[i].website} <a> </span>
                <div class="more hide"></div>
                </br>
                </br>
                <div><a href="./temples.html"> Show more temples</a></div>
              </div>`;
      }
      templeViewElement.insertAdjacentHTML("beforeend", templeHTML);

      todayArray = JSON.parse(JSON.parse(localStorage.getItem("home"))).today;
      caledarHTML = ``;
      for (let i = 0; i < todayArray.length; i++) {
        caledarHTML = `
                <div id="basicInfo"  class="astrology" style="font-family: 'Timmana';">
                  <div class="today"> ${todayArray[i].title} </div>
                  <div> <span class="astroTitle">తిథి : </span> ${todayArray[i].thidhi}
                  </div> 
                  <div><span class="astroTitle"> నక్షత్రము : </span>${todayArray[i].nakshatram} </div>  
                  <div><span class="astroTitle"> రాహుకాలం : </span>${todayArray[i].rahu}</div>
                  <div><span class="astroTitle"> దుర్ముహుర్తము : </span>${todayArray[i].durmuhrtham} </div>
                  <div><span class="astroTitle">వర్జ్యం : </span>${todayArray[i].varjam}</div>
                  <div class="fulldetails"><a href="https://telugupanchang.com/" target="_blank"> Show full details </a> </div>
              </div>
          `;
      }
      caledarHTML += ``;
      templeViewElement.insertAdjacentHTML("beforeend", caledarHTML);

      liveArray = JSON.parse(JSON.parse(localStorage.getItem("home"))).live;
      liveDarshanHTML = ``;
      for (let i = 0; i < liveArray.length; i++) {
        liveDarshanHTML = `<div class="liveDarshan today" >
        <div class="title"> ${liveArray[i].livetitle} </div>`;

        if (liveArray[i].alink) {
          liveDarshanHTML += ` <a
        href="${liveArray[i].iframelink}"
        target="_blank"
      >Click here for Live Darshan</a>`;
        } else {
          liveDarshanHTML += `<iframe width="683" height="384" src="${liveArray[i].iframelink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>`;
        }
      }
      liveDarshanHTML += `<br/><br/>
        <a href="./live.html"> Show more Live Darshans</a>      
            </div>`;

      //       <div class="title">Shirdi Saibaba </div>
      //  Click here to visit live Shirdi Sai baba Darshan</a>

      //     <div class="title"> LIVE DARSHAN FROM SOMNATH TEMPLE </div>
      // <iframe width="663" height="373" src="https://www.youtube.com/embed/TVEqBYj7zfE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

      // <div class="title"> LIVE DARSHAN FROM Shree Siddhivinayak Temple, Mumbai </div>
      // <iframe width="683" height="384" src="https://www.youtube.com/embed/io066z1eMLA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>

      templeViewElement.insertAdjacentHTML("beforeend", liveDarshanHTML);

      footerHTML = `<div class="footer today">
            facebook icon, twitter icon, youtube icon, mail icon....
            </div>`;

      templeViewElement.insertAdjacentHTML("beforeend", footerHTML);

      addMoreEvent();
    }

    function showVideo(videoNumber) {
      if (videoNumber == undefined) videoNumber = 0;
      console.log("showVideo: " + videoNumber);

      let tabTitleElement = document.querySelector("#videoView #tabTitle");
      tabTitleElement.innerHTML = "Bhagavad Gita";

      tabViewTitleVideoElement.innerHTML = "Chapter 1";
      let videoElement = document.querySelector("#videoiframe");
      let data = JSON.parse(localStorage.getItem("video"));
      videoElement.src =
        "https://www.youtube.com/embed/" + JSON.parse(data).video[videoNumber];
    }

    function showLiveDarshan(videoNumber) {
      if (videoNumber == undefined) videoNumber = 0;
      console.log("showVideo: " + videoNumber);

      let tabTitleElement = document.querySelector("#videoView #tabTitle");
      tabTitleElement.innerHTML = "Live Darshan";

      let videoElement = document.querySelector("#videoiframe");
      let data = JSON.parse(localStorage.getItem("live"));
      tabViewTitleVideoElement.innerHTML = JSON.parse(data).live[videoNumber][
        "message"
      ];
      videoElement.src = JSON.parse(data).live[videoNumber]["link"];
    }

    // Processing months
    let nextMonthElement = document.querySelector(".nextMonth");
    nextMonthElement.addEventListener("click", function (event) {
      currentMonth = currentMonth + 1;
      if (currentMonth >= 12) {
        currentMonth = 0;
        ++currentYear;
      }

      showCalendar(currentYear, currentMonth);
    });
    let prevMonthElement = document.querySelector(".prevMonth");
    prevMonthElement.addEventListener("click", function (event) {
      currentMonth = currentMonth - 1;
      if (currentMonth < 0) {
        currentMonth = 11;
        --currentYear;
      }
      showCalendar(currentYear, currentMonth);
    });
    let curMonthElement = document.querySelector(".currentMonth");
    curMonthElement.addEventListener("click", function (event) {
      currentMonth = new Date().getMonth();
      currentYear = new Date().getFullYear();
      showCalendar(currentYear, currentMonth);
    });
    function showAudios(audioNumber) {
      if (audioNumber == undefined) audioNumber = 0;
      console.log("audioNumber: " + audioNumber);

      let tabTitleElement = document.querySelector("#videoView #tabTitle");
      tabTitleElement.innerHTML = "Audios";

      let videoElement = document.querySelector("#videoiframe");
      let data = JSON.parse(localStorage.getItem("audios"));
      videoElement.src = JSON.parse(data).audios[audioNumber].audioLink;
      tabViewTitleVideoElement.innerHTML = JSON.parse(data).audios[
        audioNumber
      ].message;
    }

    function showCalendar(year, month) {
      if (year == undefined && month == undefined) {
        year = currentYear;
        month = currentMonth;
      }
      console.log("showCalendar: " + year + "  " + month);
      tabViewTitleMonthElement.innerHTML =
        MONTHS[currentMonth] + "," + currentYear;
      let calendarElement = document.querySelector("#calendariframe");
      let data = JSON.parse(localStorage.getItem("calendar"));
      calendarElement.src = JSON.parse(data).calendar[year - 2020].months[
        month
      ];
    }

    function loadData(callback, url, storageId) {
      console.log("loadData: " + callback + " " + url + " " + storageId);

      //if(storageId < 0) return false;

      if (localStorage.getItem(storageId) == null) {
        // wheelElement.classList.add('show');
        // wheelElement.classList.remove('hide');
        let xhttp = new XMLHttpRequest();
        //let calendarDataURL = "https://raw.githubusercontent.com/TempleGuru/templeteju/main/data";
        xhttp.open("GET", url);
        xhttp.send();

        xhttp.onreadystatechange = function () {
          // wheelElement.classList.add('hide');
          // wheelElement.classList.remove('show');
          let response;
          if (this.readyState == 4 && this.status == 200) {
            response = xhttp.responseText;
            localStorage.setItem(storageId, JSON.stringify(response));
            //showCalendar(currentYear,currentMonth);

            if (callback) callback();
          }
        };
      } else {
        //showCalendar(currentYear,currentMonth);
        //wheelElement.classList.add('hide');
        //wheelElement.classList.remove('show');
        if (callback) callback();
      }
    }

    //Menu- Container Views Change
    let homeElement = document.querySelector(".home");
    let templesElement = document.querySelector(".temples");
    let gitaElement = document.querySelector(".gita");
    let audiosElement = document.querySelector(".audios");
    let liveDarshanElement = document.querySelector(".liveDarshan");
    let calendarElement = document.querySelector(".calendar");

    let templeViewElement = document.querySelector("#templeView");
    let videoViewElement = document.querySelector("#videoView");
    let calendarViewElement = document.querySelector("#calendarView");

    let backVideoElement = document.querySelector(".back.video");
    let backCalendarElement = document.querySelector(".back.calendar");

    homeElement.addEventListener("click", function (event) {
      currentView = "home";
      window.location.href = "./index.html";
      headerContainer.style.width = "0%";
      templeViewElement.classList.remove("hide");
      templeViewElement.classList.add("show");
      videoViewElement.classList.remove("show");
      videoViewElement.classList.add("hide");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });
    templesElement.addEventListener("click", function (event) {
      currentView = "temples";
      window.location.href = "./temples.html";
      headerContainer.style.width = "0%";
      templeViewElement.classList.remove("hide");
      templeViewElement.classList.add("show");
      videoViewElement.classList.remove("show");
      videoViewElement.classList.add("hide");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });
    gitaElement.addEventListener("click", function (event) {
      window.location.href = "./epics.html";
      loadData(
        showVideo,
        "https://raw.githubusercontent.com/TempleGuru/templeteju/main/gita",
        "video"
      );
      currentView = "gita";
      currentVideoNumber = 0;
      headerContainer.style.width = "0%";
      templeViewElement.classList.remove("show");
      templeViewElement.classList.add("hide");
      videoViewElement.classList.remove("hide");
      videoViewElement.classList.add("show");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });
    liveDarshanElement.addEventListener("click", function (event) {
      window.location.href = "./live.html";

      // loadData(
      //   showLiveDarshan,
      //   "https://raw.githubusercontent.com/TempleGuru/templeteju/main/live",
      //   "live"
      // );
      // currentView = "live";
      // currentVideoNumber = 0;
      // headerContainer.style.width = "0%";
      // templeViewElement.classList.remove("show");
      // templeViewElement.classList.add("hide");
      // videoViewElement.classList.remove("hide");
      // videoViewElement.classList.add("show");
      // calendarViewElement.classList.remove("show");
      // calendarViewElement.classList.add("hide");
    });
    audiosElement.addEventListener("click", function (event) {
      loadData(
        showAudios,
        "https://raw.githubusercontent.com/TempleGuru/templeteju/main/audios",
        "audios"
      );
      currentView = "audios";
      currentVideoNumber = 0;
      headerContainer.style.width = "0%";
      templeViewElement.classList.remove("show");
      templeViewElement.classList.add("hide");
      videoViewElement.classList.remove("hide");
      videoViewElement.classList.add("show");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });

    calendarElement.addEventListener("click", function (event) {
      loadData(
        showCalendar,
        "https://raw.githubusercontent.com/TempleGuru/templeteju/main/calendar",
        "calendar"
      );
      currentView = "calendar";
      currentVideoNumber = 0;
      headerContainer.style.width = "0%";
      templeViewElement.classList.remove("show");
      templeViewElement.classList.add("hide");
      videoViewElement.classList.remove("show");
      videoViewElement.classList.add("hide");
      calendarViewElement.classList.remove("hide");
      calendarViewElement.classList.add("show");
    });

    backCalendarElement.addEventListener("click", function (event) {
      currentView = "home";
      currentVideoNumber = 0;
      //headerContainer.style.width = "0%";
      console.log("backElement :click");
      templeViewElement.classList.remove("hide");
      templeViewElement.classList.add("show");
      videoViewElement.classList.remove("show");
      videoViewElement.classList.add("hide");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });

    backVideoElement.addEventListener("click", function (event) {
      currentView = "home";
      currentVideoNumber = 0;
      document.querySelector("#videoiframe").src = "";
      //headerContainer.style.width = "0%";
      console.log("backElement :click");
      templeViewElement.classList.remove("hide");
      templeViewElement.classList.add("show");
      videoViewElement.classList.remove("show");
      videoViewElement.classList.add("hide");
      calendarViewElement.classList.remove("show");
      calendarViewElement.classList.add("hide");
    });

    //Menu Clicking - Show / Hide Menu list
    let menuElement = document.querySelector(".menu");
    let listingElement = document.querySelector(".listing");

    let headerContainer = document.querySelector("#headerContainer");
    headerContainer.style.width = "0%";
    menuElement.addEventListener("click", function (event) {
      console.log(headerContainer.style.width);
      if (headerContainer.style.width == "0%") {
        headerContainer.style.width = "70%";
      } else {
        headerContainer.style.width = "0%";
      }
    });

    //Menu listing close icon - Click event
    let closeElement = document.querySelector(".close");
    closeElement.addEventListener("click", function (event) {
      if (headerContainer.style.width == "0%") {
        headerContainer.style.width = "70%";
      } else {
        headerContainer.style.width = "0%";
      }
    });
    function showTempleMore() {
      let moreViewElement = document.querySelector("#moreView");
      let templePDFElement = document.querySelector("#templePDF");
      let templeMapElement = document.querySelector("#templeMap");
      let bookingTabElement = document.querySelector("#tabContent.booking");
      let schedulesTabElement = document.querySelector("#tabContent.schedules");

      currentTempleId = currentTempleId || -1;
      moreViewElement.style.height = "100%";

      //let videoElement = document.querySelector("#videoiframe");
      let data = JSON.parse(JSON.parse(localStorage.getItem(currentTempleId)));
      //videoElement.src = "https://www.youtube.com/embed/"+ JSON.parse(data).video[videoNumber];

      // if(templePDFElement.src == "")
      templePDFElement.src = data.about;
      // Dashan and Accomodation tab Content Preparation
      let innerHTML = "";
      if (data.bookings.length != 0) {
        for (i = 0; i < data.bookings.length; i++)
          innerHTML += data.bookings[i] + "<br>";
      }
      bookingTabElement.innerHTML = innerHTML;

      // Schedules tab Content Preparation
      innerHTML = "";
      if (data.schedules.length != 0) {
        for (i = 0; i < data.schedules.length; i++)
          innerHTML += data.schedules[i] + "<br>";
      }
      schedulesTabElement.innerHTML = innerHTML;

      //templeMapElement.src= data.map;

      pdfTab();
    }

    function addMoreEvent(pdfSrc) {
      console.log("AddMoreEvent");
      // Moving the arrow up and down when clicks on it.
      let contentArrow = document.querySelector("#templeView");
      let moreElement = document.querySelector(".more");
      let moreViewElement = document.querySelector("#moreView");

      templePDFSrc = pdfSrc || "";

      contentArrow.addEventListener("click", function (event) {
        if (currentTempleId == -1)
          if (!event.target.classList.contains("moreThreeDots")) return false;
        currentTempleId = event.target.dataset.templeid || -1;
        console.log("TEMPLE ID " + currentTempleId);

        loadData(
          showTempleMore,
          "https://raw.githubusercontent.com/TempleGuru/templeteju/main/templeById/" +
            currentTempleId,
          currentTempleId
        );
      });
      let morecloseElement = document.querySelector("#moreClose");
      morecloseElement.addEventListener("click", function (event) {
        console.log("more close");
        moreViewElement.style.height = "0%";
      });
    }
    // Tabs click

    let tabElement = document.querySelector(".tabs");
    tabElement.addEventListener("click", function (event) {
      if (event.target.classList.contains("pdfTab")) {
        pdfTab();
      }
      if (event.target.classList.contains("audioTab")) {
        audioTab();
      }
      if (event.target.classList.contains("bookingTab")) {
        bookingTab();
      }
      if (event.target.classList.contains("schedulesTab")) {
        schedulesTab();
      }
      if (event.target.classList.contains("mapTab")) {
        mapTab();
      }
      if (event.target.classList.contains("booksTab")) {
        booksTab();
      }
      if (event.target.classList.contains("calendarTab")) {
        calendarTab();
      }
    });

    // Switch between tabs
    function pdfTab() {
      let element = document.querySelector("#tabContent.pdf");
      element.classList.remove("hide");
      element.classList.add("show");

      // if(templePDFElement.src == "")
      //     templePDFElement.src= "https://drive.google.com/file/d/18WsjDqxtMrERT9k7_LpxBIN2qYdyaApI/preview";
      // hide others
      let otherElement = document.querySelector("#tabContent.audio");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.booking");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.map");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.books");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.schedules");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");

      //Tab bg Color change
      document.querySelector(".pdfTab.tab").classList.add("bgTitleColor");
      //document.querySelector(".audioTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".bookingTab.tab")
        .classList.remove("bgTitleColor");
      document.querySelector(".mapTab.tab").classList.remove("bgTitleColor");
      //document.querySelector(".booksTab.tab").classList.remove('bgTitleColor');
      //document.querySelector(".calendarTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".schedulesTab.tab")
        .classList.remove("bgTitleColor");
    }
    function schedulesTab() {
      let element = document.querySelector("#tabContent.schedules");
      element.classList.remove("hide");
      element.classList.add("show");

      // hide others
      let otherElement = document.querySelector("#tabContent.pdf");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.booking");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.map");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.books");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");

      //Tab bg Color change
      document.querySelector(".pdfTab.tab").classList.remove("bgTitleColor");
      //  document.querySelector(".audioTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".bookingTab.tab")
        .classList.remove("bgTitleColor");
      document.querySelector(".mapTab.tab").classList.remove("bgTitleColor");
      //  document.querySelector(".booksTab.tab").classList.remove('bgTitleColor');
      // document.querySelector(".calendarTab.tab").classList.remove('bgTitleColor');
      document.querySelector(".schedulesTab.tab").classList.add("bgTitleColor");
    }

    function bookingTab() {
      let element = document.querySelector("#tabContent.booking");
      element.classList.remove("hide");
      element.classList.add("show");
      // hide others
      let otherElement = document.querySelector("#tabContent.pdf");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.audio");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.map");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.books");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.schedules");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");

      //Tab bg Color change
      document.querySelector(".pdfTab.tab").classList.remove("bgTitleColor");
      //document.querySelector(".audioTab.tab").classList.remove('bgTitleColor');
      document.querySelector(".bookingTab.tab").classList.add("bgTitleColor");
      document.querySelector(".mapTab.tab").classList.remove("bgTitleColor");
      //document.querySelector(".booksTab.tab").classList.remove('bgTitleColor');
      //document.querySelector(".calendarTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".schedulesTab.tab")
        .classList.remove("bgTitleColor");
    }
    function mapTab() {
      let element = document.querySelector("#tabContent.map");
      element.classList.remove("hide");
      element.classList.add("show");

      let templeMapElement = document.querySelector("#templeMap");
      //if(templeMapElement.src == "")
      templeMapElement.src = JSON.parse(
        JSON.parse(localStorage.getItem(currentTempleId))
      ).map;

      // hide others
      let otherElement = document.querySelector("#tabContent.pdf");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.audio");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.booking");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.books");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");
      otherElement = document.querySelector("#tabContent.schedules");
      otherElement.classList.remove("show");
      otherElement.classList.add("hide");

      //Tab bg Color change
      document.querySelector(".pdfTab.tab").classList.remove("bgTitleColor");
      // document.querySelector(".audioTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".bookingTab.tab")
        .classList.remove("bgTitleColor");
      document.querySelector(".mapTab.tab").classList.add("bgTitleColor");
      //document.querySelector(".booksTab.tab").classList.remove('bgTitleColor');
      //document.querySelector(".calendarTab.tab").classList.remove('bgTitleColor');
      document
        .querySelector(".schedulesTab.tab")
        .classList.remove("bgTitleColor");
    }
  
